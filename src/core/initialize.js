
const initialize = {
    /**
     * @function: configureRenderer
     * @returns: {Object}: renderer
     * sets up and configures the renderer object to be used in the
     * environment.
     */
    configureRenderer() {
      /**
      * AR.js uses a crazy wide clipping range on the cameras, as a result, z-fighting flickering occurs on
      * the rendered geometry. LogarithmicDepthBuffer eliminates the flicker! but at the cost of a lot of
      * sweet and precious frames per second :()
      */
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true });

        renderer.setClearColor(new THREE.Color('lightgrey'), 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        return renderer;
    },

    /**
     * @function: configureCamera
     * @returns: {Object}: camera
     * sets up and configures the camera object to be used in the
     * environment.
     */
    configureCamera() {
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1000);
        return camera;
    },

    configureLight() {
        /**
        *   Shadow map size must be a power of 2, the higher the value, the crisper the
        *   shadow and the more your GPU begs for mercy. Mix with radius to blur the edges
        *   mapsize of 512 with radius 5 is performant
        *   mapsize 1024 with radius 3 looks good but may be a bit much for mobile devices
        */
        const light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set(3, 2, 5);
        light.castShadow = true;
        light.shadow.mapSize.width = 512;
        light.shadow.mapSize.height = 512;

        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 90;

        light.shadow.camera.left = -20;
        light.shadow.camera.right = 20;
        light.shadow.camera.top = 20;
        light.shadow.camera.bottom = -20;


        return light;
    },

    configureARToolkitSource: () => new THREEx.ArToolkitSource({
        sourceType: 'webcam',
        // // resolution of at which we initialize the source image
        // sourceWidth: 1920,
        // sourceHeight: 1080,
        // // resolution displayed for the source
        // displayWidth: 1920,
        // displayHeight: 1080,
    }),

    configureARToolkitContext: () =>
        new THREEx.ArToolkitContext({
            cameraParametersUrl: 'assets/data/camera_para.dat',
            detectionMode: 'mono'
        }),

    configureTransformControls(camera, renderElement) {
        const control = new THREE.TransformControls(camera, renderElement);
        return control;
    },

    configureMarker(ARContext) {
        const mainRoot = new THREE.Group();
        const mainControls = new THREEx.ArMarkerControls(ARContext, mainRoot, {
            type: 'pattern', patternUrl: "assets/data/pattern-marker.patt",
        });

        const smoothedRoot = new THREE.Group();
        const smoothedControls = new THREEx.ArSmoothedControls(smoothedRoot, {
            lerpPosition: 0.8,
            lerpQuaternion: 0.8,
            lerpScale: 1,
            // minVisibleDelay: 1,
            // minUnvisibleDelay: 1,
        });

        const marker = { mainRoot, mainControls, smoothedRoot, smoothedControls };
        return marker;
    },

    configureTime() {
        const time = {
            clock: new THREE.Clock(),
            delta: 0,
            total: 0
        };
        return time;
    },

};

export default initialize;
