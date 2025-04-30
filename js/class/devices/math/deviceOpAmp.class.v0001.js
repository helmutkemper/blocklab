class DeviceOpAmp extends Block {

    // Create the generic device
    // @param {HTMLElement} container - The container element where the device will be created
    // @param {string} id - The ID of the device
    // @param {number} x - The x position of the device
    // @param {number} y - The y position of the device
    constructor(container, id, x, y) {
        super(container, id);
        this.deviceID = id;
        this.x = x;
        this.y = y;

        this.defaultWidth = 50;
        this.defaultHeight = 50;
        this.horizontalMinimumSize = 100;
        this.verticalMinimumSize = 100;
    }

    // collisionPartialEvent is called when a collision is detected between two objects, but not fully inside
    // @param {object} collision - The collision object
    // @param {object} obj - The object that is colliding
    collisionPartialEvent(collision, obj) {
        if (this.ornamentDraw) {
            this.ornamentDraw.setWarning(collision);
        }
    }

    // collisionTotalEvent is called when a collision is detected between two objects, fully inside
    // @param {object} collision - The collision object
    // @param {object} obj - The object that is colliding
    collisionTotalEvent(collision, obj) {

    }

    // init initializes the generic device
    init() {
        if (!this.width) this.width = this.defaultWidth;
        if (!this.height) this.height = this.defaultHeight;

        super.setPosition(this.x, this.y);
        super.setSize(this.width, this.height);
        super.setDragEnabled(true);
        super.setResizeEnabled(false);
        super.setHorizontalMinimumSize(this.horizontalMinimumSize);
        super.setVerticalMinimumSize(this.verticalMinimumSize);

        super.init();

        this.#createConnection();

        this.block.id = this.id;

        const contextMenu = new ContextMenu();
        contextMenu.init();

        let debugMenu = [];
        if (this.debugMode) {
            debugMenu = [
                { label: "Drag enable", action: () => this.setDragEnabled(true) },
                { label: "Drag disable", action: () => this.setDragEnabled(false) },

                { label: "Resize enable", action: () => this.setResizeEnabled(true) },
                { label: "Resize disable", action: () => this.setResizeEnabled(false) },

                { label: "Select", action: () => this.setSelectEnabled(true) },
                { label: "Unselect", action: () => this.setSelectEnabled(false) },

                { label: "Warning enable", action: () => this.ornamentDraw.setWarning(true) },
                { label: "Warning disable", action: () => this.ornamentDraw.setWarning(false) },

                { label: "-" },
            ];
        }

        contextMenu.setContextMenuOptions([...debugMenu, ...[
            { label: "Normal option", action: () => alert("Clicked") },
            { label: "-" },
            { label: "Option 1", action: () => alert("Clicked 1") },
            { label: "-" },
            {
                label: "Export",
                submenu: [
                    { label: "As PNG", action: () => alert("PNG") },
                    { label: "As JPG", action: () => alert("JPG") },
                    {
                        type: "grid",
                        items: [

                            {
                                label: "Cat",
                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                action: () => alert("Cat")
                            },
                            {
                                label: "Dog",
                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                action: () => alert("Dog")
                            },
                            {
                                label: "Fish",
                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                submenu: [
                                    { label: "As PNG", action: () => alert("PNG") },
                                    { label: "As JPG", action: () => alert("JPG") },
                                    {
                                        type: "grid",
                                        items: [

                                            {
                                                label: "Cat",
                                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                                action: () => alert("Cat")
                                            },
                                            {
                                                label: "Dog",
                                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                                action: () => alert("Dog")
                                            },
                                            {
                                                label: "Fish",
                                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                                action: () => alert("Fish")
                                            },
                                            {
                                                label: "Bird",
                                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                                action: () => alert("Bird")
                                            },


                                        ]
                                    }
                                ]
                            },
                            {
                                label: "Bird",
                                icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                action: () => alert("Bird")
                            },


                        ]
                    }
                ]
            },
            { label: "Option 2", action: () => alert("Clicked 2") },
            { label: "-" },
            {
                label: "Option 3",
                submenu: [
                    { label: "Sub option 1", action: () => alert("Sub option 1") },
                    { label: "Sub option 2", action: () => alert("Sub option 2") },
                    {
                        label: "Sub option 3",
                        submenu: [
                            {
                                type: "grid",
                                items: [
                                    {
                                        label: "Cat",
                                        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                        action: () => alert("Cat"),
                                    },
                                    {
                                        label: "Dog",
                                        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                        action: () => alert("Dog")
                                    },
                                    {
                                        label: "Fish",
                                        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                        action: () => alert("Fish")
                                    },
                                    {
                                        label: "Bird",
                                        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                        action: () => alert("Bird")
                                    }
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                type: "grid",
                items: [
                    {
                        label: "Cat",
                        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                        action: () => alert("Cat")
                    },
                    {
                        label: "Dog",
                        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                        action: () => alert("Dog")
                    },
                    {
                        label: "Fish",
                        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                        action: () => alert("Fish")
                    },
                    {
                        label: "Bird",
                        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                        action: () => alert("Bird")
                    },

                ]
            },
            { label: "-" },
            {
                label: "Another option",
                action: () => alert("Another option")
            },
            {
                label: "Another option",
                action: () => alert("Another option")
            },
            {
                label: "Another option",
                action: () => alert("Another option")
            },
            {
                label: "Another option",
                action: () => alert("Another option")
            },
            {
                label: "Another option",
                action: () => alert("Another option")
            },
            { label: "Open", action: () => alert("Open clicked") },
            { label: "-" },
            { label: "Delete", action: () => alert("Deleted") }
        ]
        ]);

        contextMenu.attachContextMenuOptionsTo(this.block);
    }

    #createConnection() {
        this.connInputX = new Connection(this.deviceID);
        this.connInputX.create(0, 10, 4, 3, this.ornamentDraw.getBorderColor());
        this.connInputX.init()

        this.connInputY = new Connection(this.deviceID);
        this.connInputY.create(0, this.height-12, 4, 3, this.ornamentDraw.getBorderColor());
        this.connInputY.init()

        this.connOut = new Connection(this.deviceID);
        this.connOut.create(this.width-5, this.height/2-1, 4, 2, this.ornamentDraw.getBorderColor());
        this.connOut.init()
    }

    getDeviceID() {
        return this.deviceID;
    }

    getID() {
        return this.sequentialID.create(this.getDeviceID())
    }

    setSequentialID(obj) {
        this.sequentialID = obj;
        this.sequentialID.init();

        this.id = this.getID();
    }

    setDebugMode(debug) {
        this.debugMode = debug;
    }
}
