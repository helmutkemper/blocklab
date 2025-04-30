// DrawUtils is a utility class that provides methods for drawing and manipulating shapes
class DrawUtils {

    polygon(sides, radius, width, height, rotation) {
        // Center of the canvas
        const cx = width / 2;
        const cy = height / 2;

        // Radius of the hexagon (distance from center to each point)
        // const r = Math.min(width - marginInternal - 2*margin, height - marginInternal - 2*margin) / 2;

        // Number of sides
        // const sides = 6;

        // Rotate slightly to have a flat base
        // const rotation = 0; // -Math.PI / 2;

        // Generate the points of the hexagon
        const points = [];

        for (let i = 0; i <= sides; i++) {
            const angle = (2 * Math.PI * i) / sides + rotation;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            points.push([x, y]);
        }

        return points;
    }

    // pointsInTheBox receives a list of points drawn in a square box and calculates the new coordinates for when the box is resized
    //
    // Example:
    //
    //   Imagine de exclamation mark draw by the path:
    //
    //   M 185 120 L 190 240 L 210 240 L 215 120 L 185 120 z
    //
    //   M 190 260 L 190 280 L 210 280 L 210 260 L 190 260 z
    //
    //   points: [[185, 120], [190, 240], [210, 240], [215, 120], [185, 120],
    //            [190, 260], [190, 280], [210, 280], [210, 260], [190, 260]]
    //
    //   size from center: Math.min(width-2*margin, height-2*margin) / 2;
    //
    //   width and height are the new width and height of the box
    pointsInTheBox(points, size, width, height, rotation) {
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        for (const [x, y] of points) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
        }

        const shapeWidth = maxX - minX;
        const shapeHeight = maxY - minY;

        const scale = size / Math.max(shapeWidth, shapeHeight);

        const centerX = width / 2;
        const centerY = height / 2;

        const cosA = Math.cos(rotation);
        const sinA = Math.sin(rotation);

        let pointsCalculated = [];

        for (let i = 0; i < points.length; i++) {
            const [x, y] = points[i];

            // Normaliza em relação ao centro da forma
            const normX = (x - (minX + shapeWidth / 2)) * scale;
            const normY = (y - (minY + shapeHeight / 2)) * scale;

            // Aplica rotação
            const rotX = normX * cosA - normY * sinA;
            const rotY = normX * sinA + normY * cosA;

            // Desloca para o centro do canvas
            const px = centerX + rotX;
            const py = centerY + rotY;

            pointsCalculated.push([px, py]);
        }

        return pointsCalculated;
    }
}
