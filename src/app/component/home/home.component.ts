import { Component, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexStroke, ApexXAxis, ApexFill, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { ApiService } from 'src/app/service/api.service';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service'; // Assuming you have a service for getting the username
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { style } from '@angular/animations';
import { Observable, catchError, finalize, forkJoin, map, of, reduce, tap } from 'rxjs';
import autoTable from 'jspdf-autotable';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import { InsertUserPageViewLogmodal} from 'src/app/Model/DashLoginDDL';
import { CommonModule, Location } from '@angular/common';
import { StockStatusModel, whstockoutin,StockOutDetailsmodel,IssuePerDetailModel,WhStockOutInDetailModel} from 'src/app/Model/DashLoginDDL';
@Component({
    selector: 'app-home',
    imports: [RouterModule, CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
 
  title: string = 'welcome';
  username: any = '';
  menuItems: {
    label: string;
    route: string;
    submenu?: { label: string; route: string }[];
    icon?: string;
  }[] = [];
  expandedMenus: { [key: string]: boolean } = {};
  nosIndent: number = 0; // Default value
  nosfac: number = 0; // Default value
  nositems: number = 0;
  mcid = 1;
  selectedCategoryRadio: any = 'Drugs';
  NormalZonal: any = 0;
  parameterNew: any;
  title1: any;
  flag:any
  totalpoitems: any;
  totalrecvalue: any;
  dropindentid: any;
  indentIssued: any;
  nooffacIndented: any;
  nosindent: any;
  totalpovalue: any;
  nositemsI: any;
  totalValuecr: any;
  nosfacility: any;
  roleName: any = localStorage.getItem('roleName');
  currentMonth = new Date().toLocaleString('default', { month: 'long' });
  MasIndentitemslist: any;
  itemid: any;
 


  

  selectedCategory: any = '';

  loadingSectionA = false;
  loadingSectionB = false;

  

  dispatch_WhStockOutInDetail: WhStockOutInDetailModel[] = [];
  WhStockOutInDetail = new MatTableDataSource<WhStockOutInDetailModel>();
  InsertUserPageViewLogdata: InsertUserPageViewLogmodal = new InsertUserPageViewLogmodal();

  pageName: string = '';
  fullUrl: string = '';
 
  vregid:any;
 

 
  



  colors = [];
  role: any = localStorage.getItem('roleName');
  labelToIconMap: { [key: string]: string } = {
    Home: 'assets/dash-icon/house.png',
    'Seasonal Drugs': 'assets/dash-icon/season.png',
    'Oracle Dashboard': 'assets/dash-icon/data-warehouse_13097508.png',
    'Health Facilities Coverage': 'assets/dash-icon/hscov.png',
    'Warehouse Information': 'assets/dash-icon/data-warehouse.png',
    'Warehouse Stock Abstract': 'assets/dash-icon/packages.png',
    'Warehouse Stock Details': 'assets/dash-icon/inventory.png',
    Devlivery: 'assets/dash-icon/fast-delivery.png',
    'Growth in Distribution': 'assets/dash-icon/distribution.png',
    'Warehouse Stock-out %': 'assets/dash-icon/out-of-stock.png',
    'ANPR Report ': 'assets/dash-icon/cctv-camera.png',
    'Near Expiry': 'assets/dash-icon/expired.png',
    'Time-Based Analysis': 'assets/dash-icon/time-to-market.png',
    'Growth In Procurment': 'assets/dash-icon/financial-profit.png',
    NOC: 'assets/dash-icon/approved.png',
    'Quality Control': 'assets/dash-icon/biochemist.png',
    Handover: 'assets/dash-icon/hand-over.png',
    'Work Order': 'assets/dash-icon/clipboard.png',
    'Running Works': 'assets/dash-icon/under-construction.png',
    'cgmsc-supplies': 'assets/dash-icon/drugs.png',
    ' Evaluation': 'assets/dash-icon/norm.png',
    'Evaluation': 'assets/dash-icon/norm.png',
    'Progress Abstract': 'assets/dash-icon/hospital.png',
    'Analysis': 'assets/dash-icon/analysis_12139646.png',
    'Tender Evaluation': 'assets/dash-icon/check-list.png',
    'Consumption Pattern': 'assets/dash-icon/consumptiondash.png',
    'Live Tender': 'assets/dash-icon/auction.png',
    'To be Tender': 'assets/dash-icon/tender.png',
    'Payment Tracker': 'assets/dash-icon/payment.png',
    'Search Work': 'assets/dash-icon/analysis.png',
    'Work Abstract': 'assets/dash-icon/analysis_.png',
    'Administrative Sanction': 'assets/dash-icon/blogger.png',
    'Land Issues': 'assets/dash-icon/barrier.png',
    'Technical Sanction': 'assets/dash-icon/deadline.png',
    'Monitoring with Geographic Coordinate': 'assets/dash-icon/planning.png',
    'District-wise Progress': 'assets/dash-icon/online-report.png',
    'Progress on Scheme': 'assets/dash-icon/online-report.png',
    'Engineer Work Tracker': 'assets/dash-icon/person.png',
    'Engineer-Works': 'assets/dash-icon/person.png',
    'Payment Time Taken': 'assets/dash-icon/saving.png',
    'Finance Dashboard': 'assets/dash-icon/dashboard.png',
    Dashboard: 'assets/dash-icon/dashboard.png',
    'Handover Insights': 'assets/dash-icon/hand-over.png',
    'Attendance': 'assets/dash-icon/deadline.png',
    'Conversation Hod ': 'assets/dash-icon/cooperation.png',
    'Tender Status': 'assets/dash-icon/dashboard.png',
    'QC Insights ': 'assets/dash-icon/biochemist.png',
    'QC Courier': 'assets/dash-icon/biochemist.png',
    'QC-Lab Issues': 'assets/dash-icon/biochemist.png',
    'Finance': 'assets/dash-icon/budget.png',
    'Supplier Pending Payments': 'assets/dash-icon/payment.png',
    'Payment': 'assets/dash-icon/payment.png',
    'DHS Dashboard': 'assets/dash-icon/online-report.png',
    'CME Dashboard': 'assets/dash-icon/online-report.png',
    'Med. Coll/Hospital Indent vs Issuance/NOC': 'assets/dash-icon/hscov.png',
    'Field Stock': 'assets/dash-icon/SDrug.png',
    'Warehouse Indent Pending': 'assets/dash-icon/drugs.png',
    'Quality Control Track': 'assets/dash-icon/biochemist.png',
    'WH Wise Stock Out': 'assets/dash-icon/out-of-stock.png',
    'Time Taken By Supplier': 'assets/dash-icon/project.png',
    'Door Delivery App Uses': 'assets/dash-icon/fast-delivery.png',
    'QC Time Taken': 'assets/dash-icon/biochemist.png',
    'Power Bi Dashboard': 'assets/dash-icon/statistics_4762703.png',
    'Tender-RC Status': 'assets/dash-icon/statistics_4762703.png',
    'PO Planning': 'assets/dash-icon/statistics_4762703.png',
    'Hold Batch History': 'assets/dash-icon/statistics_4762703.png',
    'CME Lifting Status': 'assets/dash-icon/statistics_4762703.png',
    'Noc': 'assets/dash-icon/statistics_4762703.png',
    'Warehouse Wise': 'assets/dash-icon/statistics_4762703.png',
    'Non Supply': 'assets/dash-icon/statistics_4762703.png',
    'Pipeline Supplies ': 'assets/dash-icon/data-analysis_12176877.png',
    'Current Stock': 'assets/dash-icon/stock_4965731.png',
    'ABCVEDSDE Analysis': 'assets/dash-icon/statistics_4762703.png',
    'QC Analysis': 'assets/dash-icon/biochemist.png',
    'Facility Information': 'assets/dash-icon/blogger.png',
    'Oracle Analytics': 'assets/dash-icon/statistic_12488647.png',
    'Generate Registration': 'assets/dash-icon/cv_10981874.png',
    'Company Details': 'assets/dash-icon/contract_10211425.png',
    'Financial Details': 'assets/dash-icon/data.png',
    'Manufacturing Unit': 'assets/dash-icon/factory.png',
    'Import Licence': 'assets/dash-icon/underdemo.png',
    'Loan Licence': 'assets/dash-icon/evaluation.png',
    'Certificate/Affidavit': 'assets/dash-icon/check-list.png',
    'Declearation': 'assets/dash-icon/planning.png',
    'Technical Details': 'assets/dash-icon/statistic_12488647.png',
    'Compliance Details': 'assets/dash-icon/statistics_4762703.png',
    'Global Company Prefix': 'assets/dash-icon/office_2415113.png',
    'Confirmation': 'assets/dash-icon/confirmation.png',
    'Complete Registration': 'assets/dash-icon/complete.png',

  };
  constructor(
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private api: ApiService,
    private menuService: MenuServiceService,
    private authService: HardcodedAuthenticationService,
    public basicAuthentication: BasicAuthenticationService,
    public router: Router,private location: Location,
  ) {
    this.pageName = this.location.path();
this.fullUrl = window.location.href;
    
    this.WhStockOutInDetail = new MatTableDataSource<WhStockOutInDetailModel>(
      []
    );

  


  


   

   

  
    
  }
 
 
  ngOnInit() {
    this.spinner.show();
    this.GetVendorDetailsID(sessionStorage.getItem('facilityid'));

    
      (this.username = sessionStorage.getItem('authenticatedUser'));

    this.role = this.basicAuthentication.getRole().roleName; // Fetch dynamic role from the authentication service
    console.log('SE Role:', this.role);
    this.updateMenu();
    //  this.addIconsToMenu();
    this.selectedCategory = this.menuService.getSelectedCategory();

    forkJoin([
     
    ])
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        error: () => this.toastr.error('Some data failed to load'),
      });

      this.InsertUserPageViewLog();
  
  }

  GetVendorDetailsID(supplierId: any) {
    // this.api.getVendorDetailsID(supplierId).subscribe({
    //   next: (res: any) => {
    //     if (Array.isArray(res) && res.length > 0) {
    //       this.vregid=res[0].vregid;
    //       const panno=res[0].pancardno;
    //       sessionStorage.setItem('panno',panno)
    //       console.log('Vendor vregid:', this.vregid);
    //       sessionStorage.setItem('vregid',this.vregid)
        
    //     } else {
    //       console.warn('No vendor details found.');
    //       alert('⚠️ Please generate vendor registration number.');
    //       this.router.navigate(['generate-registration']);
  
    //     }
    //   },
    //   error: (err) => {
    //     console.error('Error fetching vendor details:', err);
    //   }
    // });
  }
  

 
  menuIcons() {}
  // Method to add custom icons based on the label
  addIconsToMenu(): void {
    // Define a mapping for labels to icons
    const labelToIconMap: any = {
      Home: 'home',
      'Seasonal Drugs': 'assets/dash-icon/pill.png',
    };

    // Loop through the menu items and set the icon for each label
    this.menuItems.forEach((item) => {
      item.icon = labelToIconMap[item.label] || 'default_icon'; // Default icon if no match found
    });

    // Log the updated menuItems with icons
    console.log('Menu Items with Icons:', this.menuItems);
  }

  closeSubmenu() {
    // Loop through expanded menus and close them
    for (const key in this.expandedMenus) {
      this.expandedMenus[key] = false;
    }
  }

  private updateMenu() {
    console.log('Role:', this.role);

    // ;
    // Check if the role has categories or direct items
    const hasCategories = ['SEC1', 'DHS', 'CME'].includes(this.role);

    if (hasCategories) {
      const category = this.menuService.getSelectedCategory();
      console.log('Selected Category:', category);
      if (category) {
        this.menuItems = this.menuService.getMenuItems(this.role);
      } else {
        // Handle the case where no category is selected
        this.menuItems = [];
      }
    } else {
      // For roles without categories, fetch items directly
      this.menuItems = this.menuService.getMenuItems(this.role);
    }

    const unwantedLabels = ['EMD Drugs/Consumables', 'IWH Pendings'];
    this.menuItems = this.menuItems.filter(
      (item) => !unwantedLabels.includes(item.label)
    );
    console.log('Menu Items:', this.menuItems);
  }

  toggleSubmenu(menuLabel: string): void {
    // Toggle the clicked submenu, close all others
    for (const key in this.expandedMenus) {
      if (key !== menuLabel) {
        this.expandedMenus[key] = false; // Collapse all other menus
      }
    }
    this.expandedMenus[menuLabel] = !this.expandedMenus[menuLabel]; // Toggle current menu
  }

 

 


  




  InsertUserPageViewLog() {
    try {
      // 
      const roleIdName = localStorage.getItem('roleName') || '';
      const userId = Number(sessionStorage.getItem('userid') || 0);
      const roleId = Number(sessionStorage.getItem('roleId') || 0);
      // const userName = sessionStorage.getItem('firstname') || '';
      const ipAddress = sessionStorage.getItem('ipAddress') || '';
      const userAgent = navigator.userAgent; 
      this.InsertUserPageViewLogdata.logId = 0; 
      this.InsertUserPageViewLogdata.userId = userId;
      this.InsertUserPageViewLogdata.roleId = roleId;
      this.InsertUserPageViewLogdata.roleIdName = roleIdName;
      this.InsertUserPageViewLogdata.pageName = this.pageName;
      this.InsertUserPageViewLogdata.pageUrl = this.fullUrl;
      this.InsertUserPageViewLogdata.viewTime = new Date().toISOString();
      this.InsertUserPageViewLogdata.ipAddress = ipAddress;
      this.InsertUserPageViewLogdata.userAgent = userAgent;
      //console.log('InsertUserPageViewLogdata=',this.InsertUserPageViewLogdata);
  // if(localStorage.getItem('Log Saved')|| ''!){

  // }
      // API call
      // this.api.InsertUserPageViewLogPOST(this.InsertUserPageViewLogdata).subscribe({
      //   next: (res: any) => {
      //     console.log('Page View Log Saved:',res);
      //     // const LogSaved='Log Saved'
      //     // localStorage.setItem('Log Saved', LogSaved);
      //   },
      //   error: (err: any) => {
      //     console.error('Backend Error:', JSON.stringify(err.message));
      //   }
      // });
  
    } catch (err: any) {
      console.error('Error:', err.message);
    }
  }
  //#endregion
}





