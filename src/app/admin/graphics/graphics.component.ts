import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {AdminService} from '../../Services/admin.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css'],
})
export class GraphicsComponent implements OnInit {
  @ViewChild('mounce', {static: false}) mounce: ElementRef;
  @ViewChild('year', {static: false}) year: ElementRef;
  @ViewChild('sort', {static: false}) sort: ElementRef;
  @ViewChild('Chart', {static: false}) chart: ElementRef;
  mounceArr = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень',
    'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
  ordersArray = [
    [],
    [],
    [],
    []
  ];
  colors = ['rgba(33, 145, 81, 0.2)', 'rgba(102, 0, 51, 1)', 'rgba(190, 27, 239, 0.42)', 'rgba(23, 41, 255, 1)',
    'rgba(0,255,142,255)', 'rgba(0,97,49,255)', 'rgba(141,241,255,255)', 'rgba(0,214,205,255)',
    'rgba(215,216,255,255)', 'rgba(126,0,118,255)', 'rgba(129,255,249,255)', 'rgba(255,147,92,255)'];
  years = [];
  current = [];

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
  ChartLegend = true;
  ChartData = [
    {data: [], label: '1 Квартал', fill: true, backgroundColor: 'rgba(0, 0, 0, 0)'},
    {data: [], label: '2 Квартал', fill: true, backgroundColor: 'rgba(0, 0, 0, 0)'},
    {data: [], label: '3 Квартал', fill: true, backgroundColor: 'rgba(0, 0, 0, 0)'},
    {data: [], label: '4 Квартал', fill: true, backgroundColor: 'rgba(0, 0, 0, 0)'},
  ];


  constructor(private service: AdminService) {
  }


  ngOnInit(): void {
    this.service.GetYears().subscribe((res) => {
      // @ts-ignore
      this.years = res;
      this.ChartLabels = this.years;
      this.current = ['1 Квартал', '2 Квартал', '3 Квартал', '4 Квартал'];
      this.getGraph();
    });
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
        this.ChartData[i] = ({data: arr1, fill: true, label: (i + 1) + ' Квартал', backgroundColor: this.colors[i]});
        for (let m = 0; m < arr.length; m++) {
          arr[m] = 0;
        }
      }
    });
  }

  change(value) {
    this.year.nativeElement.value = 'all';
    if (value === 'mounse') {
      this.current = this.mounceArr;
      this.ChartLegend = false;
      this.ChartLabels = this.mounceArr;
      this.service.GetOrdersByMounce().subscribe((res) => {
        let data = [];
        let forData = [];
        for (let i = 1; i <= 12; i++) {
          forData[i - 1] = res[i].length;
        }
        data.push({data: forData, backgroundColor: this.colors, fill: true, borderWidth: 1});
        this.ChartData = data;
      });
    }
    if (value === 'quarter') {
      this.current = ['1 Квартал', '2 Квартал', '3 Квартал', '4 Квартал'];
      this.ChartLegend = true;
      this.ngOnInit();
    }
  }

  changeYear(value) {
    if (this.sort.nativeElement.value === 'mounse') {
      if (value === 'all') {
        this.change('mounse');
      } else {
        let Data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let forData = [];
        let year = Number(value);
        this.service.GetOrdersByMounce().subscribe((res) => {
          for (let j = 1; j <= 12; j++) {
            for (let i = 0; i < res[j].length; i++) {
              const order = res[j][i];
              let orderYear = Number(order.date.toString().substring(0, 4));
              if (orderYear === year) {
                Data[j - 1]++;
              }
            }
          }
          console.log(Data);
          forData.push({data: Data, fill: true, backgroundColor: this.colors, borderWidth: 1});
          this.ChartData = forData;
        });
      }
    }
    if (this.sort.nativeElement.value === 'quarter') {
      if (value === 'all') {
        this.ngOnInit();
      } else {
        let forData = [];
        let Data = [0, 0, 0, 0];
        let year = [Number(value)];
        this.ChartLabels = year;
        this.service.getInfoForDiagram().subscribe((res) => {
          for (let i = 1; i <= 4; i++) {
            for (let j = 0; j < res[i].length; j++) {
              const order = res[i][j];
              let orderYear = Number(order.date.toString().substring(0, 4));
              if (orderYear === year[0]) {
                Data[i - 1]++;
              }
            }
          }
          for (let i = 0; i < 4; i++) {
            forData.push({data: [Data[i]], label: (i + 1) + ' Квартал', fill: true, backgroundColor: this.colors[i], borderWidth: 1});
          }
          this.ChartData = forData;
        });
      }
    }
  }


  changeType(value) {
    if (value === 'Line') {
      this.ChartType = 'line';
    }
    if (value === 'Bar') {
      this.ChartType = 'bar';
    }
  }

  diagramType(value) {
    if (value === 'orders-count') {
      this.ngOnInit();
    }
    if (value === 'orders') {
      this.relationsDiagram();
    }
  }


  relationsDiagram() {
    this.ChartType = 'pie';
    this.service.getForRelationsDiagram('quarter,1,all').subscribe((res) => {
      console.log();
    });
  }


}
