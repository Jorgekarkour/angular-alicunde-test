import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

class MockRouter {
  navigate = jest.fn();
}

class MockUserService {
  login = jest.fn();
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let mockRouter: MockRouter;
  let mockUserService: MockUserService;

  beforeEach(async () => {
    mockRouter = new MockRouter();
    mockUserService = new MockUserService();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginFormComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the LoginFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with default values', () => {
    const loginForm = component.loginForm;
    expect(loginForm.get('email')?.value).toBe('');
    expect(loginForm.get('password')?.value).toBe('');
  });

  it('should validate email and password fields', () => {
    const loginForm = component.loginForm;
    loginForm.get('email')?.setValue('invalid-email');
    loginForm.get('password')?.setValue('123');
    fixture.detectChanges();

    expect(loginForm.get('email')?.valid).toBeFalsy();
    expect(loginForm.get('password')?.valid).toBeFalsy();

    loginForm.get('email')?.setValue('valid@example.com');
    loginForm.get('password')?.setValue('123456');
    fixture.detectChanges();

    expect(loginForm.get('email')?.valid).toBeTruthy();
    expect(loginForm.get('password')?.valid).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.hidePassword).toBeTruthy();
    component.togglePasswordVisibility();
    expect(component.hidePassword).toBeFalsy();
    component.togglePasswordVisibility();
    expect(component.hidePassword).toBeTruthy();
  });

  it('should call userService.login and navigate on valid form submission', () => {
    const loginForm = component.loginForm;
    loginForm.get('email')?.setValue('valid@example.com');
    loginForm.get('password')?.setValue('123456');
    fixture.detectChanges();

    component.onSubmit();

    expect(mockUserService.login).toHaveBeenCalledWith('valid@example.com');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/success']);
  });

  it('should not call userService.login or navigate on invalid form submission', () => {
    component.onSubmit();
    expect(mockUserService.login).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
