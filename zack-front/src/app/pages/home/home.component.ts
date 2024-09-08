import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListaPsicologosComponent } from "../../shared/lista-psicologos/lista-psicologos.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [ListaPsicologosComponent, CommonModule]
})
export class HomeComponent {
  isDataLoaded: boolean = false;

  constructor(
    private router: Router){
    }

  navigate(url: string){
    this.router.navigate([url])
  }

  onDataLoaded(event: boolean) {
    this.isDataLoaded = event;
  }

}
