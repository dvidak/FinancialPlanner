import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthRequestOptions } from '../app/auth/auth-request-options';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncomeComponent } from './components/income/income.component';
import { ItemsComponent } from './components/items/items.component';
import { ComThreeComponent } from './components/com-three/com-three.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';

import { PlotlyModule } from 'angular-plotly.js';
import {NgxPaginationModule} from 'ngx-pagination'; 







import {
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatCheckboxModule,
  MatButtonModule,
  MatDatepickerModule, 
  MatNativeDateModule,
  MatIconModule,
  MatSelectModule,
  MatCardModule
} from "@angular/material";

import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AuthGuardService } from './auth/auth-guard.service';
import { AddItemModalComponent } from './components/add-item-modal/add-item-modal.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';




@NgModule({
  declarations: [
    AppComponent,
    IncomeComponent,
    ItemsComponent,
    ComThreeComponent,
    NavigationComponent,
    LoginComponent,
    RegistrationModalComponent,
    AddItemModalComponent,
    UserProfileComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    }),
    BrowserModule,
    PlotlyModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,  
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule ,
    MatInputModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ httpInterceptorProviders, 
              AuthGuardService,
              MatDatepickerModule,  
              {provide: RequestOptions, 
              useClass: AuthRequestOptions}],
  bootstrap: [AppComponent],
  entryComponents : [ 
    RegistrationModalComponent,
    AddItemModalComponent

  ]
})
export class AppModule { }
