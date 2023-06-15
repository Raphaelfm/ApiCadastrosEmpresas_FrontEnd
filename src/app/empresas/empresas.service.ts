import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresas } from './empresas';
import { catchError } from 'rxjs';

@Injectable()

export class EmpresasService {
    private apiUrl = 'https://localhost:7047';

    constructor(private http: HttpClient) {}

    listarEmpresas(){
        return this.http.get<Empresas[]>(`${this.apiUrl}/api/Empresas`);
    }

    obeterEmpresa(id: number) {
        return this.http.get<Empresas>(`${this.apiUrl}/api/Empresas/${id}`);
    }
    
    adicionarEmpresa(empresa: Empresas) {
        return this.http.post(`${this.apiUrl}/api/Empresas`, empresa);
    }
    
    atualizarEmpresa(id: number, empresa: Empresas) {
        return this.http.put(`${this.apiUrl}/api/Empresas/${id}`, empresa);
    }

    cancelarAtualizacao(){}
    
    deletarEmpresa(id: number) {
        return this.http.delete(`${this.apiUrl}/api/Empresas/${id}`)
          .pipe(
            catchError(error => {
              console.error('Erro ao excluir empresa:', error);
              throw error;
            })
          );
        
      }
      
}