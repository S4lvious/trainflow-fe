import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { jwtDecode } from "jwt-decode";

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
    HttpHandlerFn) => {
            const token = localStorage.getItem('token');
            if (token) {
              let decodedToken = jwtDecode(token);
              const isExpired = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;
              if (isExpired) {
                localStorage.removeItem('token');
                localStorage.removeItem('currentUser');
              } else {
                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`
                  }
                });
              }
            }
            return next(req);
};
    