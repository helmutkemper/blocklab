class OrnamentOpAmpSymbol extends WarningMark {

    constructor() {
        super();

        this.deviceBorderColor = "rgb(15,48,216)";
        this.deviceBackgroundColor = "rgb(253,255,23)";
        this.deviceSymbolColor = "rgb(83,83,81)";

        this.deviceSymbol = null;

        this.deviceAdjustX = 0;
        this.deviceAdjustY = 0;

        this.deviceSymbolText = "?";
        this.deviceSymbolFontSize = "35px";
        this.deviceSymbolFontFamily = "Arial";
        this.deviceSymbolFontWeight = "bold";
    }

    // setAdjustX Defines the X adjustment of the symbol
    // @param {number} adjustX - The X adjustment value
    setAdjustX(adjustX) {
        this.deviceAdjustX = adjustX;
    }

    // getAdjustX Returns the X adjustment of the symbol
    // @returns {number} The X adjustment value
    getAdjustX() {
        return this.deviceAdjustX;
    }

    // setAdjustY Defines the Y adjustment of the symbol
    // @param {number} adjustY - The Y adjustment value
    setAdjustY(adjustY) {
        this.deviceAdjustY = adjustY;
    }

    // getAdjustY Returns the Y adjustment of the symbol
    // @returns {number} The Y adjustment value
    getAdjustY() {
        return this.deviceAdjustY;
    }

    // setSymbol Defines the symbol of the device
    // @param {string} text - The symbol text
    setSymbol(text) {
        this.deviceSymbolText = text;
        this.deviceSymbol.textContent = text;
    }

    // getSymbol Returns the symbol of the device
    // @returns {string} The symbol text
    getSymbol() {
        return this.deviceSymbolText;
    }

    // setSymbolFontSize Defines the font size of the symbol
    // @param {string} fontSize - The font size value
    setSymbolFontSize(fontSize) {
        this.deviceSymbolFontSize = fontSize;
        this.deviceSymbol.setAttribute("font-size", this.deviceSymbolFontSize);
    }

    // getSymbolFontSize Returns the font size of the symbol
    // @returns {string} The font size value
    getSymbolFontSize() {
        return this.deviceSymbolFontSize;
    }

    // setSymbolFontFamily Defines the font family of the symbol
    // @param {string} fontFamily - The font family value
    setSymbolFontFamily(fontFamily) {
        this.deviceSymbolFontFamily = fontFamily;
        this.deviceSymbol.setAttribute("font-family", this.deviceSymbolFontFamily);
    }

    // getSymbolFontFamily Returns the font family of the symbol
    // @returns {string} The font family value
    getSymbolFontFamily() {
        return this.deviceSymbolFontFamily;
    }

    // setSymbolFontWeight Defines the font weight of the symbol
    // @param {string} fontWeight - The font weight value
    setSymbolFontWeight(fontWeight) {
        this.deviceSymbolFontWeight = fontWeight;
        this.deviceSymbol.setAttribute("font-weight", this.deviceSymbolFontWeight);
    }

    // getSymbolFontWeight Returns the font weight of the symbol
    // @returns {string} The font weight value
    getSymbolFontWeight() {
        return this.deviceSymbolFontWeight;
    }

    // setColor Defines the color of the border
    // @param {string} color - The color value
    setBorderColor(color) {
        this.deviceBorderColor = color;
        this.deviceBorder.setAttribute("stroke", this.deviceBorderColor);
    }

    // getColor Returns the color of the border
    // @returns {string} The color value
    getBorderColor() {
        return this.deviceBorderColor;
    }

    // setBackgroundColor Defines the color of the device background
    // @param {string} color - The color value
    setBackgroundColor(color) {
        this.deviceBackgroundColor = color;
        this.deviceBorder.setAttribute("fill", this.deviceBackgroundColor);
    }

    // getBackgroundColor Returns the color of the device background
    // @returns {string} The color value
    getBackgroundColor() {
        return this.deviceBackgroundColor;
    }

    // setSymbolColor Defines the color of the symbol
    // @param {string} color - The color value
    setSymbolColor(color) {
        this.deviceSymbolColor = color;
        this.deviceSymbol.setAttribute("fill", this.deviceSymbolColor);
    }

    // getSymbolColor Returns the color of the symbol
    // @returns {string} The color value
    getSymbolColor() {
        return this.deviceSymbolColor;
    }

    // init initializes the SVG element and its content
    init() {
        super.init();

        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        this.deviceBorder = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.deviceBorder.setAttribute("fill", this.deviceBackgroundColor);
        this.deviceBorder.setAttribute("stroke", this.deviceBorderColor);
        this.deviceBorder.setAttribute("stroke-width", "1");
        this.deviceBorder.setAttribute("marker-end", "url(#device)");
        this.svg.appendChild(this.deviceBorder);

        this.deviceSymbol = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.deviceSymbol.setAttribute("fill", this.deviceSymbolColor);
        this.deviceSymbol.setAttribute("stroke", "none");
        this.deviceSymbol.setAttribute("marker-end", "url(#symbol)");
        this.deviceSymbol.setAttribute("text-anchor", "middle");
        this.deviceSymbol.setAttribute("dominant-baseline", "middle");
        this.deviceSymbol.setAttribute("font-size", this.deviceSymbolFontSize);
        this.deviceSymbol.setAttribute("font-family", this.deviceSymbolFontFamily);
        this.deviceSymbol.setAttribute("font-weight", this.deviceSymbolFontWeight);
        this.deviceSymbol.textContent = this.deviceSymbolText;
        this.deviceSymbol.style.userSelect = "none"
        this.svg.appendChild(this.deviceSymbol);

        this.svg.appendChild(super.getWarningMark());

        super.setWarning(false);
    }

    // Updates the size of SVG
    update(width, height) {
        super.update(width, height);

        this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        // draw the triangle
        const border = 4;
        const device = [
            `M ${0 + border} ${0 + border}`,
            `L ${width - border} ${height/2}`,
            `L ${0 + border} ${height - border}`,
            `L ${0 + border} ${0 + border}`,
            `z`,
        ].join(" ");

        this.deviceBorder.setAttribute("d", device);

        // calculate the center of the triangle
        const a = [0 + border, 0 + border];
        const b = [width - border, height/2];
        const c = [0 + border, height - border];

        // center of the triangle
        const xc = (a[0] + b[0] + c[0]) / 3;
        const yc = (a[1] + b[1] + c[1]) / 3;

        this.deviceSymbol.setAttribute("x", xc + this.deviceAdjustX);
        this.deviceSymbol.setAttribute("y", yc + this.deviceAdjustY);
    }
}
