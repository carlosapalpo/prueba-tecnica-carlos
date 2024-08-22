import { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-select-country',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterOutlet
  ],
  templateUrl: './select-country.component.html',
  styleUrl: './select-country.component.scss'
})
export class SelectCountryComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  formSelect: FormGroup;

  ngOnInit(): void {
    this.formSelect = this.formBuilder.group({
      country: new FormControl('', Validators.required)
    });
  }

  OnSubmit(): void {
    if (this.formSelect.valid) {
      const country = this.formSelect.value.country;

      this.router.navigateByUrl('/country/' + country);
    }
  }
}
