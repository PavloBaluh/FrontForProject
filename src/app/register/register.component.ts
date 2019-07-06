import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MainComponent} from '../main/main.component';
import {MainService} from '../Services/main.service';
import {PatternValidator} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('error', {static: false}) error: ElementRef;
  header = 'Зареєструватися';
  obj = {
    username: '',
    password: '',
    email: ''
  };

  constructor(private  servise: MainService) {
  }


  getForm() {
      if (this.obj.username.match('^[a-zA-Z0-9]+$') && this.obj.password.match('^[a-zA-Z0-9]+$')
        && this.obj.email.match('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$')) {
        this.servise.register(this.obj.username, this.obj.password, this.obj.email).subscribe((res) => {
          this.header = res;
          this.obj.password = '';
          this.obj.username = '';
          this.obj.email = '';
        });
      } else {
        this.header = 'Перевірте введені данні';
        this.obj.password = '';
        this.obj.username = '';
        this.obj.email = '';
      }
      }
    }

