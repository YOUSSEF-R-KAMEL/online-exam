import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  let _toastr = inject(ToastrService)
  return next(req).pipe( catchError((err) => {
    _toastr.error(err.error.message, "Online Exam")
    return throwError(() => err)
  }))
};
