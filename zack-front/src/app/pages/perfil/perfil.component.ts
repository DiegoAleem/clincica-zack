import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilAgendamento } from '../agendamento/perfil.agendamento.model';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{
  
  perfil!: PerfilAgendamento;
  
  constructor(private route: ActivatedRoute, private library: FaIconLibrary) {
    this.library.addIconPacks(fas, fab, far);
  }
  
  ngOnInit(): void {
    if (history.state && history.state.perfil) {
      this.perfil = history.state.perfil;
    } else {
      console.error('Nenhum perfil foi passado.');
    }
  }

  whatsApp(link: string){
    window.open(link);
  }

}
