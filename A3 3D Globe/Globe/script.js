import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.min.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.0/examples/jsm/controls/OrbitControls.js";

const demo = document.querySelector(".demo");
const container = document.querySelector(".animation-wrapper");
const globeCanvas = container.querySelector("#globe-3d");
const globeOverlayCanvas = container.querySelector("#globe-2d-overlay");
const popup = container.querySelector(".globe-popup");

document.addEventListener("DOMContentLoaded", () => {
  gsap.set(demo, {
    height: window.innerHeight,
  });

  let surface = new Surface();

  new THREE.TextureLoader().load(
    "https://ksenia-k.com/img/threejs/earth-map.jpeg",
    (mapTex) => {
      surface.earthTexture = mapTex;
      surface.earthTexture.repeat.set(1, 1);
      surface.earthTextureData = surface.getImageData();
      surface.createGlobe();
      surface.addAnchor();
      surface.addCanvasEvents();
      surface.updateDotSize();
      surface.loop();
    }
  );

  window.addEventListener(
    "resize",
    () => {
      gsap.set(demo, {
        height: window.innerHeight,
      });

      surface.updateSize();
      surface.setupOverlayGraphic();
      surface.updateDotSize();
      surface.addCanvasEvents();
    },
    false
  );

  gsap.to(".title", {
    delay: 8,
    duration: 0.2,
    opacity: 1,
  });

  // Initialize Three.js variables
  let camera, controls;

  // Wait for the globe to load
  new THREE.TextureLoader().load(
    "https://ksenia-k.com/img/threejs/earth-map.jpeg",
    (mapTex) => {
      surface.earthTexture = mapTex;
      surface.earthTexture.repeat.set(1, 1);
      surface.earthTextureData = surface.getImageData();
      surface.createGlobe();
      surface.addAnchor();
      surface.addCanvasEvents();
      surface.updateDotSize();
      surface.loop();

      // Set up camera and controls
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 2;
      controls = new OrbitControls(camera, globeCanvas);
      controls.enablePan = true;
      controls.enableZoom = false;
      controls.enableDamping = true;
      controls.minPolarAngle = 0.4 * Math.PI;
      controls.maxPolarAngle = 0.4 * Math.PI;
      controls.autoRotate = false;
    }
  );
});

class Surface {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: globeCanvas,
      alpha: true,
    });
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 2);

    this.camera.position.z = 1.1;
    this.updateSize();

    this.rayCaster = new THREE.Raycaster();
    this.rayCaster.far = 1.15;
    this.mouse = new THREE.Vector2();
    this.coordinates2D = [0, 0];

    this.setupOverlayGraphic();
    this.createOrbitControls();

    this.clock = new THREE.Clock();
    this.clickTime = 0;

    this.group = new THREE.Group();
    this.group.scale.setScalar(0.9);
    this.scene.add(this.group);

    this.selectionVisible = false;
  }

  createOrbitControls() {
    this.controls = new OrbitControls(this.camera, globeCanvas);
    this.controls.enablePan = true;
    this.controls.enableZoom = false;
    this.controls.enableDamping = true;
    this.controls.minPolarAngle = 0.4 * Math.PI;
    this.controls.maxPolarAngle = 0.4 * Math.PI;
    this.controls.autoRotate = true;
  }

  createGlobe() {
    const globeGeometry = new THREE.IcosahedronGeometry(1, 14);
    this.mapMaterial = new THREE.ShaderMaterial({
      vertexShader: document.getElementById("vertex-shader-map").textContent,
      fragmentShader: document.getElementById("fragment-shader-map")
        .textContent,
      uniforms: {
        u_visibility: { type: "t", value: this.earthTexture },
        u_size: { type: "f", value: 0 },
        u_color_main: { type: "v3", value: new THREE.Color(0xc1c1c2) },
        u_clicked: { type: "v3", value: new THREE.Vector3(0.0, 0.0, 1) },
        u_time_since_click: { value: 3 },
      },
      alphaTest: false,
      transparent: true,
    });

    const globe = new THREE.Points(globeGeometry, this.mapMaterial);
    this.group.add(globe);

    this.blackGlobe = new THREE.Mesh(
      globeGeometry,
      new THREE.MeshBasicMaterial({
        color: 0x2c2c2e,
        transparent: true,
        opacity: 0.2,
      })
    );
    this.blackGlobe.scale.setScalar(0.99);
    this.group.add(this.blackGlobe);
  }

  addAnchor() {
    const geometry = new THREE.SphereGeometry(0.02, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x09914f,
      transparent: true,
      opacity: 1,
    });
    this.anchor = new THREE.Mesh(geometry, material);
    this.group.add(this.anchor);
  }

  setupOverlayGraphic() {
    this.overlayCtx = globeOverlayCanvas.getContext("2d");
    this.overlayCtx.strokeStyle = "#09914f";
    this.overlayCtx.lineWidth = 5;
    this.overlayCtx.lineCap = "round";
  }

  updateOverlayGraphic() {
    if (this.anchor) {
      let activePointPosition = this.anchor.position.clone();
      activePointPosition.applyMatrix4(this.group.matrixWorld);
      const activePointPositionProjected = activePointPosition.clone();
      activePointPositionProjected.project(this.camera);
      this.coordinates2D[0] =
        (activePointPositionProjected.x + 1) * container.offsetWidth * 0.5;
      this.coordinates2D[1] =
        (-activePointPositionProjected.y + 1) * container.offsetHeight * 0.5;

      const matrixWorldInverse = this.controls.object.matrixWorldInverse;
      activePointPosition.applyMatrix4(matrixWorldInverse);

      if (activePointPosition.z > -1) {
        if (this.selectionVisible === false) {
          this.selectionVisible = true;
          this.showPopupAnimation(false);
        }

        let popupX = this.coordinates2D[0];
        let popupY = this.coordinates2D[1];
        popupX -= activePointPositionProjected.x * container.offsetWidth * 0.3;
        const upDown = activePointPositionProjected.y > 0.6;
        popupY += upDown ? 20 : -20;
        gsap.set(popup, {
          x: popupX,
          y: popupY,
          xPercent: -50,
          yPercent: upDown ? 0 : -100,
        });

        popupY += upDown ? -10 : 10;
        const curveStartX = this.coordinates2D[0];
        const curveStartY = this.coordinates2D[1];
        let curveMidX = popupX + activePointPositionProjected.x * 100;
        const curveMidY =
          popupY + (upDown ? -0.5 : 0.1) * this.coordinates2D[1];

        this.drawPopupConnector(
          curveStartX,
          curveStartY,
          curveMidX,
          curveMidY,
          popupX,
          popupY
        );
      } else {
        if (this.selectionVisible) {
          this.hidePopupAnimation();
        }
        this.selectionVisible = false;
      }
    }
  }

  addCanvasEvents() {
    container.addEventListener("mousemove", (e) => {
      updateMousePosition(e.clientX, e.clientY, this);
    });

    function updateMousePosition(eX, eY, surface) {
      const x = eX - container.offsetLeft;
      const y = eY - container.offsetTop;
      surface.mouse.x = (x / container.offsetWidth) * 2 - 1;
      surface.mouse.y = -(y / container.offsetHeight) * 2 + 1;
    }

    container.addEventListener("click", (e) => {
      updateMousePosition(
        e.targetTouches ? e.targetTouches[0].pageX : e.clientX,
        e.targetTouches ? e.targetTouches[0].pageY : e.clientY,
        this
      );
      this.checkIntersects();
      if (this.landIsHovered) {
        const intersects = this.rayCaster.intersectObject(this.blackGlobe);
        if (intersects.length) {
          this.anchor.position.set(
            intersects[0].face.normal.x,
            intersects[0].face.normal.y,
            intersects[0].face.normal.z
          );
          this.mapMaterial.uniforms.u_clicked.value = this.anchor.position;
          popup.innerHTML = this.getLatLong();
          //     // <<<
          //           // Check if the clicked point is in India
          // const latitude = /* Calculate latitude of the clicked point */;
          // const longitude = /* Calculate longitude of the clicked point */;
          // if (isPointInIndia(latitude, longitude)) {
          //   // Point is in India, change its color
          //   this.mapMaterial.uniforms.u_color_main.value = new THREE.Color(0xFF0000); // Change color to red (you can use any color)
          // } else {
          //   // Point is outside India, keep the default color
          //   this.mapMaterial.uniforms.u_color_main.value = new THREE.Color(0xc1c1c2); // Default color
          // }

          //     // <<<

          this.showPopupAnimation(true);
          gsap.delayedCall(0.15, () => {
            this.clickTime = this.clock.getElapsedTime();
          });
        }
      }
    });
  }

  drawPopupConnector(startX, startY, midX, midY, endX, endY) {
    this.overlayCtx.clearRect(
      0,
      0,
      container.offsetWidth,
      container.offsetHeight
    );
    this.overlayCtx.beginPath();
    this.overlayCtx.shadowOffsetX = startX > endX ? -4 : 4;
    this.overlayCtx.moveTo(startX, startY);
    this.overlayCtx.quadraticCurveTo(midX, midY, endX, endY);
    this.overlayCtx.stroke();
  }

  showPopupAnimation(lifted) {
    let positionLifted = this.anchor.position.clone();
    if (lifted) {
      positionLifted.multiplyScalar(1.1);
    }
    gsap
      .timeline({})
      .fromTo(
        this.anchor.position,
        {
          x: positionLifted.x,
          y: positionLifted.y,
          z: positionLifted.z,
        },
        {
          duration: 0.35,
          x: this.anchor.position.x,
          y: this.anchor.position.y,
          z: this.anchor.position.z,
          ease: "back(4).out",
        },
        0
      )
      .to(
        this.anchor.material,
        {
          duration: 0.2,
          opacity: 1,
        },
        0
      )
      .fromTo(
        globeOverlayCanvas,
        {
          opacity: 0,
        },
        {
          duration: 0.3,
          opacity: 1,
        },
        0.15
      )
      .fromTo(
        popup,
        {
          opacity: 0,
          scale: 0.9,
          transformOrigin: "center bottom",
        },
        {
          duration: 0.1,
          opacity: 1,
          scale: 1,
        },
        0.15 + 0.1
      );
  }

  hidePopupAnimation() {
    gsap
      .timeline({})
      .to(
        this.anchor.material,
        {
          duration: 0.1,
          opacity: 0.2,
        },
        0
      )
      .to(
        globeOverlayCanvas,
        {
          duration: 0.15,
          opacity: 0,
        },
        0
      )
      .to(
        popup,
        {
          duration: 0.15,
          opacity: 0,
          scale: 0.9,
          transformOrigin: "center bottom",
        },
        0
      );
  }

  getImageData() {
    const image = this.earthTexture.image;
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
  }

  getLatLong() {
    const pos = this.anchor.position;
    const lat = 90 - (Math.acos(pos.y) * 180) / Math.PI;
    const lng =
      ((270 + (Math.atan2(pos.x, pos.z) * 180) / Math.PI) % 360) - 180;
    return lat.toFixed(6) + ",&nbsp;" + lng.toFixed(6);
  }

  checkIntersects() {
    let isLand = (imageData, x, y) => {
      x = Math.floor(x * imageData.width);
      y = Math.floor((1 - y) * imageData.height);
      const position = (x + imageData.width * y) * 4;
      const data = imageData.data;
      return data[position] < 100;
    };
    this.rayCaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.rayCaster.intersectObject(this.blackGlobe);
    if (intersects.length) {
      this.landIsHovered = isLand(
        this.earthTextureData,
        intersects[0].uv.x,
        intersects[0].uv.y
      );
      document.body.style.cursor = this.landIsHovered ? "pointer" : "auto";
    } else {
      document.body.style.cursor = "auto";
    }
  }

  render() {
    this.mapMaterial.uniforms.u_time_since_click.value =
      this.clock.getElapsedTime() - this.clickTime;
    this.updateOverlayGraphic();
    this.controls.update();
    this.checkIntersects();
    this.renderer.render(this.scene, this.camera);
  }

  loop() {
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  updateSize() {
    const minSide = 0.85 * Math.min(window.innerWidth, window.innerHeight);
    container.style.width = minSide + "px";
    container.style.height = minSide + "px";
    this.renderer.setSize(minSide, minSide);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.camera.updateProjectionMatrix();
    globeOverlayCanvas.width = minSide;
    globeOverlayCanvas.height = minSide;
  }

  updateDotSize() {
    this.mapMaterial.uniforms.u_size.value = 0.03 * container.offsetWidth;
  }
}

