import { 
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector 
} from '@angular/core';

import { HourRegisterComponent } from './hour-register/hour-register.component'

@Injectable({
  providedIn: 'root'
})
export class HourRegisterService {

  constructor() { }
}
