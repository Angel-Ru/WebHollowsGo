import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './service/authservice';
import { PersonatgeService } from './service/personatgeservice';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.html',
  styleUrls: ['./biblioteca.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class Biblioteca implements OnInit {
  email: string = '';
  contrassenya: string = '';
  mensaje: string = '';
  userId: number | null = null;
  personatges: any[] = [];

  // Estats possibles: 'loggedOut' | 'loading' | 'loaded'
  estat: 'loggedOut' | 'loading' | 'loaded' = 'loggedOut';

  currentIndex: number = 0;

  constructor(
    private authService: AuthService,
    private personatgeService: PersonatgeService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.mensaje = '';
    this.estat = 'loading'; // Mostrem que s’està processant el login

    this.authService.login(this.email, this.contrassenya).subscribe({
      next: (response) => {
        this.userId = response.user.id;
        localStorage.setItem('token', response.token);
        this.mensaje = '¡Login correcte!';
        this.loadBiblioteca();
      },
      error: (error) => {
        console.error('Error en el login:', error);
        this.mensaje = error.error.message || 'Error en el login';
        this.estat = 'loggedOut'; // Tornem a l’estat logout si error
        this.cd.detectChanges();
      }
    });
  }

  loadBiblioteca(): void {
    const token = localStorage.getItem('token');
    if (!token || this.userId === null) {
      this.estat = 'loggedOut';
      return;
    }

    this.personatgeService.getPersonatgesAmbSkins(this.userId.toString(), token).subscribe({
      next: (data) => {
        this.personatges = data.map((item: any) => ({
          ...item,
          skins: item.skins.map((skin: any) => ({
            ...skin,
            raca: skin['raça']
          }))
        }));
        this.currentIndex = 0;
        this.estat = 'loaded';
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar biblioteca:', error);
        this.mensaje = 'Error al cargar la biblioteca';
        this.estat = 'loggedOut';
        this.cd.detectChanges();
      }
    });
  }

  nextPersonatge(): void {
    if (this.currentIndex < this.personatges.length - 1) {
      this.currentIndex++;
    }
  }

  prevPersonatge(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
