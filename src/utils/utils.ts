import getMapValue from "./data";
import * as _ from "lodash";

export function getTouchIdList(touches: any) {
  const touchIdList = [];

  for (const touch of touches) {
    if (touch.target.id) {
      window.navigator.vibrate(100);
      touchIdList.push(parseInt(touch.target.id));
    }
  }
  return touchIdList.sort();
}


export function getCharacter(touches: any) {
  const touchIdList = getTouchIdList(touches);
  const mapValue = getMapValue();

  let result = '';
  mapValue.forEach(map => {
    if (_.isEqual(map.key, touchIdList)) {
      result = map.value;
    }
  })
  return result;
}


export function getFormattedTouches(touches: any[]) {
  const result: any[] = [];

  for(let i = 0; i < touches.length; i++){
    const {clientX: x, clientY: y} = touches[i];
    result.push({x, y})
  }
  return result;
}

export function getFormattedSwipedTouches(touches: any[]) {
  const result: any[] = [];

  for(let i = 0; i < touches.length; i++){
    const {x, y} = touches[i].value;
    result.push({x, y})
  }
  return result;
}
