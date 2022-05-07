const GRID_SIZE = 25;
const ARROW_SIZE = GRID_SIZE / 2;
const GRID_OFFSET = GRID_SIZE;
const axisStyle = {
    stroke: '#000',
    "stroke-width": 1,
};
const elevationStyle = {
    fill: '#123',
    'stroke-width': 0
};
const waterStyle = {
    fill: '#00f',
    'stroke-width': 0
};
const labelStyle = {
    'stroke-width': 0,
    fill: 'none',
};

const namespace = joint.shapes;
const graph = new joint.dia.Graph({}, { cellNamespace: namespace });
new joint.dia.Paper({
    el: document.getElementById('myholder'),
    model: graph,
    width: '100%',
    height: '90vh',
    gridSize: GRID_SIZE,
    drawGrid: true,
    cellViewNamespace: namespace,
    interactive: false,
});

const createArrow = () => new joint.shapes.standard.Path({
        size: { width: ARROW_SIZE * 2, height: ARROW_SIZE },
        attrs: {
            body: {
                refD: 'M 0 5 L 10 5 L 5 0 M 5 10 L 10 5',
                ...axisStyle,
                cursor: 'default',
            },
        }
    });

const addBlock = (x, height, maxHeight, style) =>
{
    const rect = new joint.shapes.standard.Rectangle();
    rect.position(x * GRID_SIZE + GRID_OFFSET, (maxHeight - height) * GRID_SIZE + GRID_OFFSET);
    rect.resize(GRID_SIZE, GRID_SIZE * height);
    rect.attr({
        body: {
            ...style
        },
    });
    rect.addTo(graph);
}

/**
 * Draws elevation block to canvas
 *
 * @param {number} x position on x-axis
 * @param {number} height elevation height
 * @param {number} maxHeight maximum elevation height - base level
 */
export const addElevation = (x, height, maxHeight) =>
{
    addBlock(x, height, maxHeight, elevationStyle);
}

/**
 * Draws water column to canvas
 *
 * @param {number} x position on x-axis
 * @param {number} height elevation height
 * @param {number} elevationHeight elevation height - water bottom level
 */
export const addWater = (x, height, elevationHeight) =>
{
    addBlock(x, height, elevationHeight, waterStyle);
}

/**
 * Draws x and y axis with arrows and labels on y-axis on canvas
 *
 * @param {number} x
 * @param {number} y
 */
export const prepareAxis = (x, y) =>
{
    const xAxis = new joint.shapes.standard.Path({
        position: { x: GRID_OFFSET, y: GRID_OFFSET * (y + 1) },
        size: { width: x * GRID_SIZE, height: 1 },
        attrs: {
            body: {
                refD: 'H 1',
                ...axisStyle,
            }
        }
    });
    xAxis.addTo(graph);
    const xAxisArrow = createArrow();
    xAxisArrow.position(GRID_OFFSET + x * GRID_SIZE, GRID_OFFSET * (y + 1) - ARROW_SIZE/2),
    xAxisArrow.addTo(graph);

    const yAxis = new joint.shapes.standard.Path({
        position: { x: GRID_OFFSET, y: GRID_OFFSET },
        size: { width: 1, height: y * GRID_SIZE },
        attrs: {
            body: {
                refD: 'V 1',
                ...axisStyle,
            }
        }
    });
    yAxis.addTo(graph);
    const yAxisArrow = createArrow();
    yAxisArrow.position(GRID_OFFSET - ARROW_SIZE, GRID_OFFSET - GRID_SIZE + ARROW_SIZE / 2),
    yAxisArrow.rotate(-90);
    yAxisArrow.addTo(graph);

    // y-axis labels
    for (let i = 0; i <= y; i += 1)
    {
        const yLabel = new joint.shapes.standard.TextBlock({
            size: { width: GRID_SIZE, height: GRID_SIZE },
            position: {
                x: GRID_OFFSET - GRID_SIZE,
                y: (y - i) * GRID_SIZE + GRID_SIZE / 2,
            },
            attrs: {
                label: {
                    text: i,
                },
                body: labelStyle,
            }
        });
        yLabel.addTo(graph);
    }
};

/**
 * Clears canvas
 */
export const clearCanvas = () =>
{
    graph.clear();
}