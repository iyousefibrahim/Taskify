import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem('userToken');
  if (userToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userToken}`
      }
    });
  }
  return next(req);
};
