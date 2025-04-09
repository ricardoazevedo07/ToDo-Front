import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Tarefa, TarefaService } from '../../services/TarefaService/tarefa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
declare var bootstrap: any;


@Component({
  selector: 'app-lista',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})



export class ListaComponent { 
  
   tarefa:Tarefa = {
    tarefaId: 0,
    titulo: '',
    descricao: '',
    data: new Date().toISOString(), 
    dataConclusao: null,
    dataExclusao: null,
    usuarioId: 0 
  };

  tarefas:Array<Tarefa> = [];
  novaTarefaTitulo = "";

  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 0;

  constructor(private service:TarefaService, private loginService:LoginService){   
    this.tarefa.usuarioId=loginService.getUserId();
  this.carregarTarefas();
  }

  carregarTarefas(){
    let userId =this.loginService.getUserId();
    this.novaTarefaTitulo = '';
    this.service.getByUsuario(userId, this.currentPage, this.pageSize).subscribe((res: any) => {
      this.tarefas = res.tarefas;
      this.totalItems = res.totalItems;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    });

  }

  mudarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPages) return;
    this.currentPage = pagina;
    this.carregarTarefas();
  }

toggleEditar(tarefaId:number){
  if(tarefaId===0){
    this.tarefa = {
      tarefaId: 0,
      titulo: this.novaTarefaTitulo,
      descricao: '',
      data: new Date().toISOString(),
      dataConclusao: null,
      dataExclusao: null,
      usuarioId: this.loginService.getUserId()
    };
    return
  }
  this.tarefa = this.tarefas.find(t => t.tarefaId === tarefaId) || this.tarefa;
  
}
  create(){
    
    if(this.tarefa.titulo.length===0){
      return;
    }
    this.service.create(this.tarefa).subscribe({
      next: () => this.carregarTarefas(),
      error: err => alert('Erro ao concluir tarefa')
    });
  }

  update(){
    
    this.service.update(this.tarefa).subscribe({
      next: () => this.carregarTarefas(),
      error: err => alert('Erro ao atualizar tarefa')
    });
  }

  salvar(){
    // capturando o modal
    const modalElement = document.getElementById('exampleModalCenter');    
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if(this.tarefa.tarefaId===0){
      this.create()
    }else{
      this.update();
    }    
    // fecha o modal após salvar
    modalInstance.hide();
  }
  delete(tarefaId:number){
      this.service.delete(tarefaId).subscribe({
        next: () => this.carregarTarefas(),
        error: err => alert('Erro ao deletar tarefa')
      });
  }
  concluir(tarefaId:number){
    
    this.service.concluir(tarefaId).subscribe({
      next: () => this.carregarTarefas(),
      error: err => alert('Erro ao concluir tarefa:')
    });
  }

}
