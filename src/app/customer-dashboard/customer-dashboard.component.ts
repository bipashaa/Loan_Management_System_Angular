import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from '../services/loan.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
})
export class CustomerDashboardComponent {
  public LoanDetails: any = [];

  public filteredString = null;

  constructor(private loan: LoanService) {}

  ngOnInit(): void {
    this.getLoanDetails();
  }

  //Show all loan details
  getLoanDetails() {
    return this.loan.getAllLoanDetails().subscribe((data: {}) => {
      this.LoanDetails = data;
      console.log(this.LoanDetails);
    });
  }
}
