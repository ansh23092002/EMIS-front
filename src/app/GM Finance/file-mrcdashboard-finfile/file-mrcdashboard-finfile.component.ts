import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChangeDetectorRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';

import { ToastrService } from 'ngx-toastr';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import {
  SupplierBankAccDetail_model,
  vendorBankDetail_model,
  UpdateBankDetails_model,
  UpdateAnnualTurnover_model,
  GetAnnualTurnoverDetail,
  BankMandateDetail,
  MassuppliergstDetails,
  GstReturnDetails,
} from 'src/app/Model/VendorRegisDetail';
import { ApiService } from 'src/app/service/api.service';
import { CollapseModule } from 'src/app/collapse';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableExporterModule, MatTableExporterDirective } from 'mat-table-exporter';
import { MaterialModule } from 'src/app/material-module';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
declare var bootstrap: any;
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { PODetails, PaymentListDetails, GetDashboardGrid } from 'src/app/Model/models';
import { DmePageSkeletonComponent } from 'src/app/component/DME/shared/dme-page-skeleton/dme-page-skeleton.component';

@Component({
  selector: 'app-file-mrcdashboard-finfile',
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
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatTableExporterModule,
    DmePageSkeletonComponent,
  ],
  templateUrl: './file-mrcdashboard-finfile.component.html',
  styleUrl: './file-mrcdashboard-finfile.component.css',
})
export class FileMRCDashboardFINFileComponent {
  authorityId = 0;
  Diectorateid: any;
  poType = 'All';
  paymentType = 'All';
  eqType = 0;
  onlyMyDesk = false;
  SendModal: any;
  sendTo: any = '';
  remarks: string = '';
  forwardDate: string = '';
  Sendoption: string = 'S';
  userList: any[] = [];
  poID: any;
  FileNo: any;

