import writeToJson from "../writer";
const MAKES = [
  "Conn-Selmer",
  "brilhart",
  "dukoff",
  "otto link",
  "Selmer",
  "King",
  "Gregory",
  "Meyer",
  "Rico",
  "La Voz",
  "Conn",
  "Yanagisawa",
  "Hemke",
  "Yamaha",
  "Martin",
  "François Louis",
  "Berg Larsen",
  "Lawton",
  "Vandoren",
  "Rovner",
  "Runyon",
  "Keilwerth",
  "Dolnet",
  "Morgan",
  "LASax",
  "Yanigasawa",
  "Buescher",
  "Fibracane",
  "Rigotti",
  "Vibracane",
  "Cannonball"
];
const MODELS = [
  "New York",
  "super tone master",
  "Mark VI",
  "Super Action 80",
  "Super Action 80 Series II",
  "Super Action 80 Series III",
  "Super 20",
  "D7",
  "Reso Chamber",
  "Joe Allard",
  "Ebolin",
  "10M",
  "Four Star",
  "Balanced Action",
  "Super Balanced Action",
  "Custom 875",
  "Committee I",
  "Committee II",
  "Jazz Select",
  "New Wonder Transitional",
  "Plasticover",
  "Soloist",
  "SX90R"
];
const FINISHES = ["Black Lacquer", "Gold Plated", "Silver Plated", "Nickel"];
const STRENGTHS = ["Soft", "Medium", "Hard", "Medium Hard", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"];
const TIP_OPENINGS = ["10*", "3,43", "135", "4*", "0.71"];
const MATERIALS = ["Hard Rubber", "Silverite", "Metal", "stainless steel", "sterling silver", "wood", "plastic"];
const data = require("./materialified.json");

const checkForMake = ({ other, make, model, material }, index) => {
  const strength = STRENGTHS.find(theMake => other.toLowerCase().includes(theMake.toLowerCase()));
  if (strength) {
    return {
      make,
      model,
      material,
      strength,
      other: other
        .toLowerCase()
        .replace(strength.toLowerCase(), "")
        .trim()
    };
  }
  return {
    make,
    model,
    material,
    strength,
    other
  };
};
const newPlayers = data.players.map(player => {
  const newSetups = player.setups.map(setup => {
    return {
      voice: setup.voice,
      mouthpieces: setup.mouthpieces,
      reeds: setup.reeds && setup.reeds.map(checkForMake),
      saxophones: setup.saxophones
    };
  });
  return { setups: newSetups, firstName: player.firstName, lastName: player.lastName };
});

writeToJson({ players: newPlayers }, "./strengthified.json");
