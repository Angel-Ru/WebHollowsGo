import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent implements OnInit {
  isMuted: boolean = true;
  private audio!: HTMLAudioElement;

  private allSongs: string[] = [
    'https://media.githubusercontent.com/media/MiquelSanso/Imatges-HollowsGO/refs/heads/main/Web/Musica/ClavarEspada.mp3',
    'https://media.githubusercontent.com/media/MiquelSanso/Imatges-HollowsGO/refs/heads/main/Web/Musica/Nube%20Negra.mp3',
    'https://media.githubusercontent.com/media/MiquelSanso/Imatges-HollowsGO/refs/heads/main/Web/Musica/quincy\'s%20craft.mp3',
  ];
  private songQueue: string[] = [];
  private lastPlayed: string | null = null;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.preloadBackgroundImages();
    this.setupNextSong();

    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const pageId = this.getCurrentPageId();
      this.updateBackgroundForPage(pageId);
    });

    window.addEventListener('orientationchange', () => {
      const pageId = this.getCurrentPageId();
      this.updateBackgroundForPage(pageId);
    });
  }

  private shuffleSongs(): string[] {
    const songs = [...this.allSongs];
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    if (songs[0] === this.lastPlayed && songs.length > 1) {
      [songs[0], songs[1]] = [songs[1], songs[0]];
    }
    return songs;
  }

  private setupNextSong(): void {
    if (this.songQueue.length === 0) {
      this.songQueue = this.shuffleSongs();
    }

    const nextSong = this.songQueue.shift()!;
    this.lastPlayed = nextSong;

    if (this.audio) {
      this.audio.pause();
    }

    this.audio = new Audio(nextSong);
    this.audio.loop = false;
    this.audio.volume = 0.5;
    this.audio.muted = this.isMuted;

    this.audio.addEventListener('ended', () => {
      this.setupNextSong();
    });

    this.audio.play().catch(err =>
      console.warn('L\'àudio necessita interacció de l\'usuari a alguns navegadors:', err)
    );
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
      if (this.audio.paused) {
        this.audio.play().catch(err =>
          console.warn('Error al intentar reproduir el audio:', err)
        );
      }
    }
  }

  goToQuiSom(): void {
    this._router.navigate(['/qui-som']);
  }

  goToBleachInfo(): void {
    this._router.navigate(['/bleach-info']);
  }

  goToInici(): void {
    this._router.navigate(['/']);
  }

  goToHollowsGoInfo(): void {
    this._router.navigate(['/hollows-go-info']);
  }

  goToBiblioteca(): void {
    this._router.navigate(['/biblioteca']);
  }

  private backgroundMap: Record<string, { landscape: string; portrait: string }> = {
    '': {
      landscape: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Kulosaki.jpg?raw=true',
      portrait: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach2024_Mobile-BG_01_Ichigo%20Kurosaki%201.jpg?raw=true',
    },
    'bleach-info': {
      landscape: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/SoiFon.jpg?raw=true',
      portrait: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach2024_Mobile-BG_15_Soi%20Fon.jpg?raw=true',
    },
    'hollows-go-info': {
      landscape: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/BL_TYBW_part3KV7_Blog_1200x630.jpg?raw=true',
      portrait: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach2024_Mobile-BG_09_Rangiku%20Matsumoto.jpg?raw=true',
    },
    'qui-som': {
      landscape: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Toshiro.jpg?raw=true',
      portrait: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach2024_Mobile-BG_10_Toshiro%20Hitsugaya.jpg?raw=true',
    },
    'biblioteca': {
      landscape: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/BL_library.jpg?raw=true',
      portrait: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach2024_Mobile-BG_Library.jpg?raw=true',
    },
  };

  private getCurrentPageId(): string {
    const url = this._router.url;
    const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
    return cleanUrl.split('/')[0];
  }

  private updateBackgroundForPage(pageId: string): void {
    const orientation = window.matchMedia('(orientation: landscape)').matches ? 'landscape' : 'portrait';
    const bgData = this.backgroundMap[pageId];
    if (!bgData) return;

    const imageUrl = bgData[orientation];
    Object.assign(document.body.style, {
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundColor: '#1b0c04',
    });
  }

  private preloadBackgroundImages(): void {
    for (const pageKey in this.backgroundMap) {
      const bg = this.backgroundMap[pageKey];
      ['landscape', 'portrait'].forEach(orientation => {
        const img = new Image();
        img.src = bg[orientation as 'landscape' | 'portrait'];
      });
    }
  }
}
