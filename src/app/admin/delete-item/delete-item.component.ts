import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../Services/admin.service';

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
  constructor(private service: AdminService) {
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
