const katex = require('katex');

const str = "P = \\frac{ \\sqrt{x} }{ \\frac{2x_{1}x_{2} + 2}{x_{1}x_{2}} + 2 } \\left( \\frac{x_{1}-1}{x_{1}} - \\frac{x_{2}-1}{x_{2}} \\right)^2";

const res = katex.renderToString(str, {
  throwOnError: false,
  strict: false
});

console.log(res);
