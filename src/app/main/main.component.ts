import {Component, ElementRef, HostListener, OnInit, ViewChild,} from '@angular/core';
import {element} from 'protractor';
import {MainService} from '../Services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {

  images = [
    '../../assets/slider/gallery00.jpg',
    '../../assets/slider/gallery01.jpg',
    '../../assets/slider/gallery02.jpg',
    '../../assets/slider/gallery03.jpg',
    '../../assets/slider/gallery07.jpg',
  ];
  current = 0;
  lat = 	49.838300;
  lng =   24.023200;
  pass = [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757},
    {lat: 25.774, lng: -80.190}
  ];

  @ViewChild('slide1') slide1: ElementRef;
  @ViewChild('slide2') slide2: ElementRef;
  @ViewChild('slide3') slide3: ElementRef;
  @ViewChild('slide4') slide4: ElementRef;
  @ViewChild('slide5') slide5: ElementRef;
  sliderImages = [];

  constructor() {
    setInterval(() => {
      this.slideRight();
    }, 2000);
  }

  reset() {
    this.sliderImages = [this.slide1, this.slide2, this.slide3, this.slide4, this.slide5];
    for (let i = 0; i < this.sliderImages.length; i++) {
      this.sliderImages[i].nativeElement.style.display = 'none';
    }
  }

  startSlide() {
    this.reset();
    this.sliderImages[0].nativeElement.style.display = 'block';
  }

  slideLeft() {
    if (this.current === 0) {
      this.current = this.sliderImages.length;
    }
    this.reset();
    this.sliderImages[this.current - 1].nativeElement.style.display = 'block';
    this.current--;
  }

  slideRight() {
    if (this.current === this.sliderImages.length - 1) {
      this.current = -1;
    }
    this.reset();
    this.sliderImages[this.current + 1].nativeElement.style.display = 'block';
    this.current++;
  }


  ngOnInit(): void {
    this.startSlide();
  }

}
