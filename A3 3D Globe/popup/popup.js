let animalData = [
  {
    id: 1,
    Country: "Indonesia",
    Species1: "Javan Rhino",
    Information1:
      "Javan rhinos, once widespread in Southeast Asia, now face near-extinction with just around 75 remaining on Java Island, Indonesia's Ujung Kulon National Park. Threatened by habitat loss due to Arenga palm invasion, they are also vulnerable to natural disasters, disease, poaching, and inbreeding, making their survival a daunting challenge.",
    Image1: "rhino.png",
    Population1: "75\ufffd",
    Species2: "Sunda Island Tiger",
    Information2:
      "The Sunda Island tiger, the world's smallest tiger subspecies, weighs up to 140kg. With only about 600 remaining, they're exclusive to Sumatra, Indonesia. Southeast Asia's rising human population, which nearly doubled since the 1980s, threatens tiger habitats, increasing human-tiger conflicts. Poaching and illegal trade in tiger parts also jeopardize their survival.",
    Population2: "600\ufffd",
    Image2: "tiger.png",
    "": "",
    __1: "",
  },
  {
    id: 2,
    Country: "Central Africa",
    Species1: "Mountain Gorillas",
    Information1:
      "Mountain gorillas, a subspecies of eastern gorillas, inhabit isolated high-altitude forests in the Democratic Republic of Congo, Rwanda, Uganda, and Uganda's Bwindi Impenetrable National Park. The Virunga Landscape, marked by instability and poverty, threatens these gorillas as people encroach on their habitat. Despite challenges, conservation efforts offer hope for their recovery, but with just over 1,000 individuals in the wild, they remain endangered.",
    Image1: "gorilla.png",
    Population1: 1000,
    Species2: "",
    Information2: "",
    Population2: "",
    Image2: "",
    "": "",
    __1: "",
  },
  {
    id: 3,
    Country: "China",
    Species1: "Yangtze Finless Porpoise",
    Information1:
      "The Yangtze Finless Porpoise is the sole freshwater porpoise globally, residing in China's Yangtze River and critically endangered. Environmental degradation, overfishing, and pollution harm its habitat. Once, Yangtze river dolphins coexisted but haven't been seen for two decades. To protect them, China upgraded their protection status in 2021, with around 1,000 individuals stabilizing in the wild as of 2018.",
    Image1: "porpoise.png",
    Population1: "2000\ufffd",
    Species2: "Yangtze giant softshell turtle",
    Information2:
      "The Yangtze giant softshell turtle, critically endangered, is on the brink of extinction, with only two confirmed individuals globally. These turtles can grow over 100 cm in carapace length, live for more than a century, and remarkably, females can remain fertile at over 90 years old, emphasizing the urgency of conservation efforts.",
    Population2: "2 male (unconfirmed)",
    Image2: "soft.png",
    "": "",
    __1: "",
  },
  {
    id: 4,
    Country: "Russia China",
    Species1: "Amur Leopard",
    Information1:
      "The Amur leopard is one of Earth's rarest big cats. Despite a stable and growing population, they remain critically endangered since 1996. Restricted to a small region in Russia and China, they battle habitat loss, prey scarcity, and roads, but some hope lies in protected areas.",
    Image1: "leopard.png",
    Population1: "120\ufffd",
    Species2: "",
    Information2: "",
    Population2: "",
    Image2: "",
    "": "",
    __1: "",
  },
  {
    id: 5,
    Country: "USA",
    Species1: "Vaquita\ufffd",
    Information1:
      "The vaquita is a species of porpoise endemic to the northern end of the Gulf of California in Baja California, Mexico. Reaching a maximum body length of 150 cm or 140 cm, it is the smallest of all living cetaceans",
    Image1: "vaquita.png",
    Population1: 10,
    Species2: "",
    Information2: "",
    Population2: "",
    Image2: "",
    "": "",
    __1: "",
  },
  {
    id: 6,
    Country: "India",
    Species1: "Asiatic lion",
    Information1:
      "The Asiatic lion, smaller than its African counterparts and known for its distinct features like a larger tail tuft and belly fold, historically ranged across southwest Asia to eastern India. Today, this endangered species is confined to India, mainly in Gujarat's Gir National Park, with a population of only 500-650 individuals. However, they face threats from illegal electrical fences and open wells in the region, endangering their survival.",
    Image1: "lion.png",
    Population1: "500-650",
    Species2: "",
    Information2: "",
    Population2: "",
    Image2: "",
    "": "",
    __1: "",
  },
];

// let animal = document.getElementById("animal");
// let generateanimal = () => {
//   return (animal.innerHTML = animalData
//     .map((x) => {
//       let {
//         id,
//         Country,
//         Species1,
//         Information1,
//         Image1,
//         Population1,
//         Species2,
//         Information2,
//         Population2,
//         Image2,
//       } = x;
//       return `
//       <div class="popup2-content" id=${id}>
//       <div>Country Selected: ${Country}</div>
//       <img class="image" src=${Image1}
//       <div>The most endangered animal of this country is the ${Species1}</div>
//      <div>Population in the Wild: ${Population1}</div>
//      <div>${Information1}</div>
//     </div>

//       <img class="image" src=${Image2}
//       <p>The most endangered animal of this country is the ${Species2}</p>
//      <p>Population in the Wild: ${Population2}</p>
//      <p>${Information2}</p>
//     </div>
//       `;
//     })
//     .join(""));
// };

// generateanimal();

// Function to update the popup content based on the selected country ID
function updatePopupContent(countryId) {
  // Find the country data based on the ID
  const countryData = animalData.find((country) => country.id === countryId);

  if (countryData) {
    // Get a reference to the popup container element
    const popupContainer = document.getElementById("animal");

    // Replace placeholders with actual data
    popupContainer.innerHTML = `
      <div class="popup2-content" id="${countryData.id}">
        <div>Country Selected: ${countryData.Country}</div>
        <img class="image" src="${countryData.Image1}" />
        <div>
          The most endangered animal of this country is the ${countryData.Species1}
        </div>
        <div>Population in the Wild: ${countryData.Population1}</div>
        <div>${countryData.Information1}</div>

        <img class="image" src="${countryData.Image2}" />
        <p>The most endangered animal of this country is the ${countryData.Species2}</p>
        <p>Population in the Wild: ${countryData.Population2}</p>
        <p>${countryData.Information2}</p>
      </div>
    `;

    // Show the popup (you may need to define CSS styles or use a library for this)
    popupContainer.style.display = "block";
  } else {
    console.log("Country not found in the JSON data.");
  }
}

// Add event listeners to the buttons
document.getElementById("button1").addEventListener("click", function () {
  updatePopupContent(1); // Update the popup with data for Country 1
});

document.getElementById("button2").addEventListener("click", function () {
  updatePopupContent(2); // Update the popup with data for Country 2
});

// Add event listeners for other buttons as needed
