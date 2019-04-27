import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { AuthLoginInfo } from "../../auth/login-info"
import { AuthService } from "../../auth/authentication.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]

})
export class LoginComponent implements OnInit {
  hide: boolean;
  loginForm: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  private loginInfo: AuthLoginInfo;


  constructor(private modalService: NgbModal,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.hide = true;
   
  }

  openFormModal() {
    const modalRef = this.modalService.open(RegistrationModalComponent);
    modalRef.componentInstance.id = 10; 
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  
  onSubmit() {
      
    this.loginInfo = new AuthLoginInfo(
        this.loginForm.username,
        this.loginForm.password);
     
    this.authService.attemptAuth(this.loginInfo).subscribe(
          data => {
              console.log(data);
              if(data.success){
                  console.log(data);
                  console.log(data.token);
                  this.authService.setToken(data.token);
                  this.authService.saveUsername(this.loginForm.username);
                  this.authService.saveUserID(data.id)
                  console.log(data.token);
                  this.isLoginFailed = false;
                  this.isLoggedIn = true;
                  this.router.navigateByUrl('/items');
              }else{
                this.isLoginFailed = true;
                this.errorMessage = "Neuspješna prijava. Pokušajte ponovo";
                alert(this.errorMessage);
              }
          },
          error => {
              console.log("Pukao sam")
              console.log(error);
              this.isLoginFailed = true;
          }
      );
  }
}