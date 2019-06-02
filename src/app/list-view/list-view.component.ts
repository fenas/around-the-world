import { MainHttpService } from './../main-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalModule } from 'angular-bootstrap-md';
// import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

// import { routerNgProbeToken } from '@angular/router/src/router_module';
// import { ThrowStmt } from '@angular/compiler';

// import { Subject } from 'rxjs';

// service to trigger spinners and hints

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  countryList: any;
  currencyFilter = false;
  languageFilter = false;
  filterOn = true;
  lang: string;
  cur: string;
  regionOn = false;
  queryName = this.route.snapshot.paramMap.get('region');
  buttonOn = false;

  form = new FormGroup({
    search: new FormControl()
  });

  constructor(
    private router: Router,
    private http: MainHttpService,
    private route: ActivatedRoute,
    private modal: ModalModule
  ) {}

  //   getCountryInfo($event) {
  //     // console.log($event);
  // // this.http.getCountryDetails($event);
  // // this.router.navigate(['/list', regionName]);
  //   }

  curFilter(code: string, name?: string) {
    // const lang = $event.path[0].innerText;
    this.http.filterByCur(code).subscribe(result => {
      this.router.navigate([`list/${code}`]);
      this.countryList = result;
      console.log(this.countryList);
      this.languageFilter = false;
      this.currencyFilter = true;
      // console.log(cur);
      this.cur = name;
      // console.log(this.cur);
      this.buttonOn = true;
      this.regionOn = false;
      // setTimeout(() => {
      //   this.filterOn = false;
      // }, 3000);
    });
  }

  LangFilter(code: string, name?: string) {
    console.log(code);
    this.http.filterByLang(code).subscribe(result => {
      this.router.navigate([`list/${code}`]);
      this.countryList = result;
      console.log(this.countryList);
      this.currencyFilter = false;
      this.languageFilter = true;
      this.lang = name;
      this.buttonOn = true;
      this.regionOn = false;

      // setTimeout(() => {
      //   this.modal.hide();
      // }, 3000);
    });
  }

  onClick() {
    console.log(this.form);
    // const name = this.form.value;
    // console.log(name);
    this.router.navigate([`details/${this.form.value.search}`]);

    // this.http.searchCountry(this.form.value).subscribe(result => {
    // });
  }

  getCountries() {
    this.buttonOn = false;
    this.regionOn = true;
    if (this.queryName === 'north_america') {
      console.log('na');
      this.http.getCountriesByRegionalBloc('nafta').subscribe(result => {
        console.log(result);
        this.countryList = result;
        console.log(this.countryList);
      });
    } else if (this.queryName === 'south_america') {
      console.log('sa');
      this.http.getCountriesByRegionalBloc('usan').subscribe(result => {
        console.log(result);
        this.countryList = result;
        console.log(this.countryList);
      });
    } else {
      this.http
        .getCountriesByRegion(this.queryName)
        // .map(response => response.json().items)
        .subscribe(result => {
          console.log(result);
          this.countryList = result;
          // console.log();
          console.log(this.countryList);
        });
    }

    // console.log(this.cur);
  }

  Back() {
    this.router.navigate([`list/${this.queryName}`]);
    this.getCountries();
    this.currencyFilter = false;
    this.languageFilter = false;
  }

  ngOnInit() {
    if (this.queryName.length === 2) {
      this.LangFilter(this.queryName);
    } else if (this.queryName.length === 3) {
      this.curFilter(this.queryName);
    } else {
      this.getCountries();
    }
  }
}
