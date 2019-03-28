import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComOneComponent } from './components/com-one/com-one.component';
import { ComTwoComponent } from './components/com-two/com-two.component';
import { ComThreeComponent } from './components/com-three/com-three.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatCardModule
} from "@angular/material";
import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ComOneComponent,
    ComTwoComponent,
    ComThreeComponent,
    NavigationComponent,
    LoginComponent,
    RegistrationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,    
    MatFormFieldModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [ 
    RegistrationModalComponent

  ]
})
export class AppModule { }
