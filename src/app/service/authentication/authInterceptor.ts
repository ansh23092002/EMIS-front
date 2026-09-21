import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { sanitizePayload } from '../../helper/sanitizer.helper';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  const token = sessionStorage.getItem('token');
  let clonedRequest = req;

  const urlLower = req.url.toLowerCase();
  const isAuthRequest =
    urlLower.includes('/auth/login') ||
    urlLower.includes('/auth/login1') ||
    urlLower.includes('/supplierauth') ||
    urlLower.includes('/api/login') ||
    urlLower.endsWith('/login');

  // Sanitize request body for non-auth data modification requests
  let sanitizedBody = req.body;
  if (!isAuthRequest && req.body && typeof req.body === 'object' && !(req.body instanceof FormData)) {
    sanitizedBody = sanitizePayload(req.body);
  }

  clonedRequest = req.clone({
    body: sanitizedBody,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthRequest) {
        sessionStorage.clear();
        localStorage.clear(); 
        
        Swal.fire({
          icon: 'warning',
          title: 'Session Expired!',
          text: 'Your session has expired. Please login again.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
          allowOutsideClick: false 
        }).then((result) => {
          if (result.isConfirmed) {
            router.navigate(['/login']); 
          }
        });
      }
      return throwError(() => error);
    })
  );
};