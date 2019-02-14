class Jutsu {
    
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
    
    get natureColor() {
        switch (this.nature) {
            //          HEX            RGB
            case "annihilation":
                return 	5127339;    //"#4e3cab"
            case "impact":
                return 	13487368;   // "#cdcd08"
            case "manipulation":
                return 	10118656;   // "#9a6600"
            case "lunge":
                return 	13845553;   // "#d34431"
            case "normal":this.natureColor = null;
                return 	9605778;    // "#929292"
            case "release":
                return 	431194;     // "#06945a"
            default:
                return null;
        }
    }

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
