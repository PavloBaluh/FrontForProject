import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../Services/admin.service';

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

  constructor(private service: AdminService) {
  }

  ngOnInit() {
    console.log(typeof this.formObj);
  }

  save() {
    if (this.formObj.name.match('[А-Яа-яёЁЇїІіЄєҐґ]{2,15}$') && this.formObj.type.match('[А-Яа-яёЁЇїІіЄєҐґ]{3,15}$')
      && this.formObj.description.match('[а-яА-А-Яа-яёЁЇїІіЄєҐґ -/0-9]{3,15}$')) {
    }
    this.service.addDish(this.formObj).subscribe((res) => {
      if (res === 'OK') {
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
    });
    this.savePicture();
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
