import { Component, OnInit } from '@angular/core';
import { Room } from '../../core/models/Room';
import { RoomType } from '../../core/models/RoomType';
import { RoomService } from '../../core/services/room.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disponibilidad-habitaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-availability.component.html',
  styleUrls: ['./room-availability.component.css']
})
export class RoomAvailabilityComponent implements OnInit {
  habitaciones: Room[] = [];
  listaTiposHabitacion: RoomType[] = [];
  mensaje: string = '';
  esError: boolean = false;
  fechaLlegada: string = '';
  fechaSalida: string = '';
  tipoHabitacion: number = 0;
  nombreTiposHabitacionMap: any;
  precioTiposHabitacionMap: any;
  tablaVisible: boolean = false;

  habitacionesPorPagina: number = 6;
  paginaActual: number = 1;

  constructor(private habitacionService: RoomService) { }

  ngOnInit(): void {
    this.obtenerTiposHabitacion();
  }

  onInputChange(field: 'fechaLlegada' | 'fechaSalida' | 'tipoHabitacion', value: string | number) {
    if (field === 'fechaLlegada') {
      this.fechaLlegada = value as string;
    } else if (field === 'fechaSalida') {
      this.fechaSalida = value as string;
    } else if (field === 'tipoHabitacion') {
      this.tipoHabitacion = value as number;
    }
  }
  obtenerNombreTipoHabitacion(idTipo: number): string {
    return this.nombreTiposHabitacionMap[idTipo] || '';
}

obtenerPrecioTipoHabitacion(idTipo: number): string {
    return this.precioTiposHabitacionMap[idTipo] || '';
}

  obtenerFechaActual(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = '' + (today.getMonth() + 1);
    let day = '' + today.getDate();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  obtenerTiposHabitacion() {
    this.habitacionService.ListarTiposHabitaciones().subscribe((data: RoomType[]) => {
      const formTiposHabitaciones = document.getElementById("tipoHabitacion");
      if (formTiposHabitaciones) {
        formTiposHabitaciones.innerHTML = '';
        formTiposHabitaciones.innerHTML += `
          <option value="" disabled selected>Por favor seleccione el tipo de habitación de su preferencia</option>
        `;
        for (let index = 0; index < data.length; index++) {
          formTiposHabitaciones.innerHTML += `
            <option value="${data[index].id}">${data[index].name}</option>
          `;
        }
      }
      this.listaTiposHabitacion = data;

      this.nombreTiposHabitacionMap = {};
      data.forEach(tipo => {
        this.nombreTiposHabitacionMap[tipo.id] = tipo.name;
      });

      this.precioTiposHabitacionMap = {};
      data.forEach(tipo => {
        this.precioTiposHabitacionMap[tipo.id] = tipo.price;
      });
    });
  }

  camposValidos(): boolean {
    return !!this.fechaLlegada && !!this.fechaSalida && !!this.tipoHabitacion;
  }

  onSubmit() {
    if (this.camposValidos()) {
        this.habitacionService.getDisponibilidad(this.fechaLlegada, this.fechaSalida, this.tipoHabitacion)
            .subscribe(habitaciones => {
                console.log('Habitaciones recibidas:', habitaciones);
                this.habitaciones = habitaciones;
                this.actualizarTabla(); // Llamada a actualizarTabla aquí
                this.actualizarPaginacion(habitaciones.length);
                this.tablaVisible = true;
            }, error => {
                console.error('Error: ', error);
                this.mensaje = 'Error al obtener disponibilidad de habitaciones.';
                this.esError = true;
                setTimeout(() => {
                    this.mensaje = '';
                }, 3000);
            });
    } else {
        this.mensaje = 'Por favor revisa que los campos estén completos.';
        this.esError = true;
        setTimeout(() => {
            this.mensaje = '';
        }, 3000);
    }
}
  

 actualizarTabla() {
    console.log('Habitaciones en actualizar tabla',this.habitaciones);
    const tablaHabitaciones = document.getElementById("table-body");
    if (tablaHabitaciones) {
      console.log('Entrando al if (tablaHabitaciones)');

      tablaHabitaciones.innerHTML = '';
      this.habitaciones.forEach(habitacion => {
        console.log('Habitaciones en actualizar tabla',this.habitaciones);
        const nombreTipo = this.nombreTiposHabitacionMap[habitacion.type_id];
        const precioTipo = this.precioTiposHabitacionMap[habitacion.type_id];
        console.log('tablaHabitaciones.innerHTML',tablaHabitaciones.innerHTML += `
        <tr>
          <td>${habitacion.number}</td>
          <td>${nombreTipo}</td>
          <td>${precioTipo}</td>
        </tr>
      `);
        tablaHabitaciones.innerHTML += `
          <tr>
            <td>${habitacion.number}</td>
            <td>${nombreTipo}</td>
            <td>${precioTipo}</td>
          </tr>
        `;
        console.log('habitacion.number',habitacion.number);
        console.log('nombreTipo',nombreTipo);
        console.log('precioTipo',precioTipo);

      });
      console.log('Saliendo del if (tablaHabitaciones)');

    }
    console.log('Saliendo del actualizarTabla()', this.nombreTiposHabitacionMap, '---', this.precioTiposHabitacionMap);

  }
  

  listarHabitaciones() {
    this.actualizarTabla();
    this.actualizarPaginacion(this.habitaciones.length);
  }

  actualizarPaginacion(totalHabitaciones: number) {
    const totalPaginas = Math.ceil(totalHabitaciones / this.habitacionesPorPagina);
    const paginacion = document.getElementById("pagination");
    if (paginacion) {
      paginacion.innerHTML = "";
      for (let i = 1; i <= totalPaginas; i++) {
        const botonPagina = document.createElement("button");
        botonPagina.classList.add("btn", "btn-secondary", "mr-2");
        botonPagina.textContent = String(i);
        botonPagina.addEventListener("click", () => {
          this.paginaActual = i;
          this.listarHabitaciones();
        });
        paginacion.appendChild(botonPagina);
      }
    }
  }
}
