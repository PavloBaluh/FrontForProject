import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../Models/User';
import {AdminService} from '../../Services/admin.service';
import {MainService} from '../../Services/main.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  constructor(private router: Router, private service: AdminService, private service02: MainService) {
    const a: User = this.service02.getDecodedAccessToken();
    if (a !== null) {
      service02.getPermissions().subscribe((res) => {
        if (res !== 'ROLE_ADMIN' || res == null) {
          this.router.navigate(['']);
        }
      });
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
  }

}
