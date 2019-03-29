import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
// login() {
  //   this.http.post('http://localhost:8080/login', JSON.stringify({
  //     username: 'asd',
  //     password: 'asd'
  //   }), {observe: 'response'}).subscribe((res) => {
  //     localStorage.setItem('_token', res.headers.get('Authorization'));
  //   });
  // }
  //
  // getInfo() {
  //   const headers = new HttpHeaders({'Authorization': localStorage.getItem('_token')});
  //   this.http.get('http://localhost:8080/home', {
  //     headers: headers, responseType: 'text'
  //   }).subscribe((res) => {
  //     console.log(res);
  //   });
  // }
}
