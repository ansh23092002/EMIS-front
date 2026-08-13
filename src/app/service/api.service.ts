import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DashLoginDDL } from '../Model/DashLoginDDL';
import { BehaviorSubject, Observable } from 'rxjs';
import { masddlUser } from '../Model/masddlUser';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private readonly apiUrl = 'https://cgmsc.gov.in/HIMIS_APIN/api';
  // private readonly CGMSCHO_API2 = 'https://dpdmis.in/CGMSCHO_API2/api';
  // private readonly VREGAPI = 'https://dpdmis.in/VREGAPI/api';
  // private readonly himis_apin = 'https://www.cgmsc.gov.in/himis_apin/api';
  // private readonly API = 'https://cgmsc.gov.in/EMIS_API';
  private readonly apiUrll = `${environment.apiUrl}/Auth`;
  private readonly apiUrls = `${environment.apiUrl}/`;

  private readonly tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private readonly http: HttpClient) {}
//#region 
  getUsers(id: number) {
    // debugger
    return this.http.get(`${this.apiUrll}/${id}`);
  }
  GetUserEmail(userId: number) {
    return this.http.get<{
      Email?: string;
      email?: string;
      e_mail_id?: string;
      UserName?: string;
    }>(`${this.apiUrll}/GetUserEmail/${userId}`);
  }

  getSupplierProfile(id: number, mode: 'login' | 'new' | 'reset') {
    return this.http.get<{
      supplierId?: number;
      SupplierId?: number;
      name?: string;
      Name?: string;
      maskedMobile?: string;
      MaskedMobile?: string;
      email?: string;
      Email?: string;
      userEmail?: string;
      UserEmail?: string;
    }>(`${this.apiUrll}/supplier/profile/${id}?mode=${mode}`);
  }

  sendSupplierOtp(supplierId: number) {
    return this.http.post<{ message: string }>(`${this.apiUrll}/supplier/send-otp`, {
      supplierId,
    });
  }

  completeSupplierPassword(payload: {
    supplierId: number;
    otp: string;
    newPassword: string;
    repeatPassword: string;
    mode: 'new' | 'reset';
    desiredUserId: string;
  }) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/complete-password`,
      payload,
    );
  }

  getParticularSupplierDetails(userId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/details/by-user/${userId}`,
    );
  }

  updateParticularSupplierDetails(payload: {
    supplierId: number;
    mobileNo: string;
    email: string;
    phoneNo: string;
    address: string;
  }) {
    return this.http.put<{ message: string }>(`${this.apiUrll}/supplier/details`, {
      supplierId: payload.supplierId,
      mobileNo: payload.mobileNo,
      email: payload.email,
      phoneNo: payload.phoneNo,
      address: payload.address,
    });
  }

  getSupplierGstEntries(userId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/gst-entries/by-user/${userId}`,
    );
  }

  addSupplierGstEntry(payload: { userId: number; supplierId: number; gstNo: string }) {
    return this.http.post<{ message: string }>(`${this.apiUrll}/supplier/gst-entries`, payload);
  }

  updateSupplierGstEntry(gstId: number, payload: { userId: number; supplierId: number; gstNo: string }) {
    return this.http.put<{ message: string }>(`${this.apiUrll}/supplier/gst-entries/${gstId}`, payload);
  }

  deleteSupplierGstEntry(gstId: number, userId: number) {
    return this.http.delete<{ message: string }>(
      `${this.apiUrll}/supplier/gst-entries/${gstId}?userId=${userId}`,
    );
  }

  getSupplierPoSupplyFilters(userId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/po-supply/filters/by-user/${userId}`,
    );
  }

  getSupplierPoSupply(userId: number, financialYearId: number, tenderId: number) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/po-supply/by-user/${userId}?financialYearId=${financialYearId}&tenderId=${tenderId}`,
    );
  }

  getSupplierPoSdDetail(userId: number, poId: number, itemId: number, grossValue: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/po-sd-detail/by-user/${userId}?poId=${poId}&itemId=${itemId}&grossValue=${grossValue}`,
    );
  }

  saveSupplierPoSdDetail(userId: number, formData: FormData) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/po-sd-detail/by-user/${userId}`,
      formData,
    );
  }

  updateSupplierPoSdDetail(userId: number, formData: FormData) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/po-sd-detail/update/by-user/${userId}`,
      formData,
    );
  }

  getSupplierPoExtensionPage(userId: number, poId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/po-extension/by-user/${userId}?poId=${poId}`,
    );
  }

  saveSupplierPoExtension(userId: number, formData: FormData) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/po-extension/by-user/${userId}`,
      formData,
    );
  }

  getSupplierPoDispatch(userId: number, financialYearId: number, tenderId: number) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/po-supply-dispatch/by-user/${userId}?financialYearId=${financialYearId}&tenderId=${tenderId}`,
    );
  }

  getSupplierPoDispatchEdit(userId: number, poId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/po-supply-edit/by-user/${userId}?poId=${poId}`,
    );
  }

  getSupplierDispatchReport(userId: number, poId: number, locId: number, issueId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/dispatch-report/by-user/${userId}?poId=${poId}&locId=${locId}&issueId=${issueId}`,
    );
  }

  getSupplierDispatchEntry(
    userId: number,
    poId: number,
    locId: number,
    issueId: number,
    itemId: number,
  ) {
    const issueQ = issueId > 0 ? `&issueId=${issueId}` : '';
    const itemQ = itemId > 0 ? `&itemId=${itemId}` : '';
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/dispatch-entry/by-user/${userId}?poId=${poId}&locId=${locId}${issueQ}${itemQ}`,
    );
  }

  saveSupplierDispatchInvoice(userId: number, formData: FormData) {
    return this.http.post<{ message: string; issueId?: number }>(
      `${this.apiUrll}/supplier/dispatch-entry/invoice/by-user/${userId}`,
      formData,
    );
  }

  saveSupplierDispatchEquipmentLine(
    userId: number,
    body: {
      issueId: number;
      issueDetailId: number;
      serialNo: string;
      warrantyCardNo: string;
      mfgDate?: string;
      expDate?: string;
      supplyQty: number;
    },
  ) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/dispatch-entry/equipment-line/by-user/${userId}`,
      body,
    );
  }

  completeSupplierDispatch(
    userId: number,
    body: {
      poId: number;
      locationId: number;
      issueId: number;
      dispatchNo: string;
      dispatchDate: string;
      tentativeSupplyDate: string;
      cgmscLogoPrinted: string;
      warrantyValidity: string;
      serviceManual: string;
      operatingManual: string;
      calibrationCertificate: string;
      warrantyCard: string;
      otherStatutory: string;
      poDocuments: string;
    },
  ) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/dispatch-entry/complete/by-user/${userId}`,
      body,
    );
  }

  getSupplierPoReceiptFilters(userId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/po-supply-receipt/filters/by-user/${userId}`,
    );
  }

  getSupplierPoReceiptOptions(userId: number, financialYearId: number, poType: string) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/po-supply-receipt/pos/by-user/${userId}?financialYearId=${financialYearId}&poType=${encodeURIComponent(poType)}`,
    );
  }

  getSupplierPoReceipt(userId: number, poId: number, financialYearId = 0, poType = 'All') {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/po-supply-receipt/by-user/${userId}?poId=${poId}&financialYearId=${financialYearId}&poType=${encodeURIComponent(poType)}`,
    );
  }

  getSupplierReceiptEntry(userId: number, poId: number, locId: number, issueId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/receipt-entry/by-user/${userId}?poId=${poId}&locId=${locId}&issueId=${issueId}`,
    );
  }

  saveSupplierReceiptEntry(
    userId: number,
    body: {
      poId: number;
      locationId: number;
      issueId: number;
      receivedDate: string;
      receiptNo: string;
      receiptQty: string;
      receiptRemarks: string;
    },
  ) {
    return this.http.post<{ message: string; receiptId: number }>(
      `${this.apiUrll}/supplier/receipt-entry/by-user/${userId}`,
      body,
    );
  }

  saveSupplierReceiptInstallation(
    userId: number,
    body: {
      receiptId: number;
      issueDetailId: number;
      warrantyCardNo: string;
      receivedQty: number;
      installationDate: string;
      installationBy: string;
      installationLocation: string;
      cgmscLogoPrinted: string;
      warrantyValidity: string;
      serviceManual: string;
      operatingManual: string;
      calibrationCertificate: string;
      warrantyCard: string;
      otherStatutory: string;
      poDocuments: string;
      bulkInst: boolean;
    },
  ) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/receipt-entry/installation/by-user/${userId}`,
      body,
    );
  }

  completeSupplierReceiptEntry(
    userId: number,
    body: { poId: number; locationId: number; issueId: number; receiptId: number },
  ) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/receipt-entry/complete/by-user/${userId}`,
      body,
    );
  }

  uploadSupplierReceiptEntryFile(
    userId: number,
    formData: FormData,
  ) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/receipt-entry/file/by-user/${userId}`,
      formData,
    );
  }

  deleteSupplierReceiptInstallation(
    userId: number,
    body: { poId: number; locationId: number; issueId: number; receiptId: number },
  ) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/receipt-entry/delete/by-user/${userId}`,
      body,
    );
  }

  saveSupplierReceiptDenied(
    userId: number,
    body: {
      poId: number;
      locationId: number;
      issueId: number;
      deniedStatus: string;
      deniedQty: number;
      remarks: string;
    },
  ) {
    return this.http.post<{ message: string; descrepencyId?: number }>(
      `${this.apiUrll}/supplier/receipt-entry/denied/by-user/${userId}`,
      body,
    );
  }

  uploadSupplierReceiptDeniedFile(userId: number, formData: FormData) {
    return this.http.post<{ message: string }>(
      `${this.apiUrll}/supplier/receipt-entry/denied/file/by-user/${userId}`,
      formData,
    );
  }

  getSupplierReceiptDeniedFileUrl(userId: number, descrepencyId: number, fileKind: string): string {
    return `${this.apiUrll}/supplier/receipt-entry/denied/file/by-user/${userId}?descrepencyId=${descrepencyId}&fileKind=${encodeURIComponent(fileKind)}`;
  }

  getSupplierInstallationReport(userId: number, receiptId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/installation-report/by-user/${userId}?receiptId=${receiptId}`,
    );
  }

  getSupplierInstallationPrintReport(userId: number, receiptItemId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/installation-report/print/by-user/${userId}?receiptItemId=${receiptItemId}`,
    );
  }

  getSupplierPoPrintReport(userId: number, poId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/po-report/print/by-user/${userId}?poId=${poId}`,
    );
  }

  getSupplierRcDetailTenders(userId: number) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/rc-detail-report/tenders/by-user/${userId}`,
    );
  }

  getSupplierRcDetailReport(userId: number, tenderId: number) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/rc-detail-report/by-user/${userId}?tenderId=${tenderId}`,
    );
  }

  getSupplierAcceptedTenders(userId: number) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/accepted-report/tenders/by-user/${userId}`,
    );
  }

  getSupplierAcceptedSupplierOption(userId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/accepted-report/supplier/by-user/${userId}`,
    );
  }

  getSupplierAcceptedReport(
    userId: number,
    filterType: string,
    tenderId: number,
    supplierId: number,
  ) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/accepted-report/by-user/${userId}?filterType=${encodeURIComponent(filterType)}&tenderId=${tenderId}&supplierId=${supplierId}`,
    );
  }

  getSupplierReceiptComplain(userId: number, status: string) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/receipt-complain/by-user/${userId}?status=${encodeURIComponent(status)}`,
    );
  }

  getSupplierEmdDepositTenders(userId: number) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/emd-deposit/tenders/by-user/${userId}`,
    );
  }

  getSupplierEmdDocumentTypes() {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/emd-deposit/emd-types`,
    );
  }

  getSupplierEmdDeposits(userId: number) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/emd-deposit/by-user/${userId}`,
    );
  }

  saveSupplierEmdDeposit(userId: number, formData: FormData) {
    return this.http.post<{ message: string; depositId?: number }>(
      `${this.apiUrll}/supplier/emd-deposit/by-user/${userId}`,
      formData,
    );
  }

  getSupplierPaymentReport(userId: number, poType: string) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/payment-report/by-user/${userId}?poType=${encodeURIComponent(poType)}`,
    );
  }

  getSupplierSanctionReport(userId: number, poId: number, sanctionId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/sanction-report/by-user/${userId}?poId=${poId}&sanctionId=${sanctionId}`,
    );
  }

  getSupplierBalanceStatus(userId: number, balanceType: string) {
    return this.http.get<Record<string, unknown>[]>(
      `${this.apiUrll}/supplier/balance-status/by-user/${userId}?balanceType=${encodeURIComponent(balanceType)}`,
    );
  }

  getSupplierBalanceStatusDrillDown(userId: number, poId: number) {
    return this.http.get<Record<string, unknown>>(
      `${this.apiUrll}/supplier/balance-status/drill-down/by-user/${userId}?poId=${poId}`,
    );
  }
  // https://localhost:7036/api/GenerateNasti/Getyear
  // public get(url: string, data?: FormData, options?: any){
  //    return this.http.get(this.apiUrll + url, data, options);

  // }

  public get(url: string, options?: any) {
    // debugger

  return this.http.get(this.apiUrls + url, options);
}
  
    public post(url: string, data: FormData, options?: any) {
    // return this.http.post(this.API + url, data, options);
  }
  public post1(url: string, data: any, options?: any) {
  return this.http.post(this.apiUrls + url, data, options);
}
public post2(url: string, data: any) {
  return this.http.post(this.apiUrls + url, data);
}


