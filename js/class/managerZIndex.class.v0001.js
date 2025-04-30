class ManagerZIndex {
    constructor() {}

    init() {
        this.map = new Map();
    }

    add(device) {
        if (typeof device.getID !== 'function') {
            throw new Error('Device must implement getID method');
        }

        if (typeof device.getZIndex !== 'function') {
            throw new Error('Device must implement getZIndex method');
        }

        if (typeof device.setZIndex !== 'function') {
            throw new Error('Device must implement setZIndex method');
        }

        this.map.set(device.getID(), device);
    }
}
