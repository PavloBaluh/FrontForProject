import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Orders} from '../Models/Orders';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  apiUrl = 'http://localhost:8080/';

  login(user, pass) {
    if (user !== null && pass !== null) {
      return this.http.post(this.apiUrl + 'AdminLogin', JSON.stringify({username: user, password: pass}), {observe: 'response'});
    }
  }

  addDish(obj) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.post(this.apiUrl + 'addDish', JSON.stringify({
      name: obj.name,
      weight: obj.weight,
      price: obj.price,
      description: obj.description,
      type: obj.type,
      picture: obj.picture.name
    }), {headers, responseType: 'text'});
  }

  deleteDish(name) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.post(this.apiUrl + 'deleteDish', JSON.stringify(name), {headers, responseType: 'text'});
  }

  saveImage(fileToUpload: File) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(this.apiUrl + 'saveDishPicture', formData, {headers, responseType: 'text'});
  }

  getOrders(): Observable<Orders[]> {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.get<Orders[]>(this.apiUrl + 'getOrders', {headers});
  }

  sortOrders(sort): Observable<Orders[]> {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.get<Orders[]>(this.apiUrl + 'getSortedOrders/' + sort, {headers});
  }

  ApplyOrder(order) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.get(this.apiUrl + 'ApplyOrder/' + order.id, {headers, responseType: 'text'});
  }

  deleteOrder(order) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.get(this.apiUrl + 'deleteOrder/' + order.id, {headers, responseType: 'text'});
  }

  getInfoForDiagram() {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.get(this.apiUrl + 'getInfoForDiagram', {headers, responseType: 'json'});
  }

  GetYears() {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.get(this.apiUrl + 'getYears', {headers});
  }

  GetOrdersByMounce() {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    return this.http.get(this.apiUrl + 'GetOrdersByMounce', {headers});
  }

  getForRelationsDiagram(value) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key'), values: value});
    return this.http.post(this.apiUrl + 'getForRelationsDiagram', {}, {headers});
  }

}
