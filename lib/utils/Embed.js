class Embed {

    constructor() {
        this.embedObject = {};
    }

    /**
     * @param {stirng} title Embed title.
     */
    setTitle(title) {
        this.embedObject.title = title;
        return this;
    }

    /**
     * @param {string} desc The description of the embed.
     */
    setDescription(desc) {
        this.embedObject.description = desc;
        return this;
    }

    /**
     * @param {string} color The color of the embed, any you can choose.
     */
    setColor(color) {
        this.embedObject.color = color;
        return this;
    }
}

module.exports = Embed;