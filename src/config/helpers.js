import TWEEN from '@tweenjs/tween.js';
import constants from './constants';

const helpers = {

    deepCloneObject(obj) {
        var clone = obj instanceof Array ? [] : {};
        for (var i in obj) {
            if (obj[i] !== null && typeof (obj[i]) === "object")
                clone[i] = helpers.deepCloneObject(obj[i]);
            else
                clone[i] = obj[i];
        }
        return clone;
    },

   resetModel(markerGrid) {
        markerGrid.position.set(0, 0, 0);
        markerGrid.scale.set(1,1,1);
        markerGrid.rotation.set(0, 0, 0);
    },

    createTween: (shapeProperty, endPosition, duration, delay = 0, whenCompleted = () => {}) => {
        return new TWEEN.Tween(shapeProperty)
            .to(endPosition, duration)
            .delay(delay)
            .onComplete(() => {

            });
      },

};

export default helpers;
