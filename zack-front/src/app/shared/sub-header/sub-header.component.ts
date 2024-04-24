import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [],
  templateUrl: './sub-header.component.html',
  styleUrl: './sub-header.component.scss'
})
export class SubHeaderComponent implements OnInit {
  
  constructor(
    private router: Router){
    }
  
  ngOnInit(): void {
  }

  navigate(url: string){
    this.router.navigate([url])
  }

  navigateAndScroll(subOpcao:string): void {
    const urlWithAnchor = '/home'; // Substitua 'outra-pagina' e 'submenu' pelos valores corretos
    this.router.navigate([urlWithAnchor]).then(() => {
      setTimeout(() => {
        const element = document.getElementById(subOpcao);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Aguarda um pequeno intervalo para garantir que a navegação seja concluída
    });
  }
}