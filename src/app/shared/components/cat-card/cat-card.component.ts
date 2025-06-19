import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Breed } from 'src/app/core/models/Breed';

@Component({
  standalone: false,
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.scss'],
})
export class CatCardComponent {
  @Input() breed!: Breed;

  constructor(private router: Router) {}

  goToDetail() {
    this.router.navigate(['/breed-detail', this.breed.id]);
  }
  getShortTemperament(): string {
    return this.breed.temperament?.split(',')[0] || '';
  }
}
