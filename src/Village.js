class Village {
    /**
     * Objet contenant une liste des personnages
     * @param  {Array<Shinobi>?} shinobis Listes des personnages à ajouter
     */
    constructor(...shinobis) {
        this.members = [];
        for(let i = 0; i < arguments.length; i++) {
            this.members.push(arguments[i]);
        }
    }

    /**
     * Ajoute un personnage ou le met à jours si il existe déjà
     * @param {Shinobi} shinobi 
     */
    addShinobi(shinobi) {
        let finded = false;

        this.members.forEach(member => {
            if(member.name == shinobi.name.trim()) {
                // console.log(`Le personnage "${shinobi.name}" existe déjà, il vas être mis à jours`);
                finded = true;
                member.name = shinobi.name;
                member.type = shinobi.type;
                
                shinobi.jutsu.forEach(jutsu => {
                    member.addJutsu(jutsu);
                });
            }
        });

        if(!finded) {
            this.members.push(shinobi);
        }
    }

    /**
     * Récupère un personnage
     * @param {string} name Nom du personnage rechercher
     * @returns {Shinobi}
     */
    getShinobi(name) {
        let character = undefined;
        this.members.forEach(shinobi => {
            if(shinobi.name.toLowerCase() === name.toLowerCase()) {
                character = shinobi;
            }
        });
        return character;
    }
}

module.exports = Village;
