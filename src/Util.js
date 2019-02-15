module.exports = {
    /**
     * Transforme une chaine en minuscule sauf la premère lettre
     * @param {string} str
     */
    toTitleCase: (str) => {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    },

    reactionControls: {
        NEXT_PAGE: '▶',
        PREV_PAGE: '◀'
    },

    /**
     * Liste des commandes
     */
    natures: ["annihilation", "impact", "impacte", "manipulate", "manipulation", "lunge", "normal", "normale", "release"]
}
