import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';

interface EquipmentCategory {
  EqpCatId: number;
  EqpCatName: string;
}

interface ReportSpecificationItem {
  ItemId: number;
  ItemCode: string;
  ItemName: string;
  EqpCatName: string;
  HasSpecification: boolean;
}

interface EquipmentSearchOption {
  ItemId: number;
  DisplayText: string;
}

interface CategoryUploadSummary {
  CategoryId: number;
  CategoryName: string;
  Uploaded: number;
  Total: number;
}

interface ReportSpecificationSummary {
  Categories: CategoryUploadSummary[];
  TotalUploaded: number;
  TotalItems: number;
}

@Component({
  selector: 'app-report-specification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-specification.component.html',
  styleUrls: ['./report-specification.component.css'],
})
export class ReportSpecificationComponent implements OnInit {
  private readonly apiRoot = `${environment.apiUrl}/ReportSpecification/`;

  categories: EquipmentCategory[] = [];
  searchOptions: EquipmentSearchOption[] = [];
  items: ReportSpecificationItem[] = [];
  summary: ReportSpecificationSummary | null = null;
  activeSummaryKey: string | null = null;
  showAllChecked = true;

  selectedCategoryId = 0;
  searchInput = '';
  loading = false;
  editingItemId: number | null = null;
  selectedFile: File | null = null;
  uploading = false;

  constructor(
    private readonly http: HttpClient,
    private readonly toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.activeSummaryKey = 'ALL';
    this.loadCategories();
    this.loadSearchOptions();
    this.loadSummary();
    this.showAllItems();
  }

  displayCategory(name: string): string {
    return (name ?? '').trim();
  }

  loadCategories(): void {
    this.http.get<EquipmentCategory[]>(`${this.apiRoot}categories`).subscribe({
      next: (res) => {
        this.categories = this.mapCategories(res);
        if (!this.categories.length) {
          this.categories = [{ EqpCatId: 0, EqpCatName: '--SelectAll--' }];
        }
      },
      error: (e) => this.toastr.error(this.apiErrorMessage(e, 'Could not load categories.')),
    });
  }

  onCategoryDropdownChange(): void {
    this.showAllChecked = this.selectedCategoryId === 0;
    this.syncActiveSummaryFromSelection();
    this.loadSearchOptions();
    this.reloadItems();
  }

  onShowAllCheckChange(): void {
    if (this.showAllChecked) {
      this.selectedCategoryId = 0;
      this.activeSummaryKey = 'ALL';
      this.loadSearchOptions();
      this.reloadItems();
    }
  }

  filterBySummaryCategory(row: CategoryUploadSummary): void {
    this.showAllChecked = false;
    this.selectedCategoryId = row.CategoryId || this.findCategoryIdByName(row.CategoryName);
    this.activeSummaryKey = row.CategoryName.trim();
    this.searchInput = '';
    this.editingItemId = null;
    this.loadSearchOptions();
    this.reloadItems();
  }

  filterBySummaryTotal(): void {
    this.showAllChecked = true;
    this.selectedCategoryId = 0;
    this.activeSummaryKey = 'ALL';
    this.searchInput = '';
    this.editingItemId = null;
    this.loadSearchOptions();
    this.reloadItems();
  }

  loadSummary(): void {
    this.http.get<ReportSpecificationSummary>(`${this.apiRoot}summary?categoryId=0`).subscribe({
      next: (res) => (this.summary = this.mapSummary(res)),
      error: () => (this.summary = null),
    });
  }

  private findCategoryIdByName(name: string): number {
    const key = name.trim().toUpperCase();
    const match = this.categories.find((c) => c.EqpCatName.trim().toUpperCase() === key);
    return match?.EqpCatId ?? 0;
  }

  private syncActiveSummaryFromSelection(): void {
    if (this.selectedCategoryId === 0) {
      this.activeSummaryKey = 'ALL';
      return;
    }
    const cat = this.categories.find((c) => c.EqpCatId === this.selectedCategoryId);
    this.activeSummaryKey = cat?.EqpCatName?.trim() ?? null;
  }

  private reloadItems(): void {
    this.loading = true;
    this.http
      .get<ReportSpecificationItem[]>(
        `${this.apiRoot}items?categoryId=${this.selectedCategoryId}`,
      )
      .subscribe({
        next: (res) => {
          this.items = this.mapItems(res);
          this.loading = false;
        },
        error: (e) => {
          this.loading = false;
          this.toastr.error(this.apiErrorMessage(e, 'Could not load equipment items.'));
        },
      });
  }

  loadSearchOptions(): void {
    this.http
      .get<EquipmentSearchOption[]>(
        `${this.apiRoot}search-options?categoryId=${this.selectedCategoryId}`,
      )
      .subscribe({
        next: (res) => (this.searchOptions = this.mapSearchOptions(res)),
        error: (e) => this.toastr.error(this.apiErrorMessage(e, 'Could not load equipment list.')),
      });
  }

  showAllItems(): void {
    this.showAllChecked = true;
    this.selectedCategoryId = 0;
    this.activeSummaryKey = 'ALL';
    this.searchInput = '';
    this.editingItemId = null;
    this.loadSearchOptions();
    this.reloadItems();
  }

  clearAll(): void {
    this.searchInput = '';
    this.showAllItems();
  }

