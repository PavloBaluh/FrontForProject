import {Component, OnInit} from '@angular/core';
import {MainService} from '../Services/main.service';
import {Food} from '../Models/Food';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  foods: Food[];
  Img: any = '../../assets/';

  constructor(private  service: MainService) {
  }

  findSrc(fileName): string {
    return this.Img + fileName;
  }

  ngOnInit() {
    this.service.getBasket().subscribe((res) => {
      this.foods = res;
    });
  }

}
