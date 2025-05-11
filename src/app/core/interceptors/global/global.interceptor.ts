import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HelperService } from '../../../shared/helpers/helper.service';
import { tap } from 'rxjs';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const helperService = inject(HelperService);
  const baseUrl = 'https://exam.elevateegy.com/api/v1/';
  const isBrowser = helperService.isPlatformBrowser();
  let token: string | null = null;
  if (isBrowser) {
    token = localStorage.getItem('token');
  }

  // Only append base URL for relative paths (not starting with http:// or https://)
  const isRelativePath = !req.url.startsWith('http://') && !req.url.startsWith('https://');
  const shouldAppendBaseUrl = isRelativePath && !req.url.includes('assets');

  const newRequest = req.clone({
    url: shouldAppendBaseUrl ? baseUrl + req.url : req.url,
    setHeaders: {
      token: token || '',
    },
  });

  return next(newRequest)
};
