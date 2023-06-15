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
  novaEmpresa: Empresas = { id: 0, name: '', descricao: '' }

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
        this.novaEmpresa = { id: 0, name: '', descricao: '' };
      });
  }

  atualizarEmpresa() {
    if (this.empresaSelecionada) {
      this.empresasService.atualizarEmpresa(this.empresaSelecionada.id, this.empresaSelecionada)
        .subscribe(() => {
          this.listarEmpresas();
        });
    }
  }

  cancelarAtualizacao() {
    this.empresaSelecionada = undefined;
  }  

  deletarEmpresa() {
    if (this.empresaSelecionada) {
      this.empresasService.deletarEmpresa(this.empresaSelecionada.id)
        .subscribe(() => {
          this.listarEmpresas();
          this.empresaSelecionada = undefined;
        });
    }
  }
}
