import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import getMapValue from "../../utils/data";
import {swipeDown, swipeUp} from "../../utils/swipe";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  touches: any;
  touchIdList: any;
  letter: string | undefined;
  sentence: string;


  morseCode = [
    {key: '1', value: [50, 150, 150, 150, 150]},
    {key: '2', value: [50, 50, 150, 150, 150]},
    {key: '3', value: [50, 50, 50, 150, 150]},
    {key: '4', value: [50, 50, 50, 50, 150]},
    {key: '5', value: [50, 50, 50, 50, 50]},
    {key: '6', value: [150, 50, 50, 50, 50]},

  ]
  swipeTouches: any;

  constructor() {
    this.swipeTouches = [];
    this.sentence = '';
  }

  ngOnInit(): void {
    this.letter = '';
    console.log(window.screen);
  }

  getTouches(event: TouchEvent) {
    console.log(this.touches);
    this.touches = event.touches;
    event.preventDefault();
    const touchIdList = this.getTouchIdList(this.touches);
    this.getCharacter(touchIdList);
    this.touchIdList = touchIdList;
  }

  getTouchIdList(touches: any) {
    const touchIdList = [];

    for (const touch of touches) {
      if (touch.target.id) {
        this.morseCode.forEach(code => {
          if (code.key == touch.target.id) {
            window.navigator.vibrate(code.value);
          }
        })

        touchIdList.push(parseInt(touch.target.id));
      }
    }
    return touchIdList.sort();
  }

  private getCharacter(touchIdList: any[]) {
    const mapValue = getMapValue();
    mapValue.forEach(map => {
      if (_.isEqual(map.key, touchIdList)) {
        this.letter = map.value;
      }
    });
  }

  onTouchEnd() {
    if (this.letter) {
      this.sentence += this.letter;
    }
    this.letter = '';
    const isSwipedDown = swipeDown(this.swipeTouches);
    console.log(isSwipedDown);

    if (isSwipedDown) {
      this.sentence += ' ';
    }

    const isSwipedUp = swipeUp(this.swipeTouches);
    console.log('up', isSwipedUp);
    if(isSwipedUp){
      this.sentence = this.sentence.slice(0, -1);
    }
    console.log('up', this.sentence);
    this.unsetSwipeTouches();
  }

  onSwipe($event: TouchEvent) {
    console.log('swiped');
    const {touches, timeStamp} = $event;
    const value = {
      x: touches[0].clientX,
      y: touches[0].clientY
    };
    this.swipeTouches.push({value, timeStamp});
  }

  private unsetSwipeTouches() {
    setTimeout(() => {
      this.swipeTouches = [];
    }, 1000)
  }

}
