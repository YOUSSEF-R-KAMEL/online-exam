import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { IQuizHistory } from '../../models/IQuizHistory';
import { ResultDialogComponent } from '../../../../shared/dialog/result-dialog/result-dialog.component';
import { QuizHistoryService } from '../../services/quiz-history/quiz-history.service';

@Component({
  selector: 'app-quiz-history',
  templateUrl: './quiz-history.component.html',
  styleUrls: ['./quiz-history.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule
  ]
})
export class QuizHistoryComponent implements OnInit {
  historyList: IQuizHistory[] = [];

  constructor(
    private dialog: MatDialog,
    private quizHistoryService: QuizHistoryService
  ) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyList = this.quizHistoryService.getHistory();
  }

  openAnswers(exam: IQuizHistory): void {
    this.dialog.open(ResultDialogComponent, {
      width: '600px',
      data: {
        results: exam.results,
        examId: exam.examId,
        examTitle: exam.examTitle,
        duration: exam.duration
      }
    });
  }
}
