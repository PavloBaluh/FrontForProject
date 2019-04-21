import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Food} from '../Models/Food';
import * as jwt_decode from 'jwt-decode';
import {User} from '../Models/User';
import {tick} from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  emitChange(name: string) {
    this.emitChangeSource.next(name);
  }

  getDecodedAccessToken(): User {
    try {
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


  register(user: string, pass: string, mail: string) {
    console.log('hello');
    const headers = new HttpHeaders({username: user, password: pass, email: mail});
    return this.http.post(this.apiUrl + 'register', {}, {headers, responseType: 'text'});
  }

  login(user, pass) {
    if (user !== null && pass !== null) {
      return this.http.post(this.apiUrl + 'login', JSON.stringify({username: user, password: pass}), {observe: 'response'});
    }
  }

  getAll(): Observable<Food[]> {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    console.log(headers.get('Authorization') + 'kfjpfepjpefpj[gef');
    return this.http.get<Food[]>(this.apiUrl + 'restaurant', {
      headers,
    });
  }

  addFood(food: Food) {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('_key'),
      item: food.id.toString(),
      quantity: food.quantity.toString()

    });
    return this.http.post(this.apiUrl + 'addFood', {}, {headers});
  }

  getBasket(): Observable<Food[]> {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.get<Food[]>(this.apiUrl + 'basket', {headers});
  }

  updateUserInfo(obj) {
    console.log(JSON.stringify(obj));
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.post(this.apiUrl + 'updateUserInfo', JSON.stringify(obj), {headers});
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
