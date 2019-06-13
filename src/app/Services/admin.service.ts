import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
    }), {headers, responseType: 'text'});
  }

  saveImage(fileToUpload: File) {
    const headers = new HttpHeaders({Authorization: localStorage.getItem('_key')});
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(this.apiUrl + 'saveDishPicture', formData, {headers, responseType: 'text'});
  }

}
