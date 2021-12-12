import { GlobalVariable } from 'src/app/common/globalVariable';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
Chart.register(...registerables);

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit, AfterViewInit {
  //1st row
  firstRow!: {
    todayOrder: number;
    totalOrder: number;
    available: number;
    totalProduct: number;
    todayIncome: number;
    totalIncome: number;
    totalCustomer: number;
    totalAccount: number;
  };

  //2nd row first chart
  canvas21: any;
  ctx21: any;
  dateList21: string[] = [];
  revenueList21: number[] = [];
  @ViewChild('myChart21') myChart21: any;
  //2nd row 2nd chart
  canvas22: any;
  ctx22: any;
  typeList22: string[] = [];
  numberSold22: number[] = [];
  @ViewChild('myChart22') myChart22: any;

  //3rd row first chart
  canvas31: any;
  ctx31: any;
  typeList31: string[] = [];
  numberOfProductByCate32: number[] = [];
  @ViewChild('myChart31') myChart31: any;
  //3rd row second chart
  canvas32: any;
  ctx32: any;
  typeList32: string[] = [];
  available32: number[] = [];
  unavailable32: number[] = [];
  @ViewChild('myChart32') myChart32: any;

  //4th row chart
  canvas41: any;
  ctx41: any;
  top10ProductName41: string[] = [];
  totalSold41: number[] = [];
  @ViewChild('myChart41') myChart41: any;
  constructor(private rest: RestApiService, private datepipe: DatePipe,private chRef: ChangeDetectorRef) {
    this.avatarUrl = GlobalVariable.baseHostAvatarUrl
  }

  //5th row table
  fifRowData:[]=[]
  avatarUrl=""
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) datatableElement!: DataTableDirective;
  dtOptions:DataTables.Settings = {};
  ngOnInit() {
    this.getFirstRow();
    this.get5thRowContent();
  }

  ngAfterViewInit(): void {
    this.get2ndRowContent();
    this.get3rdRowContent();
    this.get4thRowContent();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  getFirstRow() {
    this.rest.get(GlobalVariable.baseUrl + 'rest/summary/firstRow').subscribe(
      (data) => {
        this.firstRow = data as any;
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  get2ndRowContent() {
    this.rest.get(GlobalVariable.baseUrl + 'rest/summary/secondRow').subscribe(
      (data) => {
        let secondRow = data as any;
        secondRow.revenueLast7Days.forEach((e: any) => {
          this.dateList21.push(
            this.datepipe.transform(new Date(e[0]), 'dd MMM yy')!
          );
          this.revenueList21.push(e[1]);
        });
        secondRow.productSoldByCate.forEach((e: any) => {
          this.typeList22.push(e[0]);
          this.numberSold22.push(e[1]);
        });
        this.getChart21();
        this.getChart22();
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  get3rdRowContent() {
    this.rest.get(GlobalVariable.baseUrl + 'rest/summary/thirdRow').subscribe(
      (data) => {
        let thirdRow = data as any;
        thirdRow.percentSoldByCate.forEach((e: any) => {
          this.typeList31.push(e[0]);
          this.numberOfProductByCate32.push(e[1]);
        });
        thirdRow.productAvailableRate.forEach((e: any) => {
          this.typeList32.push(e[0]);
          this.available32.push(e[1]);
          this.unavailable32.push(e[2]);
        });
        this.getChart31();
        this.getChart32();
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  get4thRowContent() {
    this.rest.get(GlobalVariable.baseUrl + 'rest/summary/fourthRow').subscribe(
      (data) => {
        let fourthRow = data as any;
        fourthRow.top10SoldProduct.forEach((e: any) => {
          this.top10ProductName41.push(e[0]);
          this.totalSold41.push(e[1]);
        });
        this.getChart41();
      },
      (err) => {
        console.error(err.message);
      }
    );
  }

  get5thRowContent(){
    //data table setting
    this.dtOptions = {
      pagingType:'full_numbers',
      pageLength:5,
      lengthMenu: [ [5, 10, 15, -1], [5, 10, 15, "All"] ]
    }
    this.rest.get(GlobalVariable.baseUrl + 'rest/summary/fifthRow').subscribe(
      (data) => {
        this.fifRowData = (data as any).topCustomer;
        this.chRef.detectChanges();
        this.dtTrigger.next();
      },
      (err) => {
        console.error(err.message);
      }
    );
  }
  getChart21() {
    this.canvas21 = this.myChart21.nativeElement;
    this.ctx21 = this.canvas21.getContext('2d');
    const myChart = new Chart(this.ctx21, {
      type: 'line',
      data: {
        labels: this.dateList21,
        datasets: [
          {
            data: this.revenueList21,
            backgroundColor: 'rgb(54, 162, 235,0.7)',
            borderColor: 'rgb(54, 162, 235,1)', //blue
            fill: true,
            tension: 0,
            borderWidth: 3,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        scales: {},
        responsive: true,
        plugins: {
          title: {
            display: false,
            // text: 'Number of Registered Users By Roles',
            padding: {
              bottom: 30,
            },
            font: {
              size: 20,
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }

  getChart22() {
    this.canvas22 = this.myChart22.nativeElement;
    this.ctx22 = this.canvas22.getContext('2d');
    const gradient = this.ctx22.createLinearGradient(0, 0, 600, 0);
    gradient.addColorStop(0, 'rgba(123,149,198,1)');
    gradient.addColorStop(1, 'rgba(255,0,212,0.7)');
    const myChart = new Chart(this.ctx22, {
      type: 'bar',
      data: {
        labels: this.typeList22,
        datasets: [
          {
            // label: '# of Votes',
            data: this.numberSold22,
            // backgroundColor: colorArrays1,
            // borderColor: colorArrays1,

            backgroundColor: gradient,
            // strokeColor : "#ff6c23",
            // pointColor : "#fff",
            // pointStrokeColor : "#ff6c23",
            // pointHighlightFill: "#fff",
            // pointHighlightStroke: "#ff6c23",

            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: 'Payment status last 7 days',
            padding: {
              bottom: 10,
            },
            font: {
              size: 20,
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }

  getChart31() {
    this.canvas31 = this.myChart31.nativeElement;
    this.ctx31 = this.canvas31.getContext('2d');
    const myChart = new Chart(this.ctx31, {
      type: 'pie',
      data: {
        labels: this.typeList31,
        datasets: [
          {
            label: 'Percentage Of Product Sold By Categories',
            data: this.numberOfProductByCate32,
            backgroundColor: [
              'rgb(54, 162, 235,0.7)', //blue
              'rgb(201, 203, 207,0.7)', //gray
              'rgb(255, 205, 86,0.7)', //yellow
              'rgb(75, 192, 192)', //green
              'rgb(255, 99, 132)', //red
              'rgb(170, 60, 253,0.7)', //purple
              'rgb(123, 213, 243,1)', //blue sky
              'rgb(255, 169, 0,1)', //yellow
            ],
          },
        ],
      },
      options: {
        // cutout : 150,
        indexAxis: 'x',
        scales: {},
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: 'Percentage Of Product Sold By Categories',
            padding: {
              bottom: 30,
            },
            font: {
              size: 20,
            },
          },
          legend: {
            display: true,
          },
        },
      },
    });
  }

  getChart32() {
    this.canvas32 = this.myChart32.nativeElement;
    this.ctx32 = this.canvas32.getContext('2d');
    var myChart = new Chart(this.ctx32, {
      type: 'bar',
      data: {
        labels: this.typeList32,
        datasets: [
          {
            label: 'Available',
            data: this.available32,
            backgroundColor: ['rgb(255, 205, 86,0.7)'],
            borderColor: ['rgb(255, 205, 86,1)'],
            borderWidth: 1,
            type: 'bar',
          },
          {
            label: 'Available',
            data: this.available32,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            type: 'line',
            stack: 'combined',
            tension: 0.3,
          },
          {
            label: 'Unavailable',
            data: this.unavailable32,
            backgroundColor: ['rgb(255, 99, 132,0.7)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
            type: 'bar',
          },

          {
            label: 'Unavailable',
            data: this.unavailable32,
            backgroundColor: 'rgb(54, 162, 235,0.7)',
            borderColor: 'rgb(54, 162, 235,0.7)',
            borderWidth: 1,
            type: 'line',
            stack: 'combined',
            tension: 0.3,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: 'Number of products Available By Categories',
            padding: {
              bottom: 10,
            },
            font: {
              size: 20,
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }

  getChart41() {
    this.canvas41 = this.myChart41.nativeElement;
    this.ctx41 = this.canvas41.getContext('2d');
    const gradient = this.ctx41.createLinearGradient(0, 0, 800, 0);
    gradient.addColorStop(0, 'rgba(1,133,251,1)');
    gradient.addColorStop(0.3, 'rgba(34,207,207,1)');
    gradient.addColorStop(1, 'rgba(249,49,84,0.7)');
    const myChart = new Chart(this.ctx41, {
      type: 'bar',
      data: {
        labels: this.top10ProductName41,
        datasets: [
          {
            label: 'Total sold quantity',
            data: this.totalSold41,
            backgroundColor: gradient,
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: 'Number of products Available By Categories',
            padding: {
              bottom: 10,
            },
            font: {
              size: 20,
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
  }
  //khi có thay đổi dữ liệu trên table sẽ dùng đến method này
  rerenderDataTable(){
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    })
  }
}
