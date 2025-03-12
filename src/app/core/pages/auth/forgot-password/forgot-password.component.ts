import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { RouterLink } from '@angular/router';
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [InputComponent, RouterLink, SubmitComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgetPasswordForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log(this.forgetPasswordForm.value)
    if (this.forgetPasswordForm.valid) {
      console.log('Form Submitted:', this.forgetPasswordForm.value);
    } else {
      console.log('Invalid Form');
    }
  }
}
