import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IncomeComponent} from "./components/income/income.component"
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from '../app/auth/auth-guard.service'; 
import { ItemsComponent } from './components/items/items.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SavingsComponent } from './components/savings/savings.component'; 



const routes: Routes = [
     { path: '', component: LoginComponent},
     { path: 'login', component: LoginComponent },
     { path: 'pregled', component: ItemsComponent, canActivate: [AuthGuard]  },
     { path: 'profil', component: UserProfileComponent,canActivate: [AuthGuard] },
     { path: 'evidencija', component: IncomeComponent},
     { path: 'štednja', component: SavingsComponent, canActivate :[AuthGuard] }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }