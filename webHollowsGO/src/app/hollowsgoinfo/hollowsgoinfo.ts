import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-hollowsgoinfo',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './hollowsgoinfo.html',
  styleUrls: ['./hollowsgoinfo.css'],
})
export class Hollowsgoinfo implements OnInit, OnDestroy {
  images: string[] = [
    'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/Fotos_HollowsGo/u3rayqj3ozb0tmkucf0p',
    'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/Fotos_HollowsGo/azevfdojdy9gwtwsvjpg',
    'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/Fotos_HollowsGo/i22hxtu0hrlqpvwnpvus',
  ];

  tenda: string[] = [
    'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/Fotos_HollowsGo/gz60njhmwp3ultysdic5',
    'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/Fotos_HollowsGo/s2cuqbfigljiu45ajpl5',
    'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/Fotos_HollowsGo/vtpb8pbzq9twlhu7t0t9',
  ];

  frags: string[] = [
    'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/Fotos_HollowsGo/FragmentsSkins/z7oa9e6plvjqrxa76h7g',
    'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/Fotos_HollowsGo/FragmentsSkins/orxvunxfch1ys63c6mog',
    'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/Fotos_HollowsGo/FragmentsSkins/ew9kncpd6lkdcnkzvkus',
  ];

  indices: number[] = [0, 0, 0]; // Carrusels

  // Vídeo 0: URL fixa
  videoUrl0: string = 'https://res.cloudinary.com/dkcgsfcky/video/upload/f_auto:video,q_auto/v1/WEB/Fotos_HollowsGo/fixed_video.mp4';

  // Vídeo 1: array de vídeos
  videoUrls: string[] = [
    'https://res.cloudinary.com/dkcgsfcky/video/upload/f_auto:video,q_auto/v1/WEB/Fotos_HollowsGo/mppb2hxqmhi9a854crwd',
    'https://res.cloudinary.com/dkcgsfcky/video/upload/f_auto:video,q_auto/v1/WEB/Fotos_HollowsGo/wap0ftvycpukmh7wnnzg',
  ];
  activeVideoIndex: number = 0;

  // Referències a cada vídeo player
  @ViewChild('videoPlayer0') videoPlayer0!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer1') videoPlayer1!: ElementRef<HTMLVideoElement>;

  // Estat dels dos vídeos
  videoStates = [
    { isPlaying: false, isMuted: true, progress: 0 }, // vídeo0
    { isPlaying: false, isMuted: true, progress: 0 }, // vídeo1
  ];

  ngOnInit(): void {
    this.updateBackground();
    window.addEventListener('resize', this.updateBackground.bind(this));
  }

  ngAfterViewInit(): void {
    // Inicialitzar mute a true i carregar vídeo1
    if (this.videoPlayer0) {
      this.videoPlayer0.nativeElement.muted = true;
    }
    if (this.videoPlayer1) {
      this.videoPlayer1.nativeElement.muted = true;
      this.videoPlayer1.nativeElement.src = this.videoUrls[this.activeVideoIndex];
      this.videoPlayer1.nativeElement.load();
    }
  }

  ngOnDestroy(): void {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundColor = '';
    window.removeEventListener('resize', this.updateBackground.bind(this));
  }

  prevSlide(carouselId: number, length: number): void {
    this.indices[carouselId] = (this.indices[carouselId] - 1 + length) % length;
  }

  nextSlide(carouselId: number, length: number): void {
    this.indices[carouselId] = (this.indices[carouselId] + 1) % length;
  }

  getTransform(carouselId: number): string {
    return `translateX(-${this.indices[carouselId] * 100}%)`;
  }

  togglePlay(index: number): void {
    if (index === 0 && this.videoPlayer0) {
      const video = this.videoPlayer0.nativeElement;
      if (video.paused) {
        video.play();
        this.videoStates[0].isPlaying = true;
      } else {
        video.pause();
        this.videoStates[0].isPlaying = false;
      }
    } else if (index === 1 && this.videoPlayer1) {
      const video = this.videoPlayer1.nativeElement;
      if (video.paused) {
        video.play();
        this.videoStates[1].isPlaying = true;
      } else {
        video.pause();
        this.videoStates[1].isPlaying = false;
      }
    }
  }

  toggleMute(index: number): void {
    if (index === 0 && this.videoPlayer0) {
      const video = this.videoPlayer0.nativeElement;
      video.muted = !video.muted;
      this.videoStates[0].isMuted = video.muted;
    } else if (index === 1 && this.videoPlayer1) {
      const video = this.videoPlayer1.nativeElement;
      video.muted = !video.muted;
      this.videoStates[1].isMuted = video.muted;
    }
  }

  updateProgress(index: number): void {
    if (index === 0 && this.videoPlayer0) {
      const video = this.videoPlayer0.nativeElement;
      this.videoStates[0].progress = video.duration ? (video.currentTime / video.duration) * 100 : 0;
    } else if (index === 1 && this.videoPlayer1) {
      const video = this.videoPlayer1.nativeElement;
      this.videoStates[1].progress = video.duration ? (video.currentTime / video.duration) * 100 : 0;
    }
  }

  seekVideo(event: MouseEvent, index: number): void {
    let video: HTMLVideoElement | undefined;
    if (index === 0 && this.videoPlayer0) {
      video = this.videoPlayer0.nativeElement;
    } else if (index === 1 && this.videoPlayer1) {
      video = this.videoPlayer1.nativeElement;
    }
    if (!video || !video.duration) return;

    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = clickX / rect.width;

    video.currentTime = video.duration * percentage;
  }

  changeVideo(newIndex: number): void {
    if (newIndex === this.activeVideoIndex || !this.videoPlayer1) return;

    // Pause el video1 actual
    this.videoPlayer1.nativeElement.pause();

    // Actualitza l'index i la font
    this.activeVideoIndex = newIndex;
    this.videoPlayer1.nativeElement.src = this.videoUrls[newIndex];
    this.videoPlayer1.nativeElement.load();

    // No reproduir automàticament, només actualitza l'estat
    this.videoStates[1].isPlaying = false;
    this.videoStates[1].progress = 0;
  }

  onToggleVideo(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.changeVideo(checked ? 1 : 0);
  }
  private updateBackground(): void {
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    const imageUrl = isLandscape
      ? 'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/kdopgq4rlbanmrurspow'
      : 'https://res.cloudinary.com/dkcgsfcky/image/upload/f_auto,q_auto/v1/WEB/e3wettuzovqwdicdhpmg';

    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundColor = '#1b0c04';
  }

  protected readonly HTMLElement = HTMLElement;
  protected readonly HTMLInputElement = HTMLInputElement;
}
