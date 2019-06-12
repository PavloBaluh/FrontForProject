import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
}
