import { Component, inject } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IResponse } from '../../../../../../projects/auth-api/src/lib/models/IResponse';
import { IUser } from '../../../../../../projects/auth-api/src/lib/models/IUser';
import { ErrorComponent } from "../../../../shared/error/error.component";
import { ToastrService } from 'ngx-toastr';
import { AuthApiService } from 'auth-api';

@Component({
  selector: 'app-forget',
  imports: [InputComponent, SubmitComponent, ReactiveFormsModule, ErrorComponent],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
  private fb = inject(FormBuilder);
  private _authApiService = inject(AuthApiService);
  private _toastr = inject(ToastrService);
  step = 1
  forgetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  verifyCodeForm = this.fb.group({
    code: ['', [Validators.required]],
  });
  resetPasswordForm = this.fb.group({
    email: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.pattern('/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/')]],
  });


  onForgetPassword() {
    console.log('Form Submitted:', this.forgetPasswordForm.value);
    if (this.forgetPasswordForm.valid) {
      const emailData = { email: this.forgetPasswordForm.value.email! };
      if(emailData){
        this._authApiService.forgetPassword(emailData).subscribe((res:IResponse<IUser>) => {
          console.log(res)
          this._toastr.success(res.info, "Success")
          this.step = 2
        })
      }
    } else {
      console.log('Invalid Form');
    }
  }

  onVerifyCode() {
    console.log(this.verifyCodeForm.value)
    if (this.verifyCodeForm.valid) {
      const code = { code: this.verifyCodeForm.value.code! };
      this._authApiService.verifyCode(code).subscribe((res) => {
        this._toastr.success(res.info, "Success")
        this.step = 3
      })
    } else {
      console.log('Invalid Form');
    }
  }

  onResetPassword() {
    console.log(this.resetPasswordForm.value)
    if (this.resetPasswordForm.valid) {
      console.log('Form Submitted:', this.resetPasswordForm.value);
    } else {
      console.log('Invalid Form');
    }
  }

}
