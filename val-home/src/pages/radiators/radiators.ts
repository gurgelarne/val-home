/**
 * Created by filip on 2017-04-04.
 */
import {NavController, NavParams,Slides} from 'ionic-angular';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Device} from "../../app/device";
import {ApiCallsservice} from "../../app/apicalls.service";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'page-radiators',
  templateUrl: 'radiators.html',
  providers: [ApiCallsservice]
})
export class RadiatorsPage implements OnInit{

  @ViewChild(Slides) slides: Slides;
  selectedSegment: string;
  device: Device;
  shownPowerChart = false;
  shownTemperatureChart = false;

  constructor(private apicallsservice: ApiCallsservice, public navCtrl: NavController, public navParams: NavParams){
    this.selectedSegment = 'first';
    this.device = navParams.get('device');
  }
  togglePowerChart() {
    if (this.isPowerChartShown()) {
      this.shownPowerChart = false;
    } else {
      this.shownPowerChart = true;
    }
  };

  isPowerChartShown() {
    return this.shownPowerChart;
  };

  toggleTemperatureChart() {
    if (this.isTemperatureChartShown()) {
      this.shownTemperatureChart = false;
    } else {
      this.shownTemperatureChart = true;
    }
  };

  isTemperatureChartShown() {
    return this.shownTemperatureChart;
  };

  itemToggled(event, dev){
    console.log(this.device.temp);
    this.device.temp = Number(this.device.temp);
    console.log(this.device.temp);
    this.apicallsservice.updateDevice(dev).subscribe();
  }

  onSegmentChanged(segmentButton) {
    console.log("Segment changed to", segmentButton.value);
    if(segmentButton.value ===('first')){
      this.slides.slideTo(0)
    }
    else {
      this.slides.slideTo(1)
    }
  }

  onSlideChanged(slider) {
    console.log('Slide changed');
    const currentSlide = this.slides.getActiveIndex();
    if(currentSlide === 0){
      this.selectedSegment = 'first';
    }
    else {
      this.selectedSegment = 'second';
    }
    console.log(currentSlide);
  }

  ngOnInit(): void {
    const source = Observable.interval(1000);
    source.switchMap(e => Observable.forkJoin( this.apicallsservice.getDevices()))
    //Observable.forkJoin( this.apicallsservice.getDevices())
      .subscribe(p => {
        this.device = p[0].filter(h => h._id === this.device._id)[0];
      })
  }
}
