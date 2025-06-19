import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Breed } from '../models/Breed';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  private API_URL = 'https://api.thecatapi.com/v1/breeds';
  private API_URL_IMAGE = 'https://api.thecatapi.com/v1/images/search?breed_ids=';
  private API_KEY = 'live_99Qe4Ppj34NdplyLW67xCV7Ds0oSLKGgcWWYnSzMJY9C0QOu0HUR4azYxWkyW2nr';

  constructor(private http: HttpClient) { }

  getBreeds(): Observable<Breed[]> {
    const headers = new HttpHeaders().set('x-api-key', this.API_KEY);
    return this.http.get<Breed[]>(this.API_URL, { headers });
  }

  getBreedById(id: string): Observable<Breed | undefined> {
    const headers = new HttpHeaders().set('x-api-key', this.API_KEY);
    return this.http.get<Breed>(`${this.API_URL}/${id}`, { headers });
  }
  getBreedImage(breedId: string): Observable<string> {
    const headers = new HttpHeaders().set('x-api-key', this.API_KEY);
    return this.http.get<{ url: string }[]>(`${this.API_URL_IMAGE}${breedId}`, { headers }).pipe(
      map(images => images.length > 0 ? images[0].url : '')
    );
  }
}
