import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-lecturas',
  templateUrl: './lecturas.component.html',
  styleUrls: ['./lecturas.component.scss']
})
export class LecturasComponent implements OnInit {

  currentTemp = 0
  promTemp = 0
  tempUnits = "C"

  single: {
    'name': string,
    'value': number
  }[] = [];

  singleGlobal: {
    'name': string,
    'series': {
      'name': string,
      'value': number
    }[]
  }[] = [];

  // options
  legendGlobal: boolean = true;
  showLabelsGlobal: boolean = true;
  animationsGlobal: boolean = true;
  xAxisGlobal: boolean = true;
  yAxisGlobal: boolean = true;
  showYAxisLabelGlobal: boolean = true;
  showXAxisLabelGlobal: boolean = true;
  xAxisLabelGlobal: string = 'Hora';
  yAxisLabelGlobal: string = 'Temperatura °C';
  timelineGlobal: boolean = true;

  colorSchemeGlobal = {
    domain: ['#E44D25']
  };


  legend: boolean = true;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  constructor(private firestoreService: FirestoreService,
    public datepipe: DatePipe) {

    this.firestoreService.getTemperaturas().subscribe((tempsSnap) => {
      this.single = [];
      this.singleGlobal = []
      this.singleGlobal.push({
        name: "Historial",
        series: []
      });

      var sumTemps = 0

      tempsSnap.forEach((tempData: any) => {
        sumTemps += tempData.payload.doc.data().temperatura
        this.single.push({
          name: (new Date(tempData.payload.doc.data().timestamp.seconds * 1000)).toString(),
          value: tempData.payload.doc.data().temperatura
        });

        this.singleGlobal[0].series.push(
          {
            name: this.datepipe.transform((new Date(tempData.payload.doc.data().timestamp.seconds * 1000)), 'dd/MM/yy HH:mm'),
            value: tempData.payload.doc.data().temperatura
          }
        )
      })

      this.promTemp = sumTemps/this.single.length

      console.log(this.singleGlobal)

      this.currentTemp = this.single[this.single.length - 1].value;

      

      Object.assign(this, this.singleGlobal);
      Object.assign(this, this.single);
    });

    if(this.tempUnits == "F"){
      this.currentTemp = (this.currentTemp - 32) * 5/9;
      this.promTemp = (this.promTemp - 32) * 5/9;
    }
  }

  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {

    window.dispatchEvent(new Event('resize'));


  }

  axisFormat(val) {
    return val.toLocaleString() + "°C"; 
  }

  changeTempUnit(){
    if(this.tempUnits == "C"){
      this.tempUnits = "F"
      this.currentTemp = (this.currentTemp * 9/5) + 32;
      this.promTemp = (this.promTemp * 9/5) + 32;
    }
    else{
      this.tempUnits = "C"
      this.currentTemp = (this.currentTemp - 32) * 5/9;
      this.promTemp = (this.promTemp - 32) * 5/9;
    }
  }

}
