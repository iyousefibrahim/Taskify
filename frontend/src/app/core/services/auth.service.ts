import { baseUrl } from './../../environment/env.local';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  register(userData: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/api/v1/users/register`, userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/api/v1/users/login`, userData);
  }

  signOut() {
    localStorage.clear();
  }
  
}
