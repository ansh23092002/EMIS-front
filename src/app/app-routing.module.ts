import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SupplierLoginComponent } from './component/auth/supplier-login/supplier-login.component';
import { ParticularSupplierAddComponent } from './component/Suppliers/particular-supplier-add/particular-supplier-add.component';
import { SupplierGstEntryComponent } from './component/Suppliers/supplier-gst-entry/supplier-gst-entry.component';
import { PoSupplyComponent } from './component/Suppliers/po-supply/po-supply.component';
import { PoSupplyDispatchComponent } from './component/Suppliers/po-supply-dispatch/po-supply-dispatch.component';
import { PoSupplyDispatchEditComponent } from './component/Suppliers/po-supply-dispatch-edit/po-supply-dispatch-edit.component';
import { PoSupplyDispatchEntryComponent } from './component/Suppliers/po-supply-dispatch-entry/po-supply-dispatch-entry.component';
import { PoSupplyDispatchReportComponent } from './component/Suppliers/po-supply-dispatch-report/po-supply-dispatch-report.component';
import { SupplierPoSdDetailComponent } from './component/Suppliers/supplier-po-sd-detail/supplier-po-sd-detail.component';
import { SupplierPoApplyExtensionComponent } from './component/Suppliers/supplier-po-apply-extension/supplier-po-apply-extension.component';
import { PoSupplyReceiptComponent } from './component/Suppliers/po-supply-receipt/po-supply-receipt.component';
import { PoSupplyReceiptEntryComponent } from './component/Suppliers/po-supply-receipt-entry/po-supply-receipt-entry.component';
import { PoSupplyInstallationReportComponent } from './component/Suppliers/po-supply-installation-report/po-supply-installation-report.component';
import { PoSupplyInstallationPrintComponent } from './component/Suppliers/po-supply-installation-print/po-supply-installation-print.component';
import { PoSupplyPoPrintComponent } from './component/Suppliers/po-supply-po-print/po-supply-po-print.component';
import { SupplierRcDetailReportComponent } from './component/Suppliers/supplier-rc-detail-report/supplier-rc-detail-report.component';
import { SupplierAcceptedReportComponent } from './component/Suppliers/supplier-accepted-report/supplier-accepted-report.component';
import { SupplierReceiptComplainComponent } from './component/Suppliers/supplier-receipt-complain/supplier-receipt-complain.component';
import { SupplierEmdDepositComponent } from './component/Suppliers/supplier-emd-deposit/supplier-emd-deposit.component';
import { SupplierPaymentReportComponent } from './component/Suppliers/supplier-payment-report/supplier-payment-report.component';
import { SupplierSanctionReportComponent } from './component/Suppliers/supplier-sanction-report/supplier-sanction-report.component';
import { SupplierPendingReceiptInstallationComponent } from './component/Suppliers/supplier-pending-receipt-installation/supplier-pending-receipt-installation.component';
import { SupplierPendingInstallDrillDownComponent } from './component/Suppliers/supplier-pending-install-drill-down/supplier-pending-install-drill-down.component';
import { LogoutComponent } from './component/auth/logout/logout.component';
import { RouteGuardService } from './service/authentication/route-guard.service';
import { OtpComponent } from './component/auth/otp/otp.component';
import { Registration } from './component/auth/registration/registration';
import { GenerationFileNonastiComponent } from './component/generation-file-nonasti/generation-file-nonasti.component';
import { FileMRCDashbordComponent } from './component/file-mrcdashbord/file-mrcdashbord.component';
import { InstallationDetailsComponent } from './component/installation-details/installation-details.component';
import { ExtensionHODetailComponent } from './component/extension-hodetail/extension-hodetail.component';
import { ExtensionHOEntryComponent } from './component/extension-hoentry/extension-hoentry.component';
import { ItemWiseDetailPOCellComponent } from './component/item-wise-detail-pocell/item-wise-detail-pocell.component';
import { ItemWiseDetailPOCellByPOidComponent } from './component/item-wise-detail-pocell-by-poid/item-wise-detail-pocell-by-poid.component';
import { IndentPOSummaryDirwiseComponent } from './component/indent-posummary-dirwise/indent-posummary-dirwise.component';
import { DistrictWisePODetailComponent } from './component/district-wise-podetail/district-wise-podetail.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { RCDetailReportComponent } from './component/rcdetail-report/rcdetail-report.component';
import { AcceptedReortComponent } from './component/accepted-reort/accepted-reort.component';
import { IndentFromFacilitiesComponent } from './component/indent-from-facilities/indent-from-facilities.component';
import { ComplainReportBMEComponent } from './component/complain-report-bme/complain-report-bme.component';
import { FacilityAuthPOValuePOCellComponent } from './component/facility-auth-povalue-pocell/facility-auth-povalue-pocell.component';
import { POSummaryDrillDwnQtyPOWiseComponent } from './component/posummary-drill-dwn-qty-powise/posummary-drill-dwn-qty-powise.component';
import { POPaidReportComponent } from './component/popaid-report/popaid-report.component';
import { ChequeWisePaymentRComponent } from './component/cheque-wise-payment-r/cheque-wise-payment-r.component';
import { POSummaryReportComponent } from './component/posummary-report/posummary-report.component';
import { POSummaryDrillDwnQtyComponent } from './component/posummary-drill-dwn-qty/posummary-drill-dwn-qty.component';
import { TendersStatusComponent } from './component/tenders-status/tenders-status.component';
import { PORecdsummaryComponent } from './component/porecdsummary/porecdsummary.component';
import { TenterStatusItemWiseComponent } from './component/tenter-status-item-wise/tenter-status-item-wise.component';
import { POSummaryDrillDwnQtyReagentComponent } from './component/posummary-drill-dwn-qty-reagent/posummary-drill-dwn-qty-reagent.component';
import { MastterSupplierDashComponent } from './component/BME/mastter-supplier-dash/mastter-supplier-dash.component';
import { ItemsBMEComponent } from './component/BME/items-bme/items-bme.component';
import { MapitemsEithTypeComponent } from './component/BME/mapitems-eith-type/mapitems-eith-type.component';
import { MapitemswithTypeUpdateComponent } from './component/BME/mapitemswith-type-update/mapitemswith-type-update.component';
import { MapitemswithMainitemTypeRepoComponent } from './component/BME/mapitemswith-mainitem-type-repo/mapitemswith-mainitem-type-repo.component';
import { EMSRCDashbordComponent } from './component/BME/emsrcdashbord/emsrcdashbord.component';
import { EMSNEWRCComponent } from './component/BME/emsnewrc/emsnewrc.component';
import { PlanaTenderDComponent } from './component/BME/plana-tender-d/plana-tender-d.component';
import { TenderStatusUpdateComponent } from './component/BME/tender-status-update/tender-status-update.component';
import { AddRTenderItemsComponent } from './component/BME/add-rtender-items/add-rtender-items.component';
import { ConsigeeInformationComponent } from './component/DME/consigee-information/consigee-information.component';
import { ReportSpecificationComponent } from './component/DME/masters/report-specification/report-specification.component';
import { CmeEelSuggestionComponent } from './component/DME/masters/cme-eel-suggestion/cme-eel-suggestion.component';
import { StockReportComponent } from './component/DME/stock/stock-report/stock-report.component';
import { OpeningStockEntryComponent } from './component/DME/stock/opening-stock-entry/opening-stock-entry.component';
import { NewOpeningStockEntryComponent } from './component/DME/stock/new-opening-stock-entry/new-opening-stock-entry.component';
import { PurchaseOrderDashboardComponent } from './component/DME/orders/purchase-order-dashboard/purchase-order-dashboard.component';
import { PurchaseOrderReceiptsComponent } from './component/DME/orders/purchase-order-receipts/purchase-order-receipts.component';
import { PoReceiptEntryComponent } from './component/DME/orders/po-receipt-entry/po-receipt-entry.component';
import { PoInstallationReportComponent } from './component/DME/orders/po-installation-report/po-installation-report.component';
import { PoPrintComponent } from './component/DME/orders/po-print/po-print.component';
import { DmeFacHeadsComponent } from './component/DME/indent/dme-fac-heads/dme-fac-heads.component';
import { ConsolidatedIndentDmeComponent } from './component/DME/indent/consolidated-indent-dme/consolidated-indent-dme.component';
import { DmeFacAddIndentComponent } from './component/DME/indent/dme-fac-add-indent/dme-fac-add-indent.component';
import { DmeFacIndentReportComponent } from './component/DME/indent/dme-fac-indent-report/dme-fac-indent-report.component';
import { CmcDetailComponent } from './component/DME/reports/cmc-detail/cmc-detail.component';
import { FacilityComplainStoreComponent } from './component/DME/complain/facility-complain-store/facility-complain-store.component';
import { ChangePasswordComponent } from './component/DME/orders/change-password/change-password.component';
import { ProgressCategoryComponent } from './component/DME/stock/progress-category/progress-category.component';
import { FacilityReceiptsComponent } from './component/DME/stock/facility-receipts/facility-receipts.component';
import { NodalInformationComponent } from './component/DME/stock/nodal-information/nodal-information.component';
import { MasFileNoComponent } from './component/DME/orders/mas-file-no/mas-file-no.component';
import { NodalProgressComponent } from './component/DME/stock/nodal-progress/nodal-progress.component';
import { EligibleReportComponent } from './Reports/eligible-report/eligible-report.component';
import { PoReallocationComponent } from './component/DME/orders/po-reallocation/po-reallocation.component';
import { PoAmendmentComponent } from './component/DME/orders/po-amendment/po-amendment.component';
import { WithheldReleaseComponent } from './component/DME/orders/withheld-release/withheld-release.component';
import { PaymentLetterComponent } from './component/DME/orders/payment-letter/payment-letter.component';
import { MainEquipmentMappedReportComponent } from './Reports/main-equipment-mapped-report/main-equipment-mapped-report.component';
import { ComplaintStatusComponent } from './component/DME/complain/complaint-status/complaint-status.component';
import { ComplaintStatusEditComponent } from './component/DME/complain/complaint-status-edit/complaint-status-edit.component';
import { ComplaintStatusFacilityComponent } from './component/DME/complain/complaint-status-facility/complaint-status-facility.component';
import { ComplaintStatusFacilityEditComponent } from './component/DME/complain/complaint-status-facility-edit/complaint-status-facility-edit.component';
import { ComplainCmhoComponent } from './component/DME/complain/complain-cmho/complain-cmho.component';
import { TenderCoverAComponent } from './component/BME/tender-cover-a/tender-cover-a.component';
import { TenderCoverAObClaimComponent } from './tender-cover-aob-claim/tender-cover-aob-claim.component';
import { TenderItemsPriceGEMComponent } from './component/BME/tender-items-price-gem/tender-items-price-gem.component';
import { TenderDetailsPriceEntryGEMComponent } from './component/BME/tender-details-price-entry-gem/tender-details-price-entry-gem.component';
import { ConsolidatedIndentPOCellComponent } from './component/BME/consolidated-indent-pocell/consolidated-indent-pocell.component';
import { MasFacilityUsersComponent } from './component/PO-Cell/mas-facility-users/mas-facility-users.component';
import { ProgramMasterComponent } from './component/PO-Cell/program-master/program-master.component';
import { EMSPODashboardComponent } from './component/PO-Cell/emspodashboard/emspodashboard.component';
import { EMSNEWPOComponent } from './component/PO-Cell/emsnewpo/emsnewpo.component';
import { RCExtendComponent } from './component/PO-Cell/rcextend/rcextend.component';
import { AppliedPoExtensionComponent } from './component/PO-Cell/applied-po-extension/applied-po-extension.component';
import { ConsolidatedIndentDHSPOComponent } from './component/PO-Cell/consolidated-indent-dhs-po/consolidated-indent-dhs-po.component';
import { IndentWiseItemRemarksComponent } from './component/PO-Cell/indent-wise-item-remarks/indent-wise-item-remarks.component';
import { IndentEditDHSPOComponent } from './component/PO-Cell/indent-edit-dhs-po/indent-edit-dhs-po.component';
import { DHSindentAddBulkConsigneePOComponent } from './component/PO-Cell/dhsindent-add-bulk-consignee-po/dhsindent-add-bulk-consignee-po.component';
import { TermsconditionsComponent } from './component/PO-Cell/termsconditions/termsconditions.component';
import { RDLCTenderSummaryComponent } from './component/PO-Cell/rdlctender-summary/rdlctender-summary.component';
import { EditReceivedAndInstallationDateComponent } from './GM Finance/edit-received-and-installation-date/edit-received-and-installation-date.component';
import { SuppliersComponent } from './GM Finance/suppliers/suppliers.component';
import { SupplierBankAccountsComponent } from './GM Finance/supplier-bank-accounts/supplier-bank-accounts.component';
import { SupplierGSTentryComponent } from './GM Finance/supplier-gstentry/supplier-gstentry.component';
import { CgmscBankAccountsComponent } from './GM Finance/cgmsc-bank-accounts/cgmsc-bank-accounts.component';
import { NewFundMasterComponent } from './GM Finance/new-fund-master/new-fund-master.component';
import { FundMapComponent } from './GM Finance/fund-map/fund-map.component';
import { BudgentEntryComponent } from './GM Finance/budgent-entry/budgent-entry.component';
import { BudgetDetailsProvisionalComponent } from './GM Finance/budget-details-provisional/budget-details-provisional.component';
import { IndentRCPOTenderStatusComponent } from './Reports/indent-rc-po-tender-status/indent-rc-po-tender-status.component';
import { UnpaidPOSComponent } from './Reports/unpaid-pos/unpaid-pos.component';
import { POReportGMFComponent } from './Reports/poreport-gmf/poreport-gmf.component';
import { InvoiceDetailComponent } from './Reports/invoice-detail/invoice-detail.component';
import { TDSdataReportComponent } from './Reports/tdsdata-report/tdsdata-report.component';
import { PaymentsCPReport20perComponent } from './Reports/payments-cpreport20per/payments-cpreport20per.component';
import { FileMRCDashboardFINFileComponent } from './GM Finance/file-mrcdashboard-finfile/file-mrcdashboard-finfile.component';
import { SanctionComponent } from './GM Finance/sanction/sanction.component';
import { EmdRefundTenderwiseComponent } from './component/Finance/emd-refund-tenderwise/emd-refund-tenderwise.component';
import { SdReleaseFinanceComponent } from './component/Finance/sd-release-finance/sd-release-finance.component';
import { AddSubMenuComponent } from './component/IT/add-sub-menu/add-sub-menu.component';
import { EmdFileApprovalComponent } from './component/emd-file-approval/emd-file-approval.component';
import { LogoVerifiedHoComponent } from './component/logo-verified-ho/logo-verified-ho.component';
import { SiteNotReadyUploadComponent } from './component/site-not-ready-upload/site-not-ready-upload.component';
import { InvoicesBySoComponent } from './component/invoices-by-so/invoices-by-so.component';
import { PoReportNewComponent } from './component/po-report-new/po-report-new.component';
import { PoDetailsRdlcComponent } from './component/po-details-rdlc/po-details-rdlc.component';
import { PendingInstallDrilldownComponent } from './component/pending-install-drilldown/pending-install-drilldown.component';
import { AddRoleInScreenComponent } from './component/IT/add-role-in-screen/add-role-in-screen.component';
import { DeleteMenuComponent } from './component/IT/delete-menu/delete-menu.component';
import { MasterSupplierDashComponent } from './component/Tender Cell/master-supplier-dash/master-supplier-dash.component';
import { ConsolidatedIndentCGMSCComponent } from './component/Tender Cell/consolidated-indent-cgmsc/consolidated-indent-cgmsc.component';
import { TenderCoverAObClaimAfterComponent } from './component/Tender Cell/tender-cover-aob-claim-after/tender-cover-aob-claim-after.component';
import { PerformanceCertificateComponent } from './Performance/performance-certificate/performance-certificate.component';
import { Performace20ConsigneeComponent } from './Performance/performace20-consignee/performace20-consignee.component';
import { PerformanceCertificateFinComponent } from './Performance/performance-certificate-fin/performance-certificate-fin.component';
import { EmisPerf20RdlcComponent } from './Performance/emis-perf20-rdlc/emis-perf20-rdlc.component';
import { Payment20ChequePrepComponent } from './Performance/payment20-cheque-prep/payment20-cheque-prep.component';
import { SanctionNotesheetComponent } from './Performance/sanction-notesheet/sanction-notesheet.component';
import { StoreHomeComponent } from './component/Master/store-home/store-home.component';
import { DhsAddFacilityComponent } from './component/Master/dhs-add-facility/dhs-add-facility.component';
import { DhsFacilityUsersLocationsComponent } from './component/Master/dhs-facility-users-locations/dhs-facility-users-locations.component';
import { HealthFacilityDetailsComponent } from './component/Master/health-facility-details/health-facility-details.component';
import { ItemSpecificationComponent } from './component/Master/item-specification/item-specification.component';
import { MasFacilityUsersLocationsComponent } from './component/Master/mas-facility-users-locations/mas-facility-users-locations.component';
import { MasterSupplierAddComponent } from './component/Master/master-supplier-add/master-supplier-add.component';
import { TenderCoverAitemsComponent } from './component/BME/tender-cover-aitems/tender-cover-aitems.component';
import { CoverAitemsReportsComponent } from './component/BME/cover-aitems-reports/cover-aitems-reports.component';
  import { IndentPoTenderStatusComponent } from './Reports/indent-po-tender-status/indent-po-tender-status.component';
