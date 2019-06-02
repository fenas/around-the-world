import { MainHttpService } from './../main-http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit {
  countryName: string;
  countryDetails: any;
  lat = 20.5937;
  lng = 78.9629;

  constructor(
    private route: ActivatedRoute,
    private http: MainHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.countryName = this.route.snapshot.paramMap.get('country');
    console.log(this.countryName);
    this.http.getCountryDetails(this.countryName).subscribe(result => {
      this.countryDetails = result;
    });
  }

  regionSearch(region: string) {
    this.router.navigate([`list/${region}`]);
  }

  currencySearch(code: string) {
    this.http.filterByCur(code).subscribe(result => {
      this.router.navigate([`list/${code}`]);
      // this.countryList = result;
      // console.log(this.countryList);
      // this.languageFilter = false;
      // this.currencyFilter = true;
      // console.log(cur);
      // this.cur = cur;
      // this.buttonOn = true;
      // this.regionOn = false;
      // setTimeout(() => {
      //   this.filterOn = false;
      // }, 3000);
    });
  }
}
