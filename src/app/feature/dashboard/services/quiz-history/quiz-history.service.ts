import { Injectable } from '@angular/core';
import { IQuizHistory } from '../../models/IQuizHistory';

@Injectable({
  providedIn: 'root'
})
export class QuizHistoryService {
  private readonly STORAGE_KEY = 'quizHistory';

  constructor() {}

  getHistory(): IQuizHistory[] {
    const storedHistory = localStorage.getItem(this.STORAGE_KEY);
    if (storedHistory) {
      const history = JSON.parse(storedHistory);
      // Sort by date, most recent first
      return history.sort((a: IQuizHistory, b: IQuizHistory) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    return [];
  }

  addToHistory(result: IQuizHistory): void {
    const history = this.getHistory();
    history.unshift(result); // Add to beginning of array
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }

  clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
