import { TestBed } from '@angular/core/testing';
import { CatService } from './cat.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment'; 

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
    spyOn(console, 'error');
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
    expect(req.request.headers.get('x-api-key')).toBe(environment.apiKey);
    req.flush([mockBreed]);
  });

  it('should get breed by id', () => {
    service.getBreedById('abc').subscribe((res) => {
      expect(res?.id).toBe('abc');
    });

    const req = httpMock.expectOne('https://api.thecatapi.com/v1/breeds/abc');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-api-key')).toBe(environment.apiKey);
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
    expect(req.request.headers.get('x-api-key')).toBe(environment.apiKey);
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


  it('should handle error when getting all breeds', (done) => {
    const errorMessage = 'test 404 error';
    const status = 404;
    const statusText = 'Not Found';

    service.getBreeds().subscribe({
      next: () => fail('should have failed with the 404 error'),
      error: (error: Error) => {
        expect(error.message).toContain('Something bad happened');
        expect(console.error).toHaveBeenCalled();
        done();
      }
    });

    const req = httpMock.expectOne('https://api.thecatapi.com/v1/breeds');
    expect(req.request.method).toBe('GET');

    req.flush(errorMessage, { status: status, statusText: statusText });
  });

  it('should handle error when getting breed by id', (done) => {
    const errorMessage = 'server error';
    const status = 500;
    const statusText = 'Internal Server Error';

    service.getBreedById('nonexistent-id').subscribe({
      next: () => fail('should have failed with the 500 error'),
      error: (error: Error) => {
        expect(error.message).toContain('Something bad happened');
        expect(console.error).toHaveBeenCalled();
        done();
      }
    });

    const req = httpMock.expectOne('https://api.thecatapi.com/v1/breeds/nonexistent-id');
    expect(req.request.method).toBe('GET');

    req.flush(errorMessage, { status: status, statusText: statusText });
  });

  it('should handle error when getting breed image', (done) => {
    const errorMessage = 'network error';
    const errorEvent = new ProgressEvent('error');

    service.getBreedImage('some-id').subscribe({
      next: () => fail('should have failed with the network error'),
      error: (error: Error) => {
        expect(error.message).toContain('Something bad happened');
        expect(console.error).toHaveBeenCalled();
        done();
      }
    });

    const req = httpMock.expectOne((req) =>
      req.urlWithParams === 'https://api.thecatapi.com/v1/images/search?breed_ids=some-id'
    );
    expect(req.request.method).toBe('GET');

    req.error(errorEvent);
  });
});