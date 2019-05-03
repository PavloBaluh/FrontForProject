import {Component, OnInit} from '@angular/core';
import {MainService} from '../Services/main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  formObj = {
    name: '',
    surname: '',
    address: '',
    phoneNumber: '',
    bonus: 0.0,
  };
  cardInfo = {
    cardNumber: '',
    cvv: '',
    date: '',
  };

  constructor(private  service: MainService) {
  }

  save() {
    this.service.updateUserInfo(this.formObj).subscribe(() => {
    });
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
