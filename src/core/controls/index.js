import consts from '../../config/constants';

import Rotate from './rotate';
import Scale from './scale';

class Controls {
    constructor(object, camera, renderer) {
        this.mode = consts.controls;

        this.domContainer = document.getElementById('container');

        this.object = object;
        this.camera = camera;
        this.renderer = renderer;

        this.dragControls = new THREE.DragControls([this.object], this.camera, this.renderer.domElement);
        this.dragControls.enabled = false;

        this.rotateControls = new Rotate(this.object);
        this.scaleControls = new Scale(this.object);

        // this.scale = this.scale.bind(this);

        this.init();
    }

    init() {
        this.mode = consts.controls;

        this.scale();

        if (this.mode === "translate") this.translate();
        else if (this.mode === "rotate") this.rotate();
    }

    reset() {
        this.dragControls.enabled = false;

        this.domContainer.removeEventListener('mousedown', this.rotateControls.onMouseDown, false);
        this.domContainer.removeEventListener('touchstart', this.rotateControls.onMouseDown, false);
        this.rotateControls.deactivate();

        this.init();
    }


    translate() {
        this.dragControls.enabled = true;
    }

    rotate() {
        this.domContainer.addEventListener('mousedown', this.rotateControls.onMouseDown, false);
        this.domContainer.addEventListener('touchstart', this.rotateControls.onMouseDown, false);
    }

    scale() {
        this.domContainer.addEventListener('wheel', this.scaleControls.onWheel, false);
        this.domContainer.addEventListener('touchstart', this.scaleControls.onTouchStart, false);
    }

    update() {
        if(this.mode !== consts.controls) {
            this.reset();
        } else {
            if (this.mode === "translate") return;
            else if (this.mode === "rotate") this.rotateControls.update();
        }

    }
}

export default Controls;