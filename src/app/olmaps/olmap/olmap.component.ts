import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { OSM } from 'ol/source';
import * as Proj from 'ol/proj';
import {defaults as defaultControls,Control} from 'ol/control';

import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Point from 'ol/geom/Point';

//Variables Globales de Map
export const DEFAULT_HEIGHT = '500px';
export const DEFAULT_WIDTH = '500px';

@Component({
  selector: 'ol-map',
  templateUrl: './olmap.component.html',
  styleUrls: ['./olmap.component.scss']
})



export class OlmapComponent implements AfterViewInit {

  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number = 14;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;
  @Input() readonly: boolean = true;
  public userCoords: any = null;

  target: string = 'map-' + Math.random().toString(36).substring(2);
  map: Map;

  private mapEl: HTMLElement;

  constructor(private elementRef: ElementRef) {}


  ngAfterViewInit(): void {
    this.mapEl = this.elementRef.nativeElement.querySelector('#' + this.target);
    this.map = new Map({
      target: this.target,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }),
      controls: defaultControls({attribution: false, zoom: false}).extend([])
    });


    this.map.on('click', (evt: any) => {
      if(!this.readonly){
        this.userCoords = Proj.toLonLat([evt.coordinate[0],evt.coordinate[1]]);
        this.clickMarker(this.userCoords[1],this.userCoords[0],"https://pics.freeicons.io/uploads/icons/png/20846546501582634781-512.png")
        if(this.map.getLayers().getLength() > 4){
          this.map.getLayers().removeAt(3)
        }
      }
    });

  }

  public setMarker(vector: VectorLayer) {
    this.map.addLayer(vector);
  }

  public setControl(control: Control) {
    this.map.addControl(control);
  }

  //CREAR MARCADOR CON CLICK
  public clickMarker(lat:number,lon:number,src:string){
    let marker = new Feature({
      geometry: new Point(Proj.fromLonLat([lon, lat]))
    });

    let iconMark = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: src,
        scale: [0.1,0.1]
      })
    });

    marker.setStyle(iconMark);

    const vectorSource = new VectorSource({
      features: [marker]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });
    this.setMarker(vectorLayer)
  }

}

const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }
  return cssUnitsPattern.test(value) ? value : `${value}px`;
}