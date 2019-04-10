import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MainService} from './Services/main.service';
import {ActivatedRoute} from '@angular/router';
import {User} from './Models/User';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;

  constructor(private servise: MainService, private Activatedroute: ActivatedRoute) {
  }


  ngOnInit() {
    console.log(1);
    let a: string = this.servise.getDecodedAccessToken();
    console.log(a);
    if (a !== null) {
      this.user = <User>a;
    } else {
      this.user = new User('Незареєстрований');
    }
  }
}
