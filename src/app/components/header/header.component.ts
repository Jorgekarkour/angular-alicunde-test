import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userEmail: string | null = null;
  isLoggedIn = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse al estado del usuario
    this.userService.user$.subscribe(user => {
      this.userEmail = user.email;
      this.isLoggedIn = user.isLoggedIn;
    });
  }

  logout(): void {
    this.userService.logout(); // Actualizar el estado usando el servicio
    this.router.navigate(['/']);
  }
}