// Get the modals and buttons
const aboutModal = document.getElementById("about-modal");
const pageCreatorModal = document.getElementById("page-creator-modal");
const githubModal = document.getElementById("github-modal");

const aboutButton = document.getElementById("about-button");
const pageCreatorButton = document.getElementById("page-creator-button");
const githubButton = document.getElementById("github-button");

// When the user clicks a button, display the corresponding modal
aboutButton.addEventListener("click", () => {
  aboutModal.style.display = "block";
});

pageCreatorButton.addEventListener("click", () => {
  pageCreatorModal.style.display = "block";
});

githubButton.addEventListener("click", () => {
  githubModal.style.display = "block";
});

// When the user clicks the close button, close the modal
const closeButtons = document.getElementsByClassName("close");
for (const closeButton of closeButtons) {
  closeButton.addEventListener("click", () => {
    aboutModal.style.display = "none";
    pageCreatorModal.style.display = "none";
    githubModal.style.display = "none";
  });
}

// Close the modal when the user clicks outside of it
window.addEventListener("click", (event) => {
  if (event.target === aboutModal) {
    aboutModal.style.display = "none";
  }
  if (event.target === pageCreatorModal) {
    pageCreatorModal.style.display = "none";
  }
  if (event.target === githubModal) {
    githubModal.style.display = "none";
  }
});
// <!----->
// <!----->
// <!----->
// <!----->
// Sample JSON data (as provided previously)
const jsonData = [
  {
    id: 1,
    Country: "Indonesia",
    Species1: "Javan Rhino",
    Information1:
      "Javan rhinos, once widespread in Southeast Asia, now face near-extinction with just around 75 remaining on Java Island, Indonesia's Ujung Kulon National Park. Threatened by habitat loss due to Arenga palm invasion, they are also vulnerable to natural disasters, disease, poaching, and inbreeding, making their survival a daunting challenge.",
    Image1: "../assets/rhino.png",
    Population1: "75",
    Species2: "Sunda Island Tiger",
    Information2:
      "The Sunda Island tiger, the world's smallest tiger subspecies, weighs up to 140kg. With only about 600 remaining, they're exclusive to Sumatra, Indonesia. Southeast Asia's rising human population, which nearly doubled since the 1980s, threatens tiger habitats, increasing human-tiger conflicts. Poaching and illegal trade in tiger parts also jeopardize their survival.",
    Population2: "600",
    Image2: "../assets/tiger.png",
    "": "",
    __1: "",
  },
  {
    id: 2,
    Country: "Central Africa",
    Species1: "Mountain Gorilla",
    Information1:
      "Mountain gorillas, a subspecies of eastern gorillas, inhabit isolated high-altitude forests in the Democratic Republic of Congo, Rwanda, Uganda, and Uganda's Bwindi Impenetrable National Park. The Virunga Landscape, marked by instability and poverty, threatens these gorillas as people encroach on their habitat. Despite challenges, conservation efforts offer hope for their recovery, but with just over 1,000 individuals in the wild, they remain endangered.",
    Image1: "../assets/gorilla.png",
    Population1: 1000,
    Species2: "African Penguin",
    Information2:
      "In the realm of avian wonders, a common misconception prevails – that penguins solely grace the Arctic's icy domains. Yet, hidden in the southern reaches of Africa, a remarkable species, the African penguin, finds its home along Namibia and South Africa's coasts. Tragically, this charming species faces a precipitous decline. A myriad of challenges, from habitat loss and overfishing to perilous oil spills and warming ocean currents, have besieged them. Their population, as of 2021, stands at a mere 14,700 pairs, dwindling by a staggering 95% since the days before the industrial age. Furthermore, the guano harvest, prized as a potent fertilizer, has stripped their favored nesting havens, rendering them exposed to predators, scorching heat, rising tides, and the relentless march of the seas.",
    Population2: "14,700",
    Image2: "../assets/peng.webp",
    "": "",
    __1: "",
  },
  {
    id: 3,
    Country: "China",
    Species1: "Yangtze Finless Porpoise",
    Information1:
      "The Yangtze Finless Porpoise is the sole freshwater porpoise globally, residing in China's Yangtze River and critically endangered. Environmental degradation, overfishing, and pollution harm its habitat. Once, Yangtze river dolphins coexisted but haven't been seen for two decades. To protect them, China upgraded their protection status in 2021, with around 1,000 individuals stabilizing in the wild as of 2018.",
    Image1: "../assets/porpoise.png",
    Population1: "2000",
    Species2: "Yangtze giant softshell turtle",
    Information2:
      "The Yangtze giant softshell turtle, critically endangered, is on the brink of extinction, with only two confirmed individuals globally. These turtles can grow over 100 cm in carapace length, live for more than a century, and remarkably, females can remain fertile at over 90 years old, emphasizing the urgency of conservation efforts.",
    Population2: "2 male (unconfirmed)",
    Image2: "../assets/soft.png",
    "": "",
    __1: "",
  },
  {
    id: 4,
    Country: "Russia",
    Species1: "Amur Leopard",
    Information1:
      "The Amur leopard is one of Earth's rarest big cats. Despite a stable and growing population, they remain critically endangered since 1996. Restricted to a small region in Russia and China, they battle habitat loss, prey scarcity, and roads, but some hope lies in protected areas.",
    Image1: "../assets/leopard.png",
    Population1: "120",
    Species2: "Saiga Antelope",
    Information2:
      "The saiga, a petite antelope akin to a goat, measures 63-80cm in shoulder height and weighs 23-40kg. It boasts distinctive features such as a drooping proboscis nose and a unique 'up and down' running gait. Its coat, initially a light buff, thickens to white in winter, and males bear horns about 28-38cm long. Historically, saiga roamed Asia and Europe, forming vast herds, but post-Soviet Union dissolution, economic hardship led to increased hunting for food and trade, particularly to meet China's demand for saiga horn, resulting in a devastating 95% population decline over 15 years.",
    Population2: "842,000",
    Image2: "../assets/saiga.webp",
    "": "",
    __1: "",
  },
  {
    id: 5,
    Country: "USA",
    Species1: "Vaquita",
    Information1:
      "The vaquita is a species of porpoise endemic to the northern end of the Gulf of California in Baja California, Mexico. Reaching a maximum body length of 150 cm or 140 cm, it is the smallest of all living cetaceans",
    Image1: "../assets/vaquita.png",
    Population1: 10,
    Species2: "Florida Panther",
    Information2:
      "Florida panthers, a subspecies of mountain lions, are robust tan cats with tawny-beige fur covering most of their bodies, complemented by a whitish-gray belly, chest, and distinctive black markings on their tail tips, ears, and around the snout. They typically measure around six to seven feet (1.8 to 2.1 meters) in length, with males being larger than females. Distinguishing features include a crooked tail and a unique patch of fur on the back, resembling a cowlick. However, these traits result from inbreeding and genetic limitations, which have lessened as Florida panther populations have grown.",
    Population2: "100 to 200",
    Image2: "../assets/panther.webp",
    "": "",
    __1: "",
  },
  {
    id: 6,
    Country: "India",
    Species1: "Asiatic lion",
    Information1:
      "The Asiatic lion, smaller than its African counterparts and known for its distinct features like a larger tail tuft and belly fold, historically ranged across southwest Asia to eastern India. Today, this endangered species is confined to India, mainly in Gujarat's Gir National Park, with a population of only 500-650 individuals. However, they face threats from illegal electrical fences and open wells in the region, endangering their survival.",
    Image1: "../assets/lion.png",
    Population1: "500-650",
    Species2: "Blackbuck",
    Information2:
      "The blackbuck, or Indian antelope, once widespread, faces severe endangerment due to historic poaching for their pelts and habitat loss in India. In 1947, their population stood at around 80,000 but plummeted to 8,000 within two decades. Conservation efforts pushed numbers up to approximately 25,000, but ongoing threats like predation by stray dogs (which India has a high rate of), pesticides, and road traffic persist. Blackbucks are now found in small herds in India's open grasslands, dry scrub areas, and thinly forested regions. They have also been introduced in Argentina and the United States to bolster their numbers.",
    Population2: "25,000",
    Image2: "../assets/blackbuck.jpg",
    "": "",
    __1: "",
  },
];

