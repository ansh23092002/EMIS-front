// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { ToastrService } from 'ngx-toastr';
// import { ApiService } from 'src/app/service/api.service';
// import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgSelectModule } from '@ng-select/ng-select';
// import { MatTableExporterModule } from 'mat-table-exporter';
// import { CollapseModule } from 'src/app/collapse';
// import { MaterialModule } from 'src/app/material-module';
// import { MatOptionModule } from '@angular/material/core';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatSelectModule } from '@angular/material/select';
// import { MatTabsModule } from '@angular/material/tabs';
// import Swal from 'sweetalert2'

// export interface PoItemDetail {
//   ItemId: number;
//   ItemCode: string;
//   ItemName: string;
//   PercentValue: number;
//   BasicRate: number;
//   SchemeName: string;
//   PoDate: string;
//   AccYear: string;
//   SupplierName: string;
//   PoNo: string;
//   FinalRate: number;
//   PoQty: number;
//   PoValue: number;
//   SupplierId: number;
//   TenderId: number;
//   PoNoId: number;
//   AccYrSetId: number;
//   InvoiceGst: string;
//   HsnCode: string;
//   Ext: string;
//   FacilityAutName: string;
//   FacilityAutId: number;
//   ReasonId: number;
//   UnexQty: number;
// }

// export interface PoPenaltyDetails {
//   PoId: number;
//   PoDate: string;
//   TrancheDays: number;
//   IsLdPenalty: string;
//   ExtendedDate: string;
//   PenaltyType: string;
//   CancellationDays: number;
//   CancellationPercentage: number;
//   PenaltyPercent: number;
//   ImportDays: number;
//   DomesticDays: number;
//   LogoCharges: number;
//   LogoChargesUpper: number;
// }

// @Component({
//   selector: 'app-sanction',
//   standalone: true,
//   imports: [
//     NgSelectModule,
//     CommonModule,
//     FormsModule,
//     CollapseModule,
//     NgbCollapseModule,
//     ReactiveFormsModule,
//     MatTabsModule,
//     MaterialModule,
//     MatDialogModule,
//     MatSelectModule,
//     MatOptionModule,
//     MatTableExporterModule,
//   ], 
//   templateUrl: './sanction.component.html',
//   styleUrl: './sanction.component.css',
// })
// export class SanctionComponent implements OnInit {
//   poDetails: PoItemDetail | null = null;
//   penaltyData: PoPenaltyDetails | null = null;
//   isLoading: boolean = true;
//   SanctionIdIfExist: any[] = [];
//   BudgetDropdownList: any[] = [];
//   Sanctiondetails: any[] = [];
  
//   // Variables for Form Data
//   poId: number = 0;
//   autoCode: string = '';
//   sanctionNo: string = '';
//   BudgetId: any = null;
//   sanctionDate: string = '';
//   remarks: string = '';
//   isGstOverrideChecked: boolean = false;

