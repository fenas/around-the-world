import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {
  constructor(private router: Router) {}

  mapClick($event) {
    console.log($event.path[0].id);
    const regionName = $event.path[0].id;
    this.router.navigate(['/list', regionName]);
  }

  ngOnInit() {}
}
