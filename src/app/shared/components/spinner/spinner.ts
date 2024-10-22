import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
} from '@angular/router';

/**
 * @title Tab group where the tab content is loaded lazily (when activated)
 */
@Component({
  selector: 'load-page',
  templateUrl: './spinner.html',
})
export class spinnerPage {
  loader = true;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.router.events.subscribe((e: RouterEvent) => {
      this.navigayionInterceptor(e);
    });
  }
  navigayionInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loader = true;
      }, 2000);
    }
    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.loader = true;
      }, 2000);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.loader = true;
      }, 2000);
    }
  }
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
