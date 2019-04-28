import {Component, OnInit} from '@angular/core';
import {MainService} from '../Services/main.service';
import {Food} from '../Models/Food';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../Models/User';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-restoraunt',
  templateUrl: './restoraunt.component.html',
  styleUrls: ['./restoraunt.component.css']
})
export class RestorauntComponent implements OnInit {
  foods: Food[] = [];


  Img: any = '../../assets/';

  constructor(private service: MainService) {
  }

  ngOnInit() {
    this.service.getAll().subscribe((res) => {
      for (const food of res) {
        food.quantity = 1;
      }
      this.foods = res;
      console.log(res);
    });
  }

  findSrc(fileName): string {
    return this.Img + fileName;
  }

  Inbasket(food: Food) {
    const a: User = this.service.getDecodedAccessToken();
    if (a === null) {
      this.ToLocalStorage(food);
    } else {
      console.log(food);
      this.service.addFood(food).subscribe((res) => {
      });
    }
  }

  getByType(type: string) {
    this.service.getByType(type).subscribe((res) => {
      for (const food of res) {
        food.quantity = 1;
      }
      console.log(res);
      this.foods = res;
    });
  }

  change_quantity(x: boolean, food: Food) {
    if (x === true) {
      this.foods.forEach((item) => {
        if (item.id === food.id) {
          item.quantity--;
          if (item.quantity < 1) {
            item.quantity = 1;
          }
        }
      });
    }
    if (x === false) {
      {
        this.foods.forEach((item) => {
          if (item.id === food.id) {
            item.quantity++;
          }
        });
      }
    }
  }

  ToLocalStorage(food: Food) {
    let food1: Food[];
    if (localStorage.getItem('basket') == null) {
      const food2 = [food];
      localStorage.setItem('basket', JSON.stringify(food2));
    } else {
      food1 = JSON.parse(localStorage.getItem('basket'));
      console.log(food1);
      food1.push(food);
      localStorage.setItem('basket', JSON.stringify(food1));
    }
  }

}

