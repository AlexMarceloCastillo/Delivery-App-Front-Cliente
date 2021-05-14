import { Component,Input, OnInit } from '@angular/core';
import { OlmapComponent } from '../olmap/olmap.component';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import * as Proj from 'ol/proj';
import Circle from 'ol/geom/Circle';

//Variables Globales de Radio
export const DEFAULT_LAT = -32.8975788;
export const DEFAULT_LON = -68.7621065;
export const RADIO = 2500;

@Component({
  selector: 'ol-radio',
  templateUrl: './olradio.component.html',
  styleUrls: ['./olradio.component.scss']
})
export class OlradioComponent implements OnInit {
  @Input() lat: number = DEFAULT_LAT;
  @Input() lon: number = DEFAULT_LON;
  @Input() radio: number = RADIO;
  circle: Feature;
  circleGeomtery: Circle;

  constructor(private olMap: OlmapComponent) { }

  ngOnInit(): void {
    let radioNumber: number;
    if(typeof(this.radio) == "string"){
      radioNumber = parseInt(this.radio);
    }else{
      radioNumber = this.radio;
    }
    this.circle = new Feature({
      geometry: new Circle(Proj.fromLonLat([this.lon,this.lat]),radioNumber)
    })
    this.circleGeomtery = new Circle(Proj.fromLonLat([this.lon,this.lat]),this.radio)
    this.circle.setStyle(new Style({
      renderer: (coordinates,state)=>{
        var coordinates_0 = coordinates[0];
        var x = coordinates_0[0];
        var y = coordinates_0[1];
        var coordinates_1 = coordinates[1];
        var x1 = coordinates_1[0];
        var y1 = coordinates_1[1];
        var ctx = state.context;
        var dx = x1 - x;
        var dy = y1 - y;
        var radius = Math.sqrt(dx * dx + dy * dy);

        var innerRadius = 0;
        var outerRadius = radius * 1.4;

        var gradient = ctx.createRadialGradient(
          x,
          y,
          innerRadius,
          x,
          y,
          outerRadius
        );
        gradient.addColorStop(0, 'rgba(100,145,255,0.2)');
        gradient.addColorStop(0.6, 'rgba(100,145,255,0.4)');
        gradient.addColorStop(1, 'rgba(100,145,255,0.6)');
        ctx.beginPath();

        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
        ctx.strokeStyle = 'rgba(100,145,255,1)';
        ctx.stroke();
      }
    }))

    const vectorSource = new VectorSource({
      features: [this.circle]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    if (this.olMap.map) {
      this.olMap.setMarker(vectorLayer);
    } else {
      setTimeout(() => {
        this.ngOnInit();
      }, 10);
    }
  }

}
