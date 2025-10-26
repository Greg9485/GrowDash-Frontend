import { Component, OnInit } from '@angular/core';
import { SensorsService, Sensor } from '../sensors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sensors: Sensor[] = [];
  loading = true;
  error: string | null = null;

  constructor(private sensorsService: SensorsService) {}

  ngOnInit(): void {
    this.sensorsService.getSensors().subscribe({
      next: (data) => {
        this.sensors = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load sensors';
        this.loading = false;
      }
    });
  }
}
