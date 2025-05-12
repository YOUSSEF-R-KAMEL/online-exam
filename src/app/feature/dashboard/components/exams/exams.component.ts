import { Component, inject } from '@angular/core';
import { ExamsService } from '../../services/exams/exams.service';
import { ActivatedRoute } from '@angular/router';
import { IExam, IQuestion } from '../../models/IQuestion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-exams',
  imports: [MatSlideToggleModule, NgxSpinnerModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {
  examsService = inject(ExamsService);
  subjectId = inject(ActivatedRoute).snapshot.params['id'];
  examsList:IExam[] = []
  questionsList:IQuestion[] = []
  readonly dialog = inject(MatDialog);
  isLoading = false;

  ngOnInit(): void {
    this.getExams()
  }

  getExams() {
    this.isLoading = true;
    this.examsService.getExams(this.subjectId).subscribe((res) => {
      this.examsList = res.exams
      this.isLoading = false;
    });
  }

  openDialog(examId: string, examTitle: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        examId: examId,
        examTitle: examTitle
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
