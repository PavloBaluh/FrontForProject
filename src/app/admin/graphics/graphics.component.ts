import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {AdminService} from '../../Services/admin.service';
import {Orders} from '../../Models/Orders';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit {
  @ViewChild('year_mounce') yearMounce: ElementRef;
  @ViewChild('mounce') mounce: ElementRef;
  @ViewChild('year') year: ElementRef;
  mounceArr = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень',
    'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
  ordersArray = [
    [],
    [],
    [],
    []
  ];
  colors = ['rgba(33, 145, 81, 0.2)', 'rgba(102, 0, 51, 1)', 'rgba(190, 27, 239, 0.42)', 'rgba(23, 41, 255, 1)',
    'rgba(33, 145, 81, 0.2)', 'rgba(102, 0, 51, 1)', 'rgba(190, 27, 239, 0.42)', 'rgba(23, 41, 255, 1)',
    'rgba(33, 145, 81, 0.2)', 'rgba(102, 0, 51, 1)', 'rgba(190, 27, 239, 0.42)', 'rgba(23, 41, 255, 1)'];
  years = [];

  ChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    scaleShowVerticalLines: false,
    responsive: true,
    title: {
      display: true,
      text: 'Кількість замовлень за кожний квартал'
    }
  };
  ChartLabels = [];
  ChartType = 'bar';
  ChartLegend = false;
  ChartData = [
    {data: [], label: '1 Квартал', backgroundColor: 'rgba(0, 0, 0, 0)'},
    {data: [], label: '2 Квартал', backgroundColor: 'rgba(0, 0, 0, 0)'},
    {data: [], label: '3 Квартал', backgroundColor: 'rgba(0, 0, 0, 0)'},
    {data: [], label: '4 Квартал', backgroundColor: 'rgba(0, 0, 0, 0)'},
  ];

  constructor(private service: AdminService) {
    service.GetYears().subscribe((res) => {
      // @ts-ignore
      this.years = res;
      this.ChartLabels = this.years;
      this.getGraph();
    });
  }


  ngOnInit(): void {
  }


  getGraph() {
    let arr = new Array(this.ChartLabels.length);
    for (let m = 0; m < arr.length; m++) {
      arr[m] = 0;
    }
    this.service.getInfoForDiagram().subscribe((res) => {
      for (let i = 1; i < this.ordersArray.length + 1; i++) {
        this.ordersArray[i - 1] = res[i];
      }
      for (let i = 0; i < this.ordersArray.length; i++) {
        this.ordersArray[i].forEach((order) => {
          for (let j = 0; j < this.ChartLabels.length; j++) {
            if (order.date.toString().substring(0, 4) === this.ChartLabels[j] + '') {
              arr[j]++;
            }
          }
        });
        let arr1 = [];
        arr.forEach((el) => {
          arr1.push(el);
        });
        this.ChartData[i] = ({data: arr1, label: (i + 1) + ' Квартал', backgroundColor: this.colors[i]});
        for (let m = 0; m < arr.length; m++) {
          arr[m] = 0;
        }
      }
    });
  }

  change(value) {
    if (value === 'mounse') {
      this.yearMounce.nativeElement.style.display = 'flex';
      this.ChartLabels = this.mounceArr;
      this.service.GetOrdersByMounce().subscribe((res) => {
        console.log(res);
        let data = [];
        let forData = [];
        for (let i = 1; i <= 12; i++) {
          forData[i - 1] = res[i].length;
        }
        data.push({data: forData, backgroundColor: this.colors, fill: false, borderWidth: 1});
        this.ChartData = data;
        this.ChartOptions.title.text = 'Кількість замовлень за кожний місяць';
      });
    }
    if (value === 'quarter') {
      this.yearMounce.nativeElement.style.display = 'none';
    }
  }

  changeYear(value) {
    let year = Number(value);
    this.service.GetOrdersByMounce().subscribe((res) => {
      for (let j = 1; j <= 12; j++) {
        for (let i = 0; i < res[j].length; i++) {
          const order = res[j][i];
          let orderYear = Number(order.date.toString().substring(0, 4));
          if (orderYear === year) {
            console.log(order);
          }
        }
      }
    });
  }

  changeMounth(value) {
    let i = Number(value);
    this.service.GetOrdersByMounce().subscribe((res) => {
      for (let j = 0; j <= 12; j++) {
        if (i === j) {
          console.log(res[j]);
        }
      }
    });
  }
}

