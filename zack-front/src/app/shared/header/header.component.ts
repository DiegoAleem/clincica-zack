import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @ViewChild('myTopnav') myTopnav!: ElementRef;
  
  constructor(
    private router: Router) {
  }
  ngOnInit(): void {
  
  }

  toggleNav() {
    const x = this.myTopnav.nativeElement;
    x.classList.toggle('responsive');
  }

  navigate(url: string) {
    this.router.navigate([url])
  }

  toggleMenu() {
    var menu = document.querySelector('.menu');
    menu?.classList.toggle('active');
  }

  navigateAndScroll(subOpcao: string): void {
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

