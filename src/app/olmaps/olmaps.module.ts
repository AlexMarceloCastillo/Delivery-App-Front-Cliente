import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { OlmapComponent } from './olmap/olmap.component';
import { OlmarkerComponent } from './olmarker/olmarker.component';
import { OlradioComponent } from './olradio/olradio.component';


@NgModule({
  declarations: [
    OlmapComponent,
    OlmarkerComponent,
    OlradioComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    OlmapComponent,
    OlmarkerComponent,
    OlradioComponent
  ]
})
export class OlmapsModule { }
