import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../Services/admin.service';
import {Router} from '@angular/router';
import {MainService} from '../../Services/main.service';
import {User} from '../../Models/User';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {
  @ViewChild('correct') correct: ElementRef;
  @ViewChild('error') error: ElementRef;
  formObj = {
    name: '',
  }
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

  deleteItem() {
    this.service.deleteDish(this.formObj.name).subscribe((res) => {
      if (res === 'true') {
        this.notification(true);
      } else {
        this.notification(false);
      }
    });
  }


  notification(isCurrect) {
    if (isCurrect) {
      this.correct.nativeElement.style.display = 'block';
      setTimeout(() => {
        this.correct.nativeElement.style.display = 'none';
      }, 3000);
    } else {
      this.error.nativeElement.style.display = 'block';
      setTimeout(() => {
        this.error.nativeElement.style.display = 'none';
      }, 3000);
    }
  }

}
