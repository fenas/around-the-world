import { MainHttpService } from './../main-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { routerNgProbeToken } from '@angular/router/src/router_module';
// import { ThrowStmt } from '@angular/compiler';

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
    if (regionName === 'north_america') {
      console.log('na');
      this.http.getCountriesByRegionalBloc('nafta').subscribe(result => {
        console.log(result);
        this.countryList = result;
        console.log(this.countryList);
      });
    } else if (regionName === 'south_america') {
      console.log('sa');
      this.http.getCountriesByRegionalBloc('usan').subscribe(result => {
        console.log(result);
        this.countryList = result;
        console.log(this.countryList);
      });
    } else {
      this.http
        .getCountriesByRegion(regionName)
        // .map(response => response.json().items)
        .subscribe(result => {
          console.log(result);
          this.countryList = result;
          console.log(this.countryList);
        });
    }
  }

  //   getCountryInfo($event) {
  //     // console.log($event);
  // // this.http.getCountryDetails($event);
  // // this.router.navigate(['/list', regionName]);
  //   }

  langFilter(code: string) {
    // const lang = $event.path[0].innerText;
    this.http.filterByLang(code).subscribe(result => {
      this.router.navigate([`list/${code}`]);
      this.countryList = result;
      console.log(this.countryList);
    });
    // console.log($event);
  }

  ngOnInit() {}
}
