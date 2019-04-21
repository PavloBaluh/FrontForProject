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
  quantity = 1;


  Img: any = '../../assets/';

  constructor(private service: MainService) {
  }

  ngOnInit() {
    this.service.getAll().subscribe((res) => {
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

  change_quantity(x: boolean) {
    if (x === true) {
      this.quantity--;
    }
    if (x === false) {
      this.quantity++;
    }
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

}

