import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { DmePageSkeletonComponent } from '../DME/shared/dme-page-skeleton/dme-page-skeleton.component';
import { ApiService } from '../../service/api.service';
import { PaymentListDetails } from '../../Model/models';
import { Router, ActivatedRoute } from '@angular/router';

declare var bootstrap: any;

interface VariantConfig {
  title: string;
  showEquipmentFilter: boolean;
  accent: string;
  showDispatchQty: boolean;
  showInstallQty: boolean;
  showFitStatus: boolean;
  showPresentFile: boolean;
  showFileNo: boolean;
  showLastRDate: boolean;
  showDirectorate: boolean;
  showSupplier: boolean;
  showItemName: boolean;
  showTenderNo: boolean;
  showPOValue: boolean;
}

const VARIANT_MAP: Record<string, VariantConfig> = {
  dm: {
    title: 'File Movement Based on FIFO (DM)',
    showEquipmentFilter: false, accent: '#2563eb',
    showDispatchQty: true, showInstallQty: true, showFitStatus: true,
    showPresentFile: true, showFileNo: true, showLastRDate: true,
    showDirectorate: true, showSupplier: true, showItemName: true,
    showTenderNo: true, showPOValue: true,
  },
  fin: {
    title: 'Indent PO / Tender Status (Finance)',
    showEquipmentFilter: false, accent: '#059669',
    showDispatchQty: true, showInstallQty: true, showFitStatus: true,
    showPresentFile: true, showFileNo: true, showLastRDate: true,
    showDirectorate: true, showSupplier: true, showItemName: true,
    showTenderNo: true, showPOValue: true,
  },
  gm: {
    title: 'Indent PO / Tender Status (GM)',
    showEquipmentFilter: true, accent: '#7c3aed',
    showDispatchQty: true, showInstallQty: true, showFitStatus: true,
    showPresentFile: true, showFileNo: true, showLastRDate: true,
    showDirectorate: true, showSupplier: true, showItemName: true,
    showTenderNo: true, showPOValue: true,
  },
  igm: {
    title: 'FIFO Desk (IGM)',
    showEquipmentFilter: false, accent: '#ea580c',
    showDispatchQty: true, showInstallQty: true, showFitStatus: true,
    showPresentFile: true, showFileNo: true, showLastRDate: true,
    showDirectorate: true, showSupplier: true, showItemName: true,
    showTenderNo: true, showPOValue: true,
  },
  'fin-file': {
    title: 'File Movement (Finance File)',
    showEquipmentFilter: false, accent: '#0891b2',
    showDispatchQty: true, showInstallQty: true, showFitStatus: true,
    showPresentFile: true, showFileNo: true, showLastRDate: true,
    showDirectorate: true, showSupplier: true, showItemName: true,
    showTenderNo: true, showPOValue: true,
  },
  'fin-file-v1': {
    title: 'File Movement (Finance File Ver1)',
    showEquipmentFilter: false, accent: '#0891b2',
    showDispatchQty: true, showInstallQty: true, showFitStatus: true,
    showPresentFile: true, showFileNo: true, showLastRDate: true,
    showDirectorate: true, showSupplier: true, showItemName: true,
    showTenderNo: true, showPOValue: true,
  },
  'gm-new': {
    title: 'File Movement (GM New)',
    showEquipmentFilter: true, accent: '#7c3aed',
    showDispatchQty: true, showInstallQty: true, showFitStatus: true,
    showPresentFile: true, showFileNo: true, showLastRDate: true,
    showDirectorate: true, showSupplier: true, showItemName: true,
    showTenderNo: true, showPOValue: true,
  },
  'igm-mov': {
    title: 'File Movement (IGM Movement)',
    showEquipmentFilter: false, accent: '#dc2626',
    showDispatchQty: true, showInstallQty: true, showFitStatus: true,
    showPresentFile: true, showFileNo: true, showLastRDate: true,
    showDirectorate: true, showSupplier: true, showItemName: true,
    showTenderNo: true, showPOValue: true,
  },
  'igm-mov-audit': {
    title: 'File Movement (IGM Movement Audit)',
    showEquipmentFilter: false, accent: '#dc2626',
    showDispatchQty: true, showInstallQty: true, showFitStatus: true,
    showPresentFile: true, showFileNo: true, showLastRDate: true,
    showDirectorate: true, showSupplier: true, showItemName: true,
    showTenderNo: true, showPOValue: true,
  },
  'igm-mov-bme': {
    title: 'File Movement (IGM Movement BME)',
    showEquipmentFilter: true, accent: '#dc2626',
    showDispatchQty: true, showInstallQty: true, showFitStatus: true,
    showPresentFile: true, showFileNo: true, showLastRDate: true,
    showDirectorate: true, showSupplier: true, showItemName: true,
    showTenderNo: true, showPOValue: true,
  },
};

@Component({
  selector: 'app-file-mrcdashbord',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    DmePageSkeletonComponent,
  ],
  templateUrl: './file-mrcdashbord.component.html',
  styleUrls: ['./file-mrcdashbord.component.css'],
})
export class FileMRCDashbordComponent {
  poType = 'All';
  paymentType = 'All';
  onlyMyDesk = false;
  equipmentType = '0';
  loading = false;

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = [
    'sno',
    'PoNo',
    'PoDate',
    'POQty',
    'POValue',
    'SupplyQty',
    'ReceiptQty',
    'InstallationQty',
    'FitUnfit',
    'PresentFile',
    'FileNo',
    'LastRDate',
    'FacilityAutName',
    'Supplier',
    'ItemName',
    'TenderNo',
    'invoice',
    'action',
    'Present_File_Action',
  ];

  @ViewChild('sort') sort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;

  sendModal: any;
  poID: number | null = null;
  fileNo: string = '';
  sendTo: number | null = null;
  sendOption: string = 'S';
  remarks: string = '';
  forwardDate: string = '';
  userList: any[] = [];

  invoiceModal: any;
  invoiceLoading = false;
  invoiceHeader: any = null;
  invoicesData: any[] = [];
  invoiceTotalValue: number = 0;
  invoiceTotalCgst: number = 0;
  invoiceTotalSgst: number = 0;
  invoiceGrandTotal: number = 0;

  constructor(
    private readonly api: ApiService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.route.data.subscribe((data) => {
      this.variant = data['variant'] || 'dm';
      this.config = VARIANT_MAP[this.variant] || VARIANT_MAP['dm'];
      this.buildColumns();
    });
  }

  private buildColumns(): void {
    const c = this.config;
    const cols: string[] = ['sno', 'PoNo', 'PoDate', 'POQty'];
    if (c.showPOValue) cols.push('POValue');
    if (c.showDispatchQty) cols.push('SupplyQty');
    cols.push('ReceiptQty');
    if (c.showInstallQty) cols.push('InstallationQty');
    if (c.showFitStatus) cols.push('FitUnfit');
    if (c.showPresentFile) cols.push('PresentFile');
    if (c.showFileNo) cols.push('FileNo');
    if (c.showLastRDate) cols.push('LastRDate');
    if (c.showDirectorate) cols.push('FacilityAutName');
    if (c.showSupplier) cols.push('Supplier');
    if (c.showItemName) cols.push('ItemName');
    if (c.showTenderNo) cols.push('TenderNo');
    cols.push('action', 'Present_File_Action');
    this.displayedColumns = cols;
  }

  ngOnInit(): void {
    this.loadGrid();
  }

  loadGrid(): void {
    this.loading = true;
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    const userId = loginData.user_id || 0;

    const params: any = {
      Potype: this.poType,
      FitUnfit: this.paymentType,
      UserId: this.onlyMyDesk ? userId : 0,
      MyDeskFile: this.onlyMyDesk,
    };

    this.api.get('Payment/GetFitPaymentList', { params }).subscribe({
      next: (res: any) => {
        const rawList = res || [];
        const data = rawList.map((item: any, i: number) => {
          const poId = item.PoId || item.poId || item.po_id || 0;
          const poNo = item.PoNo || item.poNo || item.po_no || '-';
          const poDate = item.PoDate || item.poDate || item.po_date || '-';
          const poQty = Number(item.POQty || item.poQty || item.quantity || item.po_qty || 0);
          const poValue = Number(item.POValue || item.poValue || item.totalprice || item.po_value || 0);
          const supplyQty = Number(item.SupplyQty || item.supplyQty || item.Supplyqty || item.supply_qty || 0);
          const receiptQty = Number(item.ReceiptQty || item.receiptQty || item.receiptQTY || item.receipt_qty || 0);
          const installationQty = Number(item.InstallationQty || item.installationQty || item.instalationQty || item.insQty || item.insqty || 0);
          const fitUnfit = item.FitUnfit || item.fitUnfit || item.fitunfit || (item.Conditond || item.conditond || '-');
          const presentFile = item.PresentFile || item.presentFile || item.Present_File || '-';
          const fileNo = item.FileNo || item.fileNo || item.fileno || '-';
          const lastRDate = item.LastRDate || item.lastRDate || item.LastRDate1 || item.lastRDate1 || '-';
          const facilityAutName = item.FacilityAutName || item.facilityAutName || item.facility_aut_name || '-';
          const supplier = item.Supplier || item.supplier || item.SupplierName || item.supplier_name || '-';
          const itemName = item.ItemName || item.itemName || item.item_name || '-';
          const tenderNo = item.TenderNo || item.tenderNo || item.tender_no || '-';

          return {
            ...item,
            sno: i + 1,
            PoId: poId,
            poId,
            PoNo: poNo,
            poNo,
            PoDate: poDate,
            poDate,
            POQty: poQty,
            poQty,
            POValue: poValue,
            poValue,
            SupplyQty: supplyQty,
            supplyQty,
            ReceiptQty: receiptQty,
            receiptQty,
            InstallationQty: installationQty,
            installationQty,
            FitUnfit: fitUnfit,
            fitUnfit,
            PresentFile: presentFile,
            presentFile,
            FileNo: fileNo,
            fileNo,
            LastRDate: lastRDate,
            lastRDate,
            FacilityAutName: facilityAutName,
            facilityAutName,
            Supplier: supplier,
            supplier,
            ItemName: itemName,
            itemName,
            TenderNo: tenderNo,
            tenderNo,
          };
        });

        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
        console.error('Error fetching file movement data:', err);
        this.toastr.error('Failed to load file movement data.');
      },
    });
  }

