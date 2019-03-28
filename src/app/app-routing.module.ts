import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ComOneComponent} from "./components/com-one/com-one.component"
import {ComTwoComponent} from "./components/com-two/com-two.component";
import {ComThreeComponent} from "./components/com-three/com-three.component";
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
     { path: '', component: ComOneComponent},
     { path: 'dva', component: ComTwoComponent},
     { path: 'tri', component: ComThreeComponent},
     { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }