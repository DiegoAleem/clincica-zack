import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  constructor(
    private router: Router){
    }
  
  ngOnInit(): void {
  }

  navigate(url: string){
    this.router.navigate([url])
  }

}
