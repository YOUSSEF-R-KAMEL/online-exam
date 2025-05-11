import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubjectsRes } from '../../models/ISubject';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {
  _httpClient = inject(HttpClient);

  getQuizzes(): Observable<ISubjectsRes> {
    return this._httpClient.get<ISubjectsRes>('subjects');
  }
}
