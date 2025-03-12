import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { RouterLink } from '@angular/router';
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { IResponseSignin } from '../../../../../../projects/auth-api/src/lib/models/IResponseSignin';
import { IUser } from '../../../../../../projects/auth-api/src/lib/models/IUser';

@Component({
  selector: 'app-signin',
  imports: [InputComponent, RouterLink, SubmitComponent, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  signinForm!: FormGroup;
  constructor(private fb: FormBuilder, private _authApiService:AuthApiService) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log('Form Submitted:', this.signinForm.value);
    if (this.signinForm.valid) {
      this._authApiService.signin(this.signinForm.value).subscribe({
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
}
