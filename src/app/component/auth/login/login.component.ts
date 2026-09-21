import {
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasicAuthenticationService } from 'src/app/service/authentication/basic-authentication.service';
import { ApiService } from 'src/app/service/api.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { persistSupplierUserId } from '../../Suppliers/supplier-user.util';
import { MenuServiceService } from 'src/app/service/menu-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
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
  approle: any;

  selectedStatus: string = '0';
  selectedStatusDHS: string = '0';
  selectedStatussup: string = '0';
  currentTab: string = 'ADMIN';

  supplierUserId: number | null = null;
  supplierLoginEmail = '';
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
  userdatas: any = [];
  EMAIL: any = '';

  constructor(
    public loginService: BasicAuthenticationService,
    public http: HttpClient,
    private dialog: MatDialog,
    private api: ApiService,
    private location: Location,
    private toastr: ToastrService,
    private router: Router,
    private menuService: MenuServiceService,
  ) {}

  ngOnInit(): void {
    this.selectedStatus = '0';
    this.selectedStatusDHS = '0';
    this.currentTab = 'ADMIN';
    this.getallusers('1'); // Default Administrator
    this.generateCaptcha();
  }

  ngAfterViewInit(): void {}

  onTabClick(tab: string): void {
    this.currentTab = tab;
    this.emailid = null;
    this.id = null;
    this.pwd = '';
    this.captchaValue = '';
    this.generateCaptcha();

    if (tab === 'ADMIN') {
      this.selectedStatus = this.selectedStatus || '0';
      const apiId = this.selectedStatus === '0' ? '1' : this.selectedStatus === '1' ? '2' : '3';
      this.getallusers(apiId);
    } else if (tab === 'DME') {
      this.getallusers('4');
    } else if (tab === 'DHS') {
      this.selectedStatusDHS = this.selectedStatusDHS || '0';
      const apiId = this.selectedStatusDHS === '0' ? '2' : '5';
      this.getallusers(apiId);
    } else if (tab === 'SUPPLIER') {
      this.setSupplierAuthMode(this.supplierAuthMode || 'login');
    }
  }

  get supplierSelectPlaceholder(): string {
    if (this.supplierAuthMode === 'new') {
      return 'Select Supplier for New User-ID';
    }
    return this.supplierAuthMode === 'reset' ? 'Select User Supplier' : 'Select Supplier User';
  }

  getallusers(id: any): void {
    this.api.getUsers(id).subscribe({
      next: (res) => {
        this.userdatas = Array.isArray(res) ? res : [];
      },
      error: () => {
        this.userdatas = [];
      },
    });
  }

  onUserChange(event: Event): void {
    const selectedUser = this.adminDropdownList.find(
      (user: { emailid: string }) => user.emailid === this.emailid,
    );

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
    }
  }

  onUserChangeCgmscl(event: any): void {
    const selectedId = typeof event === 'object' && event !== null ? event.user_id : event;
    const selectedUser = this.userdatas?.find(
      (user: any) => user.user_id === selectedId || user.user_id === this.emailid,
    );

    if (selectedUser) {
      this.siMobile = selectedUser.siMobile || null;
      this.userid = selectedUser.user_id || null;
      this.roleid = selectedUser.roleid || null;
      this.rolename = selectedUser.user_type || selectedUser.rolename || null;
      this.firstname = selectedUser.user_name || null;
      this.EMAIL = '';
      if (this.rolename) {
        this.setRole(this.rolename);
      }
      if (this.roleid) sessionStorage.setItem('roleId', this.roleid);
      if (this.userid) sessionStorage.setItem('userid', this.userid);
      if (this.siMobile) sessionStorage.setItem('siMobile', this.siMobile);
    }
  }

  setRole(approle: string): void {
    const menuRole = this.resolveMenuRole(approle);
    this.approle = menuRole;
    localStorage.setItem('roleName', menuRole);
    this.loginService.setRole(menuRole);
  }

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

  Manualssliddesk(URL: any): void {
    if (URL) {
      window.open(URL, '_blank');
    } else {
      alert(
        '⚠️ Alert: Attachment File Not Found!\n\nThe requested document is missing.\nPlease try again later or contact support.',
      );
    }
  }

  togglePassword(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    const ids = ['pwd', 'dmePwdInput', 'dhs_pwd_input', 'dhs_pwd_cmho'];
    for (const id of ids) {
      const el = document.getElementById(id) as HTMLInputElement | null;
      if (el) {
        el.type = this.isPasswordVisible ? 'text' : 'password';
      }
    }
  }

  handleLoginFailure(): void {
    this.invalidLogin = true;
    this.toastr.error('Login Failed', 'Invalid Credentials');
    this.errorMessage = 'Invalid Credentials';
    this.generateCaptcha();
    this.captchaValue = '';
  }

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

    if (selectedUser.e_mail_id) {
      this.emailid = selectedUser.e_mail_id;
      this.EMAIL = 'EMAIL';
    } else {
      this.GetUserEmail(selectedId);
    }
  }

  setSupplierAuthMode(mode: 'login' | 'new' | 'reset'): void {
    this.supplierAuthMode = mode;
    this.supplierUserId = null;
    this.supplierLoginEmail = '';
    this.pwd = '';
    this.captchaValue = '';
    this.cancelSupplierOtp();
    this.loadSupplierAuthOptions();
    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
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

  GetUserEmail(userid: any): void {
    const uid = Number(userid);
    this.api.GetUserEmail(uid).subscribe({
      next: (res) => {
        if (res?.Email) {
          this.emailid = res.Email;
        } else if (res?.UserName) {
          this.emailid = res.UserName;
        } else {
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

  onStatusChangeAdmin(status: string): void {
    this.selectedStatus = status;
    this.emailid = null;
    this.pwd = '';
    this.captchaValue = '';
    this.generateCaptcha();
    const apiId = status === '0' ? '1' : status === '1' ? '2' : '3';
    this.getallusers(apiId);
  }

  onStatusChangeDHS(status: string): void {
    this.selectedStatusDHS = status;
    this.emailid = null;
    this.pwd = '';
    this.captchaValue = '';
    this.generateCaptcha();
    const apiId = status === '0' ? '2' : '5';
    this.getallusers(apiId);
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
            res?.message ?? 'You have successfully generated/reset password. Please login in EMIS.',
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
    if (!this.captchaValue || this.captchaValue.trim().toLowerCase() !== this.captcha.trim().toLowerCase()) {
      this.toastr.error('Incorrect CAPTCHA. Please try again.');
      this.generateCaptcha();
      this.captchaValue = '';
      return;
    }

    if (!this.supplierUserId) {
      this.toastr.warning('Please select supplier.');
      return;
    }

    if (!this.pwd?.trim()) {
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
              this.handleLoginFailure();
            }
          },
          error: (err) => {
            this.handleLoginFailure();
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

  async handleCgmsclLogin1(): Promise<void> {
    if (!this.captchaValue || this.captchaValue.trim().toLowerCase() !== this.captcha.trim().toLowerCase()) {
      this.toastr.error('Incorrect CAPTCHA. Please try again.');
      this.generateCaptcha();
      this.captchaValue = '';
      return;
    }

    const userIdToSubmit = this.emailid ?? this.id;
    if (!userIdToSubmit || !this.pwd?.trim()) {
      this.toastr.error('User and Password required');
      return;
    }

    sessionStorage.clear();
    localStorage.clear();
    this.loginService.logout();
    this.menuService.clearSelectedCategory();

    const user_id = userIdToSubmit.toString().trim();
    const password = (this.pwd ?? '').trim();
    const emailFlag = this.EMAIL || '';

    this.loginService
      .executeAuthenticationService1(user_id, password, emailFlag)
      .subscribe({
        next: (res: any) => {
          console.log('res:', res);

          let updatedRes = { ...res };

          if (updatedRes.username === 'PO-Cell') {
            updatedRes.user_type = 'AUPO';
          }
          if (updatedRes.username === 'GM Finance') {
            updatedRes.user_type = 'AUGMF';
          }
          if (updatedRes.username === 'Tender-Cell') {
            updatedRes.user_type = 'TPOT';
          }
          if (this.currentTab === 'DME') {
            if (
              !updatedRes.user_type ||
              updatedRes.user_type === 'User' ||
              updatedRes.user_type === 'FU' ||
              updatedRes.user_type === 'FDA' ||
              updatedRes.user_type === 'PRINCIPAL'
            ) {
              updatedRes.user_type = 'DME';
            }
          }
          if (this.currentTab === 'DHS') {
            if (
              !updatedRes.user_type ||
              updatedRes.user_type === 'User' ||
              updatedRes.user_type.toUpperCase() === 'USER'
            ) {
              updatedRes.user_type = 'DHS';
            }
          }

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

            persistSupplierUserId(
              updatedRes?.user_id ?? updatedRes?.User_Id ?? updatedRes?.userId ?? updatedRes?.UserId,
            );

            const roleIdVal = String(
              updatedRes?.roleid ?? res?.roleid ?? (this.currentTab === 'DME' ? '12' : (this.currentTab === 'DHS' ? '2' : '')),
            );
            if (roleIdVal) {
              sessionStorage.setItem('roleId', roleIdVal);
              localStorage.setItem('roleId', roleIdVal);
            }
            const userIdVal = String(
              updatedRes?.user_id ?? res?.user_id ?? this.id ?? '',
            );
            if (userIdVal) {
              sessionStorage.setItem('userid', userIdVal);
              sessionStorage.setItem('divisionID', userIdVal);
              sessionStorage.setItem('facilityid', userIdVal);
            }
            const userNameVal = String(
              updatedRes?.username ?? res?.username ?? this.firstname ?? '',
            );
            if (userNameVal) {
              sessionStorage.setItem('firstname', userNameVal);
            }
            const authUserVal = String(
              updatedRes?.email ?? res?.email ?? this.emailid ?? userIdVal,
            );
            if (authUserVal) {
              sessionStorage.setItem('authenticatedUser', authUserVal);
            }

            const rawRole = String(
              updatedRes?.user_type ?? res?.user_type ?? (this.currentTab === 'DME' ? 'DME' : ''),
            ).toUpperCase();
            const resolvedRole = this.resolveMenuRole(rawRole);
            this.setRole(resolvedRole);

            if (
              this.currentTab === 'DME' ||
              resolvedRole === 'DME' ||
              rawRole === 'FU' ||
              rawRole === 'PRINCIPAL' ||
              rawRole === 'FDA'
            ) {
              if (
                String(updatedRes?.flagPwdChange ?? res?.flagPwdChange ?? '').toUpperCase() === 'N'
              ) {
                this.router.navigate(['/change-password'], { queryParams: { reason: '1' } });
              } else {
                this.router.navigate(['/masters/store-home']);
              }
            } else if (
              resolvedRole === 'AD' ||
              resolvedRole === 'AU' ||
              resolvedRole === 'AAO' ||
              resolvedRole === 'AYUSH' ||
              resolvedRole === 'CGMSC' ||
              resolvedRole === 'CON' ||
              resolvedRole === 'DHS' ||
              resolvedRole === 'DKS' ||
              resolvedRole === 'DMT' ||
              resolvedRole === 'GMF' ||
              resolvedRole === 'IT' ||
              resolvedRole === 'SCI' ||
              resolvedRole === 'SUP' ||
              resolvedRole === 'Suppliers' ||
              resolvedRole === 'TPO' ||
              resolvedRole === 'AUPO' ||
              resolvedRole === 'AUGMF'
            ) {
              this.router.navigate(['/welcome']);
            } else if (resolvedRole === 'QC') {
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
          this.generateCaptcha();
          this.captchaValue = '';
        },
      });
  }
}
