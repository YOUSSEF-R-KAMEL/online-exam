import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorComponent } from '../../../../shared/error/error.component';

@Component({
  selector: 'app-set-password',
  imports: [InputComponent, SubmitComponent, ReactiveFormsModule, ErrorComponent],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent {
  setPasswordForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.setPasswordForm = this.fb.group({
      email: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/')]],
    });
  }

  onSubmit() {
    console.log(this.setPasswordForm.value)
    if (this.setPasswordForm.valid) {
      console.log('Form Submitted:', this.setPasswordForm.value);
    } else {
      console.log('Invalid Form');
    }
  }
}
