import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ISubject } from '../../models/ISubject';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subject-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subject-card.component.html',
  styleUrls: ['./subject-card.component.scss']
})
export class SubjectCardComponent {
  @Input() subject!: ISubject;
}