  onInstallationDownload(poId: number): void {
    this.router.navigate(['/InstallationDetails'], { queryParams: { poId } });
  }

  openInvoiceModal(poId: number): void {
    this.invoiceLoading = true;
    this.invoicesData = [];
    this.invoiceHeader = null;
    this.invoiceTotalValue = 0;
    this.invoiceTotalCgst = 0;
    this.invoiceTotalSgst = 0;
    this.invoiceGrandTotal = 0;

    // Load Header
    this.api.get(`InvoicesBySO/header?poNoId=${poId}`).subscribe({
      next: (res: any) => {
        this.invoiceHeader = res || null;
      },
      error: (err: any) => console.error('Error fetching invoice header:', err)
    });

    // Load Invoice Lines
    this.api.get(`InvoicesBySO/list?poNoId=${poId}`).subscribe({
      next: (res: any) => {
        const list = res || [];
        if (list.length > 0) {
          this.invoicesData = list;
          this.calculateInvoiceTotals();
          this.invoiceLoading = false;
        } else {
          // Fallback to GMFI/GetInvoiceDetails
          this.api.get(`GMFI/GetInvoiceDetails/${poId}`).subscribe({
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
    const modalEl = document.getElementById('dashInvoiceModal');
    if (modalEl) {
      document.body.appendChild(modalEl);
      (modalEl as HTMLElement).style.zIndex = '99999';
      this.invoiceModal = new bootstrap.Modal(modalEl, { backdrop: true, keyboard: true });
      this.invoiceModal.show();
    }
  }

  calculateInvoiceTotals(): void {
    this.invoiceTotalValue = this.invoicesData.reduce((acc, curr) => acc + (Number(curr.invoiceValue || curr.InvoiceValue) || 0), 0);
    this.invoiceTotalCgst = this.invoicesData.reduce((acc, curr) => acc + (Number(curr.cgst || curr.Cgst) || 0), 0);
    this.invoiceTotalSgst = this.invoicesData.reduce((acc, curr) => acc + (Number(curr.sgst || curr.Sgst) || 0), 0);
    this.invoiceGrandTotal = this.invoiceTotalValue + this.invoiceTotalCgst + this.invoiceTotalSgst;
  }

  openSendModal(poId: number, fileNo: string): void {
    this.poID = poId;
    this.fileNo = fileNo || '';
    this.sendTo = null;
    this.sendOption = 'S';
    this.remarks = '';
    this.forwardDate = new Date().toISOString().split('T')[0];
    this.userList = [];
    this.loadSendToUsers();

    document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
    const modalEl = document.getElementById('sendModal');
    if (modalEl) {
      document.body.appendChild(modalEl);
      (modalEl as HTMLElement).style.zIndex = '99999';
      this.sendModal = new bootstrap.Modal(modalEl, { backdrop: true, keyboard: true });
      this.sendModal.show();
    }
  }

  loadSendToUsers(): void {
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    const userId = loginData.user_id || 0;
    this.api.get(`Payment/sendto/${userId}?sb=${this.sendOption}`).subscribe({
      next: (res: any) => (this.userList = res || []),
      error: () => this.toastr.error('Failed to load user list.'),
    });
  }

  onSendOptionChange(): void {
    this.loadSendToUsers();
  }

  saveForward(): void {
    if (!this.sendTo) {
      this.toastr.warning('Select a user to send to.');
      return;
    }
    if (!this.remarks) {
      this.toastr.warning('Enter remarks.');
      return;
    }
    if (!this.forwardDate) {
      this.toastr.warning('Select forward date.');
      return;
    }

    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    const payload = {
      UserId: loginData.user_id || 0,
      ToUserId: this.sendTo,
      PonoId: this.poID,
      FileId: this.fileNo,
      Remarks: this.remarks,
      ForwardDate: this.forwardDate,
      Flag: this.sendOption,
    };

    this.api.post1('Payment/forward', payload).subscribe({
      next: () => {
        this.toastr.success('File forwarded successfully!');
        if (this.sendModal) {
          this.sendModal.hide();
        }
        document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
        this.loadGrid();
      },
      error: () => this.toastr.error('Failed to forward file.'),
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
