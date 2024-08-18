import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-psicologo',
  standalone: true,
  imports: [],
  templateUrl: './area-psicologo.component.html',
  styleUrl: './area-psicologo.component.scss'
})
export class AreaPsicologoComponent {

  constructor(
    private router: Router){
    }

  navigate(url: string){
    this.router.navigate([url]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  whatsApp(link: string){
    window.open(link);
  }
}
