import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "../../../node_modules/rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = 'http://gamenightproject.herokuapp.com';
        req = req.clone({
            url: url + req.url
        });
        return next.handle(req);
    }
}
