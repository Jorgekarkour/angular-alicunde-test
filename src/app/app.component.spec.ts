import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let userServiceMock: jest.Mocked<UserService>;

  beforeEach(async () => {
    // Mock para UserService
    userServiceMock = {
      loadUserFromStorage: jest.fn(),
      user$: of({ email: 'test@example.com', isLoggedIn: true }), // Mock del observable user$
    } as unknown as jest.Mocked<UserService>;

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, RouterOutlet, HeaderComponent, AppComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call loadUserFromStorage on initialization', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(userServiceMock.loadUserFromStorage).toHaveBeenCalled();
  });

  it('should render the header component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeTruthy();
  });
});
