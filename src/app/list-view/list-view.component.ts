import { DataTransferService } from './../data-transfer.service';
import { MainHttpService } from './../main-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {
  countryList: any;
  currencyFilter = false;
  languageFilter = false;
  filterOn = true;
  lang: string;
  cur: string;
  regionOn = false;
  queryName = this.route.snapshot.paramMap.get('region');
  buttonOn = false;
  langName = '';
  curName: string;
  langSubscription: Subscription;
  curSubscription: Subscription;
  form = new FormGroup({
    search: new FormControl()
  });

  constructor(
    private router: Router,
    private http: MainHttpService,
    private route: ActivatedRoute,
    private dataTransfer: DataTransferService
  ) {}

  // function for currency filtering
  curFilter(code: string, name?: string) {
    this.http.filterByCur(code).subscribe(
      result => {
        this.countryList = result;
        console.log(this.countryList);
        this.languageFilter = false;
        this.currencyFilter = true;

        this.cur = name;

        this.buttonOn = true;
        this.regionOn = false;
        this.router.navigate([`list/${code}`]);
      },
      error => {
        console.log(error);
        this.router.navigate([`error`]);
      }
    );
  }

  // function for language filtering
  LangFilter(code: string, name?: string) {
    console.log(code);
    this.http.filterByLang(code).subscribe(
      result => {
        this.countryList = result;
        console.log(this.countryList);
        this.currencyFilter = false;
        this.languageFilter = true;
        this.lang = name;
        this.buttonOn = true;
        this.regionOn = false;
        this.router.navigate([`list/${code}`]);
      },
      error => {
        console.log(error);
        this.router.navigate([`error`]);
      }
    );
  }

  // fumction called when user earches for a country on search bar
  onClick() {
    console.log(this.form);
    this.router.navigate([`details/${this.form.value.search}`]);
  }

  // initial function that gets executed in initialisation of this component
  // to get details from route and load the contents to the page
  getCountries() {
    this.buttonOn = false;
    this.regionOn = true;
    if (this.queryName === 'north_america') {
      console.log('na');
      this.http.getCountriesByRegionalBloc('nafta').subscribe(
        result => {
          console.log(result);
          this.countryList = result;
          console.log(this.countryList);
        },
        error => {
          console.log(error);
          this.router.navigate([`error`]);
        }
      );
    } else if (this.queryName === 'south_america') {
      console.log('sa');
      this.http.getCountriesByRegionalBloc('usan').subscribe(
        result => {
          console.log(result);
          this.countryList = result;
          console.log(this.countryList);
        },
        error => {
          console.log(error);
          this.router.navigate([`error`]);
        }
      );
    } else {
      this.http
        .getCountriesByRegion(this.queryName)
        // .map(response => response.json().items)
        .subscribe(
          result => {
            console.log(result);
            this.countryList = result;
            // console.log();
            console.log(this.countryList);
          },
          error => {
            console.log(error);
            this.router.navigate([`error`]);
          }
        );
    }
  }

  // function called when back button is pressed
  Back() {
    this.router.navigate([`list/${this.queryName}`]);
    this.getCountries();
    this.currencyFilter = false;
    this.languageFilter = false;
  }

  // filtering the type of value coming on route and operating accordingly
  ngOnInit() {
    if (this.queryName.length === 2) {
      this.LangFilter(this.queryName);
    } else if (this.queryName.length === 3) {
      this.curFilter(this.queryName);
    } else {
      this.getCountries();
    }
  }

  ngOnDestroy() {}
}
