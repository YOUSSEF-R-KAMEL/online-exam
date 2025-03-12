import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { RouterLink } from '@angular/router';
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [InputComponent, RouterLink, SubmitComponent, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  signinForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.signinForm.value)
    if (this.signinForm.valid) {
      console.log('Form Submitted:', this.signinForm.value);
    } else {
      console.log('Invalid Form');
    }
  }
}
