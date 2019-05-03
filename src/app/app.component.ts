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
  dis = true;

  constructor(private service: MainService, private Activatedroute: ActivatedRoute) {
    service.changeEmitted$.subscribe(data => {
      this.user = data;
      if (this.user === 'f') {
        this.dis = true;
      } else {
        this.dis = false;
      }
    });
  }

  ngOnInit() {
    const a: User = this.service.getDecodedAccessToken();
    if (a !== null) {
      this.user = a.sub;
      this.dis = false;
    } else {
      this.dis = true;
      this.user = ('f');
    }
  }

  logout() {
    localStorage.clear();
    this.ngOnInit();
  }
}
