class Connection {
    constructor(containerId) {
        this.containerId = containerId;
    }

    create(x, y, width, height, color = 'red') {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;


    }

    init() {
        this.container = document.getElementById(this.containerId);
        if (!this.container) throw new Error(`Element ID "${this.containerId}" not found.`);

        const newDiv = document.createElement('div');
        newDiv.style.position = 'absolute';
        newDiv.style.left = `${this.x}px`;
        newDiv.style.top = `${this.y}px`;
        newDiv.style.width = `${this.width}px`;
        newDiv.style.height = `${this.height}px`;
        newDiv.style.backgroundColor = this.color;

        this.container.appendChild(newDiv);
        return newDiv;
    }
}
