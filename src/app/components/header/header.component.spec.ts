import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';

class MockRouter {
  navigate = jest.fn();
}

class MockUserService {
  user$ = of({ email: 'test@example.com', isLoggedIn: true });
  logout = jest.fn();
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockUserService: MockUserService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    mockUserService = new MockUserService();
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to user state on initialization', () => {
    expect(component.userEmail).toBe('test@example.com');
    expect(component.isLoggedIn).toBe(true);
  });

  it('should call logout and navigate to home after logging out', () => {
    component.logout();
    expect(mockUserService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display user email when logged in', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const welcomeElement = compiled.querySelector('.header__welcome');
    expect(welcomeElement?.textContent).toContain('Bienvenido, test@example.com');
  });

  it('should display default text when user is not logged in', () => {
    mockUserService.user$ = of({ email: '', isLoggedIn: false });
    component.ngOnInit();
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const welcomeElement = compiled.querySelector('.header__welcome');
    expect(welcomeElement?.textContent?.trim()).toBe('Prueba Angular - Alicunde');
  });

  it('should not display the logout button when user is not logged in', () => {
    mockUserService.user$ = of({ email: '', isLoggedIn: false });
    component.ngOnInit();
    fixture.detectChanges();
  
    const compiled = fixture.nativeElement as HTMLElement;
    const logoutButton = compiled.querySelector('.header__logout');
    expect(logoutButton).toBeNull();
  });

  it('should display the logout button when user is logged in', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logoutButton = compiled.querySelector('.header__logout');
    expect(logoutButton).toBeTruthy();
  });
});