// delete<T>(url: string): Observable<T> {
//   return this.http.delete<T>(`${this.apiUrls}/${url}`);
// }

delete<T>(url: string): Observable<T> {
  let fullUrl = `${this.apiUrls}/${url}`;


  fullUrl = fullUrl.replace(/([^:]\/)\/+/g, "$1");


  if (fullUrl.includes('localhost:4200')) {
    fullUrl = fullUrl.replace('http://localhost:4200', 'https://localhost:7036');
    // fullUrl = fullUrl.replace('http://103.51.8.80', 'https://localhost:7036');
    // fullUrl = fullUrl.replace('https://cgmsc.gov.in', 'https://localhost:7036');
  }

  // console.log('Sanitized Fixed Execution URL Container:', fullUrl);

  return this.http.delete<T>(fullUrl);
}
//     public put(url: string, data: FormData, options?: any) {
// debugger;

//     return this.http.put(this.apiUrls  + url, data, options);
//   }
// public put(url: string, data: any) {
//   return this.http.put(this.apiUrls  + url, data);
// }
public put(url: string, data: any) {
  return this.http.put(this.apiUrls + url, data, { responseType: 'text' });
}
//#endregion




post3(endpoint: string, payload: any) {

  // const absoluteUrl = `https://localhost:7036/api/${endpoint}`;
  // const absoluteUrl = `http://103.51.8.80/emsapi/api/${endpoint}`;
  const absoluteUrl = `https://cgmsc.gov.in/emsapi/api/${endpoint}`;
  return this.http.post(absoluteUrl, payload);
}


  masddlUser(Usertype: any) {
    // return this.http.get<masddlUser[]>(`${this.CGMSCHO_API2}/Master/masddlUser?Usertype=${Usertype}`);
  }
 
  VerifyOTPLogin(otp: any, userid: any) {
    // return this.http.get(
    //   `${this.CGMSCHO_API2}/Login/VerifyOTPLogin?otp=${otp}&userid=${userid}`,
    //   { responseType: 'text' }
    // );
  }
  getDashLoginDDL() {

    return this.http.get<DashLoginDDL[]>(`https://cgmsc.gov.in/HIMIS_APIN/api/Work/getDashLoginDDL`);
  }
  getOTPSaved(userid: any, ipAddress: any) {
    // const url = `${
    //   this.CGMSCHO_API2
    // }/Login/getOTPSaved?userid=${userid}&ipAddress=${encodeURIComponent(
    //   ipAddress
    // )}`;
    // return this.http.post(url, null, { responseType: 'text' });
  }
  InsertUserLoginLogPOST(values: any) {
    // return this.http.post(
    //   `${this.CGMSCHO_API2}/LogAudit/InsertUserLoginLog`,
    //   values,
    //   {
    //     responseType: 'text',
    //   }
    // );
  
  }

  InsertUserPageViewLogPOST(values: any) {
    // return this.http.post(
    //   `${this.CGMSCHO_API2}/LogAudit/InsertUserPageViewLog`,
    //   values,
    //   {
    //     responseType: 'text',
    //   }
    // );
  }

  //#endregion
  getVendorDetailsID(supplierId: any) {
    // return this.http.get(
    //   `${this.VREGAPI}/Registration/registeredVendors?vregid=${supplierId}`
    // );
  }


 




  









 


 




 





 


  





  



 
  









}
