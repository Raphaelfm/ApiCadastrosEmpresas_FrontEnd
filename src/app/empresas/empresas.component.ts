import { Component, OnInit } from '@angular/core';
import { EmpresasService } from './empresas.service'
import { Empresas } from './empresas';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})

export class EmpresasComponent implements OnInit {
  empresas: Empresas[] = [];
  empresaSelecionada: Empresas | undefined;
  novaEmpresa: Empresas = { id: 0, nome: '', descricao: '' }

  constructor(private empresasService: EmpresasService){ }

  ngOnInit(){
    this.listarEmpresas();
  }

  listarEmpresas(){
    this.empresasService.listarEmpresas()
      .subscribe(empresas => this.empresas = empresas)
  }

  obterEmpresa(empresa: Empresas) {
    this.empresaSelecionada = empresa;
  }

  adicionarEmpresa() {
    this.empresasService.adicionarEmpresa(this.novaEmpresa)
      .subscribe(() => {
        this.listarEmpresas();
        this.novaEmpresa = { id: 0, nome: '', descricao: '' };
      });
  }

  atualizarEmpresa() {
    if (this.empresaSelecionada) {
      this.empresasService.atualizarEmpresa(this.empresaSelecionada.id, this.empresaSelecionada)
        .subscribe(() => {
          this.listarEmpresas();
        });
    }
    //Utilizei o cancelar aqui para que quando o usuário salvar, o editar seja fechado imediatamente
    this.cancelarAtualizacao();
  }

  cancelarAtualizacao() {
    this.empresaSelecionada = undefined;
  }  

  deletarEmpresa(id: number) {
    if (id != null) {
      this.empresasService.deletarEmpresa(id)
        .subscribe(() => {
          this.listarEmpresas();
          this.empresaSelecionada = undefined;
        });
    }
  }
}
