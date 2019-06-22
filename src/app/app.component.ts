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
  userImg = '../assets/man_user.png';
  user: string;
  dis = true;
  profile = 'profile';

  constructor(private service: MainService, private Activatedroute: ActivatedRoute) {
  }

  ngOnInit() {
    const a: User = this.service.getDecodedAccessToken();
    if (a !== null) {
      this.user = a.sub;
      this.dis = false;
      this.checkPermissions();
    } else {
      this.dis = true;
      this.user = null;
      this.userImg = '../assets/man_user.png';
    }
    this.service.changeEmitted$.subscribe(data => {
      this.user = data;
      if (this.user === null) {
        this.dis = true;
      } else {
        this.dis = false;
      }
    });
    if (this.user !== null) {
      this.service.getUserInfo().subscribe((res1) => {
        if (res1 !== null) {
          // @ts-ignore
          if (res1.picture !== null) {
            // @ts-ignore
            this.service.getUserImage(res1.picture).subscribe((img) => {
              this.service.emitChangePicture(img);
            });
          }
        }
      });
    }
    this.service.changeEmittedPicture$.subscribe((data) => {
      if (data != null) {
        this.userImg = data;
      }
    });
    this.service.changeEmittedPermission$.subscribe((data) => {
      if (data === 'ROLE_USER') {
        this.profile = 'profile';
      }
      if (data === 'ROLE_ADMIN') {
        this.profile = 'adminMain/addItem';
      }
    });

  }

  logout() {
    localStorage.clear();
    this.ngOnInit();
  }

  checkPermissions() {
    this.service.getPermissions().subscribe((res) => {
      if (res === 'ROLE_ADMIN') {
        this.profile = 'adminMain/addItem';
      }
    });
  }
}
