import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedDetailPage } from './breed-detail.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CatService } from 'src/app/core/services/cat.service';

describe('BreedDetailPage', () => {
  let component: BreedDetailPage;
  let fixture: ComponentFixture<BreedDetailPage>;
  let catService: jasmine.SpyObj<CatService>;

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
    const catServiceSpy = jasmine.createSpyObj('CatService', ['getBreedById', 'getBreedImage']);

    await TestBed.configureTestingModule({
      declarations: [BreedDetailPage],
      imports: [IonicModule.forRoot()],
      providers: [
        provideHttpClientTesting(),
        { provide: CatService, useValue: catServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'abc' // simula ID desde la ruta
              }
            }
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BreedDetailPage);
    component = fixture.componentInstance;
    catService = TestBed.inject(CatService) as jasmine.SpyObj<CatService>;

    catService.getBreedById.and.returnValue(of(mockBreed));
    catService.getBreedImage.and.returnValue(of(mockBreed.image.url));

    fixture.detectChanges(); // ejecuta ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load breed from CatService using route param ID', () => {
    expect(catService.getBreedById).toHaveBeenCalledWith('abc');
    expect(component.breed?.name).toEqual('British Shorthair');
    expect(component.imageUrl).toEqual(mockBreed.image.url);
  });

  it('should return empty string when no image is found', () => {
    catService.getBreedById.and.returnValue(of(mockBreed));
    catService.getBreedImage.and.returnValue(of(''));

    fixture = TestBed.createComponent(BreedDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.imageUrl).toBe('');
  });

  it('should handle undefined breed response', () => {
    catService.getBreedById.and.returnValue(of(undefined));
    catService.getBreedImage.and.returnValue(of(''));

    fixture = TestBed.createComponent(BreedDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.breed).toBeUndefined();
  });
});
