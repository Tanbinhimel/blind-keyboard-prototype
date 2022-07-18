import {Component, OnInit} from '@angular/core';
import {swipeDown, swipeUp} from "../../utils/swipe";
import {getCharacter, getFormattedSwipedTouches, getFormattedTouches} from "../../utils/utils";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  touches: any;
  sentence: string;
  swipeTouches: any;
  result: any;

  constructor(private db: AngularFirestore) {
    this.swipeTouches = [];
    this.sentence = '';
    this.result = [];
  }

  ngOnInit(): void {
  }

  onTouchStart(event: TouchEvent) {
    event.preventDefault();
    this.touches = event.touches;
  }

  onTouchEnd() {
    const letter = getCharacter(this.touches);

    if (letter) {
      this.result.push({touches: getFormattedTouches(this.touches), value: 'ADD ' + letter, touchType: 'static'});
      this.sentence += letter;
      this.touches = [];
      this.swipeTouches = [];
      console.log('result:', this.result);
    }

    const isSwipedDown = swipeDown(this.swipeTouches);
    if (isSwipedDown) {
      window.navigator.vibrate(100);
      this.sentence += ' ';
      this.result.push({
        touches: getFormattedSwipedTouches(this.swipeTouches),
        value: 'ADD ' + 'SPACE',
        touchType: 'swipe'
      });
      console.log('result:', this.result);
      this.touches = [];
      this.swipeTouches = [];
    }

    const isSwipedUp = swipeUp(this.swipeTouches);
    if (isSwipedUp) {
      window.navigator.vibrate(100);
      const deleteChar = this.sentence[this.sentence.length - 1];
      this.sentence = this.sentence.slice(0, -1);
      this.result.push({
        touches: getFormattedSwipedTouches(this.swipeTouches),
        value: 'DELETE ' + deleteChar,
        touchType: 'swipe'
      });
      console.log('result:', this.result);
      this.touches = [];
      this.swipeTouches = [];
    }
  }

  onSwipe($event: TouchEvent) {
    const {touches, timeStamp} = $event;
    const value = {
      x: touches[0].clientX,
      y: touches[0].clientY
    };
    this.swipeTouches.push({value, timeStamp});
  }

  onClickSend() {
    const date = new Date();
    const {height, width} = window.screen;
    console.log(date);
    if (this.result !== '') {
      this.db.collection('touch-list').doc(date.toString()).set({
        touchInfo: this.result,
        screenSize: {height, width}
      }).then(r => console.log(r));
      this.result = [];
      this.sentence = '';
    }
  }
}
