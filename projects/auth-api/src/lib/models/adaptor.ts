import { IResponse } from "./IResponse";
import { IResponseSignin } from "./IResponseSignin";
import { IUser } from "./IUser";

export interface Adaptor {
  signinAndSignupAdaptor(data:IResponse<IUser>) :IResponseSignin<IUser>
  ForgotPasswordAdaptor(data:IResponse<IUser>) :IResponseSignin<IUser>
}


