import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MainService} from './Services/main.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: string;

  constructor(private servise: MainService, private Activatedroute: ActivatedRoute) {
  }

  ngOnInit() {
    this.Activatedroute.queryParams.subscribe((res) => {
      console.log(res);
    });
  }
}
