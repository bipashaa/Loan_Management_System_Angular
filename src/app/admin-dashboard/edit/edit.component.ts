import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  LoanNo = this.actRoute.snapshot.params['loanNo'];

  editForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    loanAmount: new FormControl(null),
    loanType: new FormControl(''),
    loanTerm: new FormControl(''),
    contactNo: new FormControl(null),
    emailId: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    public loanService: LoanService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loanService
      .getAllLoanDetailsById(this.LoanNo)
      .subscribe((response: any) => {
        console.log(response['loanAmount']);
        this.editForm = new FormGroup({
          firstName: new FormControl(response['firstName']),
          lastName: new FormControl(response['lastName']),
          loanAmount: new FormControl(response['loanAmount']),
          loanType: new FormControl(response['loanType']),
          loanTerm: new FormControl(response['loanTerm']),
          contactNo: new FormControl(response['contactNo']),
          emailId: new FormControl(response['emailId']),
          address: new FormControl(response['address']),
        });
      });
  }

  // Update loan data
  edit() {
    console.log(this.editForm.value);
    if (window.confirm('Are you sure, you want to update?')) {
      this.loanService
        .update(this.LoanNo, this.editForm.value)
        .subscribe((data) => {
          console.log(data);
          this.router.navigate(['/admin-dashboard']);
        });
    }
  }
}
