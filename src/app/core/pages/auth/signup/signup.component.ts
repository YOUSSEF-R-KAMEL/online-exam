import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { RouterLink } from '@angular/router';
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { IUser } from '../../../../../../projects/auth-api/src/lib/models/IUser';
import { IResponseSignin } from '../../../../../../projects/auth-api/src/lib/models/IResponseSignin';

@Component({
  selector: 'app-signup',
  imports: [InputComponent, RouterLink, SubmitComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private _authApiService:AuthApiService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rePassword: ['', Validators.required],
    }, {validator: this.checkPasswords});
  }

  onSubmit() {
    console.log('Form Submitted:', this.signupForm.value);
    if (this.signupForm.valid) {
      this._authApiService.signup(this.signupForm.value).subscribe({
        next: (res:IResponseSignin<IUser>) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      console.log('Invalid Form');
    }
  }

  checkPasswords(g:AbstractControl){
    const password = g.get('password')?.value;
    const rePassword = g.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true }
  }
}
