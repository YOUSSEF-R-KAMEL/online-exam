import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ISubject } from '../../models/ISubject';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SubjectCardComponent } from '../subject-card/subject-card.component';
import { QuizzesService } from '../../services/quizzes/quizzes.service';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, SubjectCardComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss'
})
export class SubjectsComponent implements OnInit, OnDestroy {
  quizzesService = inject(QuizzesService);
  subjectsList: ISubject[] = [];
  displayedSubjects: ISubject[] = [];
  private subscription: Subscription = new Subscription();
  showAll: boolean = false;

  ngOnInit(): void {
    this.getSubjects()
  }

  getSubjects(){
    this.subscription.add(
      this.quizzesService.getQuizzes().subscribe((res) => {
        this.subjectsList = res.subjects;
        this.updateDisplayedSubjects();
      })
    );
  }

  updateDisplayedSubjects() {
    this.displayedSubjects = this.showAll ? this.subjectsList : this.subjectsList.slice(0, 6);
  }

  toggleViewAll() {
    this.showAll = !this.showAll;
    this.updateDisplayedSubjects();
  }

  ngOnDestroy(): void {
    this.subjectsList = [];
    this.displayedSubjects = [];
    this.subscription.unsubscribe();
  }
}
