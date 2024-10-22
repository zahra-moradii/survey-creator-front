import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

/**
 * @title Stepper with editable steps
 */
@Component({
  selector: 'stepper-editable-example',
  templateUrl: './stepper.html',
  styleUrls: ['./stepper.css'],
})
export class StepperEditableExample {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  isEditable = true;

  constructor(private _formBuilder: FormBuilder) {}
  numberOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
