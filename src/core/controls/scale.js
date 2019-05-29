

class Scale {
    constructor(object) {
        this.object = object;

        this.domContainer = document.getElementById('container');

        this.touch = {
            distance : {
                start: 0,
                current: 0,
                difference: 0
            }
        };

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
    }

    onTouchStart(e) {
        if (e.touches.length !== 2) return;
        this.domContainer.addEventListener( 'touchmove', this.onTouchMove, false );
        this.domContainer.addEventListener( 'touchend', this.deactivate, false );
        this.domContainer.addEventListener( 'touchout', this.deactivate, false );

        /** Calculate the distance between the two fingers */
        this.touch.distance.start = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
    }

    onTouchMove(e) {
        if (e.touches.length !== 2) return;

        /** Calculate the distance between the two fingers */
        this.touch.distance.current = Math.hypot(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );

        /** Calculate the diffence in between this move event and the last */
        this.touch.distance.difference = -(this.touch.distance.start - this.touch.distance.current);

        if (this.touch.distance.difference > 0) {
            if (this.object.scale.x < 3) this.object.scale.x += 0.005 * this.touch.distance.difference;
            if (this.object.scale.z < 3) this.object.scale.z +=  0.005 * this.touch.distance.difference;
            if (this.object.scale.y < 3) this.object.scale.y +=  0.005 * this.touch.distance.difference;
        } else if (this.touch.distance.difference < 0) {
            if (this.object.scale.x > 0.5) this.object.scale.x += 0.005 * this.touch.distance.difference;
            if (this.object.scale.z > 0.5) this.object.scale.z +=  0.005 * this.touch.distance.difference;
            if (this.object.scale.y > 0.5) this.object.scale.y +=  0.005 * this.touch.distance.difference;
        }

        this.touch.distance.start = this.touch.distance.current;

    }

    onWheel(e) {
        let scrollY = e.deltaY;
        if (scrollY > 0) {
            if (this.object.scale.x < 3) this.object.scale.x += 0.025 * scrollY;
            if (this.object.scale.z < 3) this.object.scale.z +=  0.025 * scrollY;
            if (this.object.scale.y < 3) this.object.scale.y +=  0.025 * scrollY;
        } else if (scrollY < 0) {
            if (this.object.scale.x > 0.5) this.object.scale.x +=  0.025 * scrollY;
            if (this.object.scale.y > 0.5) this.object.scale.y +=  0.025 * scrollY;
            if (this.object.scale.z > 0.5) this.object.scale.z +=  0.025 * scrollY;
        }
    }

    deactivate() {
        /** Reset the control data */
        this.touch.distance.start = 0;
        this.touch.distance.current = 0;
        this.touch.distance.difference = 0;

        this.domContainer.removeEventListener( 'touchmove', this.onTouchMove, false );
        this.domContainer.removeEventListener( 'touchend', this.deactivate, false );
        this.domContainer.removeEventListener( 'touchout', this.deactivate, false );


    }

}

export default Scale;