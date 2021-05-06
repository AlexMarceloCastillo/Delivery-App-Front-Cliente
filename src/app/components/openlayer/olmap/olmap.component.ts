import { Component, AfterViewInit, Input, ElementRef } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { OSM } from 'ol/source';
import * as Proj from 'ol/proj';
import {defaults as defaultControls,Control} from 'ol/control';

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
  @Input() zoom: number;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;

  target: string = 'map-' + Math.random().toString(36).substring(2);
  map: Map;

  private mapEl: HTMLElement;

  constructor(private elementRef: ElementRef) { }


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

  }
  
  public setMarker(vector: VectorLayer) {
    this.map.addLayer(vector);
  }

  public setControl(control: Control) {
    this.map.addControl(control);
  }

}

const cssUnitsPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value: any): string {
  if (value == null) {
    return '';
  }

  return cssUnitsPattern.test(value) ? value : `${value}px`;



}
