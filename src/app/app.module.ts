import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SensorCardComponent } from './components/sensor-card/sensor-card.component';
import { NgChartsModule } from 'ng2-charts';
import { GridsterModule } from 'angular-gridster2';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';


@NgModule({
  declarations: [AppComponent, ControlPanelComponent, DashboardComponent, SensorCardComponent],
  imports: [BrowserModule, FormsModule, GridsterModule, HttpClientModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
