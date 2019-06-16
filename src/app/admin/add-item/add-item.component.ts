import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../Services/admin.service';
import {MainService} from '../../Services/main.service';
import {Router} from '@angular/router';
import {User} from '../../Models/User';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @ViewChild('correct') correct: ElementRef;
  @ViewChild('error') error: ElementRef;
  formObj = {
    name: '',
    type: '',
    weight: '',
    picture: File = null,
    description: '',
    price: 0
  };

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

  save() {
    if (this.formObj.name.match('[А-Яа-яёЁЇїІіЄєҐґ]{2,15}$')
      && this.formObj.type !== null && this.formObj.picture !== null && this.formObj.price !== null && this.formObj.weight !== null) {
      this.service.addDish(this.formObj).subscribe((res) => {
        if (res === 'OK') {
          this.notification(true);
        } else {
          this.notification(false);
        }
      });
      this.savePicture();
      this.notification(true);
    } else {
      this.notification(false);
    }
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

  savePicture() {
    this.service.saveImage(this.formObj.picture).subscribe();
  }

  InputFile(files: FileList, imgs) {
    this.formObj.picture = files.item(0);
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = reader.result;
      imgs.src = img;
    };
    reader.readAsDataURL(files.item(0));
  }
}
