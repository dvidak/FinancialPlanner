import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    });
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

  get f() { return this.loginForm.controls; }

  private submitForm() {
    this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
  }
}