import { IndentPoTenderStatusSummaryComponent } from './Reports/indent-po-tender-status-summary/indent-po-tender-status-summary.component';
import { IndentPoTenderStatusDrilldownComponent } from './Reports/indent-po-tender-status-drilldown/indent-po-tender-status-drilldown.component';
import { IndentPoTenderSummaryComponent } from './Reports/indent-po-tender-summary/indent-po-tender-summary.component';
import { IndentPoTenderSummaryDrilldownComponent } from './Reports/indent-po-tender-summary-drilldown/indent-po-tender-summary-drilldown.component';
import { CmhoPoSummaryComponent } from './Reports/cmho-po-summary/cmho-po-summary.component';
import { CmhoPoSummaryDrilldownComponent } from './Reports/cmho-po-summary-drilldown/cmho-po-summary-drilldown.component';
import { PoSummaryDirectorateComponent } from './Reports/po-summary-directorate/po-summary-directorate.component';
import { PoSummaryDirectorateDrilldownComponent } from './Reports/po-summary-directorate-drilldown/po-summary-directorate-drilldown.component';
import { PoSummaryConsigneeHoComponent } from './Reports/po-summary-consignee-ho/po-summary-consignee-ho.component';
import { TenderLiveStatusComponent } from './Reports/tender-live-status/tender-live-status.component';
import { TenderLiveStatusDrilldownComponent } from './Reports/tender-live-status-drilldown/tender-live-status-drilldown.component';
import { BalanceStatusDhsComponent } from './Reports/balance-status-dhs/balance-status-dhs.component';
import { BalanceStatusPocellComponent } from './Reports/balance-status-pocell/balance-status-pocell.component';
import { OpeningStockSummaryComponent } from './Reports/opening-stock-summary/opening-stock-summary.component';
import { OpeningStockDrilldownComponent } from './Reports/opening-stock-drilldown/opening-stock-drilldown.component';
import { PaymentsCpreportIgmComponent } from './Reports/payments-cpreport-igm/payments-cpreport-igm.component';
import { PopaidReportIgmComponent } from './Reports/popaid-report-igm/popaid-report-igm.component';
import { EmdDepositeReportComponent } from './Reports/emd-deposite-report/emd-deposite-report.component';
import { EquipmentTagReportComponent } from './Reports/equipment-tag-report/equipment-tag-report.component';
import { TenderWisePoDetailsComponent } from './Reports/tender-wise-po-details/tender-wise-po-details.component';
import { TenderStatusItemWiseComponent } from './Reports/tender-status-item-wise/tender-status-item-wise.component';
import { DispatchDetailComponent } from './Reports/dispatch-detail/dispatch-detail.component';
import { PendingPoSupplierWiseComponent } from './Reports/pending-po-supplier-wise/pending-po-supplier-wise.component';
import { ReceiptPendingCmhoComponent } from './Reports/receipt-pending-cmho/receipt-pending-cmho.component';
import { ReportIndentPoDetailsComponent } from './Reports/report-indent-po-details/report-indent-po-details.component';
import { EelSuggestionReportComponent } from './Reports/eel-suggestion-report/eel-suggestion-report.component';
import { FacStockCovidItemsBmeComponent } from './Reports/fac-stock-covid-items-bme/fac-stock-covid-items-bme.component';
import { BalanceSupplierwiseComponent } from './Reports/balance-supplierwise/balance-supplierwise.component';
import { IndentReportPocellComponent } from './Reports/indent-report-pocell/indent-report-pocell.component';
import { PendingInstallDrilldownDhsComponent } from './Reports/pending-install-drilldown-dhs/pending-install-drilldown-dhs.component';
import { PendingInstallDrilldownPocellComponent } from './Reports/pending-install-drilldown-pocell/pending-install-drilldown-pocell.component';
import { RdlcDhsPendingComponent } from './Reports/rdlc-dhs-pending/rdlc-dhs-pending.component';
import { CoverAItemsReportsComponent } from './Reports/cover-a-items-reports/cover-a-items-reports.component';
import { PaymentsCpreportComponent } from './Reports/payments-cpreport/payments-cpreport.component';
import { PoReceiptSummaryComponent } from './Reports/po-receipt-summary/po-receipt-summary.component';
import { SanctionsRdlcComponent } from './Reports/sanctions-rdlc/sanctions-rdlc.component';
import { BalanceStatusSupplierComponent } from './Reports/balance-status-supplier/balance-status-supplier.component';
import { ItemWiseDetailComponent } from './Reports/item-wise-detail/item-wise-detail.component';
import { ItemWiseDetailPOCellComponent as ReportsItemWiseDetailPOCellComponent } from './Reports/item-wise-detail-pocell/item-wise-detail-pocell.component';
import { ItemWiseDetailPOQtyComponent } from './Reports/item-wise-detail-poqty/item-wise-detail-poqty.component';
import { ItemWiseDetailPOQtyPOCellComponent } from './Reports/item-wise-detail-poqty-pocell/item-wise-detail-poqty-pocell.component';
import { ComplainReportBmeComponent } from './Reports/complain-report-bme/complain-report-bme.component';
import { DistrictWisePoDetailComponent } from './Reports/district-wise-po-detail/district-wise-po-detail.component';
import { EmdRefundReportComponent } from './Reports/emd-refund-report/emd-refund-report.component';
import { PoPaidReportComponent } from './Reports/po-paid-report/po-paid-report.component';
import { PaymentReportComponent } from './Reports/payment-report/payment-report.component';
import { TenderStatusComponent } from './Reports/tender-status/tender-status.component';
import { PoSummaryComponent } from './Reports/po-summary/po-summary.component';
import { PoSummaryDrilldownQtyComponent } from './Reports/po-summary-drilldown-qty/po-summary-drilldown-qty.component';
import { PoSummaryDrilldownQtyPowiseComponent } from './Reports/po-summary-drilldown-qty-powise/po-summary-drilldown-qty-powise.component';
import { PoSummaryDrilldownQtyReagentComponent } from './Reports/po-summary-drilldown-qty-reagent/po-summary-drilldown-qty-reagent.component';
import { IndentPoSummaryDirwiseComponent } from './Reports/indent-po-summary-dirwise/indent-po-summary-dirwise.component';
import { MasFacilityUsersLocationsmasterComponent } from './component/mas-facility-users-locationsmaster/mas-facility-users-locationsmaster.component';
// import { POSupplyHOComponent } from './component/PO-Cell/po-supply-ho/po-supply-ho.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'supplier-login', component: SupplierLoginComponent },
  { path: 'MasFacilityUsersLocationsmaster', component: MasFacilityUsersLocationsmasterComponent},
  { path: 'LoginEmsSup', redirectTo: 'supplier-login', pathMatch: 'full' },
  {
    path: 'masters/particular-supplier-add',
    component: ParticularSupplierAddComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'ParticularSupplierAdd',
    redirectTo: 'masters/particular-supplier-add',
    pathMatch: 'full',
  },
  {
    path: 'masters/supplier-gst-entry',
    component: SupplierGstEntryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'SupplierGSTentry1',
    redirectTo: 'masters/supplier-gst-entry',
    pathMatch: 'full',
  },
  {
    path: 'orders/po-supply',
    component: PoSupplyComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'po_supply',
    redirectTo: 'orders/po-supply',
    pathMatch: 'full',
  },
  {
    path: 'orders/po-supply-sd-detail',
    component: SupplierPoSdDetailComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'SDdetailSupplier',
    redirectTo: 'orders/po-supply-sd-detail',
    pathMatch: 'full',
  },
  {
    path: 'orders/po-supply-apply-extension',
    component: SupplierPoApplyExtensionComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'ApplyForExtension',
    redirectTo: 'orders/po-supply-apply-extension',
    pathMatch: 'full',
  },
  {
    path: 'transaction/po-supply-dispatch',
    component: PoSupplyDispatchComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'transaction/po-supply-dispatch-edit',
    component: PoSupplyDispatchEditComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'transaction/po-supply-dispatch-entry',
    component: PoSupplyDispatchEntryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'po_supply_details',
    redirectTo: 'transaction/po-supply-dispatch-entry',
    pathMatch: 'full',
  },
  {
    path: 'transaction/po-supply-dispatch-report',
    component: PoSupplyDispatchReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP', 'AUPO'] },
  },
  {
    path: 'po_supplyDispatch',
    redirectTo: 'transaction/po-supply-dispatch',
    pathMatch: 'full',
  },
  {
    path: 'po_supply_edit',
    redirectTo: 'transaction/po-supply-dispatch-edit',
    pathMatch: 'full',
  },
  {
    path: 'rptDispatchDetails',
    redirectTo: 'transaction/po-supply-dispatch-report',
    pathMatch: 'full',
  },
  {
    path: 'transaction/po-supply-receipt',
    component: PoSupplyReceiptComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'transaction/po-supply-receipt-entry',
    component: PoSupplyReceiptEntryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'Facilitypo_supply_ReceiptSUP',
    redirectTo: 'transaction/po-supply-receipt',
    pathMatch: 'full',
  },

  {
    path: 'transaction/po-supply-installation-report',
    component: PoSupplyInstallationReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'Facility_InstallationReportSUP',
    redirectTo: 'transaction/po-supply-installation-report',
    pathMatch: 'full',
  },
  {
    path: 'transaction/po-supply-installation-print',
    component: PoSupplyInstallationPrintComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'transaction/po-supply-po-print',
    component: PoSupplyPoPrintComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'InstalationReport',
    redirectTo: 'transaction/po-supply-installation-print',
    pathMatch: 'full',
  },
  {
    path: 'rdlcPoReport',
    redirectTo: 'transaction/po-supply-po-print',
    pathMatch: 'full',
  },
  {
    path: 'contracts/rc-detail-report-supplier',
    component: SupplierRcDetailReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'RCDetailReportForSupplier',
    redirectTo: 'contracts/rc-detail-report-supplier',
    pathMatch: 'full',
  },
  {
    path: 'contracts/accepted-report-supplier',
    component: SupplierAcceptedReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'AcceptedReoprtSupplier',
    redirectTo: 'contracts/accepted-report-supplier',
    pathMatch: 'full',
  },
  {
    path: 'complain/receipt-complain-supplier',
    component: SupplierReceiptComplainComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'ReceiptComplainSupplier',
    redirectTo: 'complain/receipt-complain-supplier',
    pathMatch: 'full',
  },
  {
    path: 'emd-refund/emd-deposit',
    component: SupplierEmdDepositComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'EMDdeposite',
    redirectTo: 'emd-refund/emd-deposit',
    pathMatch: 'full',
  },
  {
    path: 'reports/supplier-payment-report',
    component: SupplierPaymentReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'PaymentReport',
    redirectTo: 'reports/payment-report',
    pathMatch: 'full',
  },
  {
    path: 'reports/sanction-report',
    component: SupplierSanctionReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'SanctionsRDLC',
    redirectTo: 'reports/sanctions-rdlc',
    pathMatch: 'full',
  },
  {
    path: 'Payment/SanctionsRDLC',
    redirectTo: 'reports/sanctions-rdlc',
    pathMatch: 'full',
  },
  {
    path: 'reports/pending-receipt-installation',
    component: SupplierPendingReceiptInstallationComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'reports/pending-install-drill-down',
    component: SupplierPendingInstallDrillDownComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SUP'] },
  },
  {
    path: 'BalanceStatussupplier',
    redirectTo: 'reports/pending-receipt-installation',
    pathMatch: 'full',
  },
  {
    path: 'PendingInstallDrillDownsupplier',
    redirectTo: 'reports/pending-install-drill-down',
    pathMatch: 'full',
  },
  { path: 'Registration', component: Registration },
  { path: 'otp', component: OtpComponent },
  // {path:'GenerationFileNonasti',component:GenerationFileNonastiComponent},//
  // {path:'FileMRCDashbord',component:FileMRCDashbordComponent},//
  {
    path: 'InstallationDetails',
    component: InstallationDetailsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO','AUGMF','AU','DME','AUPO','TPOT','BME','AD'], variant: 'bme' },
  },
  {
    path: 'InstallationDetailsBME',
    component: InstallationDetailsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO','AUGMF','AU','DME','AUPO','TPOT','BME','AD'], variant: 'bme' },
  },
  {
    path: 'InstallationDetailsDEO',
    component: InstallationDetailsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO','AUGMF','AU','DME','AUPO','TPOT','BME','AD'], variant: 'deo' },
  },
  {
    path: 'InstallationDetailsDEONew',
    component: InstallationDetailsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO','AUGMF','AU','DME','AUPO','TPOT','BME','AD'], variant: 'deonew' },
  },
  {
    path: 'InstallationDetailsFINCTRL',
    component: InstallationDetailsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO','AUGMF','AU','DME','AUPO','TPOT','BME','AD'], variant: 'finctrl' },
  },
  {
    path: 'InstallationDetailsGMT',
    component: InstallationDetailsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO','AUGMF','AU','DME','AUPO','TPOT','BME','AD'], variant: 'gmt' },
  },
  // {path:'ExtensionHODetail',component:ExtensionHODetailComponent},//
  { path: 'ExtensionHOEntry', component: ExtensionHOEntryComponent },
  // {path:'ItemWiseDetailPOCell',component:ItemWiseDetailPOCellComponent},//
  {
    path: 'ItemWiseDetailPOCellByPOid',
    component: ItemWiseDetailPOCellByPOidComponent,
  },
  // {path:'IndentPOSummaryDirwise',component:IndentPOSummaryDirwiseComponent},//
  // {path:'DistrictWisePODetail',component:DistrictWisePODetailComponent},//
  {path:'TenderCoverAitems',component:TenderCoverAitemsComponent},
  {
    path: 'POSummaryDrillDwnQtyPOWise',
    component: POSummaryDrillDwnQtyPOWiseComponent,
  },
  { path: 'POSummaryDrillDwnQty', component: POSummaryDrillDwnQtyComponent },
  { path: 'EMSNEWPO', component: EMSNEWPOComponent },
  {
    path: 'IndentEditDHSPO',
    component: IndentEditDHSPOComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUPO', 'TPOT', 'AD', 'AU'] },
  },
  { path: 'SupplierBankAccounts', component: SupplierBankAccountsComponent },
  { path: 'SupplierGSTentry', component: SupplierGSTentryComponent },
  { path: 'BudgetDetailsProvisional', component: BudgetDetailsProvisionalComponent },
  { path: 'Sanction', component: SanctionComponent },
  { path: 'CoverAitemsReports', component: CoverAitemsReportsComponent },

  {
    path: 'TenderStatusUpdate',
    component: TenderStatusUpdateComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },
  {
    path: 'AddRTenderItems',
    component: AddRTenderItemsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },

  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [RouteGuardService],
  },
  // { path: 'welcome', component: HomeComponent },
  {
    path: 'welcome',
    component: LandingPageComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: [
        'AD',
        'AU',
        'AUPO',
        'AUGMF',
        'AAO',
        'AYUSH',
        'CGMSC',
        'CON',
        'DHS',
        'DKS',
        'DME',
        'DMT',
        'FDA',
        'FU',
        'GMF',
        'IT',
        'Principal',
        'SCI',
        'SUP',
        'TPO',
        'TPOT',
      ],
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: [
        'AD',
        'AU',
        'AUPO',
        'AAO',
        'AYUSH',
        'CGMSC',
        'CON',
        'DHS',
        'DKS',
        'DME',
        'DMT',
        'FDA',
        'FU',
        'GMF',
        'IT',
        'Principal',
        'SCI',
        'SUP',
        'TPO',
        'TPOT',
      ],
    },
  },
  // { path: 'welcome', component: HomeComponent, canActivate: [RouteGuardService],data: { allowedRoles: ['Suppliers','SEC1','DHS','CME','DME1','Collector','Warehouse','SE','HO_Infra','Division','DM PO','SSO','Logi Cell']} },
  {
    path: 'GenerationFileNonasti',
    component: GenerationFileNonastiComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO'] },
  },
  {
    path: 'MasterSupplierDash',
    component: MasterSupplierDashComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPOT'] },
  },
  {
    path: 'FileMRCDashbord',
    component: FileMRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO'], variant: 'dm' },
  },
  {
    path: 'FileMRCDashboardFIN',
    component: FileMRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD','FIN'], variant: 'fin' },
  },
  {
    path: 'FileMRCDashboardGM',
    component: FileMRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['GM','AD'], variant: 'gm' },
  },
  {
    path: 'FileMRCDashboardIGM',
    component: FileMRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['IGM','AD'], variant: 'igm' },
  },
  {
    path: 'FileMRCDashboardFINFile',
    component: FileMRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['FIN','AD'], variant: 'fin-file' },
  },
  {
    path: 'FileMRCDashboardFINFile_Ver1',
    component: FileMRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['FIN','AD'], variant: 'fin-file-v1' },
  },
  {
    path: 'FileMRCDashboardGMNew',
    component: FileMRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['GM','AD'], variant: 'gm-new' },
  },
  {
    path: 'FileMRCDashboardIGMMov',
    component: FileMRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['IGM','AD'], variant: 'igm-mov' },
  },
  {
    path: 'FileMRCDashboardIGMMovAudit',
    component: FileMRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['IGM','AD'], variant: 'igm-mov-audit' },
  },
  {
    path: 'FileMRCDashboardIGMMovBME',
    component: FileMRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['BME','AD'], variant: 'igm-mov-bme' },
  },

  {
    // path: 'ExtensionHODetail',
    path: 'POSupplyHO',
    component: ExtensionHODetailComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO','AUPO'] },
  },

  {
    path: 'ItemWiseDetailPOCell',
    component: ItemWiseDetailPOCellComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO'] },
  },

  {
    path: 'IndentPOSummaryDirwise',
    component: IndentPOSummaryDirwiseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO'] },
  },

  {
    path: 'DistrictWisePODetail',
    component: DistrictWisePODetailComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO','AUGMF'] },
  },
  // BME
  {
    path: 'MastterSupplierDash',
    component: MastterSupplierDashComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },
  {
    path: 'ItemsBME',
    component: ItemsBMEComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME', 'AUPO'] },
  },
  {
    path: 'MapitemsEithType',
    component: MapitemsEithTypeComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },
  {
    path: 'MapitemswithTypeUpdate',
    component: MapitemswithTypeUpdateComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },
  {
    path: 'MapitemswithMainitemTypeRepo',
    component: MapitemswithMainitemTypeRepoComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },
  {
    path: 'EMSRCDashbord',
    component: EMSRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },
  {
    path: 'EMSNEWRC',
    component: EMSNEWRCComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },
  {
    path: 'PlanaTenderD',
    component: PlanaTenderDComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME','AUPO','TPOT'] },
  },
  {
    path: 'TenderCoverAObClaimAfter',
    component: TenderCoverAObClaimAfterComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPOT'] },
  },
  {
    path: 'TenderCoverA',
    component: TenderCoverAComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU','TPOT'] },
  },
  {
    path: 'TenderCoverAObClaim',
    component: TenderCoverAObClaimComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU','TPOT'] },
  },
  {
    path: 'TenderItemsPriceGEM',
    component: TenderItemsPriceGEMComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU'] },
  },
  {
    path: 'TenderDetailsPriceEntryGEM',
    component: TenderDetailsPriceEntryGEMComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU'] },
  },
  {
    path: 'ConsolidatedIndentPOCell',
    component: ConsolidatedIndentPOCellComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU','AUPO','TPOT'] },
  },
  // POCell
  // {path:'MasFacilityUsers',component:MasFacilityUsersComponent, canActivate:[RouteGuardService], data:{ allowedRoles:['AU'] }},
  {
    path: 'MasFacilityUsers',
    component: MasFacilityUsersComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['AUPO'],
      // allowedUsersid: [2307]
      // allowedUsers: ['rahul_au', 'amit_au']
    },
  },
  {
    path: 'DHSindentAddBulkConsigneePO',
    component: DHSindentAddBulkConsigneePOComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['AUPO'],
      // allowedUsersid: [2307]
      // allowedUsers: ['rahul_au', 'amit_au']
    },
  },
  {
    path: 'Termsconditions',
    component: TermsconditionsComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['AUPO'],
      // allowedUsersid: [2307]
      // allowedUsers: ['rahul_au', 'amit_au']
    },
  },
  {
    path: 'RDLCTenderSummary',
    component: RDLCTenderSummaryComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['AUPO'],
      // allowedUsersid: [2307]
      // allowedUsers: ['rahul_au', 'amit_au']
    },
  },
  {
    path: 'ProgramMaster',
    component: ProgramMasterComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['AUPO'],
      // allowedUsersid: [2307]
      // allowedUsers: ['rahul_au', 'amit_au']
    },
  },
  {
    path: 'RCExtend',
    component: RCExtendComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['AUPO'],
      // allowedUsersid: [2307]
      // allowedUsers: ['rahul_au', 'amit_au']
    },
  },
  {
    path: 'AppliedPoExtension',
    component: AppliedPoExtensionComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['AUPO'],
      // allowedUsersid: [2307]
      // allowedUsers: ['rahul_au', 'amit_au']
    },
  },
  {
    path: 'EMSPODashboard',
    component: EMSPODashboardComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['AUPO'],
      // allowedUsersid: [2307]
      // allowedUsers: ['rahul_au', 'amit_au']
    },
  },
  {
    path: 'ConsolidatedIndentDHSPO',
    component: ConsolidatedIndentDHSPOComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['AUPO','TPOT'],
      // allowedUsersid: [2307]
      // allowedUsers: ['rahul_au', 'amit_au']
    },
  },
  {
    path: 'ConsolidatedIndentCGMSC',
    component: ConsolidatedIndentCGMSCComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['TPOT'],
    },
  },
  {
    path: 'IndentWiseItemRemarks',
    component: IndentWiseItemRemarksComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: ['AUPO'],
      // allowedUsersid: [2307]
      // allowedUsers: ['rahul_au', 'amit_au']
    },
  },
  // MD logins
  {
    path: 'RCDetailReport',
    component: RCDetailReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME','AUPO'] },
  },
  {
    path: 'AcceptedReort',
    component: AcceptedReortComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD','AUPO'] },
  },
  {
    path: 'IndentFromFacilities',
    component: IndentFromFacilitiesComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'ComplainReportBME',
    component: ComplainReportBMEComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'POPaidReport',
    component: POPaidReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'FPOPaidReport',
    component: POPaidReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'ChequeWisePaymentReport',
    component: ChequeWisePaymentRComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'POSummaryReport',
    component: POSummaryReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'TendersStatus',
    component: TendersStatusComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'PORecdsummary',
    component: PORecdsummaryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'TenterStatusItemWise',
    component: TenterStatusItemWiseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'POSummaryDrillDwnQtyReagent',
    component: POSummaryDrillDwnQtyReagentComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },

  // EMS sidebar-aligned routes (Masters / Stock / Orders / …)
  {
    path: 'masters/store-home',
    component: StoreHomeComponent,
    canActivate: [RouteGuardService],
    data: {
      allowedRoles: [
        'AD',
        'AU',
        'AUPO',
        'AUGMF',
        'AAO',
        'AYUSH',
        'CGMSC',
        'CON',
        'DHS',
        'DKS',
        'DME',
        'DMT',
        'FDA',
        'FU',
        'GMF',
        'IT',
        'Principal',
        'PRINCIPAL',
        'SCI',
        'SUP',
        'TPO',
        'TPOT',
        'BME',
      ],
    },
  },
  {
    path: 'masters/consignee-information',
    component: ConsigeeInformationComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'FU', 'PRINCIPAL', 'FDA'] },
  },
  {
    path: 'masters/report-specification',
    component: ReportSpecificationComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'masters/cme-eel-suggestion',
    component: CmeEelSuggestionComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'masters/supplier',
    component: MastterSupplierDashComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME','TPOT'] },
  },
  {
    path: 'masters/items',
    component: ItemsBMEComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME','TPOT'] },
  },
  {
    path: 'masters/map-items',
    component: MapitemsEithTypeComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME','TPOT'] },
  },
  {
    path: 'masters/map-items-update',
    component: MapitemswithTypeUpdateComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME','TPOT'] },
  },
  {
    path: 'masters/map-items-report',
    component: MapitemswithMainitemTypeRepoComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME','TPOT'] },
  },
  {
    path: 'stock/covid-stock-report',
    component: StockReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'stock/opening-stock-entry',
    component: OpeningStockEntryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'stock/new-opening-stock-entry',
    component: NewOpeningStockEntryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'stock/progress-category',
    component: ProgressCategoryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'stock/facility-receipts',
    component: FacilityReceiptsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'FU', 'PRINCIPAL', 'FDA'] },
  },
  {
    path: 'stock/nodal-information',
    component: NodalInformationComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'orders/mas-file-no',
    component: MasFileNoComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'orders/po-reallocation',
    component: PoReallocationComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'orders/po-amendment',
    component: PoAmendmentComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'orders/withheld-release',
    component: WithheldReleaseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'payment-letter',
    component: PaymentLetterComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'stock/nodal-progress',
    component: NodalProgressComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'FU', 'PRINCIPAL', 'FDA'] },
  },
  {
    path: 'reports/eligible-report',
    component: EligibleReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/main-equipment-mapped',
    component: MainEquipmentMappedReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'orders/purchase-order-dashboard',
    component: PurchaseOrderDashboardComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'AUPO'] },
  },
  {
    path: 'orders/purchase-order-receipts',
    component: PurchaseOrderReceiptsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'orders/po-receipt-entry',
    component: PoReceiptEntryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'orders/po-installation-report',
    component: PoInstallationReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'orders/po-print',
    component: PoPrintComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'AUPO'] },
  },
  {
    path: 'contracts/dashboard',
    component: EMSRCDashbordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME','AUPO'] },
  },
  {
    path: 'contracts/new-rc',
    component: EMSNEWRCComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME','AUPO'] },
  },
  {
    path: 'contracts/rc-detail-report',
    component: RCDetailReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME','AU', 'TPO', 'CMHO', 'Store', 'FU', 'Facility', 'HealthFacility', 'DHS', 'AYUSH'] },
  },
  {
    path: 'tender/plan',
    component: PlanaTenderDComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },
  {
    path: 'tender/evaluation',
    component: TenderStatusUpdateComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },
  {
    path: 'tender/claim-object',
    component: AddRTenderItemsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AU', 'DME'] },
  },
  {
    path: 'tender/gem-price-acceptance',
    component: TendersStatusComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'indents/budget-heads',
    component: DmeFacHeadsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'indents/annual-indent',
    component: ConsolidatedIndentDmeComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'indents/annual-indent-items',
    component: DmeFacAddIndentComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'indents/annual-indent-report',
    component: DmeFacIndentReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'DMEFACADDIndent',
    redirectTo: 'indents/annual-indent-items',
    pathMatch: 'full',
  },
  {
    path: 'Indent_ReportDME_MCwise',
    redirectTo: 'indents/annual-indent-report',
    pathMatch: 'full',
  },
  {
    path: 'rdlDMEAIReport',
    redirectTo: 'indents/annual-indent-report',
    pathMatch: 'full',
  },
  {
    path: 'indents/from-facilities',
    component: IndentFromFacilitiesComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'finance/year-wise-po-abstract',
    component: FacilityAuthPOValuePOCellComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME','AUPO','AUGMF'] },
  },
  {
    path: 'finance/po-wise-payment',
    component: POPaidReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME','AUPO','AUGMF'] },
  },
  {
    path: 'finance/cheque-wise-payment',
    component: ChequeWisePaymentRComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME','AUGMF'] },
  },
  {
    path: 'complain/facility-store',
    component: FacilityComplainStoreComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'FU', 'PRINCIPAL', 'FDA'] },
  },
  {
    path: 'complain/complaint-status',
    component: ComplaintStatusComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'FU', 'PRINCIPAL', 'FDA'] },
  },
  {
    path: 'complain/complaint-status-edit/:compId',
    component: ComplaintStatusEditComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'FU', 'PRINCIPAL', 'FDA'] },
  },
  {
    path: 'complain/complaint-status-facility',
    component: ComplaintStatusFacilityComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'FU', 'PRINCIPAL', 'FDA'] },
  },
  {
    path: 'complain/complaint-status-facility-edit/:compId',
    component: ComplaintStatusFacilityEditComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'FU', 'PRINCIPAL', 'FDA'] },
  },
  {
    path: 'complain/complain-cmho',
    component: ComplainCmhoComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'FU', 'PRINCIPAL', 'FDA'] },
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME', 'AUGMF', 'AU', 'TPO', 'AUPO', 'FU', 'PRINCIPAL', 'FDA'] },
  },
  {
    path: 'ChangePasswordForcefully',
    redirectTo: 'change-password',
  },
  {
    path: 'ForceChangePWD',
    redirectTo: 'change-password',
  },
  {
    path: 'complain/status',
    redirectTo: 'complain/complaint-status',
  },
  {
    path: 'ComplaintStatus',
    redirectTo: 'complain/complaint-status',
  },
  {
    path: 'ComplaintStatusFacility',
    redirectTo: 'complain/complaint-status-facility',
  },
  {
    path: 'ComplainCMHO',
    redirectTo: 'complain/complain-cmho',
  },
  {
    path: 'complain/report',
    component: ComplainReportBMEComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'reports/cmc-detail',
    component: CmcDetailComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'reports/eel-specification',
    component: ReportSpecificationComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME'] },
  },
  {
    path: 'reports/po-summary',
    component: POSummaryReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'reports/po-wise-payment',
    component: POPaidReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'reports/tenders-status',
    component: TendersStatusComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME','AUGMF'] },
  },
  {
    path: 'reports/po-receipts-summary',
    component: PORecdsummaryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'reports/tender-item-status',
    component: TenterStatusItemWiseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'reports/reagent-po',
    component: POSummaryDrillDwnQtyReagentComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME'] },
  },
  {
    path: 'reports/cmho-po-summary',
    component: CmhoPoSummaryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME', 'CMHO', 'Store', 'FU', 'Facility', 'HealthFacility', 'DHS', 'AYUSH'] },
  },
  {
    path: 'reports/cmho-po-summary-drilldown',
    component: CmhoPoSummaryDrilldownComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME', 'CMHO', 'Store', 'FU', 'Facility', 'HealthFacility', 'DHS', 'AYUSH'] },
  },
  {
    path: 'reports/po-summary-directorate',
    component: PoSummaryDirectorateComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/po-summary-directorate-drilldown',
    component: PoSummaryDirectorateDrilldownComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/po-summary-consignee-ho',
    component: PoSummaryConsigneeHoComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/tender-live-status',
    component: TenderLiveStatusComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/tender-live-status-drilldown',
    component: TenderLiveStatusDrilldownComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/balance-status-dhs',
    component: BalanceStatusDhsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME', 'DHS', 'AYUSH'] },
  },
  {
    path: 'reports/balance-status-pocell',
    component: BalanceStatusPocellComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/opening-stock-summary',
    component: OpeningStockSummaryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/opening-stock-drilldown',
    component: OpeningStockDrilldownComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/payments-cpreport-igm',
    component: PaymentsCpreportIgmComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/popaid-report-igm',
    component: PopaidReportIgmComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/emd-deposite-report',
    component: EmdDepositeReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/equipment-tag-report',
    component: EquipmentTagReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME', 'CMHO', 'Store', 'FU', 'Facility', 'HealthFacility', 'DHS', 'AYUSH'] },
  },
  {
    path: 'reports/tender-wise-po-details',
    component: TenderWisePoDetailsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/tender-status-item-wise',
    component: TenderStatusItemWiseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/dispatch-detail',
    component: DispatchDetailComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/pending-po-supplier-wise',
    component: PendingPoSupplierWiseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/receipt-pending-cmho',
    component: ReceiptPendingCmhoComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME', 'CMHO', 'Store', 'FU', 'Facility', 'HealthFacility', 'DHS', 'AYUSH'] },
  },
  {
    path: 'reports/report-indent-po-details',
    component: ReportIndentPoDetailsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/eel-suggestion-report',
    component: EelSuggestionReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/fac-stock-covid-items-bme',
    component: FacStockCovidItemsBmeComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/balance-supplierwise',
    component: BalanceSupplierwiseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/indent-report-pocell',
    component: IndentReportPocellComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/pending-install-drilldown-dhs',
    component: PendingInstallDrilldownDhsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME', 'DHS', 'AYUSH'] },
  },
  {
    path: 'reports/pending-install-drilldown-pocell',
    component: PendingInstallDrilldownPocellComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/rdlc-dhs-pending',
    component: RdlcDhsPendingComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME', 'DHS', 'AYUSH'] },
  },
  {
    path: 'reports/cover-a-items-reports',
    component: CoverAItemsReportsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/item-wise-detail',
    component: ItemWiseDetailComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/item-wise-detail-pocell',
    component: ReportsItemWiseDetailPOCellComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/item-wise-detail-poqty',
    component: ItemWiseDetailPOQtyComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/item-wise-detail-poqty-pocell',
    component: ItemWiseDetailPOQtyPOCellComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/complain-report-bme',
    component: ComplainReportBmeComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/district-wise-po-detail',
    component: DistrictWisePoDetailComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME', 'CMHO', 'Store', 'FU', 'Facility', 'HealthFacility', 'DHS', 'AYUSH'] },
  },
  {
    path: 'reports/emd-refund-report',
    component: EmdRefundReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/po-paid-report',
    component: PoPaidReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/payment-report',
    component: PaymentReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/tender-status',
    component: TenderStatusComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/po-summary',
    component: PoSummaryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME', 'CMHO', 'Store', 'FU', 'Facility', 'HealthFacility', 'DHS', 'AYUSH'] },
  },
  {
    path: 'reports/po-summary-drilldown-qty',
    component: PoSummaryDrilldownQtyComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/po-summary-drilldown-qty-powise',
    component: PoSummaryDrilldownQtyPowiseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/po-summary-drilldown-qty-reagent',
    component: PoSummaryDrilldownQtyReagentComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/indent-po-summary-dirwise',
    component: IndentPoSummaryDirwiseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/cover-a-items-reports',
    component: CoverAItemsReportsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/payments-cpreport',
    component: PaymentsCpreportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/po-receipt-summary',
    component: PoReceiptSummaryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/sanctions-rdlc',
    component: SanctionsRdlcComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'reports/balance-status-supplier',
    component: BalanceStatusSupplierComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },

  { path: 'EMISPerf20_RDLC', redirectTo: 'performance/emis-perf20-rdlc', pathMatch: 'full' },
  { path: 'Payment20CheequPrep', redirectTo: 'performance/payment20-cheque-prep', pathMatch: 'full' },
  { path: 'SanctionNotesheet', redirectTo: 'performance/sanction-notesheet', pathMatch: 'full' },

  // Legacy flat paths → redirects (bookmarks / old links)
  { path: 'store-home', redirectTo: 'masters/store-home', pathMatch: 'full' },
  {
    path: 'consigee-information',
    redirectTo: 'masters/consignee-information',
    pathMatch: 'full',
  },
  {
    path: 'report-specification',
    redirectTo: 'masters/report-specification',
    pathMatch: 'full',
  },
  {
    path: 'report_specification',
    redirectTo: 'reports/eel-specification',
    pathMatch: 'full',
  },
  {
    path: 'Itemspecification',
    redirectTo: 'reports/eel-specification',
    pathMatch: 'full',
  },
  {
    path: 'cme-eel-suggestion',
    redirectTo: 'masters/cme-eel-suggestion',
    pathMatch: 'full',
  },
  {
    path: 'stock-report',
    redirectTo: 'stock/covid-stock-report',
    pathMatch: 'full',
  },
  {
    path: 'opening-stock-entry',
    redirectTo: 'stock/opening-stock-entry',
    pathMatch: 'full',
  },
  {
    path: 'ExistingCovidItemsDME',
    redirectTo: 'stock/opening-stock-entry',
    pathMatch: 'full',
  },
  {
    path: 'NewCovidItemDME',
    redirectTo: 'stock/new-opening-stock-entry',
    pathMatch: 'full',
  },
  {
    path: 'FACStockCMHO',
    redirectTo: 'stock/covid-stock-report',
    pathMatch: 'full',
  },
  {
    path: 'FACStockCOVIDItemsMC',
    redirectTo: 'stock/covid-stock-report',
    pathMatch: 'full',
  },
  {
    path: 'Facility_Home',
    redirectTo: 'masters/store-home',
    pathMatch: 'full',
  },
  {
    path: 'FACProgress4Cat',
    redirectTo: 'stock/progress-category',
    pathMatch: 'full',
  },
  {
    path: 'Facilityequipmentreceipt',
    redirectTo: 'stock/facility-receipts',
    pathMatch: 'full',
  },
  {
    path: 'NodleInformationNew',
    redirectTo: 'stock/nodal-information',
    pathMatch: 'full',
  },
  {
    path: 'MasFileNo',
    redirectTo: 'orders/mas-file-no',
    pathMatch: 'full',
  },
  {
    path: 'ReportPOEligible',
    redirectTo: 'reports/eligible-report',
    pathMatch: 'full',
  },
  {
    path: 'PORealloaction',
    redirectTo: 'orders/po-reallocation',
    pathMatch: 'full',
  },
  {
    path: 'EMSPOAmmendment',
    redirectTo: 'orders/po-amendment',
    pathMatch: 'full',
  },
  {
    path: 'Payment20Per',
    redirectTo: 'orders/withheld-release',
    pathMatch: 'full',
  },
  {
    path: 'PaymentLetter',
    redirectTo: 'payment-letter',
    pathMatch: 'full',
  },
  {
    path: 'MainEquipmentMappedReport',
    redirectTo: 'reports/main-equipment-mapped',
    pathMatch: 'full',
  },
  {
    path: 'ProgressDetail',
    redirectTo: 'stock/nodal-progress',
    pathMatch: 'full',
  },
  {
    path: 'ProgressDetailDME',
    redirectTo: 'stock/nodal-progress?dme=true',
    pathMatch: 'full',
  },
  {
    path: 'po_supextapproval',
    redirectTo: 'ExtensionHODetail?onlyExtensionRequests=true',
    pathMatch: 'full',
  },
  {
    path: 'purchase-order-dashboard',
    redirectTo: 'orders/purchase-order-dashboard',
    pathMatch: 'full',
  },
  {
    path: 'purchase-order-receipts',
    redirectTo: 'orders/purchase-order-receipts',
    pathMatch: 'full',
  },
  {
    path: 'FacilityPO_ReceiptDME',
    redirectTo: 'orders/po-receipt-entry',
    pathMatch: 'full',
  },
  {
    path: 'Facility_InstallationReportDME',
    redirectTo: 'orders/po-installation-report',
    pathMatch: 'full',
  },
  {
    path: 'EMSRCDashbord',
    redirectTo: 'contracts/dashboard',
    pathMatch: 'full',
  },
  { path: 'EMSNEWRC', redirectTo: 'contracts/new-rc', pathMatch: 'full' },
  // {
  //   path: 'RCDetailReport',
  //   redirectTo: 'contracts/rc-detail-report',
  //   pathMatch: 'full',
  // },
  { path: 'PlanaTenderD', redirectTo: 'tender/plan', pathMatch: 'full' },
  {
    path: 'TenderStatusUpdate',
    redirectTo: 'tender/evaluation',
    pathMatch: 'full',
  },
  {
    path: 'AddRTenderItems',
    redirectTo: 'tender/claim-object',
    pathMatch: 'full',
  },
  {
    path: 'TendersStatus',
    redirectTo: 'tender/gem-price-acceptance',
    pathMatch: 'full',
  },
  {
    path: 'dme-fac-heads',
    redirectTo: 'indents/budget-heads',
    pathMatch: 'full',
  },
  {
    path: 'consolidated-indent-dme',
    redirectTo: 'indents/annual-indent',
    pathMatch: 'full',
  },
  {
    path: 'IndentFromFacilities',
    redirectTo: 'indents/from-facilities',
    pathMatch: 'full',
  },
  {
    path: 'FacilityAuthPOValuePOCell',
    redirectTo: 'finance/year-wise-po-abstract',
    pathMatch: 'full',
  },
  {
    path: 'FPOPaidReport',
    redirectTo: 'finance/po-wise-payment',
    pathMatch: 'full',
  },
  {
    path: 'POPaidReport',
    redirectTo: 'reports/po-wise-payment',
    pathMatch: 'full',
  },
  {
    path: 'ChequeWisePaymentReport',
    redirectTo: 'finance/cheque-wise-payment',
    pathMatch: 'full',
  },
  {
    path: 'facility-complain-store',
    redirectTo: 'complain/facility-store',
    pathMatch: 'full',
  },
  {
    path: 'ComplainReportBME',
    redirectTo: 'complain/report',
    pathMatch: 'full',
  },
  { path: 'cmc-detail', redirectTo: 'reports/cmc-detail', pathMatch: 'full' },
  {
    path: 'POSummaryReport',
    redirectTo: 'reports/po-summary',
    pathMatch: 'full',
  },
  {
    path: 'PORecdsummary',
    redirectTo: 'reports/po-receipts-summary',
    pathMatch: 'full',
  },
  {
    path: 'TenterStatusItemWise',
    redirectTo: 'reports/tender-item-status',
    pathMatch: 'full',
  },
  {
    path: 'POSummaryDrillDwnQtyReagent',
    redirectTo: 'reports/reagent-po',
    pathMatch: 'full',
  },
  {
    path: 'MastterSupplierDash',
    redirectTo: 'masters/supplier',
    pathMatch: 'full',
  },
  { path: 'ItemsBME', redirectTo: 'masters/items', pathMatch: 'full' },
  {
    path: 'MapitemsEithType',
    redirectTo: 'masters/map-items',
    pathMatch: 'full',
  },
  {
    path: 'MapitemswithTypeUpdate',
    redirectTo: 'masters/map-items-update',
    pathMatch: 'full',
  },
  {
    path: 'MapitemswithMainitemTypeRepo',
    redirectTo: 'masters/map-items-report',
    pathMatch: 'full',
  },
