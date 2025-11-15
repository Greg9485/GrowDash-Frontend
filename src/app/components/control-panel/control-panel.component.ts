import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sensor } from '../../sensors.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  @Input() sensors: Sensor[] = [];
  @Output() viewChange = new EventEmitter<{ type: 'overall' | 'metric'; sensorId?: number }>();
  @Output() timeRangeChange = new EventEmitter<string>();

  selectedSensorId: number | null = null;
  selectedTimeRange: string = 'day';

  selectMetric(sensorId: number) {
    this.selectedSensorId = sensorId;
    this.viewChange.emit({ type: 'metric', sensorId });
  }

  selectOverall() {
    this.selectedSensorId = null;
    this.viewChange.emit({ type: 'overall' });
  }

  changeTimeRange(range: string) {
    this.selectedTimeRange = range;
    this.timeRangeChange.emit(range);
  }
}
