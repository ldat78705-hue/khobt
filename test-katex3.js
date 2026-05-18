const katex = require('katex');

const str = "A = \\sqrt{18} + \\sqrt{100} \u2212 3\\sqrt{2}";
try {
  katex.renderToString(str, { throwOnError: true });
  console.log("SUCCESS U+2212");
} catch (e) {
  console.log("ERROR U+2212:", e.message);
}
