import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { confirmPassword } from '../../shared/utils/confirmPassword';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _FromBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  registerErrorMsg: string = "";
  registerSuccess: boolean = false;

  registerForm: FormGroup = this._FromBuilder.group({
    firstName: [null, [Validators.required, Validators.min(2), Validators.max(20)]],
    lastName: [null, [Validators.required, Validators.min(2), Validators.max(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    rePassword: [null, [Validators.required]]
  }, { validators: confirmPassword });

  registerSubmit() {
    console.log(this.registerForm);

    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this._AuthService.register(userData).subscribe({
        next: (res) => {
          console.log(res);
          this.registerSuccess = true;
          const token = res.data.user.token;
          localStorage.setItem('userToken', token);
          
          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 3000)
        },
        error: (err) => {
          console.log(err);
          this.registerErrorMsg = err.error.message;
        }
      });
    }
  }

}
