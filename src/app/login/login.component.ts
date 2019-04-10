import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MainService} from '../Services/main.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string;

  constructor(private service: MainService,
              private router: Router) {
  }

  sendData(form) {
    console.log('-3');
    this.service.login(form.value.user, form.value.pass).subscribe((res) => {
      localStorage.setItem('_key', res.headers.get('Authorization'));
      console.log('-1');
    });
    console.log(0);
    this.router.navigate(['']);
  }
}
