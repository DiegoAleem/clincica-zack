import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilAgendamento } from '../agendamento/perfil.agendamento.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit{
  
  perfil!: PerfilAgendamento;
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    if (history.state && history.state.perfil) {
      this.perfil = history.state.perfil;
      console.log(this.perfil);
    } else {
      console.error('Nenhum perfil foi passado.');
    }
  }

  whatsApp(link: string){
    window.open(link);
  }

}
