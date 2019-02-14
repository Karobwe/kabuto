const Village = require("./src/Village");
const Shinobi = require("./src/Shinobi");
const Jutsu = require("./src/Jutsu");

let karin = new Shinobi("Karin", "Assist");

karin.addJutsu(new Jutsu(
    "Perfume Spray", 
    "Diminue aléatoirement l'attaque de/des ennemis , ou la défense ou l'esquive ou le taux de critique, peu aussi infligé ralentissement",
    "Release",
    3
));

karin.addJutsu(new Jutsu(
    "Medical Ninjutsu", 
    "Restaure les points de vie de tous les alliés sur la même zone ",
    "Normal",
    3
));

karin.addJutsu(new Jutsu(
    "Chakra Control (Agility)", 
    "Augmente la rapidité de mouvements des alliés sur la même zone (Effet: faible)",
    "Normal",
    4
));

let oto = new Village([karin]);

console.log(JSON.stringify(karin, null, 3))