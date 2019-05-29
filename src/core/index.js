import TWEEN from '@tweenjs/tween.js';

import constants from '../config/constants';
import helpers from '../config/helpers';
let { devMode } = constants;
const { loaders, deepCloneObject, resetModel } = helpers;

import initialize from './initialize';
import Controls from './controls';

/**
 * @class: Core
 * The Core class acts as the core of the threejs environment. It is in this
 * class that the scene, renderer, camera, controls and lights are all configured
 */
class Core {
    constructor() {
        this.stats = new Stats();
        this.scene = new THREE.Scene();
        this.renderer = initialize.configureRenderer();
        this.camera = initialize.configureCamera();
        this.light = initialize.configureLight();
        this.cameraCube = new THREE.CubeCamera(1, 1000, 128);
        this.ARToolkitSource = initialize.configureARToolkitSource();
        this.ARToolkitContext = initialize.configureARToolkitContext();
        this.time = initialize.configureTime();
        this.logo = { isLoaded: false };
        this.animations = { finished: false };
        this.isAnimating = false;

        this.activeMode = constants.activeMode;

        this.controls;
        this.marker = initialize.configureMarker(this.ARToolkitContext);

        this.init();
        this.animate();
    }

    /**
     * @function: onWindowResize
     * Is triggered by a window resize which will adjust the camera and
     * renderer size and ration for responsive rendering.
     */
    onWindowResize() {
        this.ARToolkitSource.onResizeElement();
        this.ARToolkitSource.copyElementSizeTo(this.renderer.domElement);
        if (this.ARToolkitContext.arController !== null) {
            this.ARToolkitSource.copyElementSizeTo(this.ARToolkitContext.arController.canvas);
        }
    }

    initDevFeatures() {
        // console.log("window.location.pathname", window.location.hostname)
        if (constants.devMode) {
            if (window.location.hostname === "localhost") this.domContainer.appendChild(this.stats.dom);
            this.markerGrid.material.transparent = false;

            // const shadowHelper = new THREE.CameraHelper(this.light.shadow.camera);
            // this.scene.add(shadowHelper)
        } else {
            this.domContainer.removeChild(this.stats.dom);
            this.markerGrid.material.transparent = true;
            // this.scene.remove(shadowHelper)
        }
        devMode = constants.devMode;
    }


    // resetScene() {
    //   /* Update the local state of activeMode */
    //   this.activeMode = constants.activeMode;
    //   /* Remove any residual event listeners */
    //   this.domContainer.removeEventListener('click', this.beginAnimation.bind(this), false);
    //   this.domContainer.removeEventListener('touchstart', this.beginAnimation.bind(this), false);
    //   /* Stop any in progress animations */
    //   this.animations.doorLeft.stop();
    //   this.animations.doorRight.stop();
    //   this.animations.hole.stop();
    //   this.animations.shine.stop();
    //   this.animations.shineEmissive.stop()
    //   this.animations.logoRaise.stop();
    //   /* Remove and reset the hole */
    //   this.markerGrid.remove(this.hole);
    //   this.hole.material.color.setHex(0x222222);
    //   /** Remove all the volumetric light stuff */
    //   this.markerGrid.remove(this.VolLightCylinder);
    //   this.markerGrid.remove(this.VLSpotLight)
    //   this.markerGrid.remove(this.VLSpotLight.target)
    //   /* Remove and reset the door */
    //   this.markerGrid.remove(this.door);
    //   this.door.children.forEach(child => {
    //     if (child.name === "doorLeft") child.position.x = -0.5;
    //     if (child.name === "doorRight") child.position.x = 0.5;
    //   })
    //   /* Remove the hole mask */
    //   this.markerGrid.remove(this.mask);
    //   /* Remove the shadow plane */
    //   this.markerGrid.remove(this.shadowPlane);
    //   /* Reset animation state */
    //   this.animations.finished = false;
    //   /* Initiate the appropriate scene setting */
    //   if (this.activeMode === 'Animated') this.initiateAnimatedScene();
    //   else if (this.activeMode === 'Static') this.initiateStaticScene();
    // }

    /**
     * @function: init
     * Initialises the environment. All the pieces of the scene are put
     * together in this function.
     */
    init() {
        /** direct the renderer and UI elements to the container element */
        this.domContainer = document.getElementById('container');
        this.domContainer.appendChild(this.renderer.domElement);
        /** Initiate the AR Toolkits */
        this.ARToolkitSource.init(() => this.onWindowResize());
        this.ARToolkitContext.init(() => {
            this.camera.projectionMatrix.copy(this.ARToolkitContext.getProjectionMatrix());
        });
        /**
         * Create a grid helper for the marker objects to sit within.
         * The marker acts as a container for all click and drag items
         * and will render on the marker
         */
        this.markerGrid = new THREE.GridHelper(4, 4, 0x00ffff, 0xff0000);
        this.markerGrid.name = "MarkerGrid";
        this.markerGrid.material.visible = false;

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xeee4de, 0.4);

        /** Create shadow plane, an invisible plane that only renders shadows */
        const shadowPlaneGeo = new THREE.PlaneBufferGeometry(50, 50, 1);
        const shadowPlaneMat = new THREE.ShadowMaterial();
        shadowPlaneMat.opacity = 0.3;
        this.shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
        this.shadowPlane.rotation.x = -Math.PI * 0.5;
        this.shadowPlane.position.y = -0.1;
        this.shadowPlane.receiveShadow = true;

        /**
         * ENVMAP STUFF
         */
        const videoTexture = new THREE.VideoTexture(this.ARToolkitSource.domElement);
        videoTexture.minFilter = THREE.LinearFilter;
        this.scene.add(this.cameraCube);
        this.sphereMeshEnv = new THREE.Mesh(new THREE.SphereBufferGeometry(10, 32, 32), new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide }));
        this.scene.add(this.sphereMeshEnv);

        const boilerplateCubeGeo = new THREE.BoxBufferGeometry(1,1,1);
        const boilerplateCubeMat = new THREE.MeshPhongMaterial({ color: 0x44ff44 });
        const boilerplateCube = new THREE.Mesh(boilerplateCubeGeo, boilerplateCubeMat);
        boilerplateCube.position.y = 0.5;
        this.markerGrid.add(boilerplateCube);
        
        /** Add grid to the smooth marker controls */
        this.marker.smoothedRoot.add(this.markerGrid);

        this.light.lookAt(this.markerGrid.position)
            /** Add the camera and marker configuration to the scene */
        this.scene.add(this.camera);
        this.scene.add(this.light);
        this.scene.add(hemiLight);
        this.scene.add(this.marker.mainRoot);
        this.scene.add(this.marker.smoothedRoot);

        // this.controls = new Controls(this.markerGrid, this.camera, this.renderer);

        /** Add event listeners for screen resizing */
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

    }

    // beginAnimation() {
    //         // this.isAnimating = true;
    //     this.animations.doorLeft.start();
    //     this.animations.doorRight.start();
    //     this.animations.hole.start();
    //     this.animations.shine.start();
    //     this.animations.shineEmissive.start()

    //     this.animations.logoRaise.start();
    // }

    /**
     * @function: animate
     * @param {Number} timestamp: Used to measure the progress of time, a frame counter
     * Used to call upon the render function continuously so a new frame can be drawn
     * allowing for animation
     */
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.time.delta = this.time.clock.getDelta();
        this.time.total += this.time.delta;

        this.update();
        this.renderer.render(this.scene, this.camera);
    }

    /**
     * @function: update()
     * Is called from the animation loop and updates various controls and live statistics
     * on each frame.
     */
    update() {
        TWEEN.update();

        /** FPS counter */
        if (devMode) this.stats.update();
        if (devMode !== constants.devMode) this.initDevFeatures();

        // if (this.activeMode !== constants.activeMode) this.resetScene();
        // if (this.activeMode === 'Animated' && this.logo.isLoaded && !this.animations.logoRaise) this.addAnimationForLogo()

        //  Update the environment map
        this.sphereMeshEnv.visible = true;
        this.cameraCube.update(this.renderer, this.scene);
        this.sphereMeshEnv.visible = false;

        /** AR Marker tracking */
        if (this.ARToolkitSource.ready !== false)
            this.ARToolkitContext.update(this.ARToolkitSource.domElement);
        this.marker.smoothedControls.update(this.marker.mainRoot);
    }

}

export default Core;
