/**
 * @class Rotate
 * @params {Object} - object: The 3d mesh being rotated
 */
class Rotate  {
    constructor(object) {
        this.active = false;
        this.object = object;

        this.domContainer = document.getElementById('container');
    
        this.mouse = {
            current: { y: 0, x: 0, difference: 0 },
            start: { y: 0, x: 0, difference: 0 },
            movement: { x: 0, y: 0, difference: 0 },
        };
    
        this.targetRotation = {
            current: { y: 0, x: 0 },
            start: { y: 0, x: 0 },
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.deactivate = this.deactivate.bind(this);
    }


    onMouseDown(e) {
        // e.preventDefault();
        this.domContainer.addEventListener( 'mousemove', this.onMouseMove, false );
        this.domContainer.addEventListener( 'mouseup', this.deactivate, false );
        this.domContainer.addEventListener( 'mouseout', this.deactivate, false );

        this.domContainer.addEventListener( 'touchmove', this.onTouchMove, false );
        this.domContainer.addEventListener( 'touchend', this.deactivate, false );
        this.domContainer.addEventListener( 'touchout', this.deactivate, false );

        this.active = true;
        const clientXInfo = e.type === "touchstart" 
            ? e.touches[0].clientX
            : e.clientX;

        this.mouse.start.x = clientXInfo - (window.innerWidth / 2);
        this.targetRotation.start.x = this.targetRotation.current.x;

        this.mouse.start.y = e.clientY - (window.innerHeight / 2);
        this.targetRotation.start.y = this.targetRotation.current.y;
    }

    onTouchMove(e) {
        if (e.touches.length > 1) return;

        /** Assign the current positions of X and Y the the mouse object */
        this.mouse.current.x = e.touches[0].clientX - (window.innerWidth / 2);
        this.mouse.current.y = e.touches[0].clientY - (window.innerHeight / 2);

        /** The following distance stuff is an attempt to rotate with both axis */
        // this.mouse.current.distance = Math.hypot(this.mouse.current.x, this.mouse.current.y)
        // console.log("this.mouse.current.distance", this.mouse.current.distance)
        /** 
         *  Determine the difference in distance between the current position and the last
         *  This is used to calculate the speed of the swipe to allow for a rotation that matches
         *  the motion of the users finger
         */
        this.mouse.movement.x = -(this.mouse.start.x - this.mouse.current.x);
        /** update the start position of the users finger */
        this.mouse.start.x = this.mouse.current.x;

    }

    onMouseMove(e) {
        /** The mouse event comes with movement built in */
        this.mouse.movement.x = e.movementX;
        this.mouse.movement.y = e.movementY;
    }

    deactivate() {
        /** deactivate controls and reset mouse movement */
        this.active = false;
        this.mouse.movement.x = 0;
        this.mouse.movement.y = 0;
        /** remove event listeners */
        this.domContainer.removeEventListener( 'mousemove', this.onMouseMove, false);
        this.domContainer.removeEventListener( 'mouseup', this.deactivate), false;
        this.domContainer.removeEventListener( 'mouseout', this.deactivate, false );
        this.domContainer.removeEventListener( 'touchmove', this.onMouseMove, false);
        this.domContainer.removeEventListener( 'touchend', this.deactivate), false;
        this.domContainer.removeEventListener( 'touchout', this.deactivate, false );
    }

    update() {
        /** 
         *  If the rotation is not active (mouse click is not being held) 
         *  Terminate the function
         */
        if (!this.active) return;
        /** If mouse moves to the left, increase rotation based on speed of the mouse */
        if (this.mouse.movement.x > 0) this.object.rotation.y += 0.0025 * this.mouse.movement.x;
        /** If mouse moves to the right, decrease rotation based on speed of the mouse */
        else if (this.mouse.movement.x < 0) this.object.rotation.y -= 0.0025 * -this.mouse.movement.x;
        /** Reset mouse movements to avoid static spinning */
        this.mouse.movement.x = 0;
        this.mouse.movement.y = 0;    
        }     
}

export default Rotate;