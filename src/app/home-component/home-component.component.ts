import { Router } from '@angular/router';
import { MainHttpService } from './../main-http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.scss']
})
export class HomeComponentComponent implements OnInit {
  constructor(private http: MainHttpService, private router: Router) {}

  onClick(region: string) {
    // const regionName = $event.path[0].innerText.toLowerCase();
    // console.log(regionName);
    // this.http.getCountriesByRegion(regionName);
    console.log(region);
    this.router.navigate(['/list', region]);
  }

  ngOnInit() {}
}
