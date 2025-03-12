export interface IResponse<T> {
  message?: string,
  token?: string,
  user?: T,
  info?: string
}