//   constructor(
//     private spinner: NgxSpinnerService,
//     private api: ApiService,
//     public toastr: ToastrService,
//     private fb: FormBuilder,
//     private cdr: ChangeDetectorRef,
//     private http: HttpClient,
//     private router: Router, 
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     this.route.queryParams.subscribe((params) => {
//       this.poId = params['poId'] ? Number(params['poId']) : 2747;
//       const fileNo = params['fileNo'];

//       // Set default Sanction Date to today's date in YYYY-MM-DD format
//       this.sanctionDate = new Date().toISOString().split('T')[0];

//       console.log('Received PO ID:', this.poId);
//       this.fetchPoDetails(this.poId);
//       this.fetchPoDetails1(this.poId);
//       this.loadDirectoratesDropdown();
//     });
//   }

//   fetchPoDetails(poId: number) {
//     const apiUrl = `https://localhost:7036/api/GMFI/GetPoItemDetails/${poId}`;
//     this.http.get<any>(apiUrl).subscribe({
//       next: (data:any) => {
//         if (Array.isArray(data)) {
//           this.poDetails = data[0]; 
//         } else {
//           this.poDetails = data; 
//         }
//         this.isLoading = false;
//         console.log('Data bound to HTML variable:',data);
//         this.GetSanctionIdIfExist(this.poDetails, poId);
//       },
//       error: (error:any) => {
//         console.error('Error fetching data', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   fetchPoDetails1(poId: number) {
//     const apiUrl = `https://localhost:7036/api/GMFI/GetPoPenaltyDetails/${poId}`;
//     this.http.get<any>(apiUrl).subscribe({
//       next: (data) => {
//         if (Array.isArray(data)) {
//           this.penaltyData = data[0]; 
//         } else {
//           this.penaltyData = data; 
//         }
//         console.log('Data bound to HTML variable:', this.penaltyData);
//       },
//       error: (error) => {
//         console.error('Error fetching data', error);
//       }
//     });
//   }

//   GetSanctionIdIfExist(poDetailsObj: any, poId: any) {
//     this.api.get(`GMFI/GetSanctionIdIfExist/${poId}`).subscribe(
//       (res: any) => {
//          this.SanctionIdIfExist = res;
//          console.log("orexist=", this.SanctionIdIfExist);
//          this.sanctionNo = res.sanctionId;
//          if (res.sanctionId === '') {
//            this.generateSanctionNumber(poDetailsObj.AccYrSetId, poId);
//          } else {
//            this.GetPendingSanctionByPoId(poId, this.SanctionIdIfExist);
//          }
//       },
//       (err) => {
//         console.log('Error checking sanction exist:', err);
//       }
//     );
//   }

//   GetPendingSanctionByPoId(poId: any, sectionid: any) {
//     this.api.get(`GMFI/GetPendingSanctionByPoId/${poId}/${sectionid}`).subscribe(
//       (res: any) => {
//         console.log("GetPendingSanctionByPoId API Response =", res);
//         this.Sanctiondetails = res;
//         this.cdr.detectChanges(); 
//       },
//       (err) => {
//         console.log('Error generating sanction number:', err);
//       }
//     );
//   }

//   generateSanctionNumber(accyrSetId: any, poId: any) {
//     const params = { accyrSetId: accyrSetId, poNoId: poId };
//     this.api.get('GMFI/GenerateSanctionNo', { params }).subscribe(
//       (res: any) => {
//         console.log("GenerateSanctionNo API Response =", res);
//         this.autoCode = res.autoCode || res.AutoCode || '';       
//         this.sanctionNo = res.sanctionNo || res.SanctionNo || ''; 
//         this.cdr.detectChanges(); 
//       },
//       (err) => {
//         console.log('Error generating sanction number:', err);
//       }
//     );
//   }

//   loadDirectoratesDropdown() {
//     this.api.get('POCell/GetBudgetDropdownList').subscribe({
//       next: (res:any) => this.BudgetDropdownList = res || [],
//       error: (err) => console.error(err)
//     });
//   }

//   onDirectorateSelectedChange() {
//     console.log("Selected Budget ID:", this.BudgetId);
//   }

//   // ==========================================
//   // FINAL API POST CALL (Saving Sanction Data)
//   // ==========================================
//   saveSanctionData() {
//     // 1. Basic Frontend Validations
//     if (!this.BudgetId) {
//       this.toastr.warning('Please select a Budget No.', 'Validation Error');
//       return;
//     }
//     if (!this.sanctionNo) {
//       this.toastr.warning('Sanction Number is required.', 'Validation Error');
//       return;
//     }
//     if (!this.poDetails) {
//       this.toastr.error('PO Details not loaded correctly.', 'Error');
//       return;
//     }

//     // 2. Construct Payload Matching the C# DTO EXACTLY
//     const payload = {
//       PoId: this.poId,
//       BudgetId: this.BudgetId,
//       GstNo: this.poDetails.InvoiceGst || "", 
//       SanctionNo: this.sanctionNo,
//       HsnCode: this.poDetails.HsnCode || "",
//       SanctionDate: this.sanctionDate, // Format: YYYY-MM-DD
//       Remarks: this.remarks || "",
//       BudgetAmt: this.poDetails.PoValue || 0,
//       AutoCode: this.autoCode || "",
//       TenderId: this.poDetails.TenderId || 0,
//       DispatchGstNo: this.poDetails.InvoiceGst || "", 
//       IsGstOverrideChecked: this.isGstOverrideChecked
//     };

//     console.log("Posting Payload:", payload);
//     this.spinner.show();

//     // 3. Make POST Request
//     this.http.post('https://localhost:7036/api/GMFI/SaveSanctionHeader', payload).subscribe({
//       next: (response: any) => {
//         this.spinner.hide();
//         console.log('Save Success:', response);
        
//         // Show Success SweetAlert
//         Swal.fire({
//           title: 'Success!',
//           text: response.message || 'Sanction Data Saved Successfully',
//           icon: 'success',
//           confirmButtonText: 'OK'
//         });

//         // HINT: Call methods to refresh UI, switch panels etc. here
//       },
//       error: (error: any) => {
//         this.spinner.hide();
//         console.error('Error saving data:', error);
        
//         // Show Error SweetAlert
//         Swal.fire({
//           title: 'Error!',
//           text: error.error?.message || 'Failed to save sanction data.',
//           icon: 'error',
//           confirmButtonText: 'OK'
//         });
//       }
//     });
//   }
// }
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/api.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { CollapseModule } from 'src/app/collapse';
import { MaterialModule } from 'src/app/material-module';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2'

export interface PoItemDetail {
  ItemId: number;
  ItemCode: string;
  ItemName: string;
  PercentValue: number;
  BasicRate: number;
  SchemeName: string;
  PoDate: string;
  AccYear: string;
  SupplierName: string;
  PoNo: string;
  FinalRate: number;
  PoQty: number;
  PoValue: number;
  SupplierId: number;
  TenderId: number;
  PoNoId: number;
  AccYrSetId: number;
  InvoiceGst: string;
  HsnCode: string;
  Ext: string;
  FacilityAutName: string;
  FacilityAutId: number;
  ReasonId: number;
  UnexQty: number;
}

export interface PoPenaltyDetails {
  PoId: number;
  PoDate: string;
  TrancheDays: number;
  IsLdPenalty: string;
  ExtendedDate: string;
  PenaltyType: string;
  CancellationDays: number;
  CancellationPercentage: number;
  PenaltyPercent: number;
  ImportDays: number;
  DomesticDays: number;
  LogoCharges: number;
  LogoChargesUpper: number;
}

@Component({
  selector: 'app-sanction',
  standalone: true,
  imports: [
    NgSelectModule,
    CommonModule,
    FormsModule,
    CollapseModule,
    NgbCollapseModule,
    ReactiveFormsModule,
    MatTabsModule,
    MaterialModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatTableExporterModule,
  ], 
  templateUrl: './sanction.component.html',
  styleUrl: './sanction.component.css',
})
export class SanctionComponent implements OnInit {
  poDetails: PoItemDetail | null = null;
  penaltyData: PoPenaltyDetails | null = null;
  isLoading: boolean = true;
  SanctionIdIfExist: any[] = [];
  BudgetDropdownList: any[] = [];
  Sanctiondetails: any[] = [];
  
  // Variables for Form Data
  poId: number = 0;
  autoCode: string = '';
  sanctionNo: string = '';
  BudgetId: any = null;
  sanctionDate: string = '';
  remarks: string = '';
  isGstOverrideChecked: boolean = false;

  // ==== MATERIAL TABLE VARIABLES ====
  invoicesList: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [
    'sno', 'LocationName', 'InvoiceNo', 'InvoiceDate', 'OrderedQty', 'InvoiceAbsQty', 
    'OldInvoiceValue', 'invoiceValue50', 'receivedDate', 'daysTaken', 'ldDays', 
    'penaltyPer', 'penaltyAmt', 'logoAttached', 'logoChargesPer', 'logoPenaltyAmt', 'status', 'check'
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private api: ApiService,
    public toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.poId = params['poId'] ? Number(params['poId']) : 2747;
      const fileNo = params['fileNo'];

      this.sanctionDate = new Date().toISOString().split('T')[0];

      console.log('Received PO ID:', this.poId);
      this.fetchPoDetails(this.poId);
      this.fetchPoDetails1(this.poId);
      this.loadDirectoratesDropdown();
      
      // Load Data for Grid
      this.fetchInvoicesForPo(this.poId,null);
    });
  }

  fetchPoDetails(poId: number) {
<<<<<<< HEAD
    this.api.get(`GMFI/GetPoItemDetails/${poId}`).subscribe({
      next: (data: any) => {
=======
<<<<<<< HEAD

=======
>>>>>>> 636375c (deemand relese)
    // const apiUrl = `https://localhost:7036/api/GMFI/GetPoItemDetails/${poId}`;
    // const apiUrl = `http://103.51.8.80/emsapi/api/GMFI/GetPoItemDetails/${poId}`;
    const apiUrl = `https://cgmsc.gov.in/emsapi/api/GMFI/GetPoItemDetails/${poId}`;
    this.http.get<any>(apiUrl).subscribe({
      next: (data:any) => {
<<<<<<< HEAD

=======
>>>>>>> 636375c (deemand relese)
>>>>>>> 614678a (deemand relese)
        if (Array.isArray(data)) { this.poDetails = data[0]; } 
        else { this.poDetails = data; }
        this.isLoading = false;
        this.GetSanctionIdIfExist(this.poDetails, poId);
      },
      error: (error: any) => { this.isLoading = false; }
    });
  }

  fetchPoDetails1(poId: number) {
<<<<<<< HEAD
    this.api.get(`GMFI/GetPoPenaltyDetails/${poId}`).subscribe({
      next: (data: any) => {
=======
<<<<<<< HEAD

=======
>>>>>>> 636375c (deemand relese)
    // const apiUrl = `https://localhost:7036/api/GMFI/GetPoPenaltyDetails/${poId}`;
    // const apiUrl = `http://103.51.8.80/emsapi/api/GMFI/GetPoPenaltyDetails/${poId}`;
    const apiUrl = `https://cgmsc.gov.in/emsapi/api/GMFI/GetPoPenaltyDetails/${poId}`;
    this.http.get<any>(apiUrl).subscribe({
      next: (data) => {
<<<<<<< HEAD

=======
>>>>>>> 636375c (deemand relese)
>>>>>>> 614678a (deemand relese)
        if (Array.isArray(data)) { this.penaltyData = data[0]; } 
        else { this.penaltyData = data; }
      }
    });
  }

  GetSanctionIdIfExist(poDetailsObj: any, poId: any) {
    this.api.get(`GMFI/GetSanctionIdIfExist/${poId}`).subscribe((res: any) => {
         this.SanctionIdIfExist = res;
         this.sanctionNo = res.sanctionId;
         if (res.sanctionId === '') {
           this.generateSanctionNumber(poDetailsObj.AccYrSetId, poId);
         } else {
           this.GetPendingSanctionByPoId(poId, this.SanctionIdIfExist);
         }
      }
    );
  }

  GetPendingSanctionByPoId(poId: any, sectionid: any) {
    this.api.get(`GMFI/GetPendingSanctionByPoId/${poId}/${sectionid}`).subscribe((res: any) => {
        this.Sanctiondetails = res;
        this.cdr.detectChanges(); 
      }
    );
  }

  generateSanctionNumber(accyrSetId: any, poId: any) {
    const params = { accyrSetId: accyrSetId, poNoId: poId };
    this.api.get('GMFI/GenerateSanctionNo', { params }).subscribe((res: any) => {
        this.autoCode = res.autoCode || res.AutoCode || '';       
        this.sanctionNo = res.sanctionNo || res.SanctionNo || ''; 
        this.cdr.detectChanges(); 
      }
    );
  }

  loadDirectoratesDropdown() {
    this.api.get('POCell/GetBudgetDropdownList').subscribe({
      next: (res:any) => this.BudgetDropdownList = res || []
    });
  }

  onDirectorateSelectedChange() {
    console.log("Selected Budget ID:", this.BudgetId);
  }

  saveSanctionData() {
    if (!this.BudgetId) { this.toastr.warning('Please select a Budget No.', 'Validation Error'); return; }
    if (!this.sanctionNo) { this.toastr.warning('Sanction Number is required.', 'Validation Error'); return; }
    if (!this.poDetails) { this.toastr.error('PO Details not loaded correctly.', 'Error'); return; }

    const payload = {
      PoId: this.poId, BudgetId: this.BudgetId, GstNo: this.poDetails.InvoiceGst || "", 
      SanctionNo: this.sanctionNo, HsnCode: this.poDetails.HsnCode || "",
      SanctionDate: this.sanctionDate, Remarks: this.remarks || "", BudgetAmt: this.poDetails.PoValue || 0,
      AutoCode: this.autoCode || "", TenderId: this.poDetails.TenderId || 0,
      DispatchGstNo: this.poDetails.InvoiceGst || "", IsGstOverrideChecked: this.isGstOverrideChecked
    };

    this.spinner.show();
<<<<<<< HEAD
    this.api.post1('GMFI/SaveSanctionHeader', payload).subscribe({
=======
    // this.http.post('https://localhost:7036/api/GMFI/SaveSanctionHeader', payload).subscribe({
    // this.http.post('http://103.51.8.80/emsapi/api/GMFI/SaveSanctionHeader', payload).subscribe({
    this.http.post('https://cgmsc.gov.in/emsapi/api/GMFI/SaveSanctionHeader', payload).subscribe({
>>>>>>> 614678a (deemand relese)
      next: (response: any) => {
        this.spinner.hide();
        Swal.fire({ title: 'Success!', text: response.message || 'Sanction Data Saved Successfully', icon: 'success' });
      },
      error: (error: any) => {
        this.spinner.hide();
        Swal.fire({ title: 'Error!', text: error.error?.message || 'Failed to save sanction data.', icon: 'error' });
      }
    });
  }

  // =========================================================
  // LOGIC CONVERTED FROM C# ROW DATABOUND TO ANGULAR
  // =========================================================
  // fetchInvoicesForPo(poId: number) {
  //   // Note: Replace with actual API call to get invoice list
  //   // this.invoicesList = [
  //   //   { InvoiceID: 1, location_name: "Raipur HQ", InvoiceNo: "INV-101", invoice_date: "2026-06-10", OrderedQty: 100, InvoiceAbsQty: 100, Invalueonbill: 50000, GROSSAMOUNT50: 25000, recieved_date: "2026-06-25", daystaken: 15, Logo: "Y", pstatus: "Pending" },
  //   //   { InvoiceID: 2, location_name: "Bilaspur", InvoiceNo: "INV-102", invoice_date: "2026-06-15", OrderedQty: 200, InvoiceAbsQty: 200, Invalueonbill: 100000, GROSSAMOUNT50: 50000, recieved_date: "2026-07-20", daystaken: 75, Logo: "N", pstatus: "Pending" }
  //   // ];
    
  //   // Simulating delay to ensure PenaltyData is loaded first
  //   setTimeout(() => { this.processInvoiceCalculations(); }, 1500);
  // }
fetchInvoicesForPo(poId: any, invoiceId: any) {
  // अगर invoiceId null/undefined है, तो उसे URL में न भेजें
  let url = `GMFI/GetInvoiceDetails/${poId}`;
  
  if (invoiceId && invoiceId !== 0 && invoiceId !== 'null' && invoiceId !== 'undefined') {
    url += `?invoiceId=${invoiceId}`;
  }

  this.api.get(url).subscribe({
    next: (res: any) => {
      this.invoicesList = res;
      // कैलकुलेशन को कॉल करें
      setTimeout(() => { this.processInvoiceCalculations(); }, 500);
      this.cdr.detectChanges(); 
    },
    error: (err: any) => {
      console.error('API Error:', err);
      // यदि डेटा नहीं मिला (404), तो लिस्ट को खाली कर दें
      this.invoicesList = [];
      this.dataSource.data = [];
      this.cdr.detectChanges();
    }
  });
}
  // https://localhost:7036/api/GMFI/GetInvoiceDetails/3358
// https://localhost:7036/api/GMFI/GetInvoiceDetails/2815?invoiceId=11021


  processInvoiceCalculations() {
    if(!this.penaltyData || !this.poDetails) return;

    const alloweddays = this.penaltyData.TrancheDays || 0;
    const MaxDaysPO = this.penaltyData.CancellationDays || 0;
    const logocharges = this.penaltyData.LogoCharges || 0;
    const lbllogUpar = this.penaltyData.LogoChargesUpper || 0;
    const IspenaltyApplicable = this.penaltyData.IsLdPenalty || 'NA';
    
    const lblMinPPer = this.penaltyData.PenaltyPercent || 0; 
    const lblMaxDayPPer = this.penaltyData.CancellationPercentage || 0; 

    const dtPODate = new Date(this.poDetails.PoDate || new Date().toISOString());
    let lastDate = new Date(dtPODate);
    lastDate.setDate(lastDate.getDate() + alloweddays);
    const actuallastDate = new Date(lastDate);

    if (this.penaltyData.ExtendedDate && this.penaltyData.ExtendedDate !== '01-01-1900' && this.penaltyData.ExtendedDate !== 'Not Specify') {
      lastDate = new Date(this.penaltyData.ExtendedDate);
    }

    this.invoicesList.forEach(invoice => {
      const invoiceValue = parseFloat(invoice.Invalueonbill || 0);
      const invoiceQTY = parseFloat(invoice.InvoiceAbsQty || 0);
      const daysT = parseInt(invoice.daystaken || 0);
      const dtReciptDTConsignee = new Date(invoice.recieved_date);
      const lbllogofixed = invoice.Logo;

      // 1. Row Color
      invoice.rowColor = (daysT > alloweddays) ? '#ffb6c1' : '#90ee90'; 

      // 2. Logo Penalty Logic
      let logopenaltyamt = 0;
      let finallogopenaltyamt = 0;
      if (lbllogofixed === "N") {
        logopenaltyamt = (logocharges * invoiceValue) / 100;
        if (logopenaltyamt < lbllogUpar) { finallogopenaltyamt = lbllogUpar * invoiceQTY; } 
        else { finallogopenaltyamt = logopenaltyamt; }
      }
      invoice.lbllogPenaltyAmt = finallogopenaltyamt.toFixed(2);
      invoice.lblLogoChargesPer = logocharges.toString();

      // 3. Late Delivery (LD) Penalty Logic
      let Calpenaltydays = 0;
      let FinalPamount = 0;
      let lblpper = "0";

      if (dtReciptDTConsignee > lastDate) {
        let days = 0;
        if (dtReciptDTConsignee <= lastDate && IspenaltyApplicable === "N") {
          days = 0; 
        } else if (dtReciptDTConsignee > actuallastDate && IspenaltyApplicable === "Y") {
          days = (dtReciptDTConsignee.getTime() - actuallastDate.getTime()) / (1000 * 3600 * 24);
        } else {
          days = (dtReciptDTConsignee.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);
        }
        Calpenaltydays = Math.floor(days);

        if (IspenaltyApplicable === "N" && days <= 0) {
          lblpper = lblMinPPer.toString(); FinalPamount = 0;
        } else if (IspenaltyApplicable === "N" && days > 0) {
          lblpper = lblMinPPer.toString(); FinalPamount = ((parseFloat(lblpper) * invoiceValue) / 100) * Calpenaltydays;
        } else {
          if (IspenaltyApplicable === "Y" && daysT > MaxDaysPO) {
            lblpper = lblMaxDayPPer.toString(); FinalPamount = (parseFloat(lblpper) * invoiceValue) / 100;
          } else if (IspenaltyApplicable === "NA" && daysT > MaxDaysPO) {
            lblpper = lblMaxDayPPer.toString(); FinalPamount = (parseFloat(lblpper) * invoiceValue) / 100;
          } else if (IspenaltyApplicable === "N" && daysT > MaxDaysPO) {
            lblpper = lblMaxDayPPer.toString(); FinalPamount = 0;
          } else if (IspenaltyApplicable === "Y" && daysT <= MaxDaysPO) {
            lblpper = lblMinPPer.toString(); FinalPamount = ((parseFloat(lblpper) * invoiceValue) / 100) * Calpenaltydays;
          } else if (Calpenaltydays >= 0 && IspenaltyApplicable === "Y" && daysT <= MaxDaysPO) {
            lblpper = lblMinPPer.toString(); FinalPamount = ((parseFloat(lblpper) * invoiceValue) / 100) * Calpenaltydays;
          } else if (IspenaltyApplicable === "N" && daysT <= MaxDaysPO) {
            lblpper = lblMinPPer.toString(); FinalPamount = ((parseFloat(lblpper) * invoiceValue) / 100) * Calpenaltydays;
          } else if (IspenaltyApplicable === "NA" && daysT <= MaxDaysPO) {
            lblpper = lblMinPPer.toString(); FinalPamount = ((parseFloat(lblpper) * invoiceValue) / 100) * Calpenaltydays;
          } else {
            lblpper = "0"; FinalPamount = (parseFloat(lblpper) * invoiceValue) / 100;
          }
        }
      } else {
        lblpper = "0"; Calpenaltydays = 0; FinalPamount = (parseFloat(lblpper) * invoiceValue) / 100;
      }

      invoice.lblpper = lblpper;
      invoice.lblpDays = Calpenaltydays.toString();
      invoice.lblPenaltyAmt = FinalPamount.toFixed(2);
      invoice.isSelected = false; 
    });

    this.dataSource.data = this.invoicesList;
    console.log('data=', this.dataSource)
    this.cdr.detectChanges();
  }

  // Checkbox logic
  isAllSelected() {
    return this.dataSource.data.length > 0 && this.dataSource.data.every(row => row.isSelected);
  }
  masterToggle() {
    const isAll = this.isAllSelected();
    this.dataSource.data.forEach(row => row.isSelected = !isAll);
  }
}