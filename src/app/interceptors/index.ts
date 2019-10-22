import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorsInterceptor } from './cors/cors.interceptor';

export const Interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CorsInterceptor,
    multi: true
  },
];
