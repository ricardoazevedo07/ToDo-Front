import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tarefa {
  tarefaId: number;
  titulo: string;
  descricao: string;
  data: string; 
  dataConclusao?: string | null;
  dataExclusao?: string | null;
  usuarioId: number;
 
}

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private readonly apiUrl = 'https://localhost:7224/api/Tarefa'; 

  constructor(private http: HttpClient) {}

  getByUsuario(usuarioId: number, page: number, pageSize: number) {
    return this.http.get<any>(`${this.apiUrl}/GetByUsuario/?usuarioId=${usuarioId}&page=${page}&pageSize=${pageSize}`);
  }

  get(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  create(tarefa: Tarefa):Observable<any>  {
    
     return this.http.post(`${this.apiUrl}/Create`, tarefa);
  }

  update(tarefa: Tarefa): Observable<any> {
    return this.http.put(`${this.apiUrl}/${tarefa.tarefaId}`, tarefa);
  }

  concluir(tarefaId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/Concluir`, tarefaId);
  }

  delete(id: number):Observable<any>  {
   return this.http.delete(`${this.apiUrl}/${id}`)    
  }
}

