import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MainService} from '../Services/main.service';
import {Food} from '../Models/Food';
import {User} from '../Models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  @ViewChild('bonusrow1') bonusrow1: ElementRef;
  @ViewChild('bonusrow2') bonusrow2: ElementRef;
  error = '';
  foods: Food[];
  isDisabled = false;
  total = 0;
  totalWithBonus = 0;
  Img: any = '../../assets/restourant/';

  formObj = {
    name: '',
    surname: '',
    address: '',
    phoneNumber: '',
    date: new Date(),
    bonus: 0.0,
    sum: 0.0,
  };


  constructor(private  service: MainService, private router: Router) {
    if (this.service.getDecodedAccessToken() != null) {
      this.service.getUserInfo().subscribe((res) => {
        if (res != null) {
          // @ts-ignore
          this.formObj = res;
        }
      });
    }
  }

  deleteFromBasket(food) {
    const a: User = this.service.getDecodedAccessToken();
    if (a === null) {
      let foodsFromLocal: Food[] = JSON.parse(localStorage.getItem('basket'));
      console.log(foodsFromLocal);
      foodsFromLocal.splice(foodsFromLocal.indexOf(food), 1);
      localStorage.setItem('basket', JSON.stringify(foodsFromLocal));
      this.foods = foodsFromLocal;
      this.isDisabled = this.foods.length <= 0;
      this.total = this.getTotal(this.foods);
      this.totalWithBonus = this.total - this.formObj.bonus;
    } else {
      this.foods.splice(this.foods.indexOf(food), 1);
      this.service.deleteFood(food).subscribe((res) => {
        this.isDisabled = this.foods.length <= 0;
        this.total = this.getTotal(this.foods);
      });
    }
  }

  ngOnInit() {
    const a: User = this.service.getDecodedAccessToken();
    if (a === null) {
      this.foods = JSON.parse(localStorage.getItem('basket'));
      if (this.foods.length === 0) {
        this.isDisabled = true;
        this.total = 0;
        this.totalWithBonus = 0;
      } else {
        this.total = this.getTotal(this.foods);
        this.totalWithBonus = this.total - this.formObj.bonus;
      }
    } else {
      this.service.getBasket().subscribe((res) => {
          res = this.findquantity(res);
          res = this.remove_duplicates(res);
          this.foods = res;
          this.isDisabled = this.foods.length === 0;
          this.total = this.getTotal(this.foods);
          this.totalWithBonus = this.total - this.formObj.bonus;
        }
      );
    }
    this.BonusRow();
  }

  makeOrder() {
    if (this.formObj.name.match('[а-яА-ЯёЁa]{3,15}$') && this.formObj.surname.match('[а-яА-ЯёЁa]{3,15}$')
      && this.formObj.address.match('[а-яА-ЯёЁa -/0-9]{3,15}$') && this.formObj.phoneNumber.match('[0-9]{12}')) {
      this.formObj.sum = this.totalWithBonus;
      this.formObj.date = new Date();
      this.formObj.bonus = this.totalWithBonus / 10;
      const preperedFood = [];
      for (const food of this.foods) {
        for (let i = 0; i < food.quantity; i++) {
          preperedFood.push(food);
        }
      }
      this.service.makeOrder(this.formObj, preperedFood).subscribe();
      this.router.navigate(['']);
    } else {
      this.error = 'Данні введено не вірно Перевірте правильність і спробуйте ще раз';
    }
  }

  getTotal(foods): number {
    if (foods != null) {
      let total: number = 0;
      foods.forEach((food) => {
        total += (food.price * food.quantity);
      });
      return total;
    }
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

  BonusRow() {
    if (this.service.getDecodedAccessToken() === null) {
      this.bonusrow1.nativeElement.style.display = 'none';
      this.bonusrow2.nativeElement.style.display = 'none';
    }
  }

}
