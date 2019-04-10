import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Food} from '../Models/Food';

@Component({
  selector: 'app-curent',
  templateUrl: './curent.component.html',
  styleUrls: ['./curent.component.css']
})
export class CurentComponent implements OnInit {

  food: Food;
  Img: any = '../../assets/';

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.food = <Food> res;
    });
  }

  findSrc(fileName): string {
    return this.Img + fileName;
  }

}
