export interface IResponseSignin<T> {
  message?: string,
  user?: T,
  token?: string
}
