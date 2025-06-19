import { TestBed } from '@angular/core/testing';
import { CatService } from './cat.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('CatService', () => {
  let service: CatService;
  let httpMock: HttpTestingController;

  const mockBreed = {
    id: 'abc',
    name: 'British Shorthair',
    origin: 'UK',
    temperament: 'Calm',
    image: { url: 'https://example.com/img.jpg' }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatService],
    });
    service = TestBed.inject(CatService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all breeds', () => {
    service.getBreeds().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].name).toBe('British Shorthair');
    });

    const req = httpMock.expectOne('https://api.thecatapi.com/v1/breeds');
    expect(req.request.method).toBe('GET');
    req.flush([mockBreed]);
  });

  it('should get breed by id', () => {
    service.getBreedById('abc').subscribe((res) => {
      expect(res?.id).toBe('abc');
    });

    const req = httpMock.expectOne('https://api.thecatapi.com/v1/breeds/abc');
    expect(req.request.method).toBe('GET');
    req.flush(mockBreed);
  });

  it('should get breed image', () => {
    const mockImage = [{ url: 'https://example.com/image.jpg' }];

    service.getBreedImage('abc').subscribe((res) => {
      expect(res).toBe('https://example.com/image.jpg');
    });

    const req = httpMock.expectOne((req) => {
      return req.urlWithParams === 'https://api.thecatapi.com/v1/images/search?breed_ids=abc';
    });

    expect(req.request.method).toBe('GET');
    req.flush(mockImage);
  });

  it('should return empty string if no image found', () => {
    service.getBreedImage('abc').subscribe((res) => {
      expect(res).toBe('');
    });

    const req = httpMock.expectOne((req) =>
      req.urlWithParams === 'https://api.thecatapi.com/v1/images/search?breed_ids=abc'
    );

    req.flush([]); 
  });

});
