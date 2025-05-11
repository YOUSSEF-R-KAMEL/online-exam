import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { RouterLink } from '@angular/router';
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthApiService } from 'auth-api';
import { IUser } from '../../../../../../projects/auth-api/src/lib/models/IUser';
import { IResponseSignin } from '../../../../../../projects/auth-api/src/lib/models/IResponseSignin';
import { ErrorComponent } from '../../../../shared/error/error.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [InputComponent, RouterLink, SubmitComponent, ReactiveFormsModule, ErrorComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private _authApiService: AuthApiService, private _toastr:ToastrService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
      rePassword: ['', Validators.required],
    }, { validator: this.checkPasswords });
    this.signupForm.get('firstName')!.valueChanges.subscribe(() => this.updateUsername());
    this.signupForm.get('lastName')!.valueChanges.subscribe(() => this.updateUsername());
  }

  updateUsername() {
    const firstName = this.signupForm.get('firstName')!.value || '';
    const lastName = this.signupForm.get('lastName')!.value || '';
    this.signupForm.get('username')!.setValue(`${firstName} ${lastName}`, { emitEvent: false });
  }

  sanitizeInput(value: string): string {
    return value.replace(/[\u200E\u200F\u202A-\u202E]/g, '');
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const sanitizedForm = {
        ...this.signupForm.value,
        firstName: this.sanitizeInput(this.signupForm.value.firstName),
        lastName: this.sanitizeInput(this.signupForm.value.lastName),
      };

      this._authApiService.signup(sanitizedForm).subscribe({
        next: (res: IResponseSignin<IUser>) => {
          console.log(res);
          // this._toastr.success(res.message  , "Success");
        },
        // error: (err) => {
        //   const errorMessage = err?.error?.message || "An error occurred. Please try again.";
        //   this._toastr.error(errorMessage, "Error");
        // }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }



  checkPasswords(g:AbstractControl){
    const password = g.get('password')?.value;
    const rePassword = g.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true }
  }
}
