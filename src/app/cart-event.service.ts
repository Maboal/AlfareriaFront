import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartEventService {
  addToCartEvent = new EventEmitter<any>();
}
