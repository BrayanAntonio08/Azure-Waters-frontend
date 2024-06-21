import { Component, OnInit } from '@angular/core';
import { Temporada } from '../../core/models/season';
import { SeasonService } from '../../core/services/season.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-season-management',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './season-management.component.html',
  styleUrls: ['./season-management.component.css']
})
export class SeasonManagementComponent implements OnInit {
  temporadas: Temporada[] = [];
  
  date = "";
  incremento = 0;

  months: any[] = [
    { short: 'Ene', complete: 'ro' },
    { short: 'Feb', complete: 'rero' },
    { short: 'Mar', complete: 'zo' },
    { short: 'Abr', complete: 'il' },
    { short: 'May', complete: 'o' },
    { short: 'Jun', complete: 'io' },
    { short: 'Jul', complete: 'io' },
    { short: 'Ago', complete: 'sto' },
    { short: 'Sep', complete: 'tiembre' },
    { short: 'Oct', complete: 'ubre' },
    { short: 'Nov', complete: 'iembre' },
    { short: 'Dic', complete: 'iembre' }
  ]
  color = [
    '#222',
    "#CC4722",  // Rojo anaranjado
    "#3357FF",  // Azul vibrante
    "#33FFFF",  // Cian
    "#FF33FF",  // Magenta
    "#FF3333",  // Rojo brillante
    "#33FF33",  // Verde brillante
    "#3333FF",  // Azul eléctrico
    "#FFA500",  // Naranja
    "#800080",  // Púrpura
    "#008080",  // Verde azulado
    "#000000",  // Negro
    "#FFFFFF",  // Blanco
    "#C0C0C0",  // Plata
    "#808080",  // Gris
    "#800000",  // Marrón
    "#808000",  // Oliva
    "#008000",  // Verde
    "#000080",  // Azul marino
    "#0000FF",  // Azul puro
    "#FF0000",  // Rojo puro
    "#00FF00",  // Verde puro
    "#FFFF00",  // Amarillo puro
    "#00FFFF",  // Aqua
    "#FF00FF",  // Fucsia
    "#ADD8E6",  // Azul claro
    "#F08080",  // Rojo claro
  ]
  periods: Period[] = [];

  constructor(private seasonService: SeasonService) { }

  ngOnInit(): void {
    this.getTemporada();
    
  }

  getTemporada(): void {
    this.seasonService.getTemporada().subscribe(
      (temporadas: Temporada[]) => {
        this.temporadas = temporadas.map(x => {
          const fechaInicioFormateada = x.fechaInicio.substring(5);
          const fechaFinFormateada = x.fechaFin.substring(5);

          // Devuelve un nuevo objeto con las fechas modificadas
          return {
            ...x,
            fechaInicio: fechaInicioFormateada,
            fechaFin: fechaFinFormateada
          };
        });
        this.createSeasons();
      },
      (error) => {
        console.error('Error al obtener las temporadas:', error);
      }
    );
  }

