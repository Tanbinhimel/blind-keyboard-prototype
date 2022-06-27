import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  coOrdinates: { x: number, y: number };
  offset: { x: number, y: number };
  touches: any;

  constructor() {
    this.coOrdinates = {x: 0, y: 0};
    this.offset = {x: 0, y: 0};
  }

  ngOnInit(): void {
  }

  getCoOrdinates($event: TouchEvent) {
    this.touches = $event.touches;
    console.log(this.touches);
  }
}
