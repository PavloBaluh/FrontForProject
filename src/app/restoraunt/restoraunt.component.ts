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
      this.foods = res;
      console.log(res);
    });
  }

  findSrc(fileName): string {
    return this.Img + fileName;
  }
}
