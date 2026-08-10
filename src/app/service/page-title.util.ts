export interface MenuTitleItem {
  label: string;
  route: string;
  submenu?: { label: string; route: string }[];
}

/** Routes not listed in sidebar menu — use explicit titles. */
const EXTRA_ROUTE_TITLES: Record<string, string> = {
  '/orders/po-supply': 'Purchase Orders Desk',
  '/transaction/po-supply-dispatch': 'Purchase Orders Dispatch Desk',
  '/transaction/po-supply-receipt': 'Consignee Wise PO-Receipt/Installation Details',
  '/masters/particular-supplier-add': 'Supplier Information',
  '/masters/supplier-gst-entry': 'Supplier GST Entry',
  '/reports/payment-report': 'Payment Report',
  '/reports/supplier-payment-report': 'Paid Report of Purchase Orders',
  '/reports/sanction-report': 'Sanction Report',
  '/reports/pending-receipt-installation': 'Pending Receipt / Installation',
  '/reports/pending-install-drill-down': 'Pending Receipt / Installation Detail',
  '/complain/receipt-complain-supplier': 'Complain Received Against Equipment',
  '/emd-refund/emd-deposit': 'EMD Refund Request Form',
  '/emd-refund/tenderwise': 'EMD Refund Request File Movement',
  '/emd-refund/sd-release-finance': 'Security Deposit (SD) Release',
  '/contracts/rc-detail-report': 'Rate Contract Detail Report',
  '/indents/from-facilities': 'Indent Received from Directorate/Facilities',
  '/masters/report-specification': 'CME EEL - Specifications Upload',
  '/reports/eel-specification': 'CME EEL - Specifications Upload',
  '/contracts/rc-detail-report-supplier': 'Rate Contract Detail Report',
  '/contracts/accepted-report-supplier': 'Price Accepted By CGMSC',
  '/orders/po-supply-sd-detail': 'Security Deposit Detail', 
  '/orders/po-supply-apply-extension': 'Apply For Extension',
  '/transaction/po-supply-dispatch-edit': 'Dispatch Equipment Desk',
  '/transaction/po-supply-dispatch-entry': 'Dispatch Entry of Equipments',
  '/transaction/po-supply-receipt-entry': 'Receipt / Installation Entry',
  '/transaction/po-supply-installation-report': 'Installation Report',
  '/orders/po-receipt-entry': 'Receipt / Installation Entry',
  '/orders/po-installation-report': 'Complete Installation Report',
  '/orders/po-print': 'Purchase Order Print',
  '/transaction/po-supply-dispatch-report': 'Dispatch Details',
  '/transaction/po-supply-installation-print': 'Installation Report Print',
  '/transaction/po-supply-po-print': 'Purchase Order Print',
  '/indents/annual-indent-items': 'Add Indent Items',
  '/indents/annual-indent-report': 'Annual Indent Report',
};

export function resolvePageTitle(path: string, menuItems: MenuTitleItem[]): string {
  const normalized = path.split('?')[0].split('#')[0];

  if (EXTRA_ROUTE_TITLES[normalized]) {
    return EXTRA_ROUTE_TITLES[normalized];
  }

  let bestMatch = '';
  let bestLength = 0;

  for (const item of menuItems) {
    if (item.submenu?.length) {
      for (const sub of item.submenu) {
        if (!sub.route) {
          continue;
        }
        const subPath = sub.route.split('?')[0].split('#')[0];
        if (
          (normalized === subPath || normalized.startsWith(`${subPath}/`)) &&
          subPath.length > bestLength
        ) {
          bestMatch = sub.label.trim();
          bestLength = subPath.length;
        }
      }
      continue;
    }

    if (!item.route) {
      continue;
    }
    const itemPath = item.route.split('?')[0].split('#')[0];
    if (
      (normalized === itemPath || normalized.startsWith(`${itemPath}/`)) &&
      itemPath.length > bestLength
    ) {
      bestMatch = item.label.trim();
      bestLength = itemPath.length;
    }
  }

  return bestMatch;
}
