import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatCardComponent } from './cat-card.component';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';

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

    component.breed = mockBreed;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render breed name', () => {
    const title = fixture.debugElement.query(By.css('.breed-name'));
    expect(title.nativeElement.textContent).toContain('British');
  });

  it('should render image', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img.nativeElement.src).toContain('/image.jpg');
  });

  it('should render origin and first temperament word', () => {
    const footer = fixture.debugElement.query(By.css('.info-block'));
    expect(footer.nativeElement.textContent).toContain('UK');
    expect(footer.nativeElement.textContent).toContain('OrigenUK');
  });

  it('should show link or button labeled Más...', () => {
    const link = fixture.debugElement.query(By.css('.see-more'));
    expect(link.nativeElement.textContent).toContain('más');
  });
});
