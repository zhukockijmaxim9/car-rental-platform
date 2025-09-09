import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
})
export class CarsComponent implements OnInit {
  cars: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/cars').subscribe((data: any) => {
      this.cars = data;
    });
  }

  addCar(model: string, year: number, price: number) {
    this.http
      .post(
        'http://localhost:3000/cars',
        { model, year, price_per_day: price },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      .subscribe(() => this.ngOnInit());
  }
}
