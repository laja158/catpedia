import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/app/core/models/Breed';
import { CatService } from 'src/app/core/services/cat.service';

@Component({
  standalone: false,
  selector: 'app-breeds',
  templateUrl: './breeds.page.html',
  styleUrls: ['./breeds.page.scss'],
})
export class BreedsPage implements OnInit {

  breeds: Breed[] = [];
  filteredBreeds: Breed[] = [];

  constructor(private catService: CatService) {}

  ngOnInit() {
    this.catService.getBreeds().subscribe({
      next: (data) => {
        this.breeds = data;
        this.filteredBreeds = data;
      },
      error: (err) => {
        console.error('Error cargando razas:', err);
      }
    });
  }

  filterBreeds(event: any) {
    const searchTerm = event.detail.value?.toLowerCase() || '';
    this.filteredBreeds = this.breeds.filter(breed =>
      breed.name.toLowerCase().includes(searchTerm)
    );
  }
}
