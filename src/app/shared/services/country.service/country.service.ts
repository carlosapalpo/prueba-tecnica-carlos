import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { count, map, Observable } from 'rxjs';
import { CountryResponse } from '../../models/country-response.model';
import { Country } from '@app/shared/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private urlBase = "https://restcountries.com/v3.1/"

  constructor(private http: HttpClient) { }

  getCountryByName(name: string): Observable<Country> {

    return this.http.get<CountryResponse[]>(`${this.urlBase}name/${name}`).pipe(
      map(data => this.mapData(data))
    );
  }

  mapData(data: CountryResponse[]): Country  {
    const country = {} as Country;

    const resp = data[0];

    const language = Object.keys(resp.languages);
    
    country.common = resp.name.nativeName? resp.name.nativeName[language[0]].common: resp.name.common;
    country.official = resp.name.nativeName? resp.name.nativeName[language[0]].official: resp.name.official;
    country.currencie = resp.currencies[language[0]]? resp.currencies[language[0]].name: '';
    country.region = resp.region;
    country.capital = resp.capital[0];
    country.area = resp.area;
    country.map = resp.maps.googleMaps;
    

    return country;
  }
}
