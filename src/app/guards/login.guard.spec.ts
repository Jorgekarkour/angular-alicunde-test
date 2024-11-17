import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginGuard } from './login.guard';
import { UserService } from '../services/user.service';

class MockRouter {
  navigate = jest.fn();
}

class MockUserService {
  user$ = of({ isLoggedIn: false });
}

describe('LoginGuard', () => {
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

  it('should allow navigation if user is not logged in', () => {
    mockUserService.user$ = of({ isLoggedIn: false });

    const result = TestBed.runInInjectionContext(() => LoginGuard({} as any, {} as any));

    expect(result).toBeTruthy();
  });

  it('should prevent navigation and redirect to success page if user is logged in', () => {
    mockUserService.user$ = of({ isLoggedIn: true });

    const result = TestBed.runInInjectionContext(() => LoginGuard({} as any, {} as any));

    expect(result).toBeFalsy();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/success']);
  });
});
