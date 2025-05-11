import { Injectable } from '@angular/core';
import { AuthAPI } from './base/AuthApi';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { AuthEndPoints } from './enums/AuthApi.endPoints';
import { AuthApiAdaptorService } from './adaptor/auth-api.adaptor';
import { IResponse } from './models/IResponse';
import { IUser } from './models/IUser';
import { ISignin } from './models/ISignin';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements AuthAPI {
  constructor(private _httpClient:HttpClient, private _authApiAdaptorService:AuthApiAdaptorService) { }
  signin(data: ISignin): Observable<IResponse<IUser>> {
    console.log('Auth Service - Original URL:', AuthEndPoints.SIGNIN);
    return this._httpClient.post<IResponse<IUser>>(AuthEndPoints.SIGNIN, data).pipe(
      tap(req => console.log('Auth Service - Request URL:', req)),
      map((res:IResponse<IUser>) => this._authApiAdaptorService.signinAndSignupAdaptor(res)),
      catchError((err) => {
        console.error('Auth Service - Error:', err);
        return of(err);
      })
    )
  }
  signup(data: ISignin): Observable<IResponse<IUser>> {
    return this._httpClient.post<IResponse<IUser>>(AuthEndPoints.SIGNUP, data).pipe(
      map((res:IResponse<IUser>) => this._authApiAdaptorService.signinAndSignupAdaptor(res)),
      catchError((err) => of(err))
    )
  }
  forgetPassword(data: { email: string }): Observable<IResponse<IUser>> {
    return this._httpClient.post<IResponse<IUser>>(AuthEndPoints.FORGOT_PASSWORD, data).pipe(
      map((res: IResponse<IUser>) => this._authApiAdaptorService.ForgotPasswordAdaptor(res)),
      catchError((err) => of(err))
    );
  }
  verifyCode(data: { code: string }): Observable<IResponse<IUser>> {
    return this._httpClient.post<IResponse<IUser>>(AuthEndPoints.VERIFY_RESET_CODE, data);
  }
  setPassword(data: { email: string, newPassword:string }): Observable<IResponse<IUser>> {
    return this._httpClient.put<IResponse<IUser>>(AuthEndPoints.RESET_PASSWORD, data);
  }

}
