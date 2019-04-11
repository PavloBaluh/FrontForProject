import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MainService} from '../Services/main.service';
import {Router} from '@angular/router';
import {User} from '../Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string;
  user: User;

  constructor(private service: MainService,
              private router: Router) {
  }

  sendData(form) {
    this.service.login(form.value.user, form.value.pass).subscribe((res) => {
      localStorage.setItem('_key', res.headers.get('Authorization'));
      const a: User = this.service.getDecodedAccessToken();
      if (a !== null) {
        this.user = a;
      } else {
        console.log('lellee');
        this.user = new User('Незареєстрований');
      }
      this.service.emitChange(this.user.sub);
      this.router.navigate(['']);
    });
    console.log(0);
  }
}
