import {Component, OnInit} from '@angular/core';
import {MainComponent} from '../main/main.component';
import {MainService} from '../Services/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  header = 'Sign in';
  obj = {
    username: '',
    password: '',
    email: ''
  };

  constructor(private  servise: MainService) {
  }


  getForm() {
    this.servise.register(this.obj.username, this.obj.password, this.obj.email).subscribe((res) => {
      this.header = res;
      this.obj.password = '';
      this.obj.username = '';
      this.obj.email = '';
    });
  }
}



