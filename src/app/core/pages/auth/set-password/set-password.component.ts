import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-password',
  imports: [InputComponent, SubmitComponent, ReactiveFormsModule],
  templateUrl: './set-password.component.html',
  styleUrl: './set-password.component.scss'
})
export class SetPasswordComponent {
  setPasswordForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.setPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
    }, { validator: this.checkPasswords });
  }

  onSubmit() {
    console.log(this.setPasswordForm.value)
    if (this.setPasswordForm.valid) {
      console.log('Form Submitted:', this.setPasswordForm.value);
    } else {
      console.log('Invalid Form');
    }
  }

  checkPasswords(g:AbstractControl){
    const password = g.get('password')?.value;
    const newPassword = g.get('newPassword')?.value;
    return password === newPassword ? null : { mismatch: true }
  }
}
