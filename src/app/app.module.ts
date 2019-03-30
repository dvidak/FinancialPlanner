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
import { ComOneComponent } from './components/com-one/com-one.component';
import { ComTwoComponent } from './components/com-two/com-two.component';
import { ComThreeComponent } from './components/com-three/com-three.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';



import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule
} from "@angular/material";
import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AuthGuardService } from './auth/auth-guard.service';




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
    JwtModule.forRoot({
      config: {
        // ...
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,    
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ httpInterceptorProviders, 
              AuthGuardService,  
              {provide: RequestOptions, 
              useClass: AuthRequestOptions}],
  bootstrap: [AppComponent],
  entryComponents : [ 
    RegistrationModalComponent

  ]
})
export class AppModule { }
