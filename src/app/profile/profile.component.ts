import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('correct') correct: ElementRef;
  @ViewChild('error') error: ElementRef;
  private imageType = 'data:image/PNG;base64,';
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
    if (this.formObj.name.match('[А-Яа-яёЁЇїІіЄєҐґ]{3,15}$') && this.formObj.surname.match('[А-Яа-яёЁЇїІіЄєҐґ]{3,15}$')
      && this.formObj.address.match('[А-Яа-яёЁЇїІіЄєҐґ]{3,15}\s?\d{1,3}-?\d{0,3}') && this.formObj.phoneNumber.match('[\\(]?0[0-9]{2}[\\)]{0,1}\\s?\\d{3}[-]{0,1}\\d{2}[-]{0,1}\\d{2}')) {
      if (this.formObj.picture != null && typeof this.formObj.picture === 'object') {
        this.savePicture();
      }
      this.service.updateUserInfo(this.formObj).subscribe(() => {
        this.correct.nativeElement.style.display = 'block';
        setTimeout(() => {
          this.correct.nativeElement.style.display = 'none';
        }, 3000);
      });
    } else {
      this.error.nativeElement.style.display = 'block';
      setTimeout(() => {
        this.error.nativeElement.style.display = 'none';
      }, 3000);
    }
  }

  savePicture() {
    this.service.postFile(this.formObj.picture).subscribe((res) => {
      const url = this.imageType + res;
      this.img = this.sanitizer.bypassSecurityTrustUrl(url);
      this.service.emitChangePicture(res);
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
            this.service.emitChangePicture(res1);
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
