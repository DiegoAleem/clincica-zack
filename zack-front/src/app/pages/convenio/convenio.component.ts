import { Component } from '@angular/core';

@Component({
  selector: 'app-convenio',
  standalone: true,
  imports: [],
  templateUrl: './convenio.component.html',
  styleUrl: './convenio.component.scss'
})
export class ConvenioComponent {

  whatsApp(link: string){
    window.open(link);
  }
}
