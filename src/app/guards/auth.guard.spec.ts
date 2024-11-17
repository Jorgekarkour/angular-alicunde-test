import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { UserService } from '../services/user.service';

class MockRouter {
  navigate = jest.fn();
}

class MockUserService {
  user$ = of({ isLoggedIn: false });
}

describe('AuthGuard', () => {
  let mockRouter: MockRouter;
  let mockUserService: MockUserService;

  beforeEach(() => {
    mockRouter = new MockRouter();
    mockUserService = new MockUserService();

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: mockUserService },
      ],
    });
  });

  it('should prevent navigation and redirect to login if user is not logged in', () => {
    mockUserService.user$ = of({ isLoggedIn: false });

    const result = TestBed.runInInjectionContext(() => AuthGuard({} as any, {} as any));

    expect(result).toBeFalsy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should allow navigation if user is logged in', () => {
    mockUserService.user$ = of({ isLoggedIn: true });

    const result = TestBed.runInInjectionContext(() => AuthGuard({} as any, {} as any));

    expect(result).toBeTruthy();
  });
});
