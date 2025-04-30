// Manager Concentrates all device managers in a single place
class Manager {
    constructor() {
        // Checks all the functions necessary for the operation of the device
        this.managerVerify = new ManagerVerify();

        // Manages the zIndex of the devices
        this.managerZIndex = new ManagerZIndex();
        this.managerZIndex.init();

        // Manages the collision of the devices
        this.managerCollision = new ManagerCollision();
    }

    // Add adds a device to the manager
    add(device) {
        this.managerVerify.add(device);
        this.managerZIndex.add(device);
        this.managerCollision.add(device);
    }
}
