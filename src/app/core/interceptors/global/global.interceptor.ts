import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HelperService } from '../../../shared/helpers/helper.service';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const helperService = inject(HelperService);
  const baseUrl = 'https://ecommerce.routemisr.com/api/v1/';
  const isBrowser = helperService.isPlatformBrowser();
  let token: string | null = null;
  if (isBrowser) {
    token = localStorage.getItem('token');
  }
  const newRequest = req.clone({
    url: req.url.includes('assets') ? req.url : baseUrl + req.url,
    setHeaders: {
      token: token || '',
    },
  });

  return next(newRequest);
};
