import { Injectable } from '@angular/core';
import { AuthAPI } from './base/AuthApi';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
    return this._httpClient.post<IResponse<IUser>>(AuthEndPoints.SIGNIN, data).pipe(
      map((res:IResponse<IUser>) => this._authApiAdaptorService.signinAndSignupAdaptor(res)),
      catchError((err) => of(err))
    )
  }
  signup(data: ISignin): Observable<IResponse<IUser>> {
    return this._httpClient.post<IResponse<IUser>>(AuthEndPoints.SIGNUP, data).pipe(
      map((res:IResponse<IUser>) => this._authApiAdaptorService.signinAndSignupAdaptor(res)),
      catchError((err) => of(err))
    )
  }
  forgetPassword(data: string): Observable<IResponse<IUser>> {
    return this._httpClient.post<IResponse<IUser>>(AuthEndPoints.FORGOT_PASSWORD, data).pipe(
      map((res:IResponse<IUser>) => this._authApiAdaptorService.ForgotPasswordAdaptor(res)),
      catchError((err) => of(err))
    )
  }
}
