import { Injectable } from '@angular/core';
import { GenericService } from '@services/generic/generic.service';

@Injectable({
  providedIn: 'root'
})
export class RubGralService extends GenericService<any> {

  URL: string = "http://localhost:2021/api/v1/rubrogeneral";

}
