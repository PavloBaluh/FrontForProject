import {Component, OnInit} from '@angular/core';
import {MainService} from '../Services/main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  error = '';
  currect = '';

  formObj = {
    name: '',
    surname: '',
    address: '',
    phoneNumber: '',
    bonus: 0.0,
  };


  constructor(private  service: MainService) {
  }

  save() {
    if (this.formObj.name.match('[а-яА-ЯёЁa]{3,15}$') && this.formObj.surname.match('[а-яА-ЯёЁa]{3,15}$')
      && this.formObj.address.match('[а-яА-ЯёЁa -/0-9]{3,15}$') && this.formObj.phoneNumber.match('[0-9]{12}')) {
      this.service.updateUserInfo(this.formObj).subscribe(() => {
        this.currect = 'Збережено';
        setTimeout(() => {
          this.currect = '';
        }, 3000);
      });
    } else {
      this.error = 'Данні введено не вірно Перевірте правильність і спробуйте ще раз';
      setTimeout(() => {
        this.error = '';
      }, 3000);
    }
  }

  ngOnInit() {
    this.service.getUserInfo().subscribe((res) => {
      if (res != null) {
        // @ts-ignore
        this.formObj = res;
      }
    });
  }

}
