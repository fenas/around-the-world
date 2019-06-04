import { DataTransferService } from './../data-transfer.service';
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

  constructor(
    private route: ActivatedRoute,
    private http: MainHttpService,
    private router: Router,
    private dataTransfer: DataTransferService
  ) {}

  // capture value from route and load contents on page on startup
  ngOnInit() {
    this.countryName = this.route.snapshot.paramMap.get('country');
    console.log(this.countryName);
    this.http.getCountryDetails(this.countryName).subscribe(
      result => {
        this.countryDetails = result;
      },
      error => {
        console.log(error);
        this.router.navigate([`error`]);
      }
    );
  }

  // function called when user clicks on region filter
  regionSearch(region: string) {
    this.router.navigate([`list/${region}`]);
  }

  // function called when user clicks on currency filter

  currencySearch(code: string, name?: string) {
    this.dataTransfer.passCur.next(name);
    this.router.navigate([`list/${code}`]);
  }

  // function called when user clicks on language filter

  languageSearch(code: string, name?: string) {
    this.dataTransfer.passLang.next(name);
    this.router.navigate([`list/${code}`]);
  }
}
