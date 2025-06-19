import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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
