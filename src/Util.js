module.exports = {
    toTitleCase: (str) => {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    },

    reactionControls: {
        NEXT_PAGE: '▶',
        PREV_PAGE: '◀',
        STOP: '⏹',
    }
}
