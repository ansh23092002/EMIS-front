import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from 'src/app/service/authentication/hardcoded-authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { InsertUserLoginLogmodal } from 'src/app/Model/DashLoginDDL';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { persistSupplierUserId } from '../../Suppliers/supplier-user.util';
import { MenuServiceService } from 'src/app/service/menu-service.service';
import { json } from 'stream/consumers';
declare var bootstrap: any;
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    NgSelectModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  onButtonClick(arg0: string) {
    throw new Error('Method not implemented.');
  }
captcha: string = '';
captchaValue: string = '';

  adminDropdownList: any = [];
  cgmsclDropdownList: any = [];
  isPasswordVisible: boolean = false;
  otp: any = '';
  username: any;
  emailid: any;
  pwd: string = '';

  password: any;
  email: any;
  id: any;
  siMobile: any;
  userid: any;
  roleid: any;
  rolename: any;
  firstname: any;
  
  errorMessage = 'Invalid Credential';
  invalidLogin = false;
approle:any;



  constructor(
    public loginService: BasicAuthenticationService,
    public http: HttpClient,
    private dialog: MatDialog,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private location: Location,
    private toastr: ToastrService,
    private router: Router,
    public hardcodedAuthenticationService: HardcodedAuthenticationService,
    private menuService: MenuServiceService,
  ) {}

  days: any = 0;

  ngOnInit() {
    this.getallusers('6');
    this.loadSupplierAuthOptions();
         this.generateCaptcha();
  }

  onUserChange(event: Event): void {
    // const emailid = (event.target as HTMLSelectElement).value; // Get the selected email ID
    const selectedUser = this.adminDropdownList.find(
      (user: { emailid: string }) => user.emailid === this.emailid,
    ); // Find the user object in the list

    console.log('Selected User:', selectedUser); // Log the selected user object properly

    if (selectedUser) {
      this.siMobile = selectedUser.siMobile || null;
      this.userid = selectedUser.userid || null;
      this.roleid = selectedUser.roleid || null;
      this.rolename = selectedUser.rolename || null;
      this.firstname = selectedUser.firstname || null;

      this.setRole(this.rolename);
      sessionStorage.setItem('firstname', this.firstname);
      sessionStorage.setItem('roleId', this.roleid);
      sessionStorage.setItem('userid', this.userid);
      sessionStorage.setItem('authenticatedUser', this.emailid);
      sessionStorage.setItem('siMobile', this.siMobile);

      // Log individual values to ensure they are being set correctly
      console.log('siMobile:', this.siMobile);
      console.log('userid:', this.userid);
      console.log('roleid:', this.roleid);
      console.log('rolename:', this.rolename);
      console.log('firstname:', this.firstname);
    } else {
      console.error('Selected user not found in the list.');
    }
  }

  onUserChangeCgmscl(event: Event): void {
    // const emailid = (event.target as HTMLSelectElement).value; // Get the selected email ID
    const selectedUser = this.cgmsclDropdownList.find(
      (user: { emailid: string }) => user.emailid === this.emailid,
    ); // Find the user object in the list

    // console.log('Selected User:', selectedUser); // Log the selected user object properly

    if (selectedUser) {
      this.siMobile = selectedUser.siMobile || null;
      this.userid = selectedUser.userid || null;
      this.roleid = selectedUser.roleid || null;
      this.rolename = selectedUser.rolename || null;

      this.setRole(this.rolename);

      sessionStorage.setItem('roleId', this.roleid);
      sessionStorage.setItem('userid', this.userid);
      sessionStorage.setItem('siMobile', this.siMobile);
    } else {
      console.error('Selected user not found in the list.');
    }
  }

  setRole(approle: string) {
    const menuRole = this.resolveMenuRole(approle);
    this.approle = menuRole;
    localStorage.setItem('roleName', menuRole);
    this.loginService.setRole(menuRole);
  }

  /** Map API user_type / dropdown role to menu-service keys. */
  private resolveMenuRole(rawRole: string | null | undefined): string {
    const role = (rawRole || '').trim();
    if (!role) {
      return '';
    }
    const upper = role.toUpperCase();
    const aliases: Record<string, string> = {
      SUP: 'Suppliers',
      SUPPLIER: 'Suppliers',
      SUPPLIERS: 'Suppliers',
      FU: 'DME',
      PRINCIPAL: 'DME',
      FDA: 'DME',
      GMF: 'AUGMF',
      'GM FINANCE': 'AUGMF',
      'PO-CELL': 'AUPO',
      POCELL: 'AUPO',
    };
    return aliases[upper] || aliases[role] || role;
  }

  Manualssliddesk(URL: any) {
    if (URL) {
      // Remove '~' from the start of the URL
      // const cleanedUrl = 'https://cgmsc.gov.in/' + URL.replace(/^~\//, '');
      // console.log('Opening:', URL);
      window.open(URL, '_blank');
    } else {
      alert(
        '⚠️ Alert: Attachment File Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.',
      );
    }
  }

  ngAfterViewInit(): void {}

  togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    const ids = ['pwd', 'dmePwdInput'];
    for (const id of ids) {
      const el = document.getElementById(id) as HTMLInputElement | null;
      if (el) {
        el.type = this.isPasswordVisible ? 'text' : 'password';
      }
    }
  }

  // Shared error handler
  handleLoginFailure() {
    this.invalidLogin = true;
    this.toastr.error('Login Failed', 'Invalid Credentials');
    this.errorMessage = 'Invalid Credentials';
  }

  /**
   * DME Medical College dropdown: ng-select passes bindValue (user_id number), not { user_id }.
   */
  onUserChangeInfrastructure(selected: unknown): void {
    const selectedId =
      typeof selected === 'number'
        ? selected
        : typeof selected === 'string' && selected !== ''
          ? Number(selected)
          : selected &&
              typeof selected === 'object' &&
              'user_id' in (selected as object)
            ? Number((selected as { user_id: number }).user_id)
            : this.id != null
              ? Number(this.id)
              : NaN;

    if (!Number.isFinite(selectedId) || selectedId <= 0) {
      this.emailid = '';
      return;
    }

    const selectedUser = this.userdatas?.find(
      (user: any) => Number(user.user_id) === selectedId,
    );

    if (!selectedUser) {
      console.error('DME: user not found for user_id', selectedId);
      this.emailid = '';
      return;
    }

    this.id = selectedUser.user_id;
    this.siMobile = selectedUser.mobile ?? selectedUser.siMobile ?? null;
    this.rolename = selectedUser.role ?? selectedUser.rolename ?? 'DME';
    this.firstname =
      selectedUser.desig ??
      selectedUser.user_name ??
      selectedUser.firstname ??
      '';

    this.setRole(this.rolename);
    sessionStorage.setItem('firstname', this.firstname);
    sessionStorage.setItem(
      'authenticatedUser',
      selectedUser.e_mail_id ?? String(selectedUser.user_id),
    );
    sessionStorage.setItem('divisionID', String(selectedUser.user_id));

    // Prefer email from GET /Auth/4 list (includes e_mail_id); otherwise fetch.
    if (selectedUser.e_mail_id) {
      this.emailid = selectedUser.e_mail_id;
      this.EMAIL = 'EMAIL';
    } else {
      this.GetUserEmail(selectedId);
    }
  }

  //#region  by lomesh
  selectedStatus: any;
  selectedStatusDHS: any;
  selectedStatussup: any = '0';
  supplierUserId: number | null = null;
  supplierLoginEmail = '';
  /** login | new | reset — SUPPLIER tab (LoginEmsSUP flow) */
  supplierAuthMode: 'login' | 'new' | 'reset' = 'login';
  supplierAuthOptions: Array<{ user_id: number; user_name: string; e_mail_id: string }> = [];
  supplierAuthBusy = false;
  supplierShowOtp = false;
  supplierOtpSending = false;
  supplierOtpSubmitting = false;
  supplierProfile: {
    supplierId: number;
    name: string;
    maskedMobile: string;
    email: string;
    userEmail: string;
  } | null = null;
  supplierDesiredUserId = '';
  supplierOtp = '';
  supplierNewPassword = '';
  supplierRepeatPassword = '';
  supplierOtpMessage = '';
  userdatas: any;
  EMAIL: any;

  get supplierSelectPlaceholder(): string {
    if (this.supplierAuthMode === 'new') {
      return 'Select Supplier for New Userid';
    }
    return this.supplierAuthMode === 'reset' ? 'Select User' : 'Select Supplier';
  }

  getallusers(id: any) {
    this.api.getUsers(id).subscribe((res) => {
      this.userdatas = Array.isArray(res) ? res : [];
    });
  }

  setSupplierAuthMode(mode: 'login' | 'new' | 'reset'): void {
    this.supplierAuthMode = mode;
    this.supplierUserId = null;
    this.supplierLoginEmail = '';
    this.pwd = '';
    this.cancelSupplierOtp();
    this.loadSupplierAuthOptions();
  }

  generateCaptcha(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captcha = Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }

  private loadSupplierAuthOptions(): void {
    const listId = this.supplierAuthMode === 'new' ? 8 : 6;
    this.api.getUsers(listId).subscribe({
      next: (res: unknown) => {
        const rows = Array.isArray(res) ? res : [];
        this.supplierAuthOptions = rows
          .map((row: Record<string, unknown>) => ({
            user_id: Number(row['user_id'] ?? row['User_Id'] ?? 0),
            user_name: String(row['user_name'] ?? row['User_Name'] ?? '').trim(),
            e_mail_id: String(row['e_mail_id'] ?? row['E_Mail_Id'] ?? '').trim(),
          }))
          .filter((row) => row.user_id > 0 && row.user_name);
        this.userdatas = this.supplierAuthOptions;
        if (!this.supplierAuthOptions.length) {
          this.toastr.warning(
            this.supplierAuthMode === 'new'
              ? 'No supplier pending new User-ID.'
              : 'No supplier found.',
          );
        }
      },
      error: () => {
        this.supplierAuthOptions = [];
        this.userdatas = [];
        if (this.supplierAuthMode === 'new') {
          this.toastr.warning('No supplier pending new User-ID.');
          return;
        }
        this.toastr.error('Unable to load supplier list.');
      },
    });
  }
  // https://localhost:7036/api/Auth/GetUserEmail/5

  GetUserEmail(userid: any) {
    // debugger;
    const uid = Number(userid);
    this.api.GetUserEmail(uid).subscribe({
      next: (res) => {
        if (res?.Email) {
          this.emailid = res.Email;
        } else if (res?.UserName) {
          this.emailid = res.UserName;
        } else {
          // Auth/login accepts CAST(user_id AS VARCHAR) as username
          this.emailid = String(uid);
        }
        this.EMAIL = 'EMAIL';
      },
      error: () => {
        this.emailid = String(uid);
        this.EMAIL = 'EMAIL';
      },
    });
  }
  onStatusChange() {
    if (this.selectedStatus == '0') {
    } else if (this.selectedStatus == '1') {
    } else {
    }
  }
  onStatusChangeDHS() {
    if (this.selectedStatusDHS == '0') {
      this.getallusers('6');
    } else if (this.selectedStatusDHS == '1') {
      this.getallusers('5');
    }
  }
  onStatusChangesup() {
    if (this.selectedStatussup == '0') {
    } else if (this.selectedStatussup == '1') {
    } else {
    }
  }

  onSupplierTabSelect(): void {
    this.supplierLoginEmail = '';
    this.cancelSupplierOtp();
    if (!this.supplierUserId) {
      return;
    }
    if (this.supplierAuthMode === 'new') {
      return;
    }

    const fromList = this.getSupplierEmailFromList(this.supplierUserId);
    if (fromList) {
      this.supplierLoginEmail = fromList;
      this.EMAIL = 'EMAIL';
      return;
    }

    this.api.GetUserEmail(this.supplierUserId).subscribe({
      next: (res) => {
        this.supplierLoginEmail = this.pickSupplierEmail(res);
        this.EMAIL = 'EMAIL';
      },
      error: () => {
        this.supplierLoginEmail = '';
      },
    });
  }

  openSupplierPasswordFlow(): void {
    if (!this.supplierUserId) {
      this.toastr.warning('Please Select Supplier');
      return;
    }
    const mode = this.supplierAuthMode === 'new' ? 'new' : 'reset';
    this.supplierAuthBusy = true;
    this.api.getSupplierProfile(this.supplierUserId, mode).subscribe({
      next: (res) => {
        this.supplierAuthBusy = false;
        this.supplierProfile = {
          supplierId: Number(res.supplierId ?? res.SupplierId ?? 0),
          name: String(res.name ?? res.Name ?? '').trim(),
          maskedMobile: String(res.maskedMobile ?? res.MaskedMobile ?? '').trim(),
          email: String(res.email ?? res.Email ?? '-').trim() || '-',
          userEmail: String(res.userEmail ?? res.UserEmail ?? '').trim(),
        };
        if (!this.supplierProfile.supplierId) {
          this.toastr.error('Supplier mapping not found.');
          return;
        }
        this.supplierDesiredUserId =
          mode === 'reset'
            ? this.supplierProfile.userEmail || this.supplierLoginEmail
            : '';
        this.supplierOtp = '';
        this.supplierNewPassword = '';
        this.supplierRepeatPassword = '';
        this.supplierOtpMessage = '';
        this.supplierShowOtp = true;
      },
      error: (err) => {
        this.supplierAuthBusy = false;
        this.toastr.error(err?.error?.message ?? 'Unable to load supplier profile.');
      },
    });
  }

  sendSupplierOtp(): void {
    if (!this.supplierProfile?.supplierId) {
      this.toastr.warning('Please Select Supplier');
      return;
    }
    this.supplierOtpSending = true;
    this.api.sendSupplierOtp(this.supplierProfile.supplierId).subscribe({
      next: (res) => {
        this.supplierOtpSending = false;
        this.supplierOtpMessage = res?.message ?? 'OTP has been Sent.';
        this.toastr.success(this.supplierOtpMessage);
      },
      error: (err) => {
        this.supplierOtpSending = false;
        this.supplierOtpMessage = err?.error?.message ?? 'Failed to send OTP.';
        this.toastr.error(this.supplierOtpMessage);
      },
    });
  }

  submitSupplierPassword(): void {
    if (!this.supplierProfile?.supplierId) {
      this.toastr.warning('Please Select Supplier');
      return;
    }
    if (!this.supplierOtp?.trim()) {
      this.toastr.warning('Please Submit 4 digit OTP sent on your mobile.');
      return;
    }
    if (this.supplierNewPassword !== this.supplierRepeatPassword) {
      this.toastr.error('Both New Password & Retype Password Not Matched');
      return;
    }
    if (this.supplierAuthMode === 'new' && !this.supplierDesiredUserId?.trim()) {
      this.toastr.warning('Please enter desired user id.');
      return;
    }
    const mode = this.supplierAuthMode === 'new' ? 'new' : 'reset';
    this.supplierOtpSubmitting = true;
    this.api
      .completeSupplierPassword({
        supplierId: this.supplierProfile.supplierId,
        otp: this.supplierOtp.trim(),
        newPassword: this.supplierNewPassword,
        repeatPassword: this.supplierRepeatPassword,
        mode,
        desiredUserId: mode === 'new' ? this.supplierDesiredUserId.trim() : '',
      })
      .subscribe({
        next: (res) => {
          this.supplierOtpSubmitting = false;
          this.toastr.success(
            res?.message ?? 'Your have Succesully Generated/Reset Password,Please Login in EMIS',
          );
          this.setSupplierAuthMode('login');
        },
        error: (err) => {
          this.supplierOtpSubmitting = false;
          this.supplierOtpMessage = err?.error?.message ?? 'Password Not Saved';
          this.toastr.error(this.supplierOtpMessage);
        },
      });
  }

  cancelSupplierOtp(): void {
    this.supplierShowOtp = false;
    this.supplierProfile = null;
    this.supplierDesiredUserId = '';
    this.supplierOtp = '';
    this.supplierNewPassword = '';
    this.supplierRepeatPassword = '';
    this.supplierOtpMessage = '';
    this.supplierOtpSending = false;
    this.supplierOtpSubmitting = false;
    this.supplierAuthBusy = false;
  }

  private getSupplierEmailFromList(userId: number): string {
    const selected = this.supplierAuthOptions.find((row) => row.user_id === userId);
    return selected?.e_mail_id?.trim() ?? '';
  }

  private pickSupplierEmail(res: {
    Email?: string;
    email?: string;
    e_mail_id?: string;
    UserName?: string;
  } | null | undefined): string {
    return (res?.Email ?? res?.email ?? res?.e_mail_id ?? res?.UserName ?? '').trim();
  }

  handleSupplierLogin(): void {
    if (!this.supplierUserId) {
      this.toastr.warning('Please select supplier.');
      return;
    }

    if (!this.pwd.trim()) {
      this.toastr.error('Password is required.');
      return;
    }

    const loginWithEmail = (email: string) => {
      if (!email?.trim()) {
        this.toastr.error('User id not found for selected supplier.');
        return;
      }

      sessionStorage.clear();
      localStorage.clear();
      this.loginService.logout();
      this.menuService.clearSelectedCategory();

      this.loginService
        .executeAuthenticationService1(email.trim(), this.pwd.trim(), 'EMAIL')
        .subscribe({
          next: (res: any) => {
            if (res?.message === 'Login Successful' || res?.message === 'Successfully Login') {
              localStorage.setItem('loginData', JSON.stringify(res));
              if (res?.token) {
                sessionStorage.setItem('token', res.token);
              }
              sessionStorage.setItem('authenticatedUser', email.trim());
              sessionStorage.setItem('firstname', res?.username ?? 'Supplier');
              sessionStorage.setItem('roleId', res?.roleid ?? '');
              const uid = persistSupplierUserId(
                res?.user_id ?? res?.User_Id ?? res?.userId ?? res?.UserId,
              );
              if (!uid) {
                this.toastr.error('Login succeeded but user id is missing. Please contact support.');
                return;
              }
              this.setRole('Suppliers');
              this.toastr.success('Login successful');
              this.router.navigate(['/welcome']);
            } else {
              this.toastr.error('Login failed');
            }
          },
          error: (err) => {
            this.toastr.error(err?.error?.message ?? 'Invalid credentials', 'Login Failed');
          },
        });
    };

    if (this.supplierLoginEmail?.trim()) {
      loginWithEmail(this.supplierLoginEmail);
      return;
    }

    const fromList = this.getSupplierEmailFromList(this.supplierUserId);
    if (fromList) {
      loginWithEmail(fromList);
      return;
    }

    this.api.GetUserEmail(this.supplierUserId).subscribe({
      next: (res) => {
        this.supplierLoginEmail = this.pickSupplierEmail(res);
        loginWithEmail(this.supplierLoginEmail);
      },
      error: () => {
        this.toastr.error('Unable to load user id for selected supplier.');
      },
    });
  }

  async handleCgmsclLogin1() {
   
if (this.captchaValue !== this.captcha) {
  this.toastr.error('Incorrect CAPTCHA. Please try again.');
  this.generateCaptcha(); 
  this.captchaValue = ''; 
  return;
}


    if (!this.emailid || !this.pwd) {
      this.toastr.error('User and Password required');
      return;
    }

    sessionStorage.clear();
    localStorage.clear();
    this.loginService.logout();
    this.menuService.clearSelectedCategory();

    const user_id = this.emailid.toString().trim();
    this.pwd = (this.pwd ?? '').trim();

    this.loginService
      .executeAuthenticationService1(user_id, this.pwd, this.EMAIL)
      .subscribe({
        next: (res: any) => {
          // console.log('res:', res);
          // localStorage.setItem('loginData', JSON.stringify(res));
          console.log('res:', res);

// 1. Response ki ek shallow copy bana lo taaki original data directly mutate na ho
let updatedRes = { ...res };

// 2. Check karo agar username 'PO-Cell' hai
if (updatedRes.username === 'PO-Cell') {
  // user_type ko badal kar 'AUPO' kar do
  updatedRes.user_type = 'AUPO'; 
}

if (updatedRes.username === 'GM Finance') {

  updatedRes.user_type = 'AUGMF'; 
}
if (updatedRes.username === 'Tender-Cell') {

  updatedRes.user_type = 'TPOT'; 
}

// 3. Ab modified ya normal (else ki zarurat nahi padegi kyuki condition match nahi hui toh purana hi rahega) 
// response ko localStorage mein set kar do
localStorage.setItem('loginData', JSON.stringify(updatedRes));

          if (
            res?.message === 'Login Successful' ||
            res?.message === 'Successfully Login'
          ) {
            this.invalidLogin = false;
            this.toastr.success('Logged in Successfully');

            if (res?.token) {
              sessionStorage.setItem('token', res.token);
            }

            // Persist user id for supplier APIs (session + localStorage)
            persistSupplierUserId(
              updatedRes?.user_id ?? updatedRes?.User_Id ?? updatedRes?.userId ?? updatedRes?.UserId,
            );

            const role = String(updatedRes?.user_type ?? res?.user_type ?? '').toUpperCase();
            console.log('User Role:', role);
            this.setRole(updatedRes?.user_type ?? res?.user_type ?? role);

            // this.InsertUserPageViewLog();

            if (role === 'FU' || role === 'PRINCIPAL' || role === 'FDA') {
              if (
                String(updatedRes?.flagPwdChange ?? res?.flagPwdChange ?? '').toUpperCase() === 'N'
              ) {
                this.router.navigate(['/change-password'], { queryParams: { reason: '1' } });
              } else {
                this.router.navigate(['/masters/store-home']);
              }
            } else if (
              role === 'AD' ||
              role === 'AU' ||
              role === 'AAO' ||
              role === 'AYUSH' ||
              role === 'CGMSC' ||
              role === 'CON' ||
              role === 'DHS' ||
              role === 'DKS' ||
              role === 'DME' ||
              role === 'DMT' ||
              role === 'GMF' ||
              role === 'IT' ||
              role === 'SCI' ||
              role === 'SUP' ||
              role === 'TPO' ||
              role === 'AUPO' ||
              role === 'AUGMF'
            ) {
              this.router.navigate(['/welcome']);
            } else if (role === 'QC') {
              this.router.navigate(['/qc-dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            this.handleLoginFailure();
          }
        },

        error: (e: any) => {
          console.log('error=', e);
          const msg = e?.error?.message ?? 'Invalid Credentials';
          this.toastr.error(msg, 'Login Failed');
          this.invalidLogin = true;
          this.errorMessage = msg;
        },
      });
  }

  //#endregion
}
