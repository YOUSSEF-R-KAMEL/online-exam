import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { IQuestion, IExam } from '../../feature/dashboard/models/IQuestion';
import { CommonModule } from '@angular/common';
import { ExamsService } from '../../feature/dashboard/services/exams/exams.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatStepperModule, MatRadioModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  examsService = inject(ExamsService)
  questionsList: IQuestion[] = []
  selectedAnswers: any[] = []
  examId = inject(MAT_DIALOG_DATA).examId
  examTitle = inject(MAT_DIALOG_DATA).examTitle
  examDuration: number = 0
  dialogRef = inject(MatDialogRef)
  dialog = inject(MatDialog)
  results: { question: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }[] = []

  ngOnInit(): void {
    this.getQuestionsByExamId()
    console.log(this.examId)
  }

  getQuestionsByExamId() {
    this.examsService.getQuestionsByExamId(this.examId).subscribe((res) => {
      this.questionsList = res.questions
      this.selectedAnswers = new Array(this.questionsList.length).fill(null)
      // Get exam duration from the first question's exam property
      if (this.questionsList.length > 0 && this.questionsList[0].exam) {
        this.examDuration = this.questionsList[0].exam.duration
      }
      console.log(this.questionsList)
    })
  }

  checkAnswers() {
    this.results = this.questionsList.map((question, index) => {
      const selectedAnswer = this.selectedAnswers[index];
      const correctAnswer = question.answers.find(ans => ans.key === question.correct);

      return {
        question: question.question,
        selectedAnswer: selectedAnswer?.answer || 'Not answered',
        correctAnswer: correctAnswer?.answer || 'No correct answer found',
        isCorrect: selectedAnswer?.key === question.correct
      };
    });
  }

  submit() {
    this.checkAnswers();
    this.dialogRef.close();

    // Open results dialog with exam title and duration
    this.dialog.open(ResultDialogComponent, {
      width: '600px',
      data: {
        results: this.results,
        examId: this.examId,
        examTitle: this.examTitle,
        duration: this.examDuration
      }
    });
  }

  isAnswerSelected(index: number): boolean {
    return this.selectedAnswers[index] !== null && this.selectedAnswers[index] !== undefined;
  }

  canGoNext(currentIndex: number): boolean {
    return this.isAnswerSelected(currentIndex);
  }
}
