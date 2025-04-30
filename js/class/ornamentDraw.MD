# OrnamentDraw Class

A classe OrnamentDraw é responsável por desenhar os ornamentos do bloco.

Basicamente ela deve desenhar um grupo de SVG com os desenhos do elemento.

Os métodos obrigatórios são:

### getSvg

Retorna o SVG com o desenho.

### updateOrnament(width, height)

Atualiza o SVG quando o mesmo é arrastado ou redimensionado.

### Exemplo
```javascript
    class OrnamentDraw {
        // Desenha o SVG com o conteúdo do bloco
        constructor(color = "white", arrowColor = "blue") {
            this.arrowColor = arrowColor;
            this.backgroundColor = "green";

            this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            this.svg.classList.add("border-svg");
            this.svg.setAttribute("preserveAspectRatio", "none");

            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
            marker.setAttribute("id", "arrowhead");
            marker.setAttribute("markerWidth", "10");
            marker.setAttribute("markerHeight", "7");
            marker.setAttribute("refX", "10");
            marker.setAttribute("refY", "3.5");
            marker.setAttribute("orient", "auto");
            marker.setAttribute("markerUnits", "strokeWidth");

            this.backgroundContent = document.createElementNS("http://www.w3.org/2000/svg", "path");
            this.backgroundContent.setAttribute("fill", this.backgroundColor);
            this.backgroundContent.setAttribute("stroke", "none");
            this.backgroundContent.setAttribute("stroke-linecap", "round");
            this.backgroundContent.setAttribute("stroke-linejoin", "round");
            this.backgroundContent.setAttribute("marker-end", "url(#arrowhead)");
            this.svg.appendChild(this.backgroundContent);

            this.borderArrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
            this.borderArrow.setAttribute("fill", "none");
            this.borderArrow.setAttribute("stroke", this.arrowColor);
            this.borderArrow.setAttribute("stroke-width", "4");
            this.borderArrow.setAttribute("stroke-linecap", "round");
            this.borderArrow.setAttribute("stroke-linejoin", "round");
            this.borderArrow.setAttribute("marker-end", "url(#arrowhead)");
            this.svg.appendChild(this.borderArrow);

            // marker.appendChild(arrowPath);
            defs.appendChild(marker);
            this.svg.appendChild(defs);
        }

        // Retorna o SVG do bloco
        getSvg() {
            return this.svg;
        }

        // Atualiza o tamanho do SVG
        updateOrnament(width, height) {
            this.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

            const margin = 10;
            const r = 20;

            const d1 = [

                // Desenha a seta superior direita
                `M ${margin + r} ${margin}`,
                `l 10 5`,

                `M ${margin + r} ${margin}`,
                `l 10 -5`,

                `M ${margin + r} ${margin}`,
                `H ${width - margin - r}`,
                `Q ${width - margin} ${margin}, ${width - margin} ${margin + r}`,
                `V ${height - margin - r}`,

                // Desenha a seta inferior esquerda
                `M ${width - margin - r} ${height - margin}`,
                `l -10 5`,

                `M ${width - margin - r} ${height - margin}`,
                `l -10 -5`,

                `M ${width - margin - r} ${height - margin}`,
                `H ${margin + r}`,
                `Q ${margin} ${height - margin}, ${margin} ${height - margin - r}`,
                `V ${margin + r}`,

            ].join(" ");

            this.borderArrow.setAttribute("d", d1);

            const d2 = [
                // Desenha o contorno arredondado
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

            this.backgroundContent.setAttribute("d", d2);
        }

    }

```

### Uso
```javascript
const container = document.getElementById("container");
const block = new ResizableDraggableBlock(container, 50, 50, 150, 150, "yellow", "red");

const ornamentDraw = new OrnamentDraw("yellow", "red");
block.setOrnamentDraw(ornamentDraw);
```
