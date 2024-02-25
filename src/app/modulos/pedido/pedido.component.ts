import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent {

  ventas: any;
  modal = false;
  productos: any;
  total: any;

  constructor(private router:Router, private spedido: PedidoService){}

  ngOnInit(): void {
    this.consulta();
  }

  consulta(){
    this.spedido.consultar().subscribe((result:any) =>{
      this.ventas = result;
    })
  }

  consultap(id:number){
    this.spedido.consultarp(id).subscribe((result:any) =>{
      this.productos = result;
      //console.log(this.productos);
      this.total=0;
      for(let i=0; i<this.productos.length; i++){
        this.total = this.total + this.productos[i][4];
      }
    })
  }

  insertar(){
    this.router.navigate(['pedidoins']);
  }

  mostrar_modal(dato:any, id:number){
    switch(dato){
      case 0:
        this.modal = false;
      break;
      case 1:
        this.modal = true;
        this.consultap(id);
      break;
    }
  }
}
