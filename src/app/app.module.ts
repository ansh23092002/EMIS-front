import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './component/auth/login/login.component';
import { LogoutComponent } from './component/auth/logout/logout.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { APP_BASE_HREF } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { Registration } from './component/auth/registration/registration';
import { AppSidebarComponent } from './component/layout/app-sidebar/app-sidebar.component';
import { AppSanitizeInputDirective } from './directives/sanitize-input.directive';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './service/authentication/authInterceptor';
@NgModule({
  declarations: [
    AppComponent,
    Registration,
    LogoutComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgSelectModule,
    NgbCollapseModule,
    CommonModule,
    DatePipe,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    NgxSpinnerModule.forRoot({ type: 'line-scale-party' }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    NgApexchartsModule,
    MatDialogModule,
    MatTableModule,
    GoogleMapsModule,
    MatTableExporterModule, MatButtonModule,
    AppSidebarComponent,
    AppSanitizeInputDirective,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3500,
      extendedTimeOut: 1200,
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      preventDuplicates: true,
      tapToDismiss: true,
      easeTime: 250,
      toastClass: 'ngx-toastr emis-toast',
    }),
], providers: [DatePipe, 
      { provide: APP_BASE_HREF, useValue: '/EMSA/' },
         provideHttpClient(withInterceptors([authInterceptor])),
      provideHttpClient(withInterceptorsFromDi()),


  ]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
