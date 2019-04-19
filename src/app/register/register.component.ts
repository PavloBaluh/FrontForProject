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

  constructor(private  servise: MainService) {
  }

  getForm(form) {
    this.servise.register(form.value.user, form.value.pass, form.value.email).subscribe((res) => {
      this.header = res;
    });
  }
}


