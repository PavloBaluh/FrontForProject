import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../Services/admin.service';
import {Orders} from '../../Models/Orders';
import {Food} from '../../Models/Food';
import {Router} from '@angular/router';
import {MainService} from '../../Services/main.service';
import {User} from '../../Models/User';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @ViewChild('select', {static: false}) select: ElementRef;
  @ViewChild('checkbox', {static: false}) checkbox: ElementRef;

  orders: Orders[];
  filtredOrders: Orders[];

  constructor(private router: Router, private service: AdminService, private service02: MainService) {
    const a: User = this.service02.getDecodedAccessToken();
    if (a !== null) {
      service02.getPermissions().subscribe((res) => {
        if (res !== 'ROLE_ADMIN' || res == null) {
          this.router.navigate(['']);
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    this.service.getOrders().subscribe((res) => {
      this.orders = res;
      for (const order of this.orders) {
        order.foods = this.findquantity(order.foods);
        order.foods = this.remove_duplicates(order.foods);
      }
      this.filtredOrders = this.orders;
    });
  }

  sort(sort) {
    this.service.sortOrders(sort).subscribe((res: Orders[]) => {
      this.orders = res;
      let selectedOption = this.select.nativeElement.options[this.select.nativeElement.selectedIndex];
      for (const order of this.orders) {
        order.foods = this.findquantity(order.foods);
        order.foods = this.remove_duplicates(order.foods);
      }
      this.filter(selectedOption.value);
    });
  }

  remove_duplicates(res: Food[]): Food[] {
    const usedObjects = {};
    for (let m = res.length - 1; m >= 0; m--) {
      const so = JSON.stringify(res[m]);
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

  filter(filterItem) {
    if (filterItem === 'All') {
      this.filtredOrders = this.orders;
    }
    if (filterItem === 'Done') {
      let orders1 = this.orders.filter((order) => {
        return order.done === true;
      });
      this.filtredOrders = orders1;
    }
    if (filterItem === 'Non-Done') {
      let orders1 = this.orders.filter((order) => {
        return order.done === false;
      });
      this.filtredOrders = orders1;
    }
  }


  Check(order, notify) {
    this.service.ApplyOrder(order).subscribe((res) => {
      if (res === 'OK') {
        this.orders.forEach((cur) => {
          if (cur.id === order.id) {
            cur.done = true;
          }
        });
        notify.style.display = 'block';
        setTimeout(() => {
          notify.style.display = 'none';
        }, 3000);
      }
    });
  }

  getAllSum(foods: Food[]) {
    let sum = 0;
    foods.forEach((food) => {
      let quantity = food.quantity;
      sum += (food.price * quantity);
    });
    return sum;
  }

  deleteFromBasket(order: any) {
    this.service.deleteOrder(order).subscribe((res) => {
      if (res === 'OK') {
       this.ngOnInit();
      }
    });
  }
}
