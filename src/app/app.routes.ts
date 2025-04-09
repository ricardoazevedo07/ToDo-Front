import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListaComponent } from './components/lista/lista.component';
import { AuthGuard } from './auth.guard';
import { CadastroComponent } from './components/cadastro/cadastro.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'lista', component: ListaComponent, canActivate: [AuthGuard] },
    { path: 'cadastro', component: CadastroComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' } // rota curinga para qualquer caminho inválido
  ];
  