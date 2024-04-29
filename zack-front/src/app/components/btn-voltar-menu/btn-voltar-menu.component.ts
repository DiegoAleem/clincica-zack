import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-voltar-menu',
  standalone: true,
  imports: [],
  templateUrl: './btn-voltar-menu.component.html',
  styleUrl: './btn-voltar-menu.component.scss'
})
export class BtnVoltarMenuComponent {

  constructor(
    private router: Router){
    }
    
  navigate(){
    this.router.navigate(["/menu-usuario"]);
  }
}