  createSeasons() {
    this.periods = [];
    const year_days = 365
    const startDate: Date = new Date(2000, 0, 1)
    const endDate = new Date(2000, 11, 31);

    const msPorDia = 24 * 60 * 60 * 1000;

    const auxTemporadas = this.temporadas.map(x =>{
      const fechaInicioFormateada = '2000-'+x.fechaInicio
      const fechaFinFormateada = '2000-'+x.fechaFin

      // Devuelve un nuevo objeto con las fechas modificadas
      return {
        ...x,
        fechaInicio: fechaInicioFormateada,
        fechaFin: fechaFinFormateada
      };
    });

    for(let i = 0; i < auxTemporadas.length; i++){
      let aux = auxTemporadas[i];
      let auxEndDate = new Date(aux.fechaFin)
      let auxStartDate = new Date(aux.fechaInicio)

      // Calcula el total de días de duración de la temporada
      let diasDuracion = Math.floor((auxEndDate.getTime() - auxStartDate.getTime()) / msPorDia) + 1;
      // Calcula el porcentaje del año que abarca la duración de la temporada
      let duracionPorcentaje = Math.ceil((diasDuracion / year_days) * 100);
      let inicioPorcentaje = 0;

      if(diasDuracion < 0){
        diasDuracion = Math.floor((auxEndDate.getTime() - startDate.getTime()) / msPorDia) + 1;
        duracionPorcentaje = Math.ceil((diasDuracion / year_days) * 100);
      }else{
        //calcular distancia de dias entre enero 1 y la fecha de inicio
        const diasInicio = Math.floor((auxStartDate.getTime() - startDate.getTime()) / msPorDia);
        // Calcula el porcentaje del año en el que inicia la temporada
        inicioPorcentaje = Math.ceil((diasInicio / year_days) * 100);
      }

      let period = new Period();
      period.color = aux.id;
      period.start = inicioPorcentaje
      period.end = duracionPorcentaje
      this.periods.push(period)
    }

    //calcular periodo ultima temporada
    // obtener la ultima temporada en comenzar
    let auxMax = auxTemporadas.reduce((maxTemporada, currentTemporada) => {
      let currentDate = new Date(currentTemporada.fechaInicio)
      let maxDate = new Date(maxTemporada.fechaInicio)
      return currentDate > maxDate ? currentTemporada : maxTemporada;
    }, auxTemporadas[0]);
    let auxMaxStartDate = new Date(auxMax.fechaInicio)

    const diasInicioFinal = Math.floor((auxMaxStartDate.getTime() - startDate.getTime()) / msPorDia) + 1;
    let inicioFinalPorcentaje = Math.ceil(diasInicioFinal/year_days *100);
    const diasDuracionFinal = Math.floor((endDate.getTime() - auxMaxStartDate.getTime()) / msPorDia) + 1;
    let duracionFinal = Math.ceil(diasDuracionFinal/year_days*100);
    let periodFinal: Period = {
      color: auxMax.id,
      start:inicioFinalPorcentaje,
      end:duracionFinal
    }
    this.periods.push(periodFinal);

    console.log(this.periods);
  }

  updateDates(){
    let formated = this.temporadas.map(x => { return {...x};});

    // Ordenar de la más temprana a la más tardía
    formated.sort((a, b) => {
      const dateA = new Date('2000-' + a.fechaInicio);
      const dateB = new Date('2000-' + b.fechaInicio);
      return dateA.getTime() - dateB.getTime();
    });
    
    formated = formated.map(temporada => {
      //obtener el indice actual
      let index = formated.indexOf(temporada)
      let siguiente = formated[(index+1)%formated.length];
      
      let date = new Date('2000-' + siguiente.fechaInicio);
      date.setDate(date.getDate() - 1);
      temporada.fechaFin = (date.getMonth()+1).toString().padStart(2,'0')+'-'+(date.getDate()+1).toString().padStart(2,'0')

      return temporada
    });
    
    this.temporadas = this.temporadas.map(temporada =>{
      //Tomar la fecha formaeada con los nuevos datos y actualizar
      let updated = formated.find(x => x.id === temporada.id)
      if(updated)
        temporada.fechaFin = updated.fechaFin
      return temporada;
    })

    this.createSeasons()
  }

  eliminarTemporada(id: number): void {
    this.seasonService.deleteTemporada(id).subscribe(
      () => {
        this.getTemporada();
      },
      (error) => {
        console.error('Error al eliminar la temporada:', error);
      }
    );
  }

  addTemporada():void{
    let newTemp = new Temporada();
    newTemp.id = this.temporadas.length+1;
    this.temporadas.push(newTemp);
  }

  openAddSeasonModal(): void {
    const modal = document.getElementById('addSeasonModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeAddSeasonModal(): void {
    const modal = document.getElementById('addSeasonModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  guardarNuevaTemporada(){
    console.log(this.incremento);
    console.log(this.date);
  }

  // agregarActualizarTemporada(): void {
  //   if (this.nuevaTemporada.idTemporada === 0) {
  //     this.seasonService.addTemporada(this.nuevaTemporada).subscribe(
  //       () => {
  //         this.closeAddSeasonModal();
  //         this.getTemporada();
  //         this.nuevaTemporada = { idTemporada: 0, fechaInicio: null, fechaFin: null, descuento: null, idTipo: 0 };
  //       },
  //       (error) => {
  //         console.error('Error al agregar la temporada:', error);
  //       }
  //     );
  //   } else {
  //     this.seasonService.updateTemporada(this.nuevaTemporada).subscribe(
  //       () => {
  //         this.closeAddSeasonModal();
  //         this.getTemporada();
  //         this.nuevaTemporada = { idTemporada: 0, fechaInicio: null, fechaFin: null, descuento: null, idTipo: 0 };
  //       },
  //       (error) => {
  //         console.error('Error al actualizar la temporada:', error);
  //       }
  //     );
  //   }
  // }
}


class Period {
  start: number = 0;
  end: number = 100;
  color: number = 0;
}