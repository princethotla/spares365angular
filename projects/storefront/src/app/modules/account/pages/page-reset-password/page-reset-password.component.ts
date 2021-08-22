import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../page-login/registration.service';
import { User } from '../page-login/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-page-reset-password',
  templateUrl: './page-reset-password.component.html',
  styleUrls: ['./page-reset-password.component.scss']
})
export class PageResetPasswordComponent implements OnInit {


  user: User;
  message:string;
  errorMessage:string;
  resetForm:FormGroup;

  constructor(
    private fb: FormBuilder,
    private _service: RegistrationService,
    private toaster : ToastrService
  ) { }

  ngOnInit(): void {
    this.user = new User();
    this.resetForm = this.fb.group({
      email: ['red-parts@example.com', [Validators.required, Validators.pattern("^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,3}$"), Validators.maxLength(255)]]
    });
  }

  forgotPassword()
  {
    this._service.forgotPassword(this.user).subscribe(
      data => {
        console.log("Response Received");
        console.log(data);
        //this.loginMsg = "Login Successful.";
        //this.showMessage("Login Successful.");
        //this.message = "Email sent";
        this.toaster.success("Login Successful.");
      },
      error => {
        //this.message = "User does not exist."
        this.toaster.error("User does not exist.");
        console.log("Exception Occured:"+error.error.text);
        //this.errorMessage("Wrong username or password."); //"Error 500. Can't Login."
        this.errorMessage = JSON.stringify(error.error);//"Wrong username or password.";
      }
    );
  }

}
