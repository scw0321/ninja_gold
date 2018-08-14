import { Injectable } from '@angular/core';
import {HttpService } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpService) { }
}
