import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationInfo } from "../../auth/registration-info";
import { AuthService } from "../../auth/authentication.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent {
  @Input()id: number;
  hide: boolean;
  registerForm: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  registrationInfo: RegistrationInfo;
  errorMessage = '';



  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

  }

  onSubmit () {
    this.hide = true;
      this.registrationInfo = new RegistrationInfo(
        this.registerForm.name,
        this.registerForm.lastname,
        this.registerForm.email,
        this.registerForm.username,
        this.registerForm.password)
      
      console.log(this.registrationInfo);

      this.authService.signUp(this.registrationInfo).subscribe(
        data => {
          console.log(data);
          if(data.success){
            this.isSignUpFailed = false;
            this.isSignedUp = true;
            this.activeModal.close(this.registerForm.value);
            alert("Uspješna registracija. Molim vas logirajte se!");
            this.router.navigateByUrl('/login');
          }else{
            this.isSignUpFailed = true;
            this.errorMessage = data.message;
            alert(data.message);
          }
        },
        error => {
          console.log("ne valja");
            console.log(error);
            this.errorMessage = error.error.message;
            this.isSignUpFailed = true;
        })
    }


}
