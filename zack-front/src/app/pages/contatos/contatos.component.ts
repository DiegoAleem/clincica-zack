import { Component } from '@angular/core';
import { MapaComponent } from '../../shared/mapa/mapa.component';

@Component({
  selector: 'app-contatos',
  standalone: true,
  imports: [
    MapaComponent
  ],
  templateUrl: './contatos.component.html',
  styleUrl: './contatos.component.scss'
})

export class ContatosComponent {

}
