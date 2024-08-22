import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Country } from '@app/shared/models/country.model';
import { CountryService } from '@app/shared/services/country.service/country.service';
import { of, Subject, take, takeUntil } from 'rxjs';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { DomSeguroPipe } from '@app/shared/pipes/dom-seguro.pipe';

@Component({
  selector: 'app-show-country',
  standalone: true,
  imports: [
    RouterModule,
    PanelModule,
    CommonModule,
    DomSeguroPipe
  ],
  templateUrl: './show-country.component.html',
  styleUrl: './show-country.component.scss'
})
export class ShowCountryComponent implements OnInit, OnDestroy {

  private activatedRouter = inject(ActivatedRoute);
  private countryService = inject(CountryService);
  private subscription = new Subject<void>();
  name: string;
  show: boolean = false;
  country: Country;
  countryInformation: string[];


  ngOnInit(): void {
    this.activatedRouter.paramMap.pipe(takeUntil(this.subscription)).subscribe(params => {
      this.name = params.get('name');
      if(this.name) {
        this.countryService.getCountryByName(this.name).pipe(take(1)).subscribe(country => {
          this.country = country;

          this.show = true;
        });
      }
    })
  }

  ngOnDestroy(): void {
      this.subscription.next();
      this.subscription.complete();
  }
}
