import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  coOrdinates: { x: number, y: number };
  offset: { x: number, y: number };

  constructor() {
    this.coOrdinates = {x: 0, y: 0};
    this.offset = {x: 0, y: 0};
  }

  ngOnInit(): void {
  }

  getCoOrdinates($event: MouseEvent) {
      this.coOrdinates.x = $event.clientX;
      this.coOrdinates.y = $event.clientY;

      this.offset.x = $event.offsetX;
      this.offset.y = $event.offsetY;
  }
}
