import {Component, OnInit} from '@angular/core';
import {MainService} from '../Services/main.service';
import {any} from 'codelyzer/util/function';
import {fakeAsync} from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private imageType = 'data:image/PNG;base64,';
  error = '';
  currect = '';
  img: any;

  formObj = {
    name: '',
    surname: '',
    address: '',
    picture: File = null,
    phoneNumber: '',
    bonus: 0.0,
  };


  constructor(private  service: MainService, private sanitizer: DomSanitizer) {
  }

  save() {
    if (this.formObj.name.match('[а-яА-ЯёЁa]{3,15}$') && this.formObj.surname.match('[а-яА-ЯёЁa]{3,15}$')
      && this.formObj.address.match('[а-яА-ЯёЁa -/0-9]{3,15}$') && this.formObj.phoneNumber.match('[0-9]{12}')) {
      if (this.formObj.picture != null) {
        this.savePicture();
      }
      console.log(this.img.name);
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

  savePicture() {
    this.service.postFile(this.formObj.picture).subscribe((res) => {
      const url = this.imageType + res;
      this.img = this.sanitizer.bypassSecurityTrustUrl(url);
    });
  }


  ngOnInit() {
    this.service.getUserInfo().subscribe((res) => {
      if (res != null) {
        // @ts-ignore
        this.formObj = res;
        if (this.formObj.picture === null) {
          this.img = '../../assets/man_user.png';
        } else {
          this.service.getUserImage(this.formObj.picture).subscribe((res1) => {
            let url = this.imageType + res1;
            this.img = this.sanitizer.bypassSecurityTrustUrl(url);
          });
        }
      } else {
        this.img = '../../assets/man_user.png';
      }
    });
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
