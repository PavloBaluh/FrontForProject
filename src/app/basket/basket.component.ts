import {Component, OnInit} from '@angular/core';
import {MainService} from '../Services/main.service';
import {Food} from '../Models/Food';
import {User} from '../Models/User';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  foods: Food[];
  isdis = false;
  total = 0;
  Img: any = '../../assets/';
  formObj = {
    name: '',
    surname: '',
    address: '',
    phoneNumber: '',
    date: '',
    foods: this.foods
  };

  constructor(private  service: MainService) {
  }

  deleteFromBasket(food) {
    const a: User = this.service.getDecodedAccessToken();
    if (a === null) {
      let foodsFromLocal: Food[] = JSON.parse(localStorage.getItem('basket'));
      console.log(foodsFromLocal);
      foodsFromLocal.splice(foodsFromLocal.indexOf(food), 1);
      localStorage.setItem('basket', JSON.stringify(foodsFromLocal));
      this.foods = foodsFromLocal;
      this.total = this.getTotal(this.foods);
    } else {
      this.foods.splice(this.foods.indexOf(food), 1);
      this.service.deleteFood(food).subscribe((res) => {
        this.isdis = this.foods.length <= 0;
        this.total = this.getTotal(this.foods);
      });
    }
  }

  ngOnInit() {
    const a: User = this.service.getDecodedAccessToken();
    if (a === null) {
      this.foods = JSON.parse(localStorage.getItem('basket'));
      this.isdis = this.foods === null;
    } else {
      this.service.getBasket().subscribe((res) => {
          res = this.findquantity(res);
          res = this.remove_duplicates(res);
          this.foods = res;
          this.isdis = this.foods.length <= 0;
          this.total = this.getTotal(this.foods);
        }
      );
    }
  }

  makeOrder() {
    this.formObj.date = new Date().getDate() + '.' +  new Date().getHours() + '.' + new Date().getMinutes();
    this.formObj.foods = this.foods;
    this.service.makeOrder(this.formObj).subscribe();
  }


  getTotal(foods): number {
    let total: number = 0;
    foods.forEach((food) => {
      total += (food.price * food.quantity);
    });
    console.log(this.foods + 'ermpgp[jgwrp[gjop[gwop[jgwr');
    return total;
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

  getModal(modal) {
    modal.style.display = 'block';
  }

  closeModal(modale) {
    modale.style.display = 'none';
  }
}
