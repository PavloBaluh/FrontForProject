import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  toRegComponent() {
    this.router.navigate(['register']);
  }

}
