import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserService } from '../services/create-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user = {
    username: '',
    password: '',
  };

  constructor(
    private createUserService: CreateUserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);

    if (this.user.username == '' || this.user.password == '') {
      alert('User is required');
      return;
    }

    //addUser from createUser service
    this.createUserService.addUser(this.user).subscribe({
      next: (data) => {
        //success
        console.log(data);
        alert('success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
        alert('Something went wrong');
      },
    });
  }
}
