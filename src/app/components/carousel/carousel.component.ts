import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  images: string[] = [
    'assets/webp/image1.webp',
    'assets/webp/image2.webp',
    'assets/webp/image3.webp'
  ];
  activeImageIndex: number = 0;


  /**
   * * Avanza al siguiente índice en el carrusel.
   * * Si está en la última imagen, vuelve a la primera.
   * */
  next(): void {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
  }
  /**
   * * Retrocede al siguiente índice en el carrusel.
   * * Si está en la primera imagen, vuelve a la ultima.
   * */
  prev(): void {
    this.activeImageIndex = (this.activeImageIndex - 1 + this.images.length) % this.images.length;
  }
}