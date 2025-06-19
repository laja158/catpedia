import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breed } from 'src/app/core/models/Breed';
import { CatService } from 'src/app/core/services/cat.service';

@Component({
  standalone: false,
  selector: 'app-breed-detail',
  templateUrl: './breed-detail.page.html',
  styleUrls: ['./breed-detail.page.scss'],
})
export class BreedDetailPage implements OnInit {
  breed?: Breed;
  imageUrl?: string;

  constructor(
    private route: ActivatedRoute,
    private catService: CatService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.catService.getBreedById(id).subscribe({
        next: (data) => this.breed = data,
        error: (err) => console.error('Error al cargar la raza', err)
      });
      this.getBreedImage();
    }
  }
  getBreedImage() {
    this.catService.getBreedImage(this.breed?.id || '').subscribe({
      next: (url) => this.imageUrl = url,
      error: (err) => console.error('Error al cargar la imagen', err)
    });
  }
}
