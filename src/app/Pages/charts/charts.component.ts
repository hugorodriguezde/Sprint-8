import { Component } from '@angular/core';
import { LinealChartComponent } from '../../components/chartType/lineal-chart/lineal-chart.component';
import { BarChartComponent } from '../../components/chartType/bar-chart/bar-chart.component';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [LinealChartComponent, BarChartComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent {

}
