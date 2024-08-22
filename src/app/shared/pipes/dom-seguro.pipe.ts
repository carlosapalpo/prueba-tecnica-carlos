import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'domSeguro',
  standalone: true,
})
export class DomSeguroPipe implements PipeTransform {

  constructor( private domSanitizer: DomSanitizer ) { }

  transform(value: any): SafeResourceUrl {

   return this.domSanitizer.bypassSecurityTrustResourceUrl( value);
  }

}