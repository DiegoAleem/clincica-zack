import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-como-funciona',
  standalone: true,
  imports: [],
  templateUrl: './como-funciona.component.html',
  styleUrl: './como-funciona.component.scss'
})
export class ComoFuncionaComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor(
    private router: Router){
    }

  navigate(url: string){
    this.router.navigate([url])
  }
  
}
