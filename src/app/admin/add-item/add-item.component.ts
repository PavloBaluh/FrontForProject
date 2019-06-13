import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../Services/admin.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
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
    this.service.addDish(this.formObj).subscribe();
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
