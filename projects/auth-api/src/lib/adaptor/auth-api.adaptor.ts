import { Injectable } from '@angular/core';
import { Adaptor } from '../models/adaptor';

@Injectable({
  providedIn: 'root'
})
export class AuthApiAdaptorService implements Adaptor {

  constructor() { }

  adaptor(data:any) {
    return data.user
  }
}
