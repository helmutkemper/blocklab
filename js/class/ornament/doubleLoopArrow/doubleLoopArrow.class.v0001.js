class DoubleLoopArrow extends WarningMark {

    constructor() {
        super();

        this.arrowColor = "rgba(255, 120, 0, 1.0)";
        this.backgroundColor = "rgb(240,233,200)";
    }

    // setArrowColor Defines the color of the arrow used as a border
    setArrowColor(color) {
        this.arrowColor = color;
        this.borderArrow.setAttribute("stroke", this.arrowColor);
    }

    // setBackgroundColor Defines the color of the background
    setBackgroundColor(color) {
        this.backgroundColor = color;
        this.backgroundContent.setAttribute("fill", this.backgroundColor);
    }

    // init initializes the SVG element and its content
    init() {
        super.init();

        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        this.backgroundContent = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.backgroundContent.setAttribute("fill", this.backgroundColor);
        this.backgroundContent.setAttribute("stroke", "none");
        this.backgroundContent.setAttribute("marker-end", "url(#arrowhead)");
        this.svg.appendChild(this.backgroundContent);

        this.borderArrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.borderArrow.setAttribute("fill", "none");
        this.borderArrow.setAttribute("stroke", this.arrowColor);
        this.borderArrow.setAttribute("stroke-width", "3");
        this.borderArrow.setAttribute("stroke-linecap", "round");
        this.borderArrow.setAttribute("stroke-linejoin", "round");
        this.borderArrow.setAttribute("marker-end", "url(#arrowhead)");
        this.svg.appendChild(this.borderArrow);

        this.svg.appendChild(super.getWarningMark());

        super.setWarning(false);
    }

    setWarning(warning) {
        super.setWarning(warning);
    }

    // Updates the size of SVG
    update(width, height) {
        super.update(width, height);

        this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        const margin = 10;
        const r = 20;

        const arrow = [

            // Desenha a seta superior direita
            `M ${margin + r} ${margin}`,
            `l 15 7`,

            `M ${margin + r} ${margin}`,
            `l 15 -7`,

            `M ${margin + r} ${margin}`,
            `H ${width - margin - r}`,
            `Q ${width - margin} ${margin}, ${width - margin} ${margin + r}`,
            `V ${height - margin - r}`,

            // Desenha a seta inferior esquerda
            `M ${width - margin - r} ${height - margin}`,
            `l -15 7`,

            `M ${width - margin - r} ${height - margin}`,
            `l -15 -7`,

            `M ${width - margin - r} ${height - margin}`,
            `H ${margin + r}`,
            `Q ${margin} ${height - margin}, ${margin} ${height - margin - r}`,
            `V ${margin + r}`,

        ].join(" ");

        this.borderArrow.setAttribute("d", arrow);

        const background = [
            // Draw the rounded background
            `M ${margin + r} ${margin}`,
            `H ${width - margin - r}`,
            `Q ${width - margin} ${margin}, ${width - margin} ${margin + r}`,
            `V ${height - margin - r}`,
            `Q ${width - margin} ${height - margin}, ${width - margin - r} ${height - margin}`,
            `H ${margin + r}`,
            `Q ${margin} ${height - margin}, ${margin} ${height - margin - r}`,
            `V ${margin + r}`,
            `Q ${margin} ${margin}, ${margin + r} ${margin}`
            // `C`
        ].join(" ");

        this.backgroundContent.setAttribute("d", background);
    }
}
