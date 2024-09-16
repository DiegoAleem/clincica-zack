import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  constructor(private router: Router){

  }
 
  ngOnInit(): void {
    
  }
 
  
  navigate(url: string){
    this.router.navigate([url]);
}

  navigateAndScroll(subOpcao:string): void {
    const urlWithAnchor = '/home';
    this.router.navigate([urlWithAnchor]).then(() => {
      setTimeout(() => {
        const element = document.getElementById(subOpcao);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  }
}
