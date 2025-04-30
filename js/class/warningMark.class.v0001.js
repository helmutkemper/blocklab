// WarningMark Draws a hexagon with an exclamation point inside
class WarningMark extends OrnamentDraw {

    constructor() {
        super();

        this.warningBackgroundColor = "white";
        this.warningBorderColor = "red";
        this.warningExclamationColor = "black"
        this.warningOpacity = 0.5;

        this.warningFlashEnabled = false
        this.warningEnabled = false
        this.warningFlashDuration = 0.6;
        this.warningFlashInterval = 0.15;
        this.warningFlashUpdate = 1.0;
        this.warningIntervalId = undefined

        this.warningMarkMargin = 0;
    }

    // setWarningMarkOpacity enable the warning mark flash
    // @param {boolean} enable - true to enable the flash, false to disable it
    setWarningMarkFlash(flashEnabled) {
        this.warningFlashEnabled = flashEnabled;
    }

    // setWarningMarkMargin sets the margin of the warning mark
    // @param {number} margin - The margin value
    setWarningMarkMargin(margin) {
        this.warningMarkMargin = margin;
    }

    // getWarningMarkMargin returns the margin of the warning mark
    // @returns {number} The margin value
    getWarningMarkMargin() {
        return this.warningMarkMargin;
    }

    // getWarningMark returns the SVG element of the warning mark
    // @returns {SVGElement} The SVG element of the warning mark
    getWarningMark() {
        return this.svgWarning;
    }

    // setWarning sets the visibility of the warning mark
    // @param {boolean} warning - true to show the warning mark, false to hide it
    setWarning(warning) {
        if (warning === this.warningEnabled) {
            return;
        }

        // console.log("setWarning", warning);
        this.warningEnabled = warning;
        this.svgWarning.style.visibility = (warning) ? "visible" : "hidden";
        this.#flashMark();
    }

    // getWarning returns the visibility of the warning mark
    // @returns {boolean} true if the warning mark is visible, false otherwise
    getWarning() {
        return this.warningEnabled;
    }

    // init Draw a warning mark with a hexagon, and an exclamation mark
    init() {

        this.svgWarning = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svgWarning.setAttribute('opacity', this.warningOpacity);
        this.svgWarning.style.visibility = "hidden";

        this.hexagonRed = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.hexagonRed.setAttribute("fill", this.warningBorderColor);
        this.hexagonRed.setAttribute("fill-rule", "evenodd");
        this.hexagonRed.setAttribute("stroke", "none");
        this.svgWarning.appendChild(this.hexagonRed);

        this.hexagonWhite = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.hexagonWhite.setAttribute("fill", this.warningBackgroundColor);
        this.hexagonWhite.setAttribute("fill-rule", "evenodd");
        this.hexagonWhite.setAttribute("stroke", "none");
        this.svgWarning.appendChild(this.hexagonWhite);

        this.exclamation = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.exclamation.setAttribute("fill", this.warningExclamationColor);
        this.exclamation.setAttribute("fill-rule", "evenodd");
        this.svgWarning.appendChild(this.exclamation);
    }

    // update updates the size of the SVG element and its content
    update(width, height) {
        this.svgWarning.setAttribute("viewBox", `0 0 ${width} ${height}`);

        // const margin = 0;
        const marginInternal = 0;

        // Radius of the hexagon (distance from center to each point)
        const r = Math.min(width - marginInternal - 2*this.warningMarkMargin, height - marginInternal - 2*this.warningMarkMargin) / 2;

        // Rotate slightly to have a flat base
        const rotation = 0; // -Math.PI / 2;

        const drawUtils = new DrawUtils();

        // Generate the points of the hexagon
        const pointsExternal = drawUtils.polygon(6, r, width, height, rotation);
        const pointsInternal = drawUtils.polygon(6, r-5, width, height, rotation);

        // Draw the hexagon external
        const hexagonExternalPath = [
            `M ${pointsExternal[0][0]} ${pointsExternal[0][1]}`, // Move to first point
            ...pointsExternal.slice(1).map(p => `L ${p[0]} ${p[1]}`), // Draw lines to remaining points
            `z` // Close the path
        ];

        // Draw the hexagon internal
        const hexagonInternalPath = [
            `M ${pointsInternal[0][0]} ${pointsInternal[0][1]}`, // Move to first point
            ...pointsInternal.slice(1).map(p => `L ${p[0]} ${p[1]}`), // Draw lines to remaining points
            `z` // Close the path
        ];

        this.hexagonRed.setAttribute("d", [...hexagonExternalPath, ...hexagonInternalPath].join(" "));
        this.hexagonWhite.setAttribute("d", hexagonInternalPath.join(" "));

        // draw exclamation mark (!)
        // The points are based on the path of the image below, which makes an exclamation
        // M 185 120 L 190 240 L 210 240 L 215 120 L 185 120 z
        // M 190 260 L 190 280 L 210 280 L 210 260 L 190 260 z
        const originalPoints = [
            [185, 120], [190, 240], [210, 240], [215, 120], [185, 120],
            [190, 260], [190, 280], [210, 280], [210, 260], [190, 260]
        ];
        // The points are calculated in a box whit 400 x 400 and converted into vector
        const pl = drawUtils.pointsInTheBox(originalPoints, r, width, height, 0);

        const exclamationMark = [

            `M ${pl[0][0]} ${pl[0][1]}`, // M 185 120
            `L ${pl[1][0]} ${pl[1][1]}`, // L 190 240
            `L ${pl[2][0]} ${pl[2][1]}`, // L 210 240
            `L ${pl[3][0]} ${pl[3][1]}`, // L 215 120
            `L ${pl[4][0]} ${pl[4][1]}`, // L 185 120
            `z`,                         // z

            `M ${pl[5][0]} ${pl[5][1]}`, // M 190 260
            `L ${pl[6][0]} ${pl[6][1]}`, // L 190 280
            `L ${pl[7][0]} ${pl[7][1]}`, // L 210 280
            `L ${pl[8][0]} ${pl[8][1]}`, // L 210 260
            `L ${pl[9][0]} ${pl[9][1]}`, // L 190 260
            `z`,                         // z

        ].join(" ");
        this.exclamation.setAttribute("d", exclamationMark);
    }

    // flashMark flashes the warning mark
    #flashMark() {

        if (!this.warningFlashEnabled) {
            clearInterval(this.warningIntervalId);
            return;
        }

        if (!this.warningEnabled) {
            clearInterval(this.warningIntervalId);
            return;
        }

        let actual = "hidden";
        this.svgWarning.style.visibility = actual;

        this.warningIntervalId = setInterval(() => {
            actual = (actual === "hidden") ? "visible" : "hidden";
            this.svgWarning.style.visibility = actual;
        }, this.warningFlashInterval * 1000);

        setTimeout(() => {
            clearInterval(this.warningIntervalId);
            actual = "visible";
            this.svgWarning.style.visibility = actual;

            // Makes Warning hidden most of the time, while blinking
            this.svgWarning.style.visibility = "hidden";
            if (this.warningEnabled) {
                this.warningIntervalId = setTimeout(() => {
                    this.#flashMark();
                }, this.warningFlashUpdate * 1000);
            }

        }, this.warningFlashDuration * 1000);
    }
}
