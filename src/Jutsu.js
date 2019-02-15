class Jutsu {
    
    /**
     * 
     * @param {string} name Nom du jutsu
     * @param {string} description 
     * @param {string} nature Nature du jutsu
     * @param {int} stars Nombre d'étoile de base de la carte
     */
    constructor(name, description, nature = "normal", stars = 1) {
        this.name = name;
        this.description = description;
        nature = nature.toLowerCase();
        nature = nature.charAt(0).toUpperCase() + nature.slice(1);
        this.nature = nature;
        
        if ([1,2,3,4,5,6].includes(stars)) {
            this.stars = stars;
            if(this.stars >= 5){
                this.isUltime = true;
            } else {
                this.isUltime = false;
            }
        } else {
            this.stars = 1;
        }
        
    }

    /**
     * Obtenir l'URL de l'icône de la nature du jutsu courant
     * @returns {string}
     * @example 
     * let rasengan = new Jutsu("Rasengan");
     * rasengan.natureIcon();
     */
    get natureIcon() {
        switch (this.nature) {
            case "annihilation":
                return "https://totsuka.fr/wp-content/uploads/2018/10/annihilation.png";
            case "impact":
                return "https://totsuka.fr/wp-content/uploads/2018/10/impact.png";
            case "manipulation":
                return "https://totsuka.fr/wp-content/uploads/2018/10/manipulation.png";
            case "lunge":
                return "https://totsuka.fr/wp-content/uploads/2018/10/lunge.png";
            case "normal":
                return "https://totsuka.fr/wp-content/uploads/2018/10/normal.png";
            case "release":
                return "https://totsuka.fr/wp-content/uploads/2018/10/release.png";
            default:
                return null;
        }
    }
    
    /**
     * Obtenir la couleur de la nature du jutsu courant
     * @returns {ColorResolvable}
     */
    get natureColor() {
        switch (this.nature) {
            case "annihilation":
                return 	5127339;
            case "impact":
                return 	13487368;
            case "manipulation":
                return 	10118656;
            case "lunge":
                return 	13845553;
            case "normal":this.natureColor = null;
                return 	9605778;
            case "release":
                return 	431194;
            default:
                return null;
        }
    }

    /**
     * Obtenir l'URL de l'icone d'un type de jutsu
     * @param {string} nature 
     * @returns {string}
     * @example 
     * Jutsu.getNatureIcon("lunge");
     */
    static getNatureIcon(nature) {
        switch (nature) {
            case "annihilation":
                return "https://totsuka.fr/wp-content/uploads/2018/10/annihilation.png";
            case "impact":
                return "https://totsuka.fr/wp-content/uploads/2018/10/impact.png";
            case "manipulation":
                return "https://totsuka.fr/wp-content/uploads/2018/10/manipulation.png";
            case "lunge":
                return "https://totsuka.fr/wp-content/uploads/2018/10/lunge.png";
            case "normal":
                return "https://totsuka.fr/wp-content/uploads/2018/10/normal.png";
            case "release":
                return "https://totsuka.fr/wp-content/uploads/2018/10/release.png";
            default:
                return null;
        }
    }

    /**
     * Obtenir la couleur d'une nature de jutsu en particulier
     * @param {string} nature 
     * @example
     * Jutsu.getNatureColor("lunge");
     * @returns {ColorResolvable}
     */
    static getNatureColor(nature) {
        switch (nature) {
            case "annihilation":
                return 	5127339;
            case "impact":
                return 	13487368;
            case "manipulation":
                return 	10118656;
            case "lunge":
                return 	13845553;
            case "normal":
                return 	9605778;
            case "release":
                return 	431194;
            default:
                return null;
        }
    }
}


module.exports = Jutsu;
