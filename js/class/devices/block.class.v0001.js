class Block {
    constructor(container, id) {

        // Receive the HTML Father element
        this.container = container;
        this.deviceID = id;
        // Informs that the component has been initialized and can receive events
        this.initialized = false;
        this.uID = "";
    }

    setName(name) {
        this.name = name;
    }

    // getUniqueId returns a unique id for the block
    // @returns {string} The unique id as string
    #getUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    }

    // init Initializes the component after sets
    init() {
        this.uID = this.#getUniqueId();
        this.resizerWidth = "10px";
        this.resizerHeight = "10px";
        this.resizerDistance = "-5px";
        this.resizerColor = "red";
        this.resizerRadius = "2px"
        this.classListName = "block";
        this.resizerFlashing = true;
        this.selectFlashing = true;
        this.selected = false;
        this.resizerFlashColor = "yellow";
        this.resizerFlashDuration = 0.6;
        this.resizerFlashInterval = 0.1;
        this.#createBlock(this.x, this.y, this.width, this.height);
        this.#initEvents();

        this.initialized = true;

        if (this.ornamentDraw) {
            let svg = this.ornamentDraw.getSvg();
            this.block.appendChild(svg);
            this.#updateOrnament();
        }

        this.#dragEnabledSupport();
        this.#resizeEnabledSupport();
        this.setSelectEnabled(this.selected);
    }

    getRect() {
        return this.block.getBoundingClientRect();
    }

    getZIndex() {
        return this.block.style.zIndex;
    }

    getDeviceTypeLayer() {
        throw new Error("The function getDeviceTypeLayer() must be implemented in the class that inherits from block");
    }

    getDeviceTypeID() {
        throw new Error("The function getDeviceTypeID() must be implemented in the class that inherits from block");
    }

    // collisionPartialEvent is called when a collision is detected between two objects, but not fully inside
    // @param {object} collision - The collision object
    // @param {object} obj - The object that is colliding
    collisionPartialEvent(collision, obj) {
        throw new Error("The function collisionPartialEvent() must be implemented in the class that inherits from block");
    }

    // collisionTotalEvent is called when a collision is detected between two objects, fully inside
    // @param {object} collision - The collision object
    // @param {object} obj - The object that is colliding
    collisionTotalEvent(collision, obj) {
        throw new Error("The function collisionTotalEvent() must be implemented in the class that inherits from block");
    }

    // setResizerColor sets the color of the resizes
    setResizerColor(color) {
        this.resizerColor = color;
        if (!this.initialized) return;
        this.resizers.forEach(resizer => {
            resizer.style.backgroundColor = this.resizerColor;
        });
    }

    // setClassListName sets the css class name of the element block
    setClassListName(name) {
        this.classListName = name;
        this.block.classList.add(this.classListName);
    }

    // setDragEnabled sets the drag enabled property
    setDragEnabled(enabled) {
        //  cursor: grab
        this.dragEnabled = enabled;
        this.#dragEnabledSupport();

        if (enabled && this.resizeEnabled) this.setResizeEnabled(false);
        if (enabled && this.selected) this.setSelectEnabled(false);
    }

    // setResizerRadius sets the radius of the resizer
    setResizerRadius(radius) {
        this.resizerRadius = radius;
        this.resizers.forEach(resizer => {
            resizer.style.borderRadius = radius;
        });
    }

    // setResizeEnabled sets the resize enabled property
    setResizeEnabled(enabled) {
        this.resizeEnabled = enabled;
        this.#resizeEnabledSupport();
        this.flashResizer();

        if (enabled && this.selected) this.setSelectEnabled(false);
    }

    // setSelectEnabled sets the select enabled property
    setSelectEnabled(enabled) {
        this.selected = enabled;
        this.select.style.display = enabled ? "block" : "none";
        this.flashSelected();

        if (enabled && this.resizeEnabled) this.setResizeEnabled(false);
    }

    // setHorizontalMinimumSize sets the minimum horizontal size of the block
    setHorizontalMinimumSize(size) {
        this.blockHorizontalMinimumSize = size;
    }

    // setVerticalMinimumSize sets the minimum vertical size of the block
    setVerticalMinimumSize(size) {
        this.blockVerticalMinimumSize = size;
    }

    // setSize sets the size of the block
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    // setPosition sets the coordinate (x, y) of the block
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    // setZIndex sets the z-index of the block
    setZIndex(zIndex) {
        this.block.style.zIndex = zIndex;
        this.resizers.forEach(resizer => {
            resizer.style.zIndex = zIndex;
        });
    }

    // setResizerWidth sets the width of the resizer
    setResizerSize(width, height) {
        this.resizerWidth = width;
        this.resizerHeight = height;
        this.resizers.forEach(resizer => {
            resizer.style.width = width;
            resizer.style.height = height;
        });
    }

    // setResizerDistance sets the distances between the resizes and the component
    setResizerDistance(distance) {
        this.resizerDistance = distance;
        this.resizers.forEach(resizer => {
            if (resizer.classList.contains("top-left")) {
                resizer.style.top = distance;
                resizer.style.left = distance;
            }
            else if (resizer.classList.contains("top-right")) {
                resizer.style.top = distance;
                resizer.style.right = distance;
            }
            else if (resizer.classList.contains("bottom-left")) {
                resizer.style.bottom = distance;
                resizer.style.left = distance;
            }
            else if (resizer.classList.contains("bottom-right")) {
                resizer.style.bottom = distance;
                resizer.style.right = distance;
            }
        });
    }

    // setResizerFlashing sets the resizer flashing property
    setResizerFlashing(enabled) {
        this.resizerFlashing = enabled;
    }

    // setSelectFlashing sets the select flashing property
    setSelectFlashing(enabled) {
        this.selectFlashing = enabled;
    }

    // setResizerFlashColor sets the resizer flash color
    setResizerFlashColor(color) {
        this.resizerFlashColor = color;
    }

    // setResizerFlashDuration sets the resizer flash duration
    setResizerFlashDuration(duration, interval) {
        this.resizerFlashDuration = duration;
        this.resizerFlashInterval = interval;
    }

    // setOrnamentDraw sets the ornament draw object
    setOrnamentDraw(obj) {
        this.ornamentDraw = obj
    }

    // flashResizer enable and flashes the resizer
    flashResizer() {

        if (!this.dragEnabled) {
            this.setDragEnabled(true)
        }

        let actual = this.resizerColor;
        if (!this.initialized) return;
        this.resizers.forEach(resizer => {
            resizer.style.backgroundColor = actual;
        });

        if (!this.resizerFlashing) return;

        const intervalId = setInterval(() => {
            actual = (actual === this.resizerColor) ? this.resizerFlashColor : this.resizerColor;
            this.resizers.forEach(resizer => {
                resizer.style.backgroundColor = actual;
            });
        }, this.resizerFlashInterval * 1000);

        setTimeout(() => {
            clearInterval(intervalId);
            actual = this.resizerColor;
            this.resizers.forEach(resizer => {
                resizer.style.backgroundColor = actual;
            });
        }, this.resizerFlashDuration * 1000);
    }

    flashSelected() {

        // if (!this.dragEnabled) {
        //     this.setDragEnabled(true)
        // }

        let actual = this.resizerColor;
        if (!this.selected) return;
        this.select.style.borderColor = actual;

        if (!this.selectFlashing) return;

        const intervalId = setInterval(() => {
            actual = (actual === this.resizerColor) ? this.resizerFlashColor : this.resizerColor;
            this.select.style.borderColor = actual;
        }, this.resizerFlashInterval * 1000);

        setTimeout(() => {
            clearInterval(intervalId);
            actual = this.resizerColor;
            this.select.style.borderColor = actual;
        }, this.resizerFlashDuration * 1000);
    }

    // #dragEnabledSupport sets the drag cursor
    #dragEnabledSupport() {
        if (!this.initialized) return;
        this.block.style.cursor = this.dragEnabled ? "grab" : "default";
    }

    // #resizeEnabledSupport hide the resizes
    #resizeEnabledSupport() {
        if (!this.initialized) return;
        this.resizers.forEach(resizer => {
            resizer.style.display = this.resizeEnabled ? "block" : "none";
        });
    }

    // #createBlock creates the html element
    #createBlock(x, y, width, height) {
        this.block = document.createElement("div");
        this.block.id = this.deviceID;
        this.block.classList.add(this.classListName);
        this.block.style.position = "absolute";
        this.block.style.top = `${y}px`;
        this.block.style.left = `${x}px`;
        this.block.style.width = `${width}px`;
        this.block.style.height = `${height}px`;
        this.container.appendChild(this.block);

        this.select = document.createElement("div");
        this.select.style.position = "absolute";
        this.select.style.top = `0px`;
        this.select.style.left = `0px`;
        this.select.style.width = `${width}px`;
        this.select.style.height = `${height}px`;
        this.select.style.border = "1px dashed red";
        this.select.style.background = "transparent";
        this.block.appendChild(this.select);

        this.resizers = ["top-left", "top-right", "bottom-left", "bottom-right"].map(pos => {
            const resizer = document.createElement("div");
            resizer.classList.add("resizer", pos);
            resizer.style.position = "absolute";
            resizer.style.width = this.resizerWidth;
            resizer.style.height = this.resizerHeight;
            resizer.style.backgroundColor = this.resizerColor;
            resizer.style.borderRadius = this.resizerRadius;

            if (resizer.classList.contains("top-left")) {
                resizer.style.top = this.resizerDistance;
                resizer.style.left = this.resizerDistance;
                resizer.style.cursor = "nwse-resize";
            }
            else if (resizer.classList.contains("top-right")) {
                resizer.style.top = this.resizerDistance;
                resizer.style.right = this.resizerDistance;
                resizer.style.cursor = "nesw-resize";
            }
            else if (resizer.classList.contains("bottom-left")) {
                resizer.style.bottom = this.resizerDistance;
                resizer.style.left = this.resizerDistance;
                resizer.style.cursor = "nesw-resize";
            }
            else if (resizer.classList.contains("bottom-right")) {
                resizer.style.bottom = this.resizerDistance;
                resizer.style.right = this.resizerDistance;
                resizer.style.cursor = "nwse-resize";
            }
            this.block.appendChild(resizer);
            return resizer;
        });

        this.#updateOrnament();
    }

    #updateOrnament() {
        if (!this.ornamentDraw) return;
        const width = this.block.offsetWidth;
        const height = this.block.offsetHeight;
        this.ornamentDraw.update(width, height);
    }

    #initEvents() {
        let isDragging = false;
        let isResizing = false;
        let startX, startY, startWidth, startHeight, startLeft, startTop, currentResizer;

        // drag main block
        this.block.addEventListener("mousedown", (e) => {
            if (!this.dragEnabled || e.target.classList.contains("resizer")) return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = this.block.offsetLeft;
            startTop = this.block.offsetTop;
            document.addEventListener("mousemove", drag);
            document.addEventListener("mouseup", stopDrag);
        });

        const dragX = (e) => {
            let dx = e.clientX - startX;
            let newLeft = Math.min(Math.max(0, startLeft + dx), this.container.clientWidth - this.block.offsetWidth);
            this.block.style.left = newLeft + "px";
        };

        const dragY = (e) => {
            let dy = e.clientY - startY;
            let newTop = Math.min(Math.max(0, startTop + dy), this.container.clientHeight - this.block.offsetHeight);
            this.block.style.top = newTop + "px";
        };

        const drag = (e) => {
            if (!isDragging) return;
            this.block.style.cursor = "grabbing";
            dragX(e)
            dragY(e)
        };

        const stopDrag = () => {
            isDragging = false;
            this.block.style.cursor = "grab";
            document.removeEventListener("mousemove", drag);
            document.removeEventListener("mouseup", stopDrag);
        };

        this.resizers.forEach(resizer => {
            resizer.addEventListener("mousedown", (e) => {
                if (!this.resizeEnabled) return;
                e.stopPropagation();
                isResizing = true;
                currentResizer = e.target;
                startX = e.clientX;
                startY = e.clientY;
                startWidth = this.block.offsetWidth;
                startHeight = this.block.offsetHeight;
                startLeft = this.block.offsetLeft;
                startTop = this.block.offsetTop;
                document.addEventListener("mousemove", resize);
                document.addEventListener("mouseup", stopResize);
            });
        });

        const resizeHorizontal = (e) => {

            /*
                bug:
                [tl]--------------[tr]
                  |                |
                  |                |
                  |                |
                [bl]--------------[br]

                If I drag TR or BR left, and the size is below minimum, the block is dragged left.
            */

            let dx = e.clientX - startX;
            let newLeft = startLeft;
            let newWidth = startWidth;

            if (currentResizer.classList.contains("bottom-right")) {
                newWidth = Math.min(startWidth + dx, this.container.clientWidth - startLeft);
            } else if (currentResizer.classList.contains("bottom-left")) {
                newWidth = Math.min(startWidth - dx, startLeft + startWidth);
                newLeft = Math.max(0, startLeft + dx);
            } else if (currentResizer.classList.contains("top-right")) {
                newWidth = Math.min(startWidth + dx, this.container.clientWidth - startLeft);
            } else if (currentResizer.classList.contains("top-left")) {
                newWidth = Math.min(startWidth - dx, startLeft + startWidth);
                newLeft = Math.max(0, startLeft + dx);
            }

            this.block.style.left = `${newLeft}px`;
            this.block.style.width = `${Math.max(this.blockHorizontalMinimumSize, newWidth)}px`;

            this.select.style.width = `${Math.max(this.blockHorizontalMinimumSize, newWidth)}px`;
        };

        const resizeVertical = (e) => {

            /*
                bug:
                [tl]--------------[tr]
                  |                |
                  |                |
                  |                |
                [bl]--------------[br]

                If I drag TL or TR down, and the size is below minimum, the block is dragged down.
            */

            let dy = e.clientY - startY;
            let newTop = startTop;
            let newHeight = startHeight;

            if (currentResizer.classList.contains("bottom-right")) {
                newHeight = Math.min(startHeight + dy, this.container.clientHeight - startTop);
            } else if (currentResizer.classList.contains("bottom-left")) {
                newHeight = Math.min(startHeight + dy, this.container.clientHeight - newTop);
            } else if (currentResizer.classList.contains("top-right")) {
                newHeight = Math.min(startHeight - dy, startTop + startHeight);
                newTop = Math.max(0, startTop + dy);
            } else if (currentResizer.classList.contains("top-left")) {
                newHeight = Math.min(startHeight - dy, startTop + startHeight);
                newTop = Math.max(0, startTop + dy);
            }

            this.block.style.top = `${newTop}px`;
            this.block.style.height = `${Math.max(this.blockVerticalMinimumSize, newHeight)}px`;

            this.select.style.height = `${Math.max(this.blockVerticalMinimumSize, newHeight)}px`;
        };

        const resize = (e) => {
            if (!isResizing) return;

            resizeHorizontal(e);
            resizeVertical(e);
            this.#updateOrnament();
        };

        const stopResize = () => {
            isResizing = false;
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", stopResize);
        };
    }
}
