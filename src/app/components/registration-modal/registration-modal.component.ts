import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.css']
})
export class RegistrationModalComponent implements OnInit {
  @Input()id: number;
  myForm: FormGroup;
  submitted = false;


  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
      this.myForm = new FormGroup({
        fullname: new FormControl('', Validators.required),
        username: new FormControl('',Validators.required),
        password: new FormControl('',[Validators.required, Validators.minLength(6)]),
        confirmpassword: new FormControl('',[Validators.required, Validators.minLength(6)])
      });
  }

  get f() { return this.myForm.controls; }


  private submitForm() {
    this.submitted = true;
        if (this.myForm.invalid) {
            return;
        }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.myForm.value))

    this.activeModal.close(this.myForm.value);
  }


}
