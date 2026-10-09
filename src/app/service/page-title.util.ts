export interface MenuTitleItem {
  label: string;
  route: string;
  submenu?: { label: string; route: string }[];
}

/** Routes not listed in sidebar menu or requiring exact official display titles. */
const EXTRA_ROUTE_TITLES: Record<string, string> = {
  // Common / Dashboard
  '/home': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/change-password': 'Change Password',

  // DME / Orders
  '/orders/po-supply': 'Purchase Orders Desk',
  '/orders/purchase-order-dashboard': 'Purchase Orders Desk',
  '/orders/purchase-order-receipts': 'Purchase Order Receipts Desk',
  '/orders/po-receipt-entry': 'Receipt / Installation Entry',
  '/orders/po-installation-report': 'Complete Installation Report',
  '/orders/po-print': 'Purchase Order Print',
  '/orders/payment-letter': 'Payment Letter',
  '/orders/withheld-release': 'Withheld Amount Release',
  '/orders/po-amendment': 'PO Amendment',
  '/orders/po-reallocation': 'PO Reallocation',
  '/orders/mas-file-no': 'Master File Number',
  '/orders/change-password': 'Change Password',

  // DME / Stock
  '/stock/covid-stock-report': 'Stock Report',
  '/stock/opening-stock-entry': 'Opening Stock Entry',
  '/stock/new-opening-stock-entry': 'New Opening Stock Entry',
  '/stock/nodal-information': 'Nodal Officer Information',
  '/stock/nodal-progress': 'Nodal Progress',
  '/stock/facility-receipts': 'Facility Receipts',
  '/stock/progress-category': 'Progress Category',

  // DME / Indent
  '/indent/dme-fac-heads': 'Facility Indent Heads',
  '/indent/dme-fac-add-indent': 'Add Facility Indent',
  '/indent/dme-fac-indent-report': 'Facility Indent Report',
  '/indent/consolidated-indent-dme': 'Consolidated Indent DME',

  // DME / Complaints
  '/complain/complaint-status': 'Complaint Status',
  '/complain/complaint-status-edit': 'Complaint Status Edit',
  '/complain/complaint-status-facility': 'Facility Complaint Status',
  '/complain/complaint-status-facility-edit': 'Facility Complaint Status Edit',
  '/complain/facility-complain-store': 'Facility Complaint Store',
  '/complain/complain-cmho': 'Complain Received Against Equipment',
  '/complain/receipt-complain-supplier': 'Complain Received Against Equipment',

  // DME / Masters & Reports
  '/masters/cme-eel-suggestion': 'EEL Suggestion Report',
  '/masters/report-specification': 'CME EEL - Specifications Upload',
  '/reports/eel-specification': 'CME EEL - Specifications Upload',
  '/reports/cmc-detail': 'CMC Detail Report',
  '/consigee-information': 'Consignee Information',

  // Supplier & Transactions
  '/transaction/po-supply-dispatch': 'Purchase Orders Dispatch Desk',
  '/transaction/po-supply-receipt': 'Consignee Wise PO-Receipt/Installation Details',
  '/masters/particular-supplier-add': 'Supplier Information',
  '/masters/supplier-gst-entry': 'Supplier GST Entry',
  '/reports/payment-report': 'Payment Report',
  '/reports/supplier-payment-report': 'Paid Report of Purchase Orders',
  '/reports/sanction-report': 'Sanction Report',
  '/reports/pending-receipt-installation': 'Pending Receipt / Installation',
  '/reports/pending-install-drill-down': 'Pending Receipt / Installation Detail',
  '/emd-refund/emd-deposit': 'EMD Refund Request Form',
  '/emd-refund/tenderwise': 'EMD Refund Request File Movement',
  '/emd-refund/sd-release-finance': 'Security Deposit (SD) Release',
  '/contracts/rc-detail-report': 'Rate Contract Detail Report',
  '/indents/from-facilities': 'Indent Received from Directorate/Facilities',
  '/contracts/rc-detail-report-supplier': 'Rate Contract Detail Report',
  '/contracts/accepted-report-supplier': 'Price Accepted By CGMSC',
  '/orders/po-supply-sd-detail': 'Security Deposit Detail', 
  '/orders/po-supply-apply-extension': 'Apply For Extension',
  '/transaction/po-supply-dispatch-edit': 'Dispatch Equipment Desk',
  '/transaction/po-supply-dispatch-entry': 'Dispatch Entry of Equipments',
  '/transaction/po-supply-receipt-entry': 'Receipt / Installation Entry',
  '/transaction/po-supply-installation-report': 'Installation Report',
  '/transaction/po-supply-dispatch-report': 'Dispatch Details',
  '/transaction/po-supply-installation-print': 'Installation Report Print',
  '/transaction/po-supply-po-print': 'Purchase Order Print',
  '/indents/annual-indent-items': 'Add Indent Items',
  '/indents/annual-indent-report': 'Annual Indent Report',
};

export function resolvePageTitle(path: string, menuItems: MenuTitleItem[] = []): string {
  if (!path) {
    return 'EMIS';
  }

  const raw = path.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`;
  const withoutSlash = raw.replace(/^\//, '');

  if (EXTRA_ROUTE_TITLES[withSlash]) {
    return EXTRA_ROUTE_TITLES[withSlash];
  }
  if (EXTRA_ROUTE_TITLES[withoutSlash]) {
    return EXTRA_ROUTE_TITLES[withoutSlash];
  }

  let bestMatch = '';
  let bestLength = 0;

  for (const item of (menuItems || [])) {
    if (item.submenu?.length) {
      for (const sub of item.submenu) {
        if (!sub.route) {
          continue;
        }
        const subRaw = sub.route.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
        const subSlash = subRaw.startsWith('/') ? subRaw : `/${subRaw}`;
        if (
          (withSlash === subSlash || withSlash.startsWith(`${subSlash}/`)) &&
          subSlash.length > bestLength
        ) {
          bestMatch = sub.label.trim();
          bestLength = subSlash.length;
        }
      }
      continue;
    }

    if (!item.route) {
      continue;
    }
    const itemRaw = item.route.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
    const itemSlash = itemRaw.startsWith('/') ? itemRaw : `/${itemRaw}`;
    if (
      (withSlash === itemSlash || withSlash.startsWith(`${itemSlash}/`)) &&
      itemSlash.length > bestLength
    ) {
      bestMatch = item.label.trim();
      bestLength = itemSlash.length;
    }
  }

  if (bestMatch) {
    return bestMatch;
  }

  // Fallback: derive title from last path segment for unmapped routes
  const segments = withSlash.split('/').filter(Boolean);
  if (segments.length > 0) {
    let target = segments[segments.length - 1];
    if (/^\d+$/.test(target) && segments.length > 1) {
      target = segments[segments.length - 2];
    }
    if (target === 'home' || target === 'dashboard') {
      return 'Dashboard';
    }
    if (target && target !== 'login') {
      return target
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
  }

  return 'EMIS';
}
