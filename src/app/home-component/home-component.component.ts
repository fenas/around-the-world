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

  // funtion called when a region is clicked.
  onClick(region: string) {
    console.log(region);
    this.router.navigate(['/list', region]);
  }

  ngOnInit() {}
}
