import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Estado inicial del usuario (no autenticado)
  private userSubject = new BehaviorSubject<{ email: string | null; isLoggedIn: boolean }>({
    email: null,
    isLoggedIn: false,
  });

  // Observable del estado del usuario
  user$ = this.userSubject.asObservable();

  // Método para iniciar sesión
  login(email: string): void {
    const username = email.split('@')[0];
    localStorage.setItem('token', email); // Persistir en localStorage
    this.userSubject.next({ email: username, isLoggedIn: true });
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Eliminar token
    this.userSubject.next({ email: null, isLoggedIn: false });
  }

  // Método para cargar el estado del usuario desde localStorage
  loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const username = token.split('@')[0];
      this.userSubject.next({ email: username, isLoggedIn: true });
    }
  }
}