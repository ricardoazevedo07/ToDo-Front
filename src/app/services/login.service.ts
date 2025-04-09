import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UsuarioInterface {
  UsuarioId: number;
  Nome: string;
  Sobrenome: string;
  Login: string;
  Senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  logar(login: string, senha: string) {
    let user: UsuarioInterface = {
      Login: login,
      Senha: senha,
      UsuarioId: 0,
      Nome: '',
      Sobrenome: ''
    };
    return this.http.post('https://localhost:7224/api/Usuario/Login', user);
  }

  create(login: string, senha: string) {
    let user: UsuarioInterface = {
      Login: login,
      Senha: senha,
      UsuarioId: 0,
      Nome: '',
      Sobrenome: ''
    };
    return this.http.post('https://localhost:7224/api/Usuario', user);
  }
  //  Salvar dados de autenticação no localStorage
  salvarDadosAutenticacao(token: string, usuarioId: number, login:string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', usuarioId.toString()); 
    localStorage.setItem('login', login); 
  }

  // Obter token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //  Obter ID do usuário
  getUserId(): number {
    const id = localStorage.getItem('userId');
    return id ? parseInt(id, 10) : 0;
  }

  //  Verificar se está logado
  estaLogado(): boolean {
    return !!localStorage.getItem('token');
  }

  //  Limpar dados (logout)
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('login');
  }
}
