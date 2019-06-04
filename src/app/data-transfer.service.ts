import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  passLang = new Subject<string>();
  passCur = new Subject<string>();

  constructor() {}
}