  onSearchPick(): void {
    const match = this.searchOptions.find((o) => o.DisplayText === this.searchInput);
    if (!match?.ItemId) {
      return;
    }
    this.loading = true;
    this.http.get<ReportSpecificationItem>(`${this.apiRoot}items/${match.ItemId}`).subscribe({
      next: (res) => {
        this.items = [this.mapItem(res)];
        this.searchInput = '';
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
        this.toastr.error(this.apiErrorMessage(e, 'Could not load selected equipment.'));
      },
    });
  }

  startEdit(itemId: number): void {
    this.editingItemId = itemId;
    this.selectedFile = null;
  }

  cancelEdit(): void {
    this.editingItemId = null;
    this.selectedFile = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      this.selectedFile = null;
      return;
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      this.toastr.warning('Only PDF files are allowed.');
      input.value = '';
      this.selectedFile = null;
      return;
    }

    if (file.size > 2_000_000) {
      this.toastr.warning('You cannot upload file more than 2 MB.');
      input.value = '';
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.toastr.info(`PDF selected: ${file.name}`);
  }

  upload(itemId: number): void {
    if (!this.selectedFile) {
      this.toastr.warning('Please select a document to upload.');
      return;
    }

    const form = new FormData();
    form.append('file', this.selectedFile, this.selectedFile.name);

    this.uploading = true;
    this.http.post(`${this.apiRoot}items/${itemId}/upload`, form).subscribe({
      next: (res: { message?: string }) => {
        this.uploading = false;
        this.editingItemId = null;
        this.selectedFile = null;
        this.toastr.success(res?.message ?? 'Uploaded Successfully.');
        this.refreshAfterChange();
      },
      error: (e) => {
        this.uploading = false;
        this.toastr.error(e?.error?.message ?? 'Upload failed.');
      },
    });
  }

  download(itemId: number): void {
    this.http
      .get(`${this.apiRoot}items/${itemId}/download`, {
        responseType: 'blob',
        observe: 'response',
      })
      .subscribe({
        next: (res) => {
          const blob = res.body;
          if (!blob) {
            this.toastr.error('File not found.');
            return;
          }
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `E_cgmscEMSRoleSpecification${itemId}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: () => this.toastr.error('Could not download file.'),
      });
  }

  private refreshAfterChange(): void {
    if (this.items.length === 1) {
      const id = this.items[0].ItemId;
      this.http.get<ReportSpecificationItem>(`${this.apiRoot}items/${id}`).subscribe({
        next: (res) => (this.items = [this.mapItem(res)]),
      });
    } else {
      this.showAllItems();
    }
    this.loadSearchOptions();
    this.loadSummary();
  }

  private mapSummary(raw: unknown): ReportSpecificationSummary {
    const o = (raw ?? {}) as Record<string, unknown>;
    const cats = Array.isArray(o['Categories'] ?? o['categories']) ? (o['Categories'] ?? o['categories']) as unknown[] : [];
    return {
      Categories: cats.map((c) => {
        const row = c as Record<string, unknown>;
        return {
          CategoryId: Number(row['CategoryId'] ?? row['categoryId'] ?? 0),
          CategoryName: String(row['CategoryName'] ?? row['categoryName'] ?? '').trim(),
          Uploaded: Number(row['Uploaded'] ?? row['uploaded'] ?? 0),
          Total: Number(row['Total'] ?? row['total'] ?? 0),
        };
      }),
      TotalUploaded: Number(o['TotalUploaded'] ?? o['totalUploaded'] ?? 0),
      TotalItems: Number(o['TotalItems'] ?? o['totalItems'] ?? 0),
    };
  }

  private mapCategories(raw: unknown): EquipmentCategory[] {
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map((r: Record<string, unknown>) => ({
      EqpCatId: Number(r['EqpCatId'] ?? r['eqpCatId'] ?? 0),
      EqpCatName: String(r['EqpCatName'] ?? r['eqpCatName'] ?? '').trim(),
    }));
  }

  private mapSearchOptions(raw: unknown): EquipmentSearchOption[] {
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map((r: Record<string, unknown>) => ({
      ItemId: Number(r['ItemId'] ?? r['itemId'] ?? 0),
      DisplayText: String(r['DisplayText'] ?? r['displayText'] ?? ''),
    }));
  }

  private mapItems(raw: unknown): ReportSpecificationItem[] {
    const arr = Array.isArray(raw) ? raw : [];
    return arr.map((r) => this.mapItem(r));
  }

  private apiErrorMessage(err: { error?: { message?: string; detail?: string } }, fallback: string): string {
    const detail = err?.error?.detail?.trim();
    const message = err?.error?.message?.trim();
    if (detail) {
      return message ? `${message} (${detail})` : detail;
    }
    return message || fallback;
  }

  private mapItem(r: Record<string, unknown> | ReportSpecificationItem): ReportSpecificationItem {
    const o = r as Record<string, unknown>;
    return {
      ItemId: Number(o['ItemId'] ?? o['itemId'] ?? 0),
      ItemCode: String(o['ItemCode'] ?? o['itemCode'] ?? ''),
      ItemName: String(o['ItemName'] ?? o['itemName'] ?? ''),
      EqpCatName: String(o['EqpCatName'] ?? o['eqpCatName'] ?? '').trim(),
      HasSpecification: Boolean(o['HasSpecification'] ?? o['hasSpecification']),
    };
  }
}
