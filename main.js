/**
 * @param {number[]} height
 * @return {number}
 */
const trap = height => height.reduce((total, v, i, arr) => {
    const leftMax = Math.max(...arr.slice(0, i === 0 ? 0 : i));
    const rightMax = Math.max(...arr.slice(i + 1));
    return total + Math.max(0, Math.min(leftMax, rightMax) - v);    // 0 to avoid negative value
}, 0);