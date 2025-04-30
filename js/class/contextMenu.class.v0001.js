/*
const contextMenu = new ContextMenu();
        contextMenu.init();
        contextMenu.setContextMenuOptions([
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
                                    action: () => alert("Fish")
                                },
                                {
                                    label: "Bird",
                                    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/81_INF_DIV_SSI.jpg/50px-81_INF_DIV_SSI.jpg",
                                    action: () => alert("Bird")
                                }

                        ]
                    }
                ]
            },
            { label: "Option 2", action: () => alert("Clicked 2") },
            { label: "-" },
            {
                label: "Option 3",
                submenu: [
                    { label: "Suboption 1", action: () => alert("Suboption 1") },
                    { label: "Suboption 2", action: () => alert("Suboption 2") },
                    {
                        label: "Suboption 3",
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
        ]);

        contextMenu.attachContextMenuOptionsTo(this.block);
*/


class ContextMenu {
    constructor(){}

    init() {
        this.shadow = "0 2px 5px rgba(0,0,0,0.2)";
        this.border = "0px solid #ccc";
        this.backgroundColor = "#fff";

        this.dividerMargin = "5px 0";

        this.gridDisplay = "grid";
        this.gridGridTemplateColumns = "repeat(3, 1fr)";
        this.gridGap = "8px";
        this.gridPadding = "2px";

        this.cellTextAlign = "center";
        this.cellCursor = "pointer";
        this.cellBorder = this.border;
        this.cellBorderRadius = "4px";
        this.cellPadding = "5px";

        this.imgWidth = "32px";
        this.imgHeight = "32px";
        this.imgDisplay = "block";
        this.imgMargin = "0 auto 5px";
        this.imgPadding = "5px";

        this.textFontSize = "12px";
        this.fontFamily = "Arial, sans-serif";

        this.itemPadding = "5px 10px";
        this.itemCursor = "pointer";
        this.itemPosition = "relative";
        this.itemTextContent = "&nbsp;&nbsp;▶";
        this.itemDisplay = "flex";
        this.itemAlignItems = "center";

        this.submenuPosition = "absolute";
        this.submenuLeft = "100%";
        this.submenuTop = "0";
        this.submenuBackground = "#ccc";
        this.submenuBorder = this.border;
        this.submenuBoxShadow = this.shadow;
        this.submenuPadding = "5px";
        this.submenuDisplay = "none";
        this.submenuWhiteSpace = "nowrap";
        this.submenuZIndex = "1001";

        this.menu = document.createElement("div");
        this.menu.style.position = "absolute";
        this.menu.style.background = this.backgroundColor;
        this.menu.style.border = this.border;
        this.menu.style.boxShadow = this.shadow;
        this.menu.style.padding = "5px";
        this.menu.style.zIndex = "1000";

        document.body.appendChild(this.menu);

        document.addEventListener("click", () => this.#hide());
    }

    setContextMenuOptions(options, container = this.menu) {
        container.innerHTML = ""; // Clear existing

        options.forEach(opt => {
            if (opt.label === "-") {
                const divider = document.createElement("hr");
                divider.style.margin = this.dividerMargin;
                container.appendChild(divider);
                return;
            }

            // Grid of icons
            if (opt.type === "grid" && Array.isArray(opt.items)) {
                const grid = document.createElement("div");
                grid.style.display = this.gridDisplay;
                grid.style.gridTemplateColumns = this.gridGridTemplateColumns;
                grid.style.gap = this.gridGap;
                grid.style.padding = this.gridPadding;

                opt.items.forEach(gridItem => {
                    const cell = document.createElement("div");
                    cell.style.textAlign = this.cellTextAlign;
                    cell.style.cursor = this.cellCursor;
                    cell.style.border = this.cellBorder;
                    cell.style.borderRadius = this.cellBorderRadius;
                    cell.style.padding = this.cellPadding;
                    cell.style.position = "relative";

                    const img = document.createElement("img");
                    img.src = gridItem.icon;
                    img.alt = gridItem.label;
                    img.style.width = this.imgWidth;
                    img.style.height = this.imgHeight;
                    img.style.display = this.imgDisplay;
                    img.style.margin = this.imgMargin;
                    img.style.padding = this.imgPadding;

                    const text = document.createElement("div");
                    if (Array.isArray(gridItem.submenu)) {
                        text.innerHTML = `<span style="flex:1; text-align:left;">${gridItem.label}</span><span style="text-align:right;">${this.itemTextContent}</span>`;
                        text.style.display = this.itemDisplay;
                        text.style.alignItems = this.itemAlignItems;
                    } else {
                        text.textContent = gridItem.label;
                    }

                    text.style.fontSize = this.textFontSize;
                    text.style.fontFamily = this.fontFamily;

                    cell.appendChild(img);
                    cell.appendChild(text);

                    if (Array.isArray(gridItem.submenu)) {
                        const submenu = document.createElement("div");
                        submenu.style.position = this.submenuPosition;
                        submenu.style.left = this.submenuLeft;
                        submenu.style.top = this.submenuTop;
                        submenu.style.background = this.backgroundColor;
                        submenu.style.border = this.submenuBorder;
                        submenu.style.boxShadow = this.submenuBoxShadow;
                        submenu.style.padding = this.submenuPadding;
                        submenu.style.display = this.submenuDisplay;
                        submenu.style.whiteSpace = this.submenuWhiteSpace;
                        submenu.style.zIndex = this.submenuZIndex;

                        this.setContextMenuOptions(gridItem.submenu, submenu);
                        cell.appendChild(submenu);

                        cell.addEventListener("mouseenter", () => {
                            cell.style.background = this.submenuBackground;
                            cell.style.border = this.border;
                            submenu.style.display = "block";

                            const submenuRect = submenu.getBoundingClientRect();
                            const screenWidth = window.innerWidth;

                            if (cell.getBoundingClientRect().right + submenuRect.width > screenWidth) {
                                submenu.style.left = "auto";
                                submenu.style.right = "100%";
                            } else {
                                submenu.style.left = "100%";
                                submenu.style.right = "auto";
                            }
                        });

                        cell.addEventListener("mouseleave", () => {
                            cell.style.background = "transparent";
                            cell.style.border = this.border;
                            submenu.style.display = "none";
                        });
                    } else {
                        cell.addEventListener("click", (e) => {
                            e.stopPropagation();
                            gridItem.action();
                            this.#hide();
                        });

                        cell.addEventListener("mouseenter", () => {
                            cell.style.background = this.submenuBackground;
                            cell.style.border = this.border;
                        });
                        cell.addEventListener("mouseleave", () => {
                            cell.style.background = "transparent";
                            cell.style.border = this.border;
                        });
                    }

                    grid.appendChild(cell);
                });

                container.appendChild(grid);
                return;
            }

            // Standard item (with optional submenu)
            const item = document.createElement("div");
            item.textContent = opt.label;
            item.style.textAlign = "left"; // todo: corrigir
            item.style.fontSize = this.textFontSize;
            item.style.fontFamily = this.fontFamily;
            item.style.padding = this.itemPadding;
            item.style.cursor = this.itemCursor;
            item.style.position = this.itemPosition;

            item.addEventListener("mouseenter", () => item.style.background = this.submenuBackground);
            item.addEventListener("mouseleave", () => item.style.background = "transparent");

            if (Array.isArray(opt.submenu)) {
                // item.textContent += this.itemTextContent;
                item.innerHTML = `<span style="flex:1; text-align:left;">${opt.label}</span><span style="text-align:right;">${this.itemTextContent}</span>`;
                item.style.display = this.itemDisplay;
                item.style.alignItems = this.itemAlignItems;

                const submenu = document.createElement("div");
                submenu.style.position = this.submenuPosition;
                submenu.style.left = this.submenuLeft;
                submenu.style.top = this.submenuTop;
                submenu.style.background = this.backgroundColor;
                submenu.style.border = this.submenuBorder;
                submenu.style.boxShadow = this.submenuBoxShadow;
                submenu.style.padding = this.submenuPadding;
                submenu.style.display = this.submenuDisplay;
                submenu.style.whiteSpace = this.submenuWhiteSpace;
                submenu.style.zIndex = this.submenuZIndex;

                this.setContextMenuOptions(opt.submenu, submenu);

                item.appendChild(submenu);
                item.addEventListener("mouseenter", () => {
                    submenu.style.display = "block";

                    const submenuRect = submenu.getBoundingClientRect();
                    const screenWidth = window.innerWidth;

                    if (item.getBoundingClientRect().right + submenuRect.width > screenWidth) {
                        submenu.style.left = "auto";
                        submenu.style.right = "100%";
                    } else {
                        submenu.style.left = "100%";
                        submenu.style.right = "auto";
                    }
                });
                item.addEventListener("mouseleave", () => submenu.style.display = "none");
            } else {
                item.textContent = opt.label;

                item.addEventListener("click", (e) => {
                    e.stopPropagation();
                    opt.action();
                    this.#hide();
                });
            }

            container.appendChild(item);
        });
    }

    attachContextMenuOptionsTo(element) {
        element.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            this.#show(e.clientX, e.clientY);
        });
    }

    #show(x, y) {
        // Temporarily display menu to measure its size
        this.menu.style.display = "block";
        this.menu.style.left = "0px";
        this.menu.style.top = "0px";

        const menuRect = this.menu.getBoundingClientRect();
        const menuWidth = menuRect.width;
        const menuHeight = menuRect.height;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        // Clamp position to avoid overflow
        let adjustedX = x;
        let adjustedY = y;

        if (x + menuWidth > screenWidth) {
            adjustedX = screenWidth - menuWidth - 5;
        }
        if (y + menuHeight > screenHeight) {
            adjustedY = screenHeight - menuHeight - 5;
        }

        this.menu.style.left = `${Math.max(adjustedX, 0)}px`;
        this.menu.style.top = `${Math.max(adjustedY, 0)}px`;
    }

    #hide() {
        this.menu.style.display = "none";
    }
}
