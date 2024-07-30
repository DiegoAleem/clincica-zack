import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListaPsicologosComponent } from "../../shared/lista-psicologos/lista-psicologos.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ListaPsicologosComponent]
})
export class HomeComponent {

  constructor(
    private router: Router){
    }

  navigate(url: string){
    this.router.navigate([url])
  }

}