// Function to populate <a> tags with IDs from JSON data
function populateLinks() {
  const links = document.querySelectorAll(".list.nigiri dd a");

  links.forEach((link, index) => {
    link.id = `country-${jsonData[index].id}`;

    // Add a click event listener to each link to show the popup
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const countryId = link.id.replace("country-", "");
      showPopup(countryId);
    });
  });
}

// Function to show the popup for a specific country
function showPopup(countryId) {
  const countryData = jsonData.find((country) => country.id == countryId);

  if (countryData) {
    const popupContainer = document.getElementById("popup-content");

    popupContainer.innerHTML = `
                    <div class="popup2-content" id="${countryData.id}">

                        <div class="info-title" >Country Selected: ${countryData.Country}</div>
                                                                    <img class="image" src="${countryData.Image1}" />

                          <div class="info-content">
                            The most endangered animal of this country is the ${countryData.Species1} 
                            <br><br>
                            Population in the Wild: ${countryData.Population1}
                            <br>                            <br>

                            ${countryData.Information1}
                          </div>
                        
                        <br>
                        <img class="image" src="${countryData.Image2}" />

                          <div class="info-content">
                            Another endangered animal of this country is the ${countryData.Species2}
                            <br><br>
                            Population in the Wild: ${countryData.Population2}
                            <br>                            <br>
                            ${countryData.Information2}
                          </div>
                    </div>
                `;

    // Show the popup
    popupContainer.style.display = "block";
  } else {
    console.log("Country not found in the JSON data.");
  }
}

// Call the function to populate the links and add click event listeners
populateLinks();

// <!---!>
