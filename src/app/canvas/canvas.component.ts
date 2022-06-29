import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  touches: any;
  touchIdList: any;
  letter: string | undefined;

  mapValue = [
    {key: [4], value: 'A'},
    {key: [4, 5], value: 'B'},
    {key: [1, 4], value: 'C'},
    {key: [1, 2, 4], value: 'D'},
    {key: [2, 4], value: 'E'},
    {key: [1, 4, 5], value: 'F'},
    {key: [1, 2, 4, 5], value: 'G'},
    {key: [2, 4, 5], value: 'H'},
    {key: [1, 5], value: 'I'},
    {key: [1, 2, 5], value: 'J'},
    {key: [4, 6], value: 'K'},
    {key: [4, 5, 6], value: 'L'},
    {key: [1, 4, 6], value: 'M'},
    {key: [1, 2, 4, 6], value: 'N'},
    {key: [2, 4, 6], value: 'O'},
    {key: [1, 4, 5, 6], value: 'P'},
    {key: [1, 2, 4, 5, 6], value: 'Q'},
    {key: [2, 4, 5, 6], value: 'R'},
    {key: [1, 5, 6], value: 'S'},
    {key: [1, 2, 5, 6], value: 'T'},
    {key: [3, 4, 6], value: 'U'},
    {key: [3, 4, 5, 6], value: 'V'},
    {key: [1, 2, 3, 5], value: 'W'},
    {key: [1, 3, 4, 6], value: 'X'},
    {key: [1, 2, 3, 4, 6], value: 'Y'},
    {key: [2, 3, 4, 6], value: 'Z'}
  ];

  morseCode = [
    {key: '1', value: [50, 150, 150, 150, 150]},
    {key: '2', value: [50, 50, 150, 150, 150]},
    {key: '3', value: [50, 50, 50, 150, 150]},
    {key: '4', value: [50, 50, 50, 50, 150]},
    {key: '5', value: [50, 50, 50, 50, 50]},
    {key: '6', value: [150, 50, 50, 50, 50]},

  ]

  constructor() {
  }

  ngOnInit(): void {
    this.letter = '';
  }

  getTouches(event: TouchEvent) {
    this.touches = event.touches;
    event.preventDefault();
    const touchIdList = this.getTouchIdList(this.touches);
    this.getCharacter(touchIdList);
    this.touchIdList = touchIdList;
    console.log(touchIdList);
  }

  getTouchIdList(touches: any) {
    const touchIdList = [];

    for (const touch of touches) {
      if (touch.target.id) {
        this.morseCode.forEach(code => {
          if(code.key == touch.target.id){
            window.navigator.vibrate(code.value);
          }
        })

        touchIdList.push(parseInt(touch.target.id));
      }
    }
    return touchIdList.sort();
  }

  private getCharacter(touchIdList: any[]) {
    this.mapValue.forEach(map => {
      console.log('res', touchIdList, map.key);
      if (this.isArrayEqual(map.key, touchIdList)) {
        this.letter = map.value;
      }
    });
  }

  isArrayEqual(array1: any[], array2: any[]) {
    if (array1.length !== array2.length) {
      return false;
    }
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }

  resetLetter() {
    this.letter = '';
  }
}
