import Item from './../schema/Item.js';

export default class ItemFactory {
    /**
     * @param {string} type
     * @param {string} name
     * @param {number} value
     * @param {array} dropsAt
     * @param {string} category
     * @param {object} stats
     * @return {Promise<boolean|module:mongoose>}
     */
    static async create(type, name, value, dropsAt, category, stats) {
        const item = new Item();

        item.name = name;
        item.type = type;
        item.dropsAt = dropsAt;
        item.value = value;
        item.category = category;
        item.stats = stats;

        const savedItem = await item.save();

        if (!savedItem) {
            return false;
        }

        return savedItem;
    }
}
