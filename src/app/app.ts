import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- Importante para leer los inputs

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // <--- Agregamos FormsModule aquí
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  /* 
     Autor: Victor Hugo Barraza Gonzalez
     Proyecto: CoinShift - Lógica Inicial
  */
  
  // Variables que se conectarán al HTML
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'MXN';
  result: number = 0;

  // Función de convercion
  convertir() {
    // FirstTest
    if (this.fromCurrency === 'USD' && this.toCurrency === 'MXN') {
      this.result = this.amount * 18.50; // Tasa estática temporal
    } else if (this.fromCurrency === 'MXN' && this.toCurrency === 'USD') {
      this.result = this.amount / 18.50;
    } else {
      this.result = this.amount; // Misma divisa
    }
  }
}