import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    localStorage.clear(); // Limpiar el almacenamiento local antes de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial state as not logged in', (done) => {
    service.user$.subscribe((user) => {
      expect(user).toEqual({ email: null, isLoggedIn: false });
      done();
    });
  });

  it('should log in a user and persist the token', (done) => {
    const email = 'test@example.com';
    service.login(email);

    service.user$.subscribe((user) => {
      expect(user).toEqual({ email: 'test', isLoggedIn: true });
      expect(localStorage.getItem('token')).toBe(email);
      done();
    });
  });

  it('should log out a user and clear the token', (done) => {
    localStorage.setItem('token', 'test@example.com');
    service.logout();

    service.user$.subscribe((user) => {
      expect(user).toEqual({ email: null, isLoggedIn: false });
      expect(localStorage.getItem('token')).toBeNull();
      done();
    });
  });

  it('should load user state from localStorage', (done) => {
    const email = 'test@example.com';
    localStorage.setItem('token', email);

    service.loadUserFromStorage();

    service.user$.subscribe((user) => {
      expect(user).toEqual({ email: 'test', isLoggedIn: true });
      done();
    });
  });

  it('should maintain user state as not logged in if no token in localStorage', (done) => {
    service.loadUserFromStorage();

    service.user$.subscribe((user) => {
      expect(user).toEqual({ email: null, isLoggedIn: false });
      done();
    });
  });
});