import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { IQuestion } from '../../feature/dashboard/models/IQuestion';
import { CommonModule } from '@angular/common';
import { ExamsService } from '../../feature/dashboard/services/exams/exams.service';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  examsService = inject(ExamsService)
  questionsList:IQuestion[] = []
  examId = inject(MAT_DIALOG_DATA).examId
  dialogRef = inject(MatDialogRef)
  ngOnInit(): void {
    this.getQuestionsByExamId()
    console.log(this.examId)
  }

  getQuestionsByExamId() {
    this.examsService.getQuestionsByExamId(this.examId).subscribe((res) => {
      this.questionsList = res.questions
      console.log(this.questionsList)
    })
  }

}
