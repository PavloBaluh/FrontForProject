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

  constructor(private servise: MainService, private Activatedroute: ActivatedRoute) {
    servise.changeEmitted$.subscribe(data => {
      this.user = data;
    });
  }


  ngOnInit() {
  }
}
