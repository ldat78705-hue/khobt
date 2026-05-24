const katex = require('katex');
const html = katex.renderToString('\\dfrac{c}{a}', { displayMode: false });
console.log(html);
