import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  players: any[] = [];

 //RADAR CHART
 public demoradarChartLabels:string[] = ['But', 'Possession', 'Cartons jaunes', 'Cartons rouges', 'Fautes'];
 
 public demoradarChartData:any = [
   {data: [5, 4, 3, 2, 1], label: 'Joueur A'},
   {data: [1, 2, 3, 4, 5], label: 'Joueur B'}
 ];
 public radarChartType: ChartType = "radar";


 //BAR CHART
 public barChartData: ChartConfiguration<'bar'>['data'] = {
   labels: [ '1T', '2T', '3T', '4T' ],
   datasets: [
     { data: [ 10, 10, 10, 10 ], label: 'Joueur A' },
     { data: [ 20, 20, 20, 20 ], label: 'Joueur B' }
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
       data: [ 10, 10, 10, 10 ],
       label: 'Résultats 2021',
       fill: true,
       tension: 0.5,
       borderColor: 'black',
       backgroundColor: 'rgba(13,202,240,0.3)'
     },
     {
       data: [ 20, 20, 20, 20 ],
       label: 'Résultats 2022',
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

    this.api.getListPlayers()
    .subscribe(
      response => {
        this.players = response;
        console.log(response)
      }
    )

  }

  seeDetails(player: any) {
    console.log(player)
  }

   // events
   public chartClicked(e:any):void {
    // console.log(e);
  }
 
  public chartHovered(e:any):void {
    // console.log(e);
  }


}
