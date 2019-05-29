
/** 
 * Versioning
 * Major.Minor.Patch 
 */
const version = "0.2.5";
const CACHE = 'OvatoAR';

console.log(`\x1b[31mOvatoAR v${version}\x1b[0m`);

/**
 * @event install
 * Stores all the assets in the users cache. If one of the assets can't be
 * loaded, the entire operation fails
 */
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      /** 
       * COMMAND FOR FULL LIST: find ./build -type f 
       * Remove the .DS_STORE files if the exist
       * The list should include:
       *    - /index.html
       *    - /main.min.js
       *    - /style/main.css
       *    - everything under the /assets/ directory
       * 
       * It should not include
       *    - .DS_STORE files
       *    - manifest.json
       *    - /sw.js
       */
      return cache.addAll([
        '/index.html',
        '/main.min.js',
        '/style/main.css',

        /** Bankers Lamo */
        // '/assets/3D/Lamp/textures/DefaultMaterial_normal.png',
        // '/assets/3D/Lamp/textures/DefaultMaterial_baseColor.png',
        // '/assets/3D/Lamp/textures/DefaultMaterial_metallicRoughness.png',
        // '/assets/3D/Lamp/scene.gltf',
        // '/assets/3D/Lamp/thumbnail.png',
        // '/assets/3D/Lamp/scene.bin',
        
        /** BoomBox */
        // '/assets/3D/BoomBox/BoomBox_diffuse.png',
        // '/assets/3D/BoomBox/BoomBox_roughnessMetallic.png',
        // '/assets/3D/BoomBox/BoomBox.gltf',
        // '/assets/3D/BoomBox/BoomBox_diffuse_red.png',
        // '/assets/3D/BoomBox/BoomBox.bin',
        // '/assets/3D/BoomBox/BoomBox_specularGlossiness.png',
        // '/assets/3D/BoomBox/BoomBox_normal.png',
        // '/assets/3D/BoomBox/thumbnail.jpg',
        // '/assets/3D/BoomBox/BoomBox_baseColor.png',
        // '/assets/3D/BoomBox/BoomBox_occlusion.png',
        // '/assets/3D/BoomBox/BoomBox_emissive.png',

        /** Water Bottle */
        // '/assets/3D/WaterBottle/WaterBottle_occlusion.png',
        // '/assets/3D/WaterBottle/WaterBottle.gltf',
        // '/assets/3D/WaterBottle/WaterBottle_emissive.png',
        // '/assets/3D/WaterBottle/WaterBottle_baseColor.png',
        // '/assets/3D/WaterBottle/screenshot.jpg',
        // '/assets/3D/WaterBottle/WaterBottle.bin',
        // '/assets/3D/WaterBottle/WaterBottle_diffuse.png',
        // '/assets/3D/WaterBottle/WaterBottle_roughnessMetallic.png',
        // '/assets/3D/WaterBottle/WaterBottle_normal.png',
        // '/assets/3D/WaterBottle/WaterBottle_specularGlossiness.png',

        /** Hercules Bust */
        // '/assets/3D/Hercules/thumbnail.png',
        // '/assets/3D/Hercules/hercules.gltf',
        // '/assets/3D/Hercules/hercules.bin',

        /** Morpheus/Oxford chair */
        '/assets/3D/Morpheus/Oxford_Tub_Chair.mtl',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Casters_baseColor.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Seat_glow.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Tacks_normal.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Seat_roughness.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Legs_roughness.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Legs_opacity.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Tacks_metallic.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Tacks_roughness.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Seat_opacity.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Legs_glow.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Legs_metallic.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Seat_metallic.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Seat_normal.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Casters_opacity.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Tacks_opacity.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Casters_glow.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Tacks_glow.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Tacks_baseColor.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Casters_metallic.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Legs_normal.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Casters_normal.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Seat_baseColor.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Legs_baseColor.png',
        '/assets/3D/Morpheus/Oxford_Tub_Chair/Oxford_Tub_Chair_Casters_roughness.png',
        // '/assets/3D/Morpheus/Oxford_Tub_Chair.obj',
        // '/assets/3D/Morpheus/Oxford_Tub_Chair.mdl',
        '/assets/3D/Morpheus/Oxford_Tub_Chair.gltf',

        /** Pillow */
        // '/assets/3D/Pillow/Tex/04_tessuto.jpg',
        // '/assets/3D/Pillow/PillowOBJ.obj',

        /** Fatboy */
        '/assets/3D/Fatboy/Pouf_Fatboy.obj',
        '/assets/3D/Fatboy/Pouf_Fatboy.mtl',

        /** Bird Lamp */
        // '/assets/3D/BirdLamp/3d_model_marinas_birds.mtl',
        // '/assets/3D/BirdLamp/Pletenka_bump.jpg',
        // '/assets/3D/BirdLamp/3d_model_marinas_birds.obj',
        // '/assets/3D/BirdLamp/oak_wood.jpg',


        '/assets/icons/Ovato-Logo-192.png',
        '/assets/icons/Ovato-Logo-512.png',
        '/assets/icons/Ovato-Logo-32.png',
        '/assets/data/ovato-50-marker.patt',
        '/assets/data/camera_para.dat',
        '/assets/vendor/three.min.js',
        '/assets/vendor/libs/jsartoolkit5/artoolkit.api.js',
        '/assets/vendor/libs/jsartoolkit5/artoolkit.min.js',
        '/assets/vendor/libs/stats.min.js',
        '/assets/vendor/libs/threex/ARToolkitContext.js',
        '/assets/vendor/libs/threex/ARBaseControls.js',
        '/assets/vendor/libs/threex/ARSmoothControls.js',
        '/assets/vendor/libs/threex/ARMarkerControls.js',
        '/assets/vendor/libs/threex/ARToolkitSource.js',
        '/assets/vendor/controls/DragControls.js',
        '/assets/vendor/loaders/GLTFLoader.js',
        '/assets/vendor/loaders/OBJLoader.js',

      ]);
    })
  );
});

/**
 * @event fetch
 */
self.addEventListener('fetch', function (event) {

  event.respondWith(
    caches.match(event.request.url).then(function (response) {
      console.log("event.request", event.request);
      console.log("cache response", response);

      if(response) {
        console.log("getting assets from cache");
        return response; 
      }
      else {
        console.log("getting assets from bucket");
        return fetch(event.request)
          .then(res => {
            return caches.open(CACHE)
              .then(cache => {
                console.log("updating cache", res);
                cache.put(event.request.url, res.clone());
                return res;
              });
          }).catch(err => {
            console.log("Error during fetch event", err);
          });
      }
    })
  );

});


self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

