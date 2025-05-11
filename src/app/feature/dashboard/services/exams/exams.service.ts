import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IQuestionRes } from '../../models/IQuestion';
import { IExamsRes } from '../../models/IExams';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  private apiUrl = 'https://exam.elevateegy.com/api/v1';

  constructor(private http: HttpClient) {}

  getExams(subjectId: string): Observable<IExamsRes> {
    return this.http.get<IExamsRes>(`${this.apiUrl}/exams?subject=${subjectId}`).pipe(
      catchError(error => {
        console.error('Error fetching exams:', error);
        throw error;
      })
    );
  }


  getQuestionsByExamId(examId: string): Observable<IQuestionRes> {
    return this.http.get<IQuestionRes>(`${this.apiUrl}/questions?exam=${examId}`).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error fetching questions:', error);
        throw error;
      })
    );
  }
}
