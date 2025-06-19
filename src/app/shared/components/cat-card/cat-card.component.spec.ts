import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatCardComponent } from './cat-card.component';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

describe('CatCardComponent', () => {
  let component: CatCardComponent;
  let fixture: ComponentFixture<CatCardComponent>;

  const mockBreed = {
    id: 'abc',
    name: 'British Shorthair',
    origin: 'UK',
    temperament: 'Calm, Loyal',
    description: 'A calm and affectionate cat.',
    intelligence: 5,
    adaptability: 4,
    life_span: '12-15 years',
    vetstreet_url: 'https://www.vetstreet.com/cats/british-shorthair',
    image: { url: 'https://cdn.example.com/image.jpg' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.breed = mockBreed;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render breed name', () => {
    component.breed = mockBreed;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('British');
  });

  it('should not render image when breed.image is undefined', () => {
    const breedWithoutImage = { ...mockBreed, image: undefined };
    component.breed = breedWithoutImage;
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeNull();
  });

  it('should navigate to breed detail on goToDetail', () => {
    component.breed = mockBreed;
    fixture.detectChanges();

    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.goToDetail();

    expect(navigateSpy).toHaveBeenCalledWith(['/breed-detail', 'abc']);
  });
});
