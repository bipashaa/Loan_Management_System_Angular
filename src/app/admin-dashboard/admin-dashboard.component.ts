import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanService } from '../services/loan.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  public LoanDetails: any = [];

  public filteredString = null;

  constructor(
    private loan: LoanService,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLoanDetails();
  }

  getLoanDetails() {
    return this.loan.getAllLoanDetails().subscribe((data: {}) => {
      this.LoanDetails = data;
      console.log(this.LoanDetails);
    });
  }

  deleteLoan(id: any) {
    alert(
      'are you sure you want to delete details associated with Loan Number: ' +
        id +
        '?'
    );
    this.loan.delete(id).subscribe((response) => {
      this.router.navigate(['/admin-dashboard']);
    });
  }
}
