import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  const router = inject(Router); 
  const matSnackBar = inject(MatSnackBar);
  let isRedirecting = false;

  if (!req.url.includes('/auth/login') && token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    tap(event => {
    }),
    catchError(err => {
      if (err.status === 401 && !isRedirecting) {
        isRedirecting = true;
        localStorage.removeItem('token');
        router.navigate(['/login']);        
        matSnackBar.open("Token expirado", 'Error', {
                duration: 3000,
                panelClass: ['snackbar-error']
              });
      }
      return throwError(() => err);
    })
  );

};
