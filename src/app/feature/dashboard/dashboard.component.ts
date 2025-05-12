import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsComponent } from "./components/subjects/subjects.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SubjectsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


}
