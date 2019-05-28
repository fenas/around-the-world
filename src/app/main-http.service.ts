import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainHttpService {
  constructor(private http: HttpClient, private router: Router) {}

  // searchCountry() {

  // }

  getCountriesByRegion(region: string) {
    return this.http.get(
      `https://restcountries.eu/rest/v2/region/${region}?fields=name;capital;currencies;languages;region;subregion;flag`
    );
  }

  // getCountryDetails() {

  // }
}
