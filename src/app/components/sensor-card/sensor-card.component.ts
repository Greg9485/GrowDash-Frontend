import { Component, ElementRef,  Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { SensorsService } from '../../sensors.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-sensor-card',
  templateUrl: './sensor-card.component.html',
  styleUrls: ['./sensor-card.component.css']
})
export class SensorCardComponent implements OnInit {
  @Input() sensor: any;
  history: { timestamp: string, value: number }[] = [];
  timeRange: string = 'day';

  lineChartData: ChartConfiguration<'line'>['data'];
  // lineChartOptions: ChartOptions<'line'> = {
  //   responsive: true,
  //   scales: {
  //     x: { title: { display: true, text: 'Time' }},
  //     y: { title: { display: true, text: 'Value' }}
  //   }
  // };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { labels: { color: '#fff' } },
    },
    scales: {
      x: { ticks: { color: '#eee' }, grid: { color: '#333' } },
      y: { ticks: { color: '#eee' }, grid: { color: '#333' } }
    }
  };
  


  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private sensorsService: SensorsService, private el: ElementRef) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.sensorsService.getSensorHistory(this.sensor.id, this.timeRange).subscribe({
      next: (data) => {
        this.history = data;
        this.updateChart();
      },
      error: (err) => console.error('Failed to load history:', err)
    });
  }

  changeTimeRange(range: string) {
    this.timeRange = range;
    this.loadHistory();
  }

  toggleFullscreen() {
    const el = this.el.nativeElement;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  }
  
  updateChart() {
    const labels = this.history.map(h => new Date(h.timestamp).toLocaleTimeString());
    const data = this.history.map(h => h.value);
  
    this.lineChartData = {
      labels,
      datasets: [{
        data,
        label: this.sensor.name,
        borderColor: '#42A5F5',
        fill: false,
        tension: 0.3
      }]
    };
  
    // Give chart a chance to resize inside the container
    setTimeout(() => {
      const chartEl = this.el.nativeElement.querySelector('canvas');
      if (chartEl && chartEl.chart) {
        chartEl.chart.update();
      }
    }, 50);
  }
  
  
  

}
