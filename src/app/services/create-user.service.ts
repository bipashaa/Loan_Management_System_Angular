import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateUserService {
  constructor(private http: HttpClient) {}

  public addUser(user: any) {
    return this.http.post('http://localhost:8100/api/v1/create-user', user);
  }
}
