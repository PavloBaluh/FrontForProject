import {Component,} from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent {
  images = [
    '../../assets/slider/gallery00.jpg',
    '../../assets/slider/gallery01.jpg',
    '../../assets/slider/gallery02.jpg',
    '../../assets/slider/gallery03.jpg',
    '../../assets/slider/gallery07.jpg',
  ];

  constructor() {
  }


}
