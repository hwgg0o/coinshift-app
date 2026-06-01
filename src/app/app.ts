import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClient, HttpClientModule } from '@angular/common/http'; // 👈 Agregamos el cliente HTTP

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // 👈 Agregamos HttpClientModule aquí
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  /* Autor: Victor Hugo Barraza Gonzalez
     Proyecto: CoinShift - Conexión con Microservicio de Laravel
  */
  
  // Variables conectadas al HTML mediante [(ngModel)]
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'MXN';
  result: number = 0;

  // Inyectamos el servicio HttpClient en el constructor para poder hacer peticiones
  constructor(private http: HttpClient) {}

  // Función de conversión actualizada para consumir el backend
  convertir() {
    // Validación básica inicial
    if (this.amount <= 0) {
      this.result = 0;
      return;
    }

    // Petición dinámica al microservicio de Laravel en el contenedor de Docker (Puerto 8000)
    this.http.get<any>('http://localhost:8000/api/exchange-rate').subscribe({
      next: (data) => {
        // En lugar de usar un número estático, consumimos los valores reales que vienen del JSON del backend
        if (this.fromCurrency === 'USD' && this.toCurrency === 'MXN') {
          this.result = this.amount * data.usd_to_mxn; // data.usd_to_mxn equivale al 18.50 de tu API
        } else if (this.fromCurrency === 'MXN' && this.toCurrency === 'USD') {
          this.result = this.amount * data.mxn_to_usd; // Multiplicamos por la tasa inversa calculada por la API
        } else {
          this.result = this.amount; // Misma divisa
        }
      },
      error: (error) => {
        console.error('Error al conectar con la API de Laravel:', error);
        alert('No se pudo conectar con el microservicio de conversión de divisas.');
      }
    });
  }
}