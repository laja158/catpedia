import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Breed } from '../models/Breed';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private API_URL = environment.apiUrlBreeds;
  private API_URL_IMAGE = environment.apiUrlImages;
  private API_KEY = environment.apiKey;

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.error('An error occurred:', error); 
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getBreeds(): Observable<Breed[]> {
    const headers = new HttpHeaders().set('x-api-key', this.API_KEY);
    return this.http.get<Breed[]>(this.API_URL, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getBreedById(id: string): Observable<Breed | undefined> {
    const headers = new HttpHeaders().set('x-api-key', this.API_KEY);
    return this.http.get<Breed>(`${this.API_URL}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  getBreedImage(breedId: string): Observable<string> {
    const headers = new HttpHeaders().set('x-api-key', this.API_KEY);
    return this.http.get<{ url: string }[]>(`${this.API_URL_IMAGE}${breedId}`, { headers }).pipe(
      map(images => images.length > 0 ? images[0].url : ''),
      catchError(this.handleError)
    );
  }
}
