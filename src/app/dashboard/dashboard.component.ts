import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterComponent } from 'angular-gridster2';
import { SensorsService, Sensor } from '../sensors.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(GridsterComponent) gridster: GridsterComponent;

  options: GridsterConfig = {
    draggable: { enabled: true },
    resizable: { enabled: true },
    minCols: 1,
    maxCols: 6,
    minRows: 1,
    maxRows: 10,
    pushItems: true,
    swap: true
  };
  
  dashboard: GridsterItem[] = [];
  sensors: (Sensor & { timeRange: string })[] = [];

  viewMode: 'overall' | 'metric' = 'overall';
  selectedSensorId: number | null = null;


  constructor(private sensorsService: SensorsService) {}

  ngOnInit() {
    this.options = {
      draggable: { enabled: true, ignoreContent: true },
      resizable: { enabled: true },
      pushItems: true,
      swap: false,
      minCols: 8,
      maxCols: 12,
      minRows: 2,
      maxRows: 12,
      gridType: 'fit',
      margin: 10,
      outerMargin: true
    };

    this.sensorsService.getSensors().subscribe((data: Sensor[]) => {
      this.sensors = data.map(sensor => ({ ...sensor, timeRange: 'day' }));

      this.dashboard = this.sensors.map((sensor, i) => ({
        cols: 2,
        rows: 1,
        x: (i % 4) * 2,
        y: Math.floor(i / 4) * 2,
        sensor
      }));
    });
  }

  ngAfterViewInit() {
    // Force Gridster to recalc its layout after view initialization
    setTimeout(() => {
      this.options.api?.optionsChanged();
    }, 0);
  }

  onTimeRangeChange(event: { sensorId: number; timeRange: string }) {
    const sensor = this.sensors.find(s => s.id === event.sensorId);
    if (sensor) sensor.timeRange = event.timeRange;
  }

  
  showOverallView() {
    this.dashboard = this.sensors.map((sensor, i) => ({
      cols: 2,                // width of each card
      rows: 1,                // 1 row tall for sleek spacing
      x: (i % 4) * 2,         // 4 cards per row
      y: Math.floor(i / 4),   // next row after 4 cards
      sensor
    }));
  
    this.viewMode = 'overall';
    this.selectedSensorId = null;
  
    // Notify Gridster to recalc layout
    setTimeout(() => this.options.api?.optionsChanged(), 0);
  }
  


  onViewChange(event: { type: 'overall' | 'metric'; sensorId?: number }) {
    if (event.type === 'overall') {
      this.showOverallView();
    } else if (event.type === 'metric' && event.sensorId != null) {
      const sensor = this.sensors.find(s => s.id === event.sensorId);
      if (sensor) {
        this.dashboard = [{
          cols: this.options.maxCols,  // full width
          rows: this.options.maxRows,  // full height
          x: 0,
          y: 0,
          sensor
        }];
        this.viewMode = 'metric';
        this.selectedSensorId = sensor.id;
  
        setTimeout(() => this.options.api?.optionsChanged(), 0);
      }
    }
  }


// onViewChange(event: { type: 'overall' | 'metric'; sensorId?: number }) {
//   this.viewMode = event.type;
//   this.selectedSensorId = event.sensorId ?? null;

//   if (this.viewMode === 'overall') {
//     // show all metrics in rows
//     this.dashboard = this.sensors.map((sensor, i) => ({
//       cols: 2,                // width of each card
//       rows: 1,                // 1 row tall
//       x: (i % 4) * 2,         // 4 per row
//       y: Math.floor(i / 4),
//       sensor
//     }));
//   } else if (this.viewMode === 'metric' && this.selectedSensorId != null) {
//     const sensor = this.sensors.find(s => s.id === this.selectedSensorId);
//     if (sensor) {
//       // show single metric filling the grid
//       this.dashboard = [{
//         cols: this.options.maxCols,  // full width
//         rows: this.options.maxRows,  // full height
//         x: 0,
//         y: 0,
//         sensor
//       }];
//     }
//   }
// }



}





// import { Component, OnInit } from '@angular/core';
// import { GridsterConfig, GridsterItem } from 'angular-gridster2';
// import { SensorsService, Sensor } from '../sensors.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   options: GridsterConfig;
//   dashboard: GridsterItem[] = [];
//   sensors: (Sensor & { timeRange: string })[] = [];

//   constructor(private sensorsService: SensorsService) {}

//   ngOnInit() {
//     this.options = {
//       draggable: { enabled: true, ignoreContent: true },
//       resizable: { enabled: true },
//       pushItems: true,
//       swap: false,
//       minCols: 8,
//       maxCols: 12,
//       minRows: 2,
//       maxRows: 12,
//       gridType: 'fit',       // or 'scrollVertical' if you want vertical scroll
//       margin: 10,
//       outerMargin: true
//     };
    

//     this.sensorsService.getSensors().subscribe((data: Sensor[]) => {
//       this.sensors = data.map(sensor => ({ ...sensor, timeRange: 'day' }));

//       this.dashboard = this.sensors.map((sensor, i) => ({
//         cols: 2,              // width of the card
//         rows: 2,              // height of the card
//         x: (i % 4) * 2,       // 4 cards per row
//         y: Math.floor(i / 4) * 2,
//         sensor
//       }));
//     });
//   }

//   onTimeRangeChange(event: { sensorId: number; timeRange: string }) {
//     const sensor = this.sensors.find(s => s.id === event.sensorId);
//     if (sensor) sensor.timeRange = event.timeRange;
//   }
// }


