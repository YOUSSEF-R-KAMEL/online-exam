import { Component, inject } from '@angular/core';
import { ExamsService } from '../../services/exams/exams.service';
import { ActivatedRoute } from '@angular/router';
import { IExam, IQuestion } from '../../models/IQuestion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../shared/dialog/dialog.component';

@Component({
  selector: 'app-exams',
  imports: [MatSlideToggleModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss'
})
export class ExamsComponent {
  examsService = inject(ExamsService);
  subjectId = inject(ActivatedRoute).snapshot.params['id'];
  examsList:IExam[] = []
  questionsList:IQuestion[] = []
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getExams()
  }

  getExams() {
    this.examsService.getExams(this.subjectId).subscribe((res) => {
      this.examsList = res.exams
    });
  }

  openDialog(examId:string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        examId: examId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
