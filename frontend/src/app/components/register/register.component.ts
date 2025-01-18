import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { confirmPassword } from '../../shared/utils/confirmPassword';
import { Router, RouterLink } from '@angular/router';
import { formIsInvalid, formIsValid } from '../../shared/utils/form-utils';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FromBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  registerErrorMsg: string = "";
  registerSuccess: boolean = false;
  isLoading: boolean = false;

  registerForm: FormGroup = this._FromBuilder.group({
    firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required,Validators.minLength(5)]],
    rePassword: [null, [Validators.required]]
  }, { validators: confirmPassword });

  registerSubmit() {
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.isLoading = true;
      this._AuthService.register(userData).subscribe({
        next: (res) => {
          console.log(res);
          this.registerSuccess = true;
          const token = res.data.user.token;
          localStorage.setItem('userToken', token);
          this.isLoading = false;

          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 3000)
        },
        error: (err) => {
          console.log(err);
          this.registerErrorMsg = err.error.message;
          this.isLoading = false;
        }
      });
    }
  }

  formIsInvalid = formIsInvalid;
  formIsValid = formIsValid;

}
