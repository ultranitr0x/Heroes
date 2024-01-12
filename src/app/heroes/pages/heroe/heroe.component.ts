import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Heroe } from './interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

import { switchMap } from 'rxjs/internal/operators/switchMap';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  constructor(private activatedRoute:ActivatedRoute, 
    private heroesService:HeroesService,
    private router:Router){}
 
  heroe!: Heroe;
  id!: string;

  ngOnInit(): void {
    //this.activatedRoute.params.subscribe(console.log);
    //this.activatedRoute.params.subscribe(resp => console.log(resp));
    this.activatedRoute.params.subscribe(({ id }) => console.log(id));
    //console.log(this.activatedRoute.snapshot.params['id']);

    // this.activatedRoute.params.pipe(
    //   delay(2000),
    //   switchMap(({id}) => this.heroesService.getHeroesPorId(id)))
    //   .subscribe(heroe => this.heroe=heroe);

    this.id = this.activatedRoute.snapshot.params['id'];
    this.heroesService.getHeroesPorId(this.id).subscribe(heroe => this.heroe = heroe);
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }


}
