const katex = require('katex');
const html = katex.renderToString('\\dfrac{c}{a}', { displayMode: true });
console.log(html);
