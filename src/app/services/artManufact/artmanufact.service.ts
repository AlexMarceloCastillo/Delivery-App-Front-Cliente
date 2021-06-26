import { Injectable } from '@angular/core';
import { ArtManufacturado } from '@models/artManufact.interface';
import { GenericService } from '@services/generic/generic.service';


@Injectable({
  providedIn: 'root'
})
export class ArtmanufactService extends GenericService<ArtManufacturado> {

  URL: string = "http://localhost:2021/api/v1/artmanu";
}
