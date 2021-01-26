import { Component, OnInit } from '@angular/core';
import * as Chart from '../../../assets/plugins/Chart.js-2.8.0/dist/Chart.min.js';
import { DashboardService } from '../dashboard.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  userCount: any = [];

  orderCount: any = [];

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {

  }

  ngOnInit() {

    let months = new Array(12);
    months[0] = "JAN";
    months[1] = "FEB";
    months[2] = "MAR";
    months[3] = "APR";
    months[4] = "MAY";
    months[5] = "JUN";
    months[6] = "JLY";
    months[7] = "AUG";
    months[8] = "SEP";
    months[9] = "OCT";
    months[10] = "NOV";
    months[11] = "DEC";

    this.dashboardService.getOrderChart().subscribe(
      response => {

        let orderCount = response.body['orders'];

        let month = new Date().getMonth();
        let year = new Date().getFullYear();


        const labelOrder = [];

        orderCount.forEach(element => {
          this.orderCount.push(element.Y);
          labelOrder.push(element.lable + ', ' + months[month])
        });

        let ctxLine = document.getElementById('myChartLine');
        let myChartLine = new Chart(ctxLine, {
          type: 'line',
          data: {
            labels: labelOrder,
            datasets: [{
              fill: false,
              label: 'Orders This Month',
              data: this.orderCount,
              borderColor: '#9e2cb2',
              borderWidth: 2,
              pointBorderWidth: 3,
              pointBorderColor: '#9e2cb2',
              pointBackgroundColor:'#9e2cb2'
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                },
              }]
            }
          }
        });

      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

    this.dashboardService.getuserChart().subscribe(
      response => {

        let userCount = response.body['registeredUsers'];

        const labelTotal = [];

        userCount.forEach(element => {
          this.userCount.push(element.Y);
          labelTotal.push(element.lable)
        });

        let ctx = document.getElementById('myChart');
        let myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labelTotal,
            datasets: [{
              label: 'Registered Users',
              data: this.userCount,
              backgroundColor: [
                '#F36A7B',
                '#5893D4',
                '#FFBA5A',
                '#1CB3C8',
                '#3f4d67',
                '#a033b4', 
                '#F36A7B',
                '#5893D4',
                '#FFBA5A',
                '#1CB3C8',
                '#3f4d67',
                '#a033b4'
              ],
              borderWidth: 1,
              
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }],
              xAxes: [{
                barPercentage: 0.5,
                barThickness: 25,
                gridLines: {
                    offsetGridLines: true
                }
            }]
            }
          }
        });



      },
      err => {
        this.router.navigateByUrl('/serverError');
      }
    );

  }

}
