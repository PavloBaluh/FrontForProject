import { Component, OnInit } from '@angular/core';
import {User} from '../../Models/User';
import {MainService} from '../../Services/main.service';
import {Router} from '@angular/router';
import {AdminService} from '../../Services/admin.service';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.css']
})
export class AdminLoginPageComponent{
  header = 'Увійти';
  user: User;
  obj = {
    username: '',
    password: '',
  };

  constructor(private service: MainService,
              private adminService: AdminService,
              private router: Router) {
  }

  sendData() {
    this.adminService.login(this.obj.username, this.obj.password).subscribe((res) => {
      console.log(res);
      localStorage.setItem('_key', res.headers.get('Authorization'));
      const a: User = this.service.getDecodedAccessToken();
      if (a !== null) {
        this.user = a;
        this.service.emitChange(this.user.sub);
        this.router.navigate(['adminMain/addItem']);
      } else {
        this.header = 'Не вірне імя користувача або пароль';
        this.obj.password = '';
        this.obj.username = '';
      }
    });
  }

}
