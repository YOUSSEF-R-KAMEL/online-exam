import { Observable } from "rxjs";

export abstract class AuthAPI {
  abstract signin(data:any): Observable<any>
  // abstract signup(data:any): Observable<any>
}
