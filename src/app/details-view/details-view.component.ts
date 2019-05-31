import { MainHttpService } from './../main-http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit {
  countryName: string;
  countryDetails: any;

  constructor(private route: ActivatedRoute, private http: MainHttpService) {}

  ngOnInit() {
    this.countryName = this.route.snapshot.paramMap.get('country');
    console.log(this.countryName);
    this.http.getCountryDetails(this.countryName).subscribe(result => {
      this.countryDetails = result;
    });
  }
}
