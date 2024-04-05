import { Component, OnInit } from '@angular/core';
import { Chart, ChartType, LineController, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);

@Component({
  selector: 'app-lineal-chart',
  standalone: true,
  imports: [],
  templateUrl: './lineal-chart.component.html',
  styleUrl: './lineal-chart.component.scss'
})
export class LinealChartComponent implements OnInit {

  public chart!: Chart;

  ngOnInit() {

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First dataset',
        data: [1.7, 1.5, 1.6, 1.4, 2, 1.95, 2.1],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    this.chart = new Chart('chart', {
      type: "line" as ChartType,
      data
    });
  }
}
