import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent {
   login:string = "";
   senha:string="";
   
    constructor(private service:LoginService, private router:Router){

    }

    logar(){
      if(this.login.length < 3 || this.senha.length === 0){
        return;
      }
      this.service.logar(this.login, this.senha).subscribe({
        next: (res:any) => {
          this.service.salvarDadosAutenticacao(res.token, res.usuarioId, res.usuarioLogin);        
          this.router.navigate(['/lista']);
        },
        error: (err) => {
          alert('Usuário ou Senha incorretos.');}
      });
     }

     create(){
      
      if(this.login.length < 3 || this.senha.length === 0){
        return;
      }
      this.service.create(this.login, this.senha).subscribe({
        next: (res:any) => {
          this.service.salvarDadosAutenticacao(res.token, res.usuarioId, res.usuarioLogin);        
          this.router.navigate(['/lista']);
        },
        error: (err) => {console.error('Erro:', err);alert(err.error.detail)}
      });
     }
    
}
