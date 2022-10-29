import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  hasError(control: AbstractControl):string{
    if (control.errors?.['required']) {
      return 'Campo obrigátorio. SIM'
    }else if (control.errors?.['minlength']) {
      return 'Deve ter no min 3 e no max 100 caracteres. SIM'
    }
    return ''
  }

}
