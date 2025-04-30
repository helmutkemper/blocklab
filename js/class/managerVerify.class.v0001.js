// ManagerVerify Checks all the necessary methods for the operation of the device
class ManagerVerify {

    // Add Adds the devices to verify the necessary methods
    add(device) {
        if (typeof device.getID !== 'function') {
            throw new Error('Device must implement getID method.\n' +
                '\n' +
                'This method should return the device ID.');
        }

        if (typeof device.getZIndex !== 'function') {
            throw new Error('Device must implement getZIndex method.\n' +
                '\n' +
                'This method should return the device zIndex in numerical form.');
        }

        if (typeof device.setZIndex !== 'function') {
            throw new Error('Device must implement setZIndex method.\n' +
                '\n' +
                'This method should set the device zIndex in numerical form.');
        }

        if (typeof device.getRect !== 'function') {
            throw new Error('Device must implement getRect method.\n' +
                '\n' +
                'This method should return the device rectangle using DOM method getBoundingClientRect().');
        }

        if (typeof device.collisionTotalEvent !== 'function') {
            throw new Error('Device must implement collisionTotalEvent method.\n' +
                '\n' +
                'This method should handle the collision event.');
        }

        if (typeof device.collisionPartialEvent !== 'function') {
            throw new Error('Device must implement collisionPartialEvent method.\n' +
                '\n' +
                'This method should handle the collision event.');
        }
    }
}
