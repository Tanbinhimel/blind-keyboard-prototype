const VALID_TIME = 100;
const THRESHOLD_ANGLE_VALUE = 100;

export function swipeUp(swipeTouches: any) {
  if (swipeTouches.length < 2) {
    return false;
  }

  const startTouch = swipeTouches[0];
  const endTouch = swipeTouches[swipeTouches.length - 1];

  const isSwipeDoneInValidTime = endTouch.timeStamp - startTouch.timeStamp <= VALID_TIME;
  const isSwipeDoneInUpperDirection = endTouch.value.y < startTouch.value.y;
  const isSwipeDoneBetweenThresholdAngle = Math.abs(endTouch.value.x - startTouch.value.x) <= THRESHOLD_ANGLE_VALUE;

  return isSwipeDoneInValidTime && isSwipeDoneInUpperDirection && isSwipeDoneBetweenThresholdAngle;
}

export function swipeDown(swipeTouches: any) {
  if (swipeTouches.length < 2) {
    return false;
  }

  const startTouch = swipeTouches[0];
  const endTouch = swipeTouches[swipeTouches.length - 1];

  const isSwipeDoneInValidTime = endTouch.timeStamp - startTouch.timeStamp <= VALID_TIME;
  const isSwipeDoneInLowerDirection = endTouch.value.y > startTouch.value.y;
  const isSwipeDoneBetweenThresholdAngle = Math.abs(endTouch.value.x - startTouch.value.x) <= THRESHOLD_ANGLE_VALUE;

  return isSwipeDoneInValidTime && isSwipeDoneInLowerDirection && isSwipeDoneBetweenThresholdAngle;
}
