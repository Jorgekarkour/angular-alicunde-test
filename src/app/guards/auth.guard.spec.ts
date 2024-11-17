import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { UserService } from '../services/user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Mock for Router
const routerMock = {
  navigate: jest.fn(),
};

// Mock for UserService
const userServiceMock = {
  user$: of({ email: 'test@example.com', isLoggedIn: false }),
};

// Mock route and state
const mockRoute: ActivatedRouteSnapshot = {
  data: {},
} as ActivatedRouteSnapshot;

const mockState: RouterStateSnapshot = {
  url: '/test',
} as RouterStateSnapshot;

describe('AuthGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    });
  });

  it('should allow access when requiresAuth is true and user is logged in', () => {
    userServiceMock.user$ = of({ email: 'test@example.com', isLoggedIn: true });

    const result = TestBed.runInInjectionContext(() => AuthGuard(mockRoute, mockState));
    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and navigate to login when requiresAuth is true and user is not logged in', () => {
    userServiceMock.user$ = of({ email: 'test@example.com', isLoggedIn: false });

    const result = TestBed.runInInjectionContext(() => AuthGuard(mockRoute, mockState));
    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should deny access and navigate to success when requiresAuth is false and user is logged in', () => {
    userServiceMock.user$ = of({ email: 'test@example.com', isLoggedIn: true });
    mockRoute.data = { requiresAuth: false };

    const result = TestBed.runInInjectionContext(() => AuthGuard(mockRoute, mockState));
    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/success']);
  });

  it('should allow access when requiresAuth is false and user is not logged in', () => {
    userServiceMock.user$ = of({ email: 'test@example.com', isLoggedIn: false });
    mockRoute.data = { requiresAuth: false };

    const result = TestBed.runInInjectionContext(() => AuthGuard(mockRoute, mockState));
    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
