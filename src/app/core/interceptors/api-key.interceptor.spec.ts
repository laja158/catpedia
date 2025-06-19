import { TestBed } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from 'src/environments/environment';
import { ApiKeyInterceptor } from './auth.interceptor';

describe('ApiKeyInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiKeyInterceptor,
          multi: true,
        },
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debería añadir la cabecera "x-api-key" a la solicitud saliente', () => {
    const testUrl = '/test';
    const testResponse = { data: 'some data' };

    httpClient.get(testUrl).subscribe(response => {
      expect(response).toEqual(testResponse);
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.headers.has('x-api-key')).toBeTruthy();
    expect(req.request.headers.get('x-api-key')).toEqual(environment.apiKey);

    req.flush(testResponse); // Simula la respuesta del servidor
  });

  it('debería clonar la solicitud y no modificar la original', () => {
    const testUrl = '/another-test';
    const originalHeaders = { 'Content-Type': 'application/json' };

    const reqObservable = httpClient.get(testUrl, { headers: originalHeaders });
    
    reqObservable.subscribe();

    const req = httpTestingController.expectOne(testUrl);

    expect(req.request.headers.has('Content-Type')).toBeTruthy();
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.headers.has('x-api-key')).toBeTruthy();

    req.flush({});
  });
});