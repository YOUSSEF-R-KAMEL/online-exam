import { Injectable } from '@angular/core';
import { Adaptor } from '../models/adaptor';
import { IUser } from '../models/IUser';
import { IResponse } from '../models/IResponse';
import { IResponseSignin } from '../models/IResponseSignin';

@Injectable({
  providedIn: 'root'
})
export class AuthApiAdaptorService implements Adaptor {

  constructor() { }

  signinAndSignupAdaptor(data:IResponse<IUser>): IResponseSignin<IUser> {
    return {
      user: data.user,
      message: data.message,
      token: data.token
    }
  }
  ForgotPasswordAdaptor(data:IResponse<IUser>){
    return {
      message: data.message,
      info: data.info
    }
  }
}
