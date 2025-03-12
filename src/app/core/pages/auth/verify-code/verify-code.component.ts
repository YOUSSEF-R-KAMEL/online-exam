import { Component } from '@angular/core';
import { InputComponent } from "../../../../shared/input/input.component";
import { RouterLink } from '@angular/router';
import { SubmitComponent } from "../../../../shared/submit/submit.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-code',
  imports: [InputComponent, RouterLink, SubmitComponent, ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  verifyCodeForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.verifyCodeForm = this.fb.group({
      code: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.verifyCodeForm.value)
    if (this.verifyCodeForm.valid) {
      console.log('Form Submitted:', this.verifyCodeForm.value);
    } else {
      console.log('Invalid Form');
    }
  }
}
