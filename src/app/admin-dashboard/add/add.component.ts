import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  @Input() loanDetails = {
    firstName: '',
    lastName: '',
    loanAmount: null,
    loanType: '',
    loanTerm: '',
    contactNo: null,
    emailId: '',
    address: '',
  };

  constructor(
    public login: LoginService,
    public loanService: LoanService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  addLoan(dataLoan: any) {
    this.loanService.create(this.loanDetails).subscribe((data: {}) => {
      console.log(data);
      this.router.navigate(['/admin-dashboard']);
    });
  }
}
