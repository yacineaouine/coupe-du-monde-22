import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  teams: any[] = [];

  //BAR CHART
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '1T', '2T', '3T', '4T' ],
    datasets: [
      { data: [ 0, 0, 0, 0 ], label: 'Radiations' },
      { data: [ 0, 0, 0, 0 ], label: 'Immatriculations' }
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public barChartLegend = true;
  public barChartPlugins = [];
  

  //LINE CHART
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      '1T',
      '2T',
      '3T',
      '4T'
    ],
    datasets: [
      {
        data: [ 24476, 276710135, 27503771, 322900000 ],
        label: 'CA 2020',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(13,202,240,0.3)'
      },
      {
        data: [ 247062476, 276710135, 275093771, 328076129 ],
        label: 'CA 2021',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


  constructor(private api: ApiService) {

  }

  ngOnInit() {

    this.api.getListTeams()
    .subscribe(
      response => {
        this.teams = response;
        console.log(response)
      }
    )

  }

}
