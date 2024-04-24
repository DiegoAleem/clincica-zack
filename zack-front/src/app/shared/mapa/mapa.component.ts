import { AgmCoreModule } from '@agm/core';
import { Component, OnInit, Provider } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [
    GoogleMapsModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss',
  providers: [// Substitua por sua chave real
  ]
})
export class MapaComponent implements OnInit {

  map!: google.maps.Map;
  marker!: google.maps.Marker;
  infoWindow!: google.maps.InfoWindow;
  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA5G6WmAHHa1Q4q8v-QRyXexylUHaDp7SM&libraries=places';
    script.onload = () => {
      this.initMap();
    };
    document.head.appendChild(script);
  }

  initMap() {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: -15.798100471496582, lng: -47.894989013671875 },
      zoom: 15
    });

    this.marker = new google.maps.Marker({
      position: { lat: -15.798100471496582, lng: -47.894989013671875 },
      map: map,
      title: 'Zack Desenvolvimento'
    });

    this.infoWindow = new google.maps.InfoWindow({
      content: '<h5>Clínica Zack</h5><p>Endereço: SRTS Quadra 701 Bloco "O" Ed<br>Multiempresarial Sala 466<br>Asa Sul, Brasília - DF<br>CEP: 70340-000</p>'
    });

    this.infoWindow.open(this.map, this.marker);
  }
}

