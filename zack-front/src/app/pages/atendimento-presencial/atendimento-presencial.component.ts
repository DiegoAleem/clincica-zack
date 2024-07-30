import { Component } from '@angular/core';
import { MapaComponent } from '../../shared/mapa/mapa.component';

@Component({
  selector: 'app-atendimento-presencial',
  standalone: true,
  imports: [MapaComponent],
  templateUrl: './atendimento-presencial.component.html',
  styleUrl: './atendimento-presencial.component.scss'
})
export class AtendimentoPresencialComponent {

}
