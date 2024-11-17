import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the carousel component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the first image active', () => {
    expect(component.activeImageIndex).toBe(0);
    expect(component.images[component.activeImageIndex]).toBe('assets/webp/image1.webp');
  });

  it('should navigate to the next image when next() is called', () => {
    component.next();
    expect(component.activeImageIndex).toBe(1);
    expect(component.images[component.activeImageIndex]).toBe('assets/webp/image2.webp');
  });

  it('should navigate to the previous image when prev() is called', () => {
    component.activeImageIndex = 1;
    component.prev();
    expect(component.activeImageIndex).toBe(0);
    expect(component.images[component.activeImageIndex]).toBe('assets/webp/image1.webp');
  });

  it('should loop back to the first image when next() is called on the last image', () => {
    component.activeImageIndex = component.images.length - 1;
    component.next();
    expect(component.activeImageIndex).toBe(0);
    expect(component.images[component.activeImageIndex]).toBe('assets/webp/image1.webp');
  });

  it('should loop back to the last image when prev() is called on the first image', () => {
    component.activeImageIndex = 0;
    component.prev();
    expect(component.activeImageIndex).toBe(component.images.length - 1);
    expect(component.images[component.activeImageIndex]).toBe('assets/webp/image3.webp');
  });

  it('should render the active image correctly in the template', () => {
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('.carousel__image');
    expect(imgElement.src).toContain(component.images[component.activeImageIndex]);
  });

  it('should update the template when next() is called', () => {
    component.next();
    fixture.detectChanges();
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('.carousel__image');
    expect(imgElement.src).toContain(component.images[component.activeImageIndex]);
  });

  it('should update the template when prev() is called', () => {
    component.prev();
    fixture.detectChanges();
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector('.carousel__image');
    expect(imgElement.src).toContain(component.images[component.activeImageIndex]);
  });
});
