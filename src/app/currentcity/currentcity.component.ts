import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from '../interfaces/city.model';
import { Weather } from '../interfaces/weather.model';

@Component({
  selector: 'app-currentcity',
  templateUrl: './currentcity.component.html',
  styleUrls: ['./currentcity.component.css']
})
export class CurrentcityComponent implements OnInit {

  @Input() public city!: City;
  @Input() public weather!: Weather;
  @Output() public closedCity: EventEmitter<City> = new EventEmitter<City>();

  ngOnInit(): void {
    
  }
  public close(): void {
      this.closedCity.emit(this.city);
  }

}
