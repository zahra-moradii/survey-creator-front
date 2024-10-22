import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  code!: string;
  id!: string;
  pId!: string;
  constructor() {}

  setCode(data: string) {
    this.code = data;
  }

  getCode() {
    return this.code;
  }

  setId(data: string) {
    this.id = data;
  }

  getId() {
    return this.id;
  }
}
