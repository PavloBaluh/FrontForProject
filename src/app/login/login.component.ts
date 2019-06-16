import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MainService} from '../Services/main.service';
import {Router} from '@angular/router';
import {User} from '../Models/User';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  header = 'Увійти';
  user: User;
  obj = {
    username: '',
    password: '',
  };

  constructor(private service: MainService,
              private router: Router) {
  }

  sendData() {
    this.service.login(this.obj.username, this.obj.password).subscribe((res) => {
      localStorage.setItem('_key', res.headers.get('Authorization'));
      const a: User = this.service.getDecodedAccessToken();
      if (a !== null) {
        this.user = a;
        this.service.emitChange(this.user.sub);
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
        this.service.getPermissions().subscribe((res2) => {
          if (res2 === 'ROLE_USER') {
            this.router.navigate(['']);
          } else {
            if (res2 === 'ROLE_ADMIN') {
              this.router.navigate(['adminMain/addItem']);
            }
          }
        });

      } else {
        this.header = 'Не вірне імя користувача або пароль';
        this.obj.password = '';
        this.obj.username = '';
      }
    });
  }
}
