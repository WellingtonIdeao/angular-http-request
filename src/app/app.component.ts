import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'http-request';
  readonly apiURL: string;

  constructor(private http: HttpClient){
    this.apiURL = 'http://localhost:8000';
  }

  listarTodosProdutos(){
    this.http.get(`${this.apiURL}/users/`).subscribe(result=>console.log(result));
  }
  listarProdutoPorId(){
    this.http.get(`${this.apiURL}/users/1/`)
    .subscribe(
      result=>{console.log(result)},
      erro=>{ if (erro.status == 404) console.log('Usuário não localizado.')}
    );
  }

  adicionarProduto() {
    var produto = { nome : "" };
  
    this.http.post(`${ this.apiURL }/produtos`, produto)
              .subscribe(
                resultado => {
                  console.log(resultado)
                },
                erro => {
                  if(erro.status == 400) {
                    console.log(erro.error.mensagem);
                  }
                }
              );
  }
  alterarProduto() {
    var produto = { id : 1, nome : "Smart TV 50 Polegadas" };
  
    this.http.put(`${ this.apiURL }/produtos/1`, produto)
              .subscribe(
                resultado => {
                  console.log('Produto alterado com sucesso.')
                },
                erro => {
                  switch(erro.status) {
                    case 400:
                      console.log(erro.error.mensagem);
                      break;
                    case 404:
                      console.log('Produto não localizado.');
                      break;
                  }
                }
              );
  }

  excluirProduto() {
    this.http.delete(`${ this.apiURL }/produtos/1`)
              .subscribe(
                resultado => {
                  console.log('Produto excluído com sucesso.');
                },
                erro => {
                  if(erro.status == 404) {
                    console.log('Produto não localizado.');
                  }
                }
              );
  }

  
}
