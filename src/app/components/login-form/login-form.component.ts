import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VALIDATION_PATTERNS } from '../../constants';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
    ) {
      // Inicializa el formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL_PATTERN)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

    // Comprueba si el formulario es válido, actualiza el estado del usario y redirige
  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      this.userService.login(email);
      this.router.navigate(['/success']);
    }
  }
}
