import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Food} from '../Models/Food';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  url = 'http://localhost:8080/login';
  url2 = 'http://localhost:8080/restaurant';
  url3 = 'http://localhost:8080/getCurrentUser';


  constructor(private http: HttpClient) {
  }


  getDecodedAccessToken(): string {
    try {
      console.log(2);
      const key = localStorage.getItem('_key');
      console.log('key' + key);
      return jwt_decode(key);
    } catch (Error) {
      return null;
    }
  }

  // getcurrentUser(): Observable<string> {
  //   const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
  //   return this.http.get(this.url3, {responseType: 'text', headers});
  // }

  login(user, pass) {
    if (user !== null && pass !== null) {
      console.log('-2');
      return this.http.post(this.url, JSON.stringify({username: user, password: pass}), {observe: 'response'})
    }
  }

  getAll(): Observable<Food[]> {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    console.log(headers.get('Authorization') + 'kfjpfepjpefpj[gef');
    return this.http.get<Food[]>(this.url2, {
      headers,
    });
  }

// getInfo() {
//   const headers = new HttpHeaders({'Authorization': localStorage.getItem('_token')});
//   this.http.get('http://localhost:8080/home', {
//     headers: headers, responseType: 'text'
//   }).subscribe((res) => {
//     console.log(res);
//   });
// }

}
