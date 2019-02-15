class Shinobi {
    
    /**
     * Objet liant un personnage avec ses jutsu
     * @param {string} name Nom du personnage
     * @param {string} type Le type du personnage (attaque, défense, ...)
     * @param {Jutsu} jutsu Liste des jutsu du personnage
     */
    constructor(name, type, jutsu = []) {
        this.name = name;
        this.type = type;
        this.jutsu = jutsu;
    }

    /**
     * Ajoute ou met à jour un jutsu au personnage
     * @param {Jutsu} jutsu Le nouvel jutsu à ajouter
     */
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

    /**
     * @returns {string} URL vers l'icone représantant le type du personnage
     */
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

    /**
     * Renvoie tout les jutsu du personnage qui appartiennent au type donnée en paramètre
     * @param {string} nature Le type de jutsu qu'on recherche
     * @returns {string}
     */
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