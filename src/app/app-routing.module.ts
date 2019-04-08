import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IncomeComponent} from "./components/income/income.component"
import {ComThreeComponent} from "./components/com-three/com-three.component";
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from '../app/auth/auth-guard.service'; 
import { ItemsComponent } from './components/items/items.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';



const routes: Routes = [
     { path: '', component: LoginComponent},
     { path: 'login', component: LoginComponent },
     { path: 'items', component: ItemsComponent, canActivate: [AuthGuard]  },
     { path: 'tri', component: ComThreeComponent,canActivate: [AuthGuard] },
     { path: 'profile', component: UserProfileComponent,canActivate: [AuthGuard] },
     { path: 'income', component: IncomeComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }