import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-como-funciona',
  standalone: true,
  imports: [],
  templateUrl: './como-funciona.component.html',
  styleUrl: './como-funciona.component.scss'
})
export class ComoFuncionaComponent implements OnInit {
  ngOnInit(): void {
    console.log("Foi");
  }
  
}
