class Shinobi {
    
    constructor(name, type, jutsu = []) {
        this.name = name;
        this.type = type;
        this.jutsu = jutsu;
    }

    addJutsu(jutsu) {
        let finded = false;
        this.jutsu.forEach(element => {
            if(element.name == jutsu.name) {
                // console.log(`Le jutsu "${jutsu.name}" existe déjà, il vas être mis à jours`);
                finded = true;
                element.name = jutsu.name;
                element.description = jutsu.description;
                element.nature = jutsu.nature;
                element.stars = jutsu.stars;
                element.isUltime = jutsu.isUltime;
            }
        });

        if(!finded) {
            this.jutsu.push(jutsu);
        }
    }

    get typeIcon() {
        switch (this.type) {
            case "attaque":
                return "https://totsuka.fr/wp-content/uploads/2018/10/attk.png";

            case "defense":
                return "https://totsuka.fr/wp-content/uploads/2018/10/def.png";

            case "skill":
                return "https://totsuka.fr/wp-content/uploads/2018/10/skill.png";

            case "support":
                return "https://totsuka.fr/wp-content/uploads/2018/10/support.png";
            
            case "utilitaire":
                return "https://totsuka.fr/wp-content/uploads/2018/10/utilitaire.png";
        
            default:
                return null;
        }
    }

    getAllJutsu(nature) {
        let str = "";
        this.jutsu.forEach(j => {
            if(j.nature.trim().toLowerCase() === nature) {
                if(j.isUltime) {
                    str = j.name + " 🌟\n" + str; // On met les ulti en premier
                } else {
                    str += j.name + "\n";
                }
            }
        });

        if(str === "") return undefined;
        return str.trim();
    }
}

module.exports = Shinobi;