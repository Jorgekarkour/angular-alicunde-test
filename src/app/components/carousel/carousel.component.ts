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

  next(): void {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
  }
  
  prev(): void {
    this.activeImageIndex = (this.activeImageIndex - 1 + this.images.length) % this.images.length;
  }
}