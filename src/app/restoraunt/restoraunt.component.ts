import {Component, OnInit} from '@angular/core';
import {MainService} from '../Services/main.service';
import {Food} from '../Models/Food';
import {HttpHeaders} from '@angular/common/http';

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
    this.service.addFood(food).subscribe((res) => {
      console.log(res);
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

}