  yearList: any;
  searchMode: 'po' | 'outward' = 'po';
  poNo: any;
  outwardNo: any;
  selectedYear: any;
  Diectoratelist: any[] = [];
  financialyearid: any;
  fileNo: any;
  podt: any;
  schemeCode: any;
  supplierName: any;
  dispatchData: any[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('exporter') exporter!: MatTableExporterDirective;

  reasonList: any[] = [];
  resolveReasonList: any[] = [];
  selectedReasonId: any = '';
  reasonRemarks: string = '';
  selectedSorId: any = '';
  reasonPoId: any;
  resolvePoId: any;
  loading = false;

  InvoiceModal: any;
  invoiceLoading = false;
  invoiceHeader: any = null;
  invoicesData: any[] = [];
  invoiceTotalValue: number = 0;
  invoiceTotalCgst: number = 0;
  invoiceTotalSgst: number = 0;
  invoiceGrandTotal: number = 0;

  displayedColumns: string[] = [
    'sno',
    'FinRemarks',
    'invoice',
    'Supplier',
    'PoNo',
    'PoDate',
    'PoQty',
    'PoValue',
    'ItemName',
    'SupplyQty',
    'ReceiptQty',
    'InsQty',
    'ToBePaid',
    'LastRDate',
    'Conditond',
    'PresentFile',
    'ToDate',
    'ReasonName',
    'addReason',
    'resolveReason',
    'action',
    'Present_File_Action',
    'TenderNo',
    'FacilityAutName',
    'EntDt',
  ];

  constructor(
    private api: ApiService,
    public toastr: ToastrService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this.GetDiectorate();
    this.GetDashboardGrid();
  }

  hasActiveFilters(): boolean {
    return this.poType !== 'All' || this.paymentType !== 'All' || this.authorityId != 0 || this.onlyMyDesk;
  }

  clearFilters(): void {
    this.poType = 'All';
    this.paymentType = 'All';
    this.authorityId = 0;
    this.onlyMyDesk = false;
    if (this.dataSource) {
      this.dataSource.filter = '';
    }
    this.GetDashboardGrid();
  }

  GetDiectorate() {
    this.api.get(`Reports/GetDiectorate`).subscribe({
      next: (res: any) => {
        this.Diectoratelist = res || [];
      },
      error: (err: any) => {
        console.error('Error fetching directorates:', err);
      },
    });
  }

  GetReasons() {
    this.api.get('GMFI/GetReasons').subscribe({
      next: (res: any) => {
        this.reasonList = res || [];
      },
      error: (err: any) => {
        console.error('Error fetching reasons:', err);
      },
    });
  }

  GetResolveReasons(poId: any) {
    this.api.get(`Payment/GetReasonList?poId=${poId}`).subscribe({
      next: (res: any) => {
        this.resolveReasonList = res || [];
      },
      error: (err: any) => {
        console.error('Error fetching resolve reasons:', err);
      },
    });
  }

  GetDashboardGrid() {
    try {
      this.loading = true;
      const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
      const params = {
        poType: this.poType,
        fitUnfit: this.paymentType,
        eqType: this.eqType,
        authorityId: this.authorityId,
        myDesk: this.onlyMyDesk,
        userId: loginData.user_id || 0,
      };

      this.api.get('GMFI/GetDashboardGrid', { params }).subscribe({
        next: (res: any) => {
          const rawData = Array.isArray(res) ? res : [];
          this.dispatchData = rawData.map((item: any, index: number) => {
            const poId = item.poId ?? item.PoId ?? item.po_id ?? 0;
            const tenderNo = item.tenderNo ?? item.TenderNo ?? item.tender_no ?? '-';
            const poNo = item.poNo ?? item.PoNo ?? item.po_no ?? '-';
            const supplier = item.supplier ?? item.Supplier ?? item.name ?? '-';
            const poDate = item.poDate ?? item.PoDate ?? item.po_date ?? '-';
            const facilityAutName = item.facilityAutName ?? item.FacilityAutName ?? item.facility_aut_name ?? '-';
            const itemCodeAsPerTender = item.itemCodeAsPerTender ?? item.ItemCodeAsPerTender ?? item.item_code_as_per_tender ?? '-';
            const itemName = item.itemName ?? item.ItemName ?? item.item_name ?? '-';
            const poQty = Number(item.poQty ?? item.PoQty ?? item.poqty ?? item.POQTY ?? 0);
            const poValue = Number(item.poValue ?? item.PoValue ?? item.povalue ?? item.POValue ?? 0);
            const supplyQty = Number(item.supplyQty ?? item.SupplyQty ?? item.supplyqty ?? item.Supplyqty ?? 0);
            const insQty = Number(item.insQty ?? item.InsQty ?? item.insqty ?? item.InsQTY ?? 0);
            const receiptQty = Number(item.receiptQty ?? item.ReceiptQty ?? item.receiptqty ?? item.receiptQTY ?? 0);
            const lastRDate = item.lastRDate ?? item.LastRDate ?? item.LastRDate1 ?? item.last_r_date ?? '-';
            const poType = item.poType ?? item.PoType ?? item.potype ?? '-';
            const fileNo = item.fileNo ?? item.FileNo ?? item.fileno ?? '-';
            const fileDt = item.fileDt ?? item.FileDt ?? item.filedt ?? '-';
            const presentFile = item.presentFile ?? item.PresentFile ?? item.present_file ?? '-';
            const presentUserId = item.presentUserId ?? item.PresentUserId ?? item.presentuserid ?? 0;
            const toUserId = item.toUserId ?? item.ToUserId ?? item.touserid ?? 0;
            const penaltyPercent = item.penaltyPercent ?? item.PenaltyPercent ?? item.penaltypercent ?? 0;
            const reasonName = item.reasonName ?? item.ReasonName ?? item.reason_name ?? '';
            const isSolved = item.isSolved ?? item.IsSolved ?? item.issolved ?? '';
            const reasonId = item.reasonId ?? item.ReasonId ?? item.reasonid ?? 0;
            const siteStatus = item.siteStatus ?? item.SiteStatus ?? item.site_status ?? '';
            const rowNo = item.rowNo ?? item.RowNo ?? item.rowno ?? (index + 1);
            const toBePaid = Number(item.toBePaid ?? item.ToBePaid ?? item.tobepaid ?? item.tobePaid ?? (poQty - receiptQty));
            const toDate = item.toDate ?? item.ToDate ?? item.todate ?? '-';
            const entDt = item.entDt ?? item.EntDt ?? item.entDT ?? item.entry_date ?? '-';
            const conditond = item.conditond ?? item.Conditond ?? item.fitUnfit ?? item.FitUnfit ?? 'Fit For Payment';
            const finalRate = item.finalRate ?? item.FinalRate ?? 0;
            const toPaidValue = item.toPaidValue ?? item.ToPaidValue ?? item.topaidValue ?? 0;
            const finRemarks = item.finRemarks ?? item.FinRemarks ?? item.FinREmarks ?? 'Action';
            const facilityAutId = item.facilityAutId ?? item.FacilityAutId ?? item.facility_aut_id ?? 0;

            return {
              sno: index + 1,
              poId,
              PoId: poId,
              tenderNo,
              TenderNo: tenderNo,
              poNo,
              PoNo: poNo,
              supplier,
              Supplier: supplier,
              poDate,
              PoDate: poDate,
              facilityAutName,
              FacilityAutName: facilityAutName,
              itemCodeAsPerTender,
              ItemCodeAsPerTender: itemCodeAsPerTender,
              itemName,
              ItemName: itemName,
              poQty,
              PoQty: poQty,
              poValue,
              PoValue: poValue,
              supplyQty,
              SupplyQty: supplyQty,
              insQty,
              InsQty: insQty,
              receiptQty,
              ReceiptQty: receiptQty,
              lastRDate,
              LastRDate: lastRDate,
              poType,
              PoType: poType,
              fileNo,
              FileNo: fileNo,
              fileDt,
              FileDt: fileDt,
              presentFile,
              PresentFile: presentFile,
              presentUserId,
              PresentUserId: presentUserId,
              toUserId,
              ToUserId: toUserId,
              penaltyPercent,
              PenaltyPercent: penaltyPercent,
              reasonName,
              ReasonName: reasonName,
              isSolved,
              IsSolved: isSolved,
              reasonId,
              ReasonId: reasonId,
              siteStatus,
              SiteStatus: siteStatus,
              rowNo,
              RowNo: rowNo,
              toBePaid,
              ToBePaid: toBePaid,
              toDate,
              ToDate: toDate,
              entDt,
              EntDt: entDt,
              conditond,
              Conditond: conditond,
              finalRate,
              FinalRate: finalRate,
              toPaidValue,
              ToPaidValue: toPaidValue,
              finRemarks,
              FinRemarks: finRemarks,
              facilityAutId,
              FacilityAutId: facilityAutId,
            };
          });

          this.dataSource.data = this.dispatchData;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.detectChanges();
          this.loading = false;
        },
        error: (error: any) => {
          this.loading = false;
          console.error('Error fetching dashboard grid:', error);
          this.toastr.error('Failed to load Online Received / Installation dashboard data.');
        },
      });
    } catch (err: any) {
      this.loading = false;
      console.error('Unexpected error:', err);
    }
  }

  openReasonModal(poId: any) {
    this.reasonPoId = poId;
    this.selectedReasonId = '';
    this.reasonRemarks = '';
    this.GetReasons();
    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
    const modalEl = document.getElementById('ReasonModal')!;
    if (modalEl) {
      document.body.appendChild(modalEl);
      (modalEl as HTMLElement).style.zIndex = '99999';
      this.SendModal = new bootstrap.Modal(modalEl, { backdrop: true, keyboard: true, focus: true });
      this.SendModal.show();
    }
  }

  openResolveModal(poId: any) {
    this.resolvePoId = poId;
    this.selectedSorId = '';
    this.GetResolveReasons(poId);
    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
    const modalEl = document.getElementById('ResolveModal')!;
    if (modalEl) {
      document.body.appendChild(modalEl);
      (modalEl as HTMLElement).style.zIndex = '99999';
      this.SendModal = new bootstrap.Modal(modalEl, { backdrop: true, keyboard: true, focus: true });
      this.SendModal.show();
    }
  }

  saveReason(form: any) {
    if (!this.selectedReasonId) {
      this.toastr.warning('Please select a reason.');
      return;
    }
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    const payload = {
      userId:   loginData.user_id || 383,
      reasonId: Number(this.selectedReasonId),
      poNoId:   Number(this.reasonPoId),
      remarks:  this.reasonRemarks || '',
    };
    this.api.post1('GMFI/AddReason', payload).subscribe({
      next: (res: any) => {
        this.toastr.success('Hold reason added successfully!');
        if (this.SendModal) {
          this.SendModal.hide();
        }
        document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
        form.resetForm();
        this.GetDashboardGrid();
      },
      error: (err: any) => {
        console.error('Error adding reason:', err);
        this.toastr.error('Failed to add reason.');
      },
    });
  }

  saveResolve(form: any) {
    if (!this.selectedSorId) {
      this.toastr.warning('Please select a reason to resolve.');
      return;
    }
    const payload = { sorId: Number(this.selectedSorId) };
    this.api.post1('GMFI/ResolveReason', payload).subscribe({
      next: (res: any) => {
        this.toastr.success('Reason marked as resolved successfully!');
        if (this.SendModal) {
          this.SendModal.hide();
        }
        document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
        form.resetForm();
        this.GetDashboardGrid();
      },
      error: (err: any) => {
        console.error('Error resolving reason:', err);
        this.toastr.error('Failed to resolve reason.');
      },
    });
  }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  onButtonClick(poid: any) {
    this.router.navigate(['/InstallationDetails'], {
      queryParams: { poId: poid },
    });
  }

  ONOpenSanction(opid: any, file: any) {
    this.router.navigate(['/Sanction'], {
      queryParams: {
        poId: opid,
        fileNo: file || '',
      },
    });
  }

  ONOpenInvoice(poid: any) {
    this.invoiceLoading = true;
    this.invoicesData = [];
    this.invoiceHeader = null;
    this.invoiceTotalValue = 0;
    this.invoiceTotalCgst = 0;
    this.invoiceTotalSgst = 0;
    this.invoiceGrandTotal = 0;

    // Load Header
    this.api.get(`InvoicesBySO/header?poNoId=${poid}`).subscribe({
      next: (res: any) => {
        this.invoiceHeader = res || null;
      },
      error: (err: any) => {
        console.error('Error fetching invoice header:', err);
      }
    });

    // Load Invoice Lines
    this.api.get(`InvoicesBySO/list?poNoId=${poid}`).subscribe({
      next: (res: any) => {
        const list = res || [];
        if (list.length > 0) {
          this.invoicesData = list;
          this.calculateInvoiceTotals();
          this.invoiceLoading = false;
        } else {
          // Fallback to GMFI/GetInvoiceDetails
          this.api.get(`GMFI/GetInvoiceDetails/${poid}`).subscribe({
            next: (gmfiRes: any) => {
              if (Array.isArray(gmfiRes) && gmfiRes.length > 0) {
                this.invoicesData = gmfiRes.map((inv: any) => ({
                  invoiceId: inv.InvoiceID || inv.invoice_id || 0,
                  invoiceNo: inv.InvoiceNo || inv.invoice_no || '',
                  invoiceDate: inv.invoice_date || inv.InvoiceDate || '',
                  invoiceValue: Number(inv.Invalueonbill || inv.invoice_value || 0),
                  cgst: Number(inv.cgst || 0),
                  sgst: Number(inv.sgst || 0),
                  locationName: inv.location_name || '',
                  orderedQty: inv.OrderedQty || 0,
                  invoiceAbsQty: inv.InvoiceAbsQty || 0,
                  receivedDate: inv.recieved_date || ''
                }));
              }
              this.calculateInvoiceTotals();
              this.invoiceLoading = false;
            },
            error: () => {
              this.invoiceLoading = false;
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Error fetching invoice list:', err);
        this.invoiceLoading = false;
      }
    });

    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
    const modalEl = document.getElementById('InvoiceModal')!;
    if (modalEl) {
      document.body.appendChild(modalEl);
      (modalEl as HTMLElement).style.zIndex = '99999';
      this.InvoiceModal = new bootstrap.Modal(modalEl, {
        backdrop: true,
        keyboard: true,
        focus: true,
      });
      this.InvoiceModal.show();
    }
  }

  calculateInvoiceTotals() {
    this.invoiceTotalValue = this.invoicesData.reduce((acc, curr) => acc + (Number(curr.invoiceValue || curr.InvoiceValue) || 0), 0);
    this.invoiceTotalCgst = this.invoicesData.reduce((acc, curr) => acc + (Number(curr.cgst || curr.Cgst) || 0), 0);
    this.invoiceTotalSgst = this.invoicesData.reduce((acc, curr) => acc + (Number(curr.sgst || curr.Sgst) || 0), 0);
    this.invoiceGrandTotal = this.invoiceTotalValue + this.invoiceTotalCgst + this.invoiceTotalSgst;
  }

  ONOpenModal(id: any, FileNo: any): void {
    this.poID = id;
    this.FileNo = FileNo;
    this.Sendoption = 'S';
    this.sendTo = '';
    this.remarks = '';
    this.forwardDate = new Date().toISOString().split('T')[0];
    this.Getsendto();

    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
    const modalEl = document.getElementById('SendModal')!;
    if (modalEl) {
      document.body.appendChild(modalEl);
      (modalEl as HTMLElement).style.zIndex = '99999';

      this.SendModal = new bootstrap.Modal(modalEl, {
        backdrop: true,
        keyboard: true,
        focus: true,
      });
      this.SendModal.show();
    }
  }

  Getsendto() {
    this.sendTo = '';
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    const userId = loginData.user_id || 383;
    const send = this.Sendoption || 'S';

    this.api.get(`Payment/sendto/${userId}?sb=${send}`).subscribe({
      next: (res: any) => {
        this.userList = res || [];
      },
      error: (err: any) => {
        console.error('Error fetching user list for forwarding:', err);
      },
    });
  }

  saveForward(form: any) {
    this.loading = true;
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');

    const payload = {
      UserId: loginData.user_id || 383,
      ToUserId: this.sendTo,
      PonoId: this.poID,
      FileId: this.FileNo || '',
      Remarks: this.remarks,
      ForwardDate: this.forwardDate,
      Flag: this.Sendoption,
    };

    this.api.post1('Payment/forward', payload).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.toastr.success('Physical File forwarded successfully!');
        if (this.SendModal) {
          this.SendModal.hide();
        }
        document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
        form.resetForm();
        this.GetDashboardGrid();
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Error forwarding file:', err);
        this.toastr.error('Failed to forward file.');
      },
    });
  }
}
