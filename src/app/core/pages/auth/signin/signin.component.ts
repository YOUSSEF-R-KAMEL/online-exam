import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { Router, RouterLink } from '@angular/router';
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { IUser } from '../../../../../../projects/auth-api/src/lib/models/IUser';
import { ErrorComponent } from '../../../../shared/error/error.component';
import { IResponse } from '../../../../../../dist/auth-api/lib/models/IResponse';

@Component({
  selector: 'app-signin',
  imports: [InputComponent, RouterLink, SubmitComponent, ReactiveFormsModule, ErrorComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  signinForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _authApiService: AuthApiService,
    private _router: Router
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    });
  }

  onSubmit() {
    // console.log('Form Submitted:', this.signinForm.value);
    if (this.signinForm.valid) {
      this._authApiService.signin(this.signinForm.value).subscribe({
        next: (res:IResponse<IUser>) => {
          console.log(res)
          localStorage.setItem('token', res.token!)
          if(localStorage.getItem('token') !== 'undefined'){
            this._router.navigateByUrl('/home')
          }
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
