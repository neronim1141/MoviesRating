import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardNotLogged, AuthGuardIsLogged } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuardNotLogged],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [AuthGuardNotLogged],

    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
