import "./joint/node_modules/jquery/dist/jquery.js";
import "./joint/node_modules/lodash/lodash.js";
import "./joint/node_modules/backbone/backbone.js";
import "./joint/dist/joint.js";

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


