import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IExamResult, IQuizHistory } from '../../../feature/dashboard/models/IQuizHistory';
import { QuizHistoryService } from '../../../feature/dashboard/services/quiz-history/quiz-history.service';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'app-result-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, BaseChartDirective],
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent {
  results: IExamResult[];
  correctAnswers: number;
  totalQuestions: number;
  pieChartData: ChartConfiguration<'pie'>['data'];
  pieChartOptions: ChartConfiguration<'pie'>['options'];

  constructor(
    private quizHistoryService: QuizHistoryService,
    public dialogRef: MatDialogRef<ResultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      results: IExamResult[];
      examId: string;
      examTitle: string;
      duration: number;
    }
  ) {
    this.results = data.results;
    this.correctAnswers = this.results.filter(r => r.isCorrect).length;
    this.totalQuestions = this.results.length;

    // Store quiz result in history
    const quizResult: IQuizHistory = {
      examId: data.examId,
      examTitle: data.examTitle,
      date: new Date(),
      score: this.correctAnswers,
      totalQuestions: this.totalQuestions,
      percentage: Number((this.correctAnswers / this.totalQuestions * 100).toFixed(1)),
      duration: data.duration,
      results: this.results
    };

    this.quizHistoryService.addToHistory(quizResult);

    this.pieChartData = {
      labels: ['Correct', 'Incorrect'],
      datasets: [{
        data: [this.correctAnswers, this.totalQuestions - this.correctAnswers],
        backgroundColor: ['#4caf50', '#f44336']
      }]
    };

    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: true,
          text: 'Exam Results'
        }
      }
    };
  }
}
