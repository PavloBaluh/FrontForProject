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
  isAnable: 'disabled';

  constructor(private  service: MainService) {
  }

  deleteFromBasket(food) {
    this.foods.splice(this.foods.indexOf(food), 1);
    this.service.deleteFood(food).subscribe((res) => {
    });
  }

  ngOnInit() {
    this.service.getBasket().subscribe((res) => {
        res = this.findquantity(res);
        res = this.remove_duplicates(res);
        this.foods = res;
      }
    );
  }

  findSrc(fileName): string {
    return this.Img + fileName;
  }

  remove_duplicates(res: Food[]): Food[] {
    let usedObjects = {};
    for (let m = res.length - 1; m >= 0; m--) {
      let so = JSON.stringify(res[m]);
      if (usedObjects[so]) {
        res.splice(m, 1);
      } else {
        usedObjects[so] = true;
      }
    }
    return res;
  }

  findquantity(res: Food[]): Food[] {
    let m = 0;
    for (let i = 0; i < res.length; i++) {
      for (let j = 0; j < res.length; j++) {
        if (res[i].id === res[j].id) {
          m++;
        }
      }
      res[i].quantity = m;
      m = 0;
    }
    return res;
  }
}
