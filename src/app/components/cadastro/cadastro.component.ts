import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  login:string = "";
  senha:string="";
  senhaConfirmacao:string="";
  
   constructor(private service:LoginService, private router:Router){

   }
   create(){
      
    if(this.login.length < 3 || this.senha.length === 0){
      alert("Login deve conter mais de 3 caracteres. Senha não pode ser vazia");
    }
    if(this.senha !== this.senhaConfirmacao){
      alert("A senha e a confirmação da senha precisam ser iguais!");
    }
    
    this.service.create(this.login, this.senha).subscribe({
      next: (res:any) => {console.log('User logado:', res)
        this.service.salvarDadosAutenticacao(res.token, res.usuarioId, res.usuarioLogin);        
        this.router.navigate(['/lista']);
      },
      error: (err) => {console.error('Erro:', err);alert(err.error.detail)}
    });
   }
}