//#region GM Finance
// 
  {
    path: 'EMDRefundTenderwise',
    component: EmdRefundTenderwiseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF', 'CGMSC', 'AD'] },
  },
  {
    path: 'emd-refund/tenderwise',
    component: EmdRefundTenderwiseComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF', 'CGMSC', 'AD'] },
  },
  {
    path: 'SDReleaseFInance',
    component: SdReleaseFinanceComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF', 'CGMSC', 'AD'] },
  },
  {
    path: 'SDReleaseFinance',
    redirectTo: 'SDReleaseFInance',
    pathMatch: 'full',
  },
  {
    path: 'emd-refund/sd-release-finance',
    component: SdReleaseFinanceComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF', 'CGMSC', 'AD'] },
  },
  {
    path: 'EditReceivedAndInstallationDate',
    component: EditReceivedAndInstallationDateComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'Supplier',
    component: SuppliersComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'CgmscBankAccounts',
    component: CgmscBankAccountsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'NewFundMaster',
    component: NewFundMasterComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'FundMap',
    component: FundMapComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'BudgentEntry',
    component: BudgentEntryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'IndentRCPOTenderStatus',
    component: IndentRCPOTenderStatusComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'UnpaidPOS',
    component: UnpaidPOSComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'POReportGMF',
    component: POReportGMFComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'InvoiceDetail',
    component: InvoiceDetailComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME', 'AUGMF', 'AUPO', 'AU'] },
  },
  {
    path: 'TDSdataReport',
    component: TDSdataReportComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME', 'AUGMF', 'AUPO', 'AU'] },
  },
  {
    path: 'PaymentsCPReport20per',
    component: PaymentsCPReport20perComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME', 'AUGMF', 'AUPO', 'AU'] },
  },
  {
    path: 'reports/payments-cpreport20per',
    component: PaymentsCPReport20perComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME', 'AUGMF', 'AUPO', 'AU'] },
  },
  {
    path: 'FileMRCDashboardFINFile',
    component: FileMRCDashboardFINFileComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF', 'AU'] },
  },
  {
    path: 'PerformanceCertificate',
    component: PerformanceCertificateComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'performance/emis-perf20-rdlc',
    component: EmisPerf20RdlcComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'performance/payment20-cheque-prep',
    component: Payment20ChequePrepComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'performance/sanction-notesheet',
    component: SanctionNotesheetComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
//#endregion

//#region Master Module
  {
    path: 'masters/dhs-facility-users-locations',
    component: DhsFacilityUsersLocationsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME', 'DHS', 'FU', 'Facility', 'CMHO', 'Store', 'AYUSH', 'AU', 'AUPO', 'AUGMF'] },
  },
  {
    path: 'DHSFacilityUsersLocations',
    redirectTo: 'masters/dhs-facility-users-locations',
    pathMatch: 'full',
  },
  {
    path: 'masters/dhs-add-facility',
    component: DhsAddFacilityComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME', 'DHS', 'FU', 'Facility', 'CMHO', 'Store', 'AYUSH', 'AU', 'AUPO', 'AUGMF'] },
  },
  {
    path: 'DHSAddFacility',
    redirectTo: 'masters/dhs-add-facility',
    pathMatch: 'full',
  },
  {
    path: 'masters/health-facility-details',
    component: HealthFacilityDetailsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'DME', 'DHS', 'FU', 'Facility', 'CMHO', 'Store', 'AYUSH', 'AU', 'AUPO', 'AUGMF'] },
  },
  {
    path: 'HealthFacilityDetails',
    redirectTo: 'masters/health-facility-details',
    pathMatch: 'full',
  },
  {
    path: 'masters/item-specification',
    component: ItemSpecificationComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['DME', 'AD', 'DHS', 'FU', 'Facility', 'CMHO', 'Store', 'AYUSH', 'AU', 'AUPO', 'AUGMF'] },
  },
  {
    path: 'Itemspecification',
    redirectTo: 'masters/item-specification',
    pathMatch: 'full',
  },
  {
    path: 'masters/mas-facility-users-locations',
    component: MasFacilityUsersLocationsComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUPO', 'AD', 'DME', 'DHS', 'FU', 'Facility', 'CMHO', 'Store', 'AYUSH', 'AU', 'AUGMF'] },
  },
  {
    path: 'MasFacilityUsersLocations',
    redirectTo: 'masters/mas-facility-users-locations',
    pathMatch: 'full',
  },
  {
    path: 'masters/master-supplier-add',
    component: MasterSupplierAddComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO', 'AD', 'DME', 'DHS', 'FU', 'Facility', 'CMHO', 'Store', 'AYUSH', 'AU', 'AUPO', 'AUGMF'] },
  },
  {
    path: 'MasterSupplierAdd',
    redirectTo: 'masters/master-supplier-add',
    pathMatch: 'full',
  },
  {
    path: 'reports/equipment-tag',
    redirectTo: 'reports/equipment-tag-report',
    pathMatch: 'full',
  },
  {
    path: 'PerformanceCertificate',
    component: PerformanceCertificateComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF'] },
  },
  {
    path: 'performance/performace20-consignee',
    component: Performace20ConsigneeComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'Performace20Consignee',
    redirectTo: 'performance/performace20-consignee',
    pathMatch: 'full',
  },
  {
    path: 'performance/performance-certificate-fin',
    component: PerformanceCertificateFinComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AD', 'AUGMF', 'AU', 'TPO', 'AUPO', 'DME'] },
  },
  {
    path: 'PerformanceCertificateFIN',
    redirectTo: 'performance/performance-certificate-fin',
    pathMatch: 'full',
  },
//#endregion

  //#region IT Module
  {
    path: 'IT/add-sub-menu',
    component: AddSubMenuComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SEC1', 'AD'] },
  },
  {
    path: 'IT/add-role-in-screen',
    component: AddRoleInScreenComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SEC1', 'AD'] },
  },
  {
    path: 'IT/delete-menu',
    component: DeleteMenuComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['SEC1', 'AD'] },
  },
  //#endregion

  //#region File Movement — EMD File Approval (5 variants)
  {
    path: 'EMDFileApprovalBME',
    component: EmdFileApprovalComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['BME','AD'], variant: 'bme' },
  },
  {
    path: 'EMDFileApprovalBankletter',
    component: EmdFileApprovalComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF','AD'], variant: 'bankletter' },
  },
  {
    path: 'EMDFileApprovalGMF',
    component: EmdFileApprovalComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF','AD'], variant: 'gmf' },
  },
  {
    path: 'EMDFileApprovalGMFsanction',
    component: EmdFileApprovalComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF','AD'], variant: 'gmfsanction' },
  },
  {
    path: 'EMDFileApprovalGMT',
    component: EmdFileApprovalComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUPO','AD'], variant: 'gmt' },
  },
  // {
  //   path: 'POSupplyHO',
  //   component: POSupplyHOComponent,
  //   canActivate: [RouteGuardService],
  //   data: { allowedRoles: ['AUPO','AD'] },
  // },
  //#endregion
  //#region File Movement — Others
  {
    path: 'LogoVerifiedHO',
    component: LogoVerifiedHoComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF','AU','AD'] },
  },
  {
    path: 'SiteNotReadyDocUpload',
    component: SiteNotReadyUploadComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF','AU','AD'] },
  },
  {
    path: 'InvoicesBySO',
    component: InvoicesBySoComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF','AU','AD'] },
  },
  {
    path: 'PoReportNew',
    component: PoReportNewComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF','AU','AD'] },
  },
  //#region File Movement — Remaining 2 pages
  {
    path: 'PODetailsRDLC',
    component: PoDetailsRdlcComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO','AUGMF','AU','DME','AUPO','BME','AD'] },
  },
  {
    path: 'PendingInstallDrillDown',
    component: PendingInstallDrilldownComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['TPO','AUGMF','AU','DME','AUPO','BME','AD'] },
  },
  //#endregion

  //#region Reports — Indent/PO/Tender Status (5 pages)
  {
    path: 'reports/indent-po-tender-status',
    component: IndentPoTenderStatusComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF', 'AU', 'TPO', 'AUPO', 'AD', 'DME'] },
  },
  {
    path: 'reports/indent-po-tender-status-summary',
    component: IndentPoTenderStatusSummaryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF', 'AU', 'TPO', 'AUPO', 'AD', 'DME'] },
  },
  {
    path: 'reports/indent-po-tender-status-drilldown',
    component: IndentPoTenderStatusDrilldownComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF', 'AU', 'TPO', 'AUPO', 'AD', 'DME'] },
  },
  {
    path: 'reports/indent-po-tender-summary',
    component: IndentPoTenderSummaryComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF', 'AU', 'TPO', 'AUPO', 'AD', 'DME'] },
  },
  {
    path: 'reports/indent-po-tender-summary-drilldown',
    component: IndentPoTenderSummaryDrilldownComponent,
    canActivate: [RouteGuardService],
    data: { allowedRoles: ['AUGMF', 'AU', 'TPO', 'AUPO', 'AD', 'DME'] },
  },
  // Legacy flat path redirects
  { path: 'IndentPoTenderStatus', redirectTo: 'reports/indent-po-tender-status', pathMatch: 'full' },
  { path: 'IndentPoTenderStatusSummary', redirectTo: 'reports/indent-po-tender-status-summary', pathMatch: 'full' },
  { path: 'IndentPOtenderstatusSummaryDrlDwnItems', redirectTo: 'reports/indent-po-tender-status-drilldown', pathMatch: 'full' },
  { path: 'IndentPOtenderSummary', redirectTo: 'reports/indent-po-tender-summary', pathMatch: 'full' },
  { path: 'IndentPOtenderSummaryDrlDwnItems', redirectTo: 'reports/indent-po-tender-summary-drilldown', pathMatch: 'full' },
  //#endregion

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
