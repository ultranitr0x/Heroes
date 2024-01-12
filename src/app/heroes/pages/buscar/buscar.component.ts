import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../heroe/interfaces/heroes.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {
  termino: string =''; // termino de busqueda
  heroes: Heroe[]=[];  // Ctrl + pto
  heroeEncontrado: boolean = false;
  heroeSeleccionado!:Heroe|undefined;
  constructor(private heroesService: HeroesService) { }

  buscando(){
    this.heroesService.getSugerencias(this.termino).subscribe(heroes => {
      if(heroes.length===0){this.heroeEncontrado=true;} else {this.heroeEncontrado=false;}
        this.heroes=heroes;})
  
  }
  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
      const heroe: Heroe = event.option.value;
      //console.log(heroe);
      this.termino=heroe.superhero; //para que se vea en el input
      this.heroesService.getHeroesPorId(heroe.id!)
            .subscribe(heroe => this.heroeSeleccionado= heroe);
    }
  
}
