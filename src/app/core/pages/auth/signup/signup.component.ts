import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { RouterLink } from '@angular/router';
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [InputComponent, RouterLink, SubmitComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form Data:', this.signupForm.value);
  }
}
