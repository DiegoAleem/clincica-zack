import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atendimento-online',
  standalone: true,
  imports: [],
  templateUrl: './atendimento-online.component.html',
  styleUrl: './atendimento-online.component.scss'
})
export class AtendimentoOnlineComponent {

  constructor(
    private router: Router){
    }

  navigate(url: string){
    this.router.navigate([url])
  }
}
