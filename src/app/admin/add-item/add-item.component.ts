import { Component, OnInit } from '@angular/core';

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
  };
  constructor() { }

  ngOnInit() {
  }

}
