import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-bleach',
  templateUrl: './bleach.html',
  imports: [NgFor, NgIf],
  styleUrls: ['./bleach.css']
})
export class BleachInfoComponent implements AfterViewInit, OnInit {

  @ViewChild('bleachVideo') bleachVideo!: ElementRef<HTMLVideoElement>;

  selectedCharacterId: string = 'ichigo'; // ✅ Per defecte
  selectedCharacterInfo: string = '<p>Selecciona un personatge per veure la informació.</p>';

  ngOnInit(): void {
    this.showCharacterInfo('ichigo'); // ✅ Mostra Ichigo al carregar
  }

  ngAfterViewInit(): void {
    const video = this.bleachVideo.nativeElement;

    video.muted = true;

    setTimeout(() => {
      const rect = video.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;

      const isVisible = rect.bottom > 0 && rect.top < windowHeight && rect.right > 0 && rect.left < windowWidth;

      if (isVisible) {
        video.play().catch(() => {});
      }
    }, 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0 }
    );

    observer.observe(video);
  }

  characters = [
    {
      id: 'ichigo',
      name: 'Ichigo Kurosaki',
      image: 'https://raw.githubusercontent.com/MiquelSanso/Imatges-HollowsGO/refs/heads/main/Web/Bleach/auuaatxjcpdat0se7u49.webp'
    },
    {
      id: 'rukia',
      name: 'Rukia Kuchiki',
      image: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach/Rukia%20%5B232%5D.png?raw=true'
    },
    {
      id: 'byakuya',
      name: 'Byakuya Kuchiki',
      image: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach/Personatges/Byakuya%20%5B818%5D.png?raw=true'
    },
    {
      id: 'kenpachi',
      name: 'Kenpachi Zaraki',
      image: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach/Personatges/Kenpachi%20.png?raw=true'
    },
    {
      id: 'chad',
      name: 'Yasutora Chad',
      image: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach/Personatges/Chad%20%5B416%5D.png?raw=true'
    },
    {
      id: 'inoue',
      name: 'Orihime Inoue',
      image: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach/Personatges/Orihime%20%5B323%5D.png?raw=true'
    },
    {
      id: 'ishida',
      name: 'Uryu Ishida',
      image: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach/Personatges/Uryu%20%5B518%5D.png?raw=true'
    },
    {
      id: 'kon',
      name: 'Kon',
      image: 'https://github.com/MiquelSanso/Imatges-HollowsGO/blob/main/Web/Bleach/Personatges/Kon%20%5B4004%5D.png?raw=true'
    }
  ];

  showCharacterInfo(characterId: string): void {
    const descriptions: { [key: string]: string } = {
      ichigo: `
        <h3>Ichigo Kurosaki</h3>
        <p>Protagonista de Bleach. Ichigo és un adolescent amb el poder de veure esperits i que es converteix en un Shinigami per protegir el món dels Hollows i guiar ànimes a la Societat d'Ànimes.</p>
      `,
      rukia: `
        <h3>Rukia Kuchiki</h3>
        <p>Shinigami de la 13a divisió. És qui li atorga els seus poders a Ichigo. Té un caràcter seriós però compassiu, i juga un paper fonamental en el desenvolupament de la història.</p>
      `,
      byakuya: `
        <h3>Byakuya Kuchiki</h3>
        <p>Capità de la 6a divisió i germà adoptiu de Rukia. És elegant, poderós i molt estricte en seguir les normes, però amb el temps mostra un fort sentit de justícia i protecció.</p>
      `,
      kenpachi: `
        <h3>Kenpachi Zaraki</h3>
        <p>Capità de la 11a divisió. Un dels personatges més temuts i respectats per la seva força brutal i amor pel combat. Té una connexió especial amb la seva tinent Yachiru.</p>
      `,
      chad: `
        <h3>Yasutora Chad</h3>
        <p>Un amic de confiança d’Ichigo, conegut per la seva força física i el seu poder protector, especialment amb el seu braç dret especial.</p>
      `,
      inoue: `
        <h3>Orihime Inoue</h3>
        <p>Una companya d’Ichigo amb poders de curació i barrera espiritual. És amable i optimista, i juga un paper clau en l’equip.</p>
      `,
      ishida: `
        <h3>Uryu Ishida</h3>
        <p>Un Quincy, expert en l’ús d’arcs espirituals i una figura intel·ligent i tàctica dins del grup.</p>
      `,
      kon: `
        <h3>Kon</h3>
        <p>Un esperit modificat que sovint proporciona moments còmics però també ajuda en situacions difícils.</p>
      `
    };

    this.selectedCharacterId = characterId;
    this.selectedCharacterInfo = descriptions[characterId] || '<p>Selecciona un personatge per veure la informació.</p>';
  }
}
