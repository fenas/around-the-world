import { MainHttpService } from './../main-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  countryList: any;
  constructor(
    private router: Router,
    private http: MainHttpService,
    private route: ActivatedRoute
  ) {
    const regionName = this.route.snapshot.paramMap.get('region');
    console.log(regionName);

    this.http
      .getCountriesByRegion(regionName)
      // .map(response => response.json().items)
      .subscribe(result => {
        console.log(result);
        this.countryList = result;
        console.log(this.countryList);
      });
  }

  ngOnInit() {}
}
