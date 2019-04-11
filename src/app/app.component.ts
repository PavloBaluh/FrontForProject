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
  user: User;

  constructor(private servise: MainService, private Activatedroute: ActivatedRoute) {
    servise.changeEmitted$.subscribe(data => {
      this.user = new User(data);
    });
  }


  ngOnInit() {
    console.log(1);
    const a: User = this.servise.getDecodedAccessToken();
    console.log(a + 'decode');
    if (a !== null) {
      this.user = a;
    } else {
      console.log('lellee');
      this.user = new User('Незареєстрований');
    }
  }
}
