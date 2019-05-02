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
    return this.http.get<Food[]>(this.apiUrl + 'restaurant', {});
  }

  makeOrder(obj, foods: Food[]) {
    const arr = [];
    for (const food of foods) {
      arr.push(food.name);
    }
    return this.http.post(this.apiUrl + 'makeOrder/basket/' + arr, JSON.stringify(obj));
  }


  addFood(food: Food) {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('_key'),
      item: food.id.toString(),
      quantity: food.quantity.toString()

    });
    return this.http.post(this.apiUrl + 'addFood', {}, {headers});
  }

  deleteFood(food: Food) {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('_key'),
      item: food.id.toString()
    });
    console.log('hello');
    return this.http.delete(this.apiUrl + 'deleteFood', {headers});
  }

  getBasket(): Observable<Food[]> {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.get<Food[]>(this.apiUrl + 'basket', {headers});
  }

  updateUserInfo(obj) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.post(this.apiUrl + 'updateUserInfo', JSON.stringify(obj), {headers});

  }

  getByType(type: string): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl + 'restaurant/product-category/' + type);
  }

  getUserInfo(): Observable<object> {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.get(this.apiUrl + 'getUserInfo', {headers});
  }

}
