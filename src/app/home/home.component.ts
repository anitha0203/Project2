import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { City } from '../interfaces/city.model';
import { Currentweather } from '../interfaces/currentweather.model';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilService } from '../services/util.service';
import { Util1Service } from '../services/util1.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() public selectedZipCode: EventEmitter<string> = new EventEmitter<string>();

  public zipCode!: FormControl;

  public addLocation(): void {
      if (this.zipCode.valid) {
          this.selectedZipCode.emit(this.zipCode.value);
          this.zipCode.reset('');
      }
  }
  public currentWeathers: Currentweather[] = [];

  constructor(private cityService: UtilService, private weatherService: Util1Service) {}

  ngOnInit(): void {
      this.cityService.getZipCodes().forEach((zipCode: string) => this.addCity(zipCode));
      this.zipCode = new FormControl('', { validators: [Validators.required, Validators.pattern(/^[0-9]{5}$/)] });
  }
  public addCity(zipCode: string): void {
      if (this.currentWeathers.map((cw: Currentweather) => cw.city.zipCode).includes(zipCode)) {
          console.error('City has already been added');
          return;
      }

      this.weatherService.getCurrentWeather(zipCode).subscribe({
          next: (weather: Currentweather) => {
              this.currentWeathers.push(weather);
              this.cityService.addZipCode(zipCode);
          },
          error: (error) => (error.status === 404 ? console.log("The city doesn't exist") : console.error(error)),
      });
  }

  public removeCity(city: City): void {
      this.cityService.removeZipCode(city.zipCode);
      this.currentWeathers = this.currentWeathers.filter((cw) => cw.city.zipCode !== city.zipCode);
  }

}
