import "./joint/node_modules/jquery/dist/jquery.js";
import "./joint/node_modules/lodash/lodash.js";
import "./joint/node_modules/backbone/backbone.js";
import "./joint/dist/joint.js";
import * as graph from "./visualize.js";

// TASK 1

/**
 * @param {number[]} height
 * @return {number[]}
 */
const getTrappedWater = height => height.map((v, i, arr) => {
    const leftMax = Math.max(...arr.slice(0, i === 0 ? 0 : i));
    const rightMax = Math.max(...arr.slice(i + 1));
    return Math.max(0, Math.min(leftMax, rightMax) - v);    // 0 to avoid negative value
});

/**
 * @param {number[]} height
 * @return {number}
 */
const trap = height => _.sum(getTrappedWater(height));

const ex1 = [0,1,0,2,1,0,1,3,2,1,2,1];
const ex2 = [4,2,0,3,2,5];
const ex3 = [1,0,4,0,2,4,0,1,0,5,4,3,2,1,3,0,1,0,5];

console.log(`Input: height = ${ex1}`);
console.log(`Output: ${trap(ex1)}`);
console.log(`Input: height = ${ex2}`);
console.log(`Output: ${trap(ex2)}`);
console.log(`Input: height = ${ex3}`);
console.log(`Output: ${trap(ex3)}`);


// TASK 2

const generate = () =>
{
    const height = Array(_.random(20) + 3).fill(null).map(() => _.random(10));
    const maxHeight = Math.max(...height);
    const water = getTrappedWater(height);

    graph.clearCanvas();
    graph.prepareAxis(height.length, maxHeight);
    height.forEach((v, i) => {
        graph.addElevation(i, v, maxHeight);
        graph.addWater(i, water[i], maxHeight - v);
    });
}

// add 'Generate' button to DOM
const generateBtn = document.createElement('button');
generateBtn.type = 'button';
generateBtn.innerHTML = 'Generate'
generateBtn.addEventListener('click', generate);
document.body.prepend(generateBtn);

generate();