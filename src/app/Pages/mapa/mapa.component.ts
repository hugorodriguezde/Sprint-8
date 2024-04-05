import { AfterViewInit, Component } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';
import { RouterOutlet } from '@angular/router';
import { MapService } from '../../services/map.service';
import { MapInterface } from '../../../models/map';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements AfterViewInit {
  locations: MapInterface[] = [];

  constructor(private mapService:MapService) { }

  ngAfterViewInit(): void {
    this.mapService.getLocations().subscribe(
      (locations:any) => {
        this.locations = locations;
        console.log('Locations', this.locations);
        const map = new Map({
          accessToken: `pk.eyJ1IjoiaHVnb3JvZHJpZ3VlemRlIiwiYSI6ImNsdWwxaTl0ODB1bm0ya2xtMzJxdWVhZ2gifQ.jhEreq_HG0rtXPVnzODP0Q`,
          container: 'map',
          style: 'mapbox://styles/mapbox/outdoors-v12',
          center: [2.194312, 41.402438],
          zoom: 12,
        });

        map.on('load', () => {
          this.locations.forEach(location => {
            new Marker()
              .setLngLat([location.longitude, location.latitude])
              .addTo(map);
          });
        });
      },
      (error) => {
        console.error('Error fetching locations', error);
      }
    );
  }
}
