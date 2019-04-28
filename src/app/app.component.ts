import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
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

@Injectable()
export class AppComponent implements OnInit {
  user: string;

  constructor(private service: MainService, private Activatedroute: ActivatedRoute) {
    service.changeEmitted$.subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit() {
    const a: User = this.service.getDecodedAccessToken();
    if (a !== null) {
      this.user = a.sub;
    } else {
      this.user = ('f');
    }
  }

  logout() {
    localStorage.clear();
    this.ngOnInit();
  }
}
