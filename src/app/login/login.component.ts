import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private login: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit() {
    console.log(this.loginData);
    console.log('Login button clicked');

    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      alert('Username not valid');
      this.router.navigate(['/login']);
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      alert('Password not valid');
      this.router.navigate(['/login']);
    }

    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        console.log('success');
        console.log(data);

        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe({
          next: (user: any) => {
            this.login.setUser(user);
            console.log(user);
            if (this.login.getUserRole() == 'Normal') {
              this.router.navigate(['/customer-dashboard']);
            } else if (this.login.getUserRole() == 'Admin') {
              this.router.navigate(['/admin-dashboard']);
            } else {
              this.login.logout();
            }
          },
        });
      },
      error: (error: any) => {
        console.log('Error!! ', error);
      },
    });
  }
}
