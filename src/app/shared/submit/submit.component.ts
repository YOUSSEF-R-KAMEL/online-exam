import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit',
  imports: [],
  templateUrl: './submit.component.html',
  styleUrl: './submit.component.scss'
})
export class SubmitComponent {
  @Input() text = ''
}
