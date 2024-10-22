import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

/**
 * @title Tab group where the tab content is loaded lazily (when activated)
 */
@Component({
  selector: 'Auth-user',
  templateUrl: './Auth.html',
  styleUrls: ['./Auth.css'],
})
export class AuthUser {
  loader = true;
  constructor(private formBuilder: FormBuilder) {}

  registerform: any = FormGroup;
  submitted = false;

  get f() {
    return this.registerform.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerform.invalid) {
      return;
    }
    if (this.submitted) {
      alert('Great!!');
    }
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 3000);
  }
  
}
