import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { IResponse } from '../../../../../../projects/auth-api/src/lib/models/IResponse';
import { IUser } from '../../../../../../projects/auth-api/src/lib/models/IUser';
import { ErrorComponent } from "../../../../shared/error/error.component";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [InputComponent, SubmitComponent, ReactiveFormsModule, ErrorComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgetPasswordForm!: FormGroup;
  constructor(private fb: FormBuilder, private _authApiService:AuthApiService, private _toastr:ToastrService, private _router:Router) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log('Form Submitted:', this.forgetPasswordForm.value);
    if (this.forgetPasswordForm.valid) {
      this._authApiService.forgetPassword(this.forgetPasswordForm.value).subscribe((res:IResponse<IUser>) => {
        console.log(res)
        this._toastr.success("code send in your email successful!", "Success")
        this._router.navigateByUrl('')
      })
    } else {
      console.log('Invalid Form');
    }
  }
}
