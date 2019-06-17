import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../Services/admin.service';
import {Orders} from '../../Models/Orders';
import {Food} from '../../Models/Food';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  @ViewChild('select') select: ElementRef;
  @ViewChild('checkbox') checkbox: ElementRef;

  orders: Orders[];
  filtredOrders: Orders[];

  constructor(private service: AdminService) {
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
    console.log(this.filtredOrders);
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
}
