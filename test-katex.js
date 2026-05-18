const katex = require('katex');

const res = katex.renderToString("A = \\sqrt{18} + \\sqrt{100} – 3\\sqrt{2}", {
  throwOnError: false,
  strict: false
});

console.log(res);

const res2 = katex.renderToString("P = \\left( \\frac{x+1}{x-2\\sqrt{x}} - \\frac{1}{\\sqrt{x}-2} + \\frac{1}{\\sqrt{x}} \\right) \\cdot \\frac{\\sqrt{x}-2}{\\sqrt{x}+1}", {
  throwOnError: false,
  strict: false
});

console.log("\nRES2:");
console.log(res2);
