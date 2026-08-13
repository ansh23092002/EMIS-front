import { Component, OnInit, HostListener, DoCheck, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { HardcodedAuthenticationService } from './service/authentication/hardcoded-authentication.service';
import { ToastrService } from 'ngx-toastr';
import { MenuServiceService } from './service/menu-service.service';
import { BasicAuthenticationService } from './service/authentication/basic-authentication.service';
import { RoleMenuService } from './service/role-menu.service';

import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
// import { TokenService } from './services/token.service';
import { ApiService } from './service/api.service';
import { ThemeService } from './service/theme.service';
import { resolvePageTitle } from './service/page-title.util';
import {
  AppNotification,
  NotificationService,
} from './service/notification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})

export class AppComponent implements OnInit, DoCheck, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  isMobile = false;
  drawerMode: MatDrawerMode = 'side';
  isDrawerOpen = true;
  sidebarCollapsed = false;
  menuSearchQuery = '';
  menuSearchFocused = false;
  pageHeading = '';
  notificationsOpen = false;
  notifications: AppNotification[] = [];
  unreadNotificationCount = 0;
  private menuSearchBlurTimer: ReturnType<typeof setTimeout> | null = null;
  deferredPrompt: any;
  showButton = false;
  title!: 'VENDER REGISTRATION PORTAL'
  isLoginPage = false;
  roleName = localStorage.getItem('roleName')
  firstname = sessionStorage.getItem('firstname')
  vregid: any;
  isDarkMode = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: Event) {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    this.showButton = true;
  }

  isExternalLink(route: string): boolean {
    return route.startsWith('http://') || route.startsWith('https://');
  }

  get menuSearchSuggestions(): { label: string; route: string; parentLabel?: string }[] {
    const query = this.menuSearchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }

    const results: { label: string; route: string; parentLabel?: string }[] = [];
    const seen = new Set<string>();

    for (const item of this.menuItems) {
      if (item.submenu?.length) {
        for (const sub of item.submenu) {
          if (!sub.route) {
            continue;
          }
          const matches =
            sub.label.toLowerCase().includes(query) || item.label.toLowerCase().includes(query);
          if (matches && !seen.has(sub.route)) {
            seen.add(sub.route);
            results.push({ label: sub.label, route: sub.route, parentLabel: item.label });
          }
        }
        continue;
      }

      if (item.route && item.label.toLowerCase().includes(query) && !seen.has(item.route)) {
        seen.add(item.route);
        results.push({ label: item.label, route: item.route });
      }

      if (results.length >= 10) {
        break;
      }
    }

    return results.slice(0, 10);
  }

  onMenuSearchInput(): void {
    const query = this.menuSearchQuery.trim().toLowerCase();
    if (!query) {
      return;
    }

    for (const item of this.menuItems) {
      if (!item.submenu?.length) {
        continue;
      }
      const shouldExpand =
        item.label.toLowerCase().includes(query) ||
        item.submenu.some((sub) => sub.label.toLowerCase().includes(query));
      if (shouldExpand) {
        this.expandedMenus[item.label] = true;
      }
    }
  }

  onMenuSearchFocus(): void {
    if (this.menuSearchBlurTimer) {
      clearTimeout(this.menuSearchBlurTimer);
      this.menuSearchBlurTimer = null;
    }
    this.menuSearchFocused = true;
  }

  onMenuSearchBlur(): void {
    this.menuSearchBlurTimer = setTimeout(() => {
      this.menuSearchFocused = false;
      this.menuSearchBlurTimer = null;
    }, 150);
  }

  selectMenuSuggestion(suggestion: { label: string; route: string; parentLabel?: string }): void {
    if (!suggestion.route) {
      return;
    }

    if (this.isExternalLink(suggestion.route)) {
      window.open(suggestion.route, '_blank', 'noopener');
    } else {
      this.router.navigateByUrl(suggestion.route);
    }

    this.menuSearchQuery = '';
    this.menuSearchFocused = false;
    this.closeDrawerOnNavigate();
  }

  menuItems: { label: string; route: string; submenu?: { label: string; route: string }[] }[] = [];
  expandedMenus: { [key: string]: boolean } = {}; // Track expanded state for each menu item

  toggleSubmenu(menuLabel: string): void {
    for (const key in this.expandedMenus) {
      if (key !== menuLabel) {
        this.expandedMenus[key] = false; // Collapse all other menus
      }
    }

    // Toggle the clicked submenu
    this.expandedMenus[menuLabel] = !this.expandedMenus[menuLabel];
  }
  role: any = ''; // Dynamic role
  constructor(
    private location: Location,
    private cdr: ChangeDetectorRef,
    private menuService: MenuServiceService,
    private toastr: ToastrService,
    public readonly router: Router,
    public basicAuthentication: BasicAuthenticationService,
    private api: ApiService,
    private breakpointObserver: BreakpointObserver,
    private https: HttpClient,
    public readonly themeService: ThemeService,
    private readonly notificationService: NotificationService,
    private readonly roleMenuService: RoleMenuService,
  ) {
    this.applyDrawerLayout(window.innerWidth <= 991.98, true);
  }

  onSidebarCollapsedChange(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }

  toggleNotifications(event: MouseEvent): void {
    event.stopPropagation();
    this.notificationsOpen = !this.notificationsOpen;
    this.menuSearchFocused = false;
  }

  markAllNotificationsRead(): void {
    this.notificationService.markAllRead();
  }

  onNotificationClick(item: AppNotification): void {
    this.notificationService.markRead(item.id);
    this.notificationsOpen = false;
    if (item.route) {
      this.router.navigateByUrl(item.route);
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.notificationsOpen) {
      this.notificationsOpen = false;
    }
  }

  logout() {
    if (sessionStorage.getItem('roleId') === '482') {
      sessionStorage.clear();
      localStorage.clear();
      this.basicAuthentication.logout();
      this.toastr.success('Logout Successfully');
      this.router.navigate(['collector-login'])

    } else {
      sessionStorage.clear();
      localStorage.clear();
      this.basicAuthentication.logout();
      this.toastr.success('Logout Successfully');
      this.router.navigate(['login'])
    }
    this.role = '';
    this.menuItems = [];
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.menuSearchBlurTimer) {
      clearTimeout(this.menuSearchBlurTimer);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
  }

  onDrawerOpenedChange(opened: boolean): void {
    if (!this.isLoginPage) {
      this.isDrawerOpen = opened;
    }
  }

  closeDrawerOnNavigate(): void {
    if (this.isMobile) {
      this.closeDrawer();
    }
  }

  private applyDrawerLayout(isMobile: boolean, forceOpenState = false): void {
    const breakpointChanged = this.isMobile !== isMobile;
    this.isMobile = isMobile;
    this.drawerMode = isMobile ? 'over' : 'side';
    if (this.isLoginPage) {
      this.isDrawerOpen = false;
      return;
    }
    if (forceOpenState || breakpointChanged) {
      this.isDrawerOpen = !isMobile;
    }
  }

  ngOnInit(): void {
    this.isLoginPage = this.isShellFreeUrl(this.router.url);

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const wasShellFree = this.isLoginPage;
        this.isLoginPage = this.isShellFreeUrl(event.urlAfterRedirects || event.url);
        if (this.isLoginPage) {
          this.isDrawerOpen = false;
        } else if (wasShellFree) {
          // Print/login shell pages force drawer closed — restore for normal pages.
          this.applyDrawerLayout(this.isMobile, true);
        }

        this.role = this.basicAuthentication.getRole().roleName;
        if (!this.menuItems || this.menuItems.length === 0) {
          this.updateMenu();
        }
        this.updatePageHeading(event.urlAfterRedirects);
        this.closeDrawerOnNavigate();
        this.notificationsOpen = false;
      }
    });

    this.breakpointObserver
      .observe(['(max-width: 991.98px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: BreakpointState) => {
        this.applyDrawerLayout(result.matches, false);
        this.cdr.markForCheck();
      });

    this.isDarkMode = this.themeService.isDark;

    this.notificationService.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((list) => {
        this.notifications = list;
        this.unreadNotificationCount = list.filter((item) => !item.read).length;
        this.cdr.markForCheck();
      });
  }

  /** Login / print / public pages — no sidebar or header (ignore ?query). */
  private isShellFreeUrl(url: string): boolean {
    const path = (url || '').split('?')[0].split('#')[0].toLowerCase();
    const exactShellFree = new Set([
      '/login',
      '/supplier-login',
      '/loginemssup',
      '/otp',
      '/collector-login',
      '/public-view',
      '/growthinprocurmenttabpublic',
      '/distributionpublic',
      '/indentpendingwhdashpublic',
      '/registration',
      '/transaction/po-supply-dispatch-report',
      '/transaction/po-supply-installation-print',
      '/transaction/po-supply-po-print',
      '/orders/po-print',
      '/reports/sanction-report',
    ]);
    if (exactShellFree.has(path)) {
      return true;
    }
    // Legacy ASPX-style redirects sometimes land with trailing segments.
    return (
      path.endsWith('/po-supply-dispatch-report') ||
      path.endsWith('/po-supply-installation-print') ||
      path.endsWith('/po-supply-po-print') ||
      path.endsWith('/orders/po-print') ||
      path.endsWith('/sanction-report')
    );
  }

  ngDoCheck(): void {
    const role = this.basicAuthentication.getRole().roleName;
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    this.firstname = loginData?.username || 'User';
    this.roleName = role;
    if (this.firstname === 'Public') {
      this.firstname = 'Public View Of Drugs and Consumables';
    }

    // Refresh sidebar when department/role changes without full reload.
    if (role && role !== this.role) {
      this.role = role;
      this.roleMenuService.clearSidebarCache();
      this.updateMenu();
    }

    this.cdr.detectChanges();
  }

  GetVendorDetailsID(supplierId: any) {
    // this.api.getVendorDetailsID(supplierId).subscribe({
    //   next: (res: any) => {
    //     if (Array.isArray(res) && res.length > 0) {
    //       this.vregid=res[0].vregid;
    //       console.log('Vendor vregid:', this.vregid);
    //       sessionStorage.setItem('vregid',this.vregid)
        
    //     } else {
    //       console.warn('No vendor details found.');
    //       alert('⚠️ Please update your supplier information (vendor registration number missing).');
    //       this.router.navigate(['masters/particular-supplier-add']);

    //     }
    //   },
    //   error: (err:any) => {
    //     console.error('Error fetching vendor details:', err);
    //   }
    // });
  }
  
  private updateMenu() {
    const rawRoleId = sessionStorage.getItem('roleId') || localStorage.getItem('roleId');
    const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
    const roleId = rawRoleId ? parseInt(rawRoleId, 10) : (loginData?.roleid ? parseInt(loginData.roleid, 10) : null);

    if (roleId && !isNaN(roleId)) {
      this.roleMenuService.getSidebarTreeForRole(roleId).subscribe({
        next: (items) => {
          console.log('[Sidebar Debug] roleId:', roleId, 'items received:', JSON.stringify(items, null, 2));
          if (items && items.length > 0) {
            this.menuItems = items;
          } else {
            console.log('[Sidebar Debug] No items returned, falling back to static menu');
            this.fallbackStaticMenu();
          }
          this.expandActiveParentMenu();
          this.updatePageHeading(this.router.url);
        },
        error: (err) => {
          console.error('[Sidebar Debug] API error:', err);
          this.fallbackStaticMenu();
          this.expandActiveParentMenu();
          this.updatePageHeading(this.router.url);
        }
      });
    } else {
      console.log('[Sidebar Debug] No roleId in session/storage, using static menu. sessionStorage:', sessionStorage.getItem('roleId'), 'localStorage:', localStorage.getItem('roleId'), 'loginData.roleid:', loginData?.roleid);
      this.fallbackStaticMenu();
      this.expandActiveParentMenu();
      this.updatePageHeading(this.router.url);
    }
  }


  private fallbackStaticMenu() {
    const hasCategories = ['SEC1', 'DHS', 'CME', 'Collector', 'DME1'].includes(this.role);

    if (hasCategories) {
      // Ensure a category exists so sidebar is never blank after department switch.
      if (!this.menuService.getSelectedCategory()) {
        this.menuService.setSelectedCategory('DrugsConsumables');
      }
      this.menuItems = this.menuService.getMenuItems(this.role);
    } else {
      this.menuItems = this.menuService.getMenuItems(this.role);
    }
  }


  private updatePageHeading(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    this.pageHeading = resolvePageTitle(path, this.menuItems);
  }

  private expandActiveParentMenu(): void {
    const currentPath = this.router.url.split('?')[0].split('#')[0];
    for (const item of this.menuItems) {
      if (!item.submenu?.length) {
        continue;
      }
      const hasActiveChild = item.submenu.some((sub) => {
        if (!sub.route) {
          return false;
        }
        const subPath = sub.route.split('?')[0].split('#')[0];
        return currentPath === subPath || currentPath.startsWith(`${subPath}/`);
      });
      if (hasActiveChild) {
        this.expandedMenus[item.label] = true;
      }
    }
  }
  
  addToHomeScreen() {
    // Hide the app provided install promotion
    this.showButton = false;
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: { outcome: string; }) => {
      if (choiceResult.outcome === 'accepted') {
        // console.log('User accepted the A2HS prompt');
      } else {
        // console.log('User dismissed the A2HS prompt');
      }
      this.deferredPrompt = null;
    });
  }
  hideAddToHomeScreen() {
    this.showButton = false
  }
  handleOutsideClick(event: Event) {
    if (this.showButton) {
      this.hideAddToHomeScreen()
    }
  }
  handleInsideClick(event: Event) {
    event.stopPropagation();
  }

  isCollectorLogin(): boolean {
    return this.router.url === '/collector-login';
  }

  isMenuActive(item: any): boolean {

  // अगर direct route है
  if (item.route && this.router.url === item.route) {
    return true;
  }

  // अगर submenu है
  if (item.submenu?.length) {
    return item.submenu.some((sub: any) =>
      this.router.url === sub.route
    );
  }

  return false;
  }
}