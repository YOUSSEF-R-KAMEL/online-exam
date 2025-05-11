import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const _toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      console.error('HTTP Error:', err);
      const message = err?.error?.message || 'Unknown error occurred';
      _toastr.error(message, 'Online Exam');
      return throwError(() => err);
    })
  );
};
