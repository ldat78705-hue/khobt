const katex = require('katex');

function renderMathContent(text) {
  if (!text) return '';

  // Clean up scattered $ signs (e.g. from broken MathType imports)
  text = text.replace(/\$\s*\$/g, ' ');

  text = text.replace(/–/g, '-').replace(/—/g, '-'); // en-dash, em-dash -> hyphen
  text = text.replace(/\u00A0/g, ' '); // non-breaking space -> space
  text = text.replace(/[‘’]/g, "'").replace(/[“”]/g, '"'); // smart quotes -> normal quotes

  const placeholders = [];
  const PLACEHOLDER_PREFIX = '__KATEX_PLACEHOLDER_';
  const PLACEHOLDER_SUFFIX = '__';

  const storePlaceholder = (html) => {
    const idx = placeholders.length;
    placeholders.push(html);
    return `${PLACEHOLDER_PREFIX}${idx}${PLACEHOLDER_SUFFIX}`;
  };

  let result = text.replace(/\$\$([\s\S]*?)\$\$/g, (_, latex) => {
    try {
      const rendered = `<div class="katex-block">${katex.renderToString(latex.trim(), {
        displayMode: true, throwOnError: false, trust: true, strict: false,
      })}</div>`;
      return storePlaceholder(rendered);
    } catch {
      return storePlaceholder(`<div class="katex-error">${latex}</div>`);
    }
  });

  result = result.replace(/\$([^$]+?)\$/g, (_, latex) => {
    try {
      const rendered = katex.renderToString(latex.trim(), {
        displayMode: false, throwOnError: false, trust: true, strict: false,
      });
      return storePlaceholder(rendered);
    } catch {
      return storePlaceholder(`<span class="katex-error">${latex}</span>`);
    }
  });

  result = result.replace(/\n/g, '<br/>');

  result = result.replace(
    new RegExp(`${PLACEHOLDER_PREFIX}(\\d+)${PLACEHOLDER_SUFFIX}`, 'g'),
    (_, idx) => placeholders[parseInt(idx)]
  );

  return result;
}

const dbString = "Tính $A= $\\sqrt{18}+$\\sqrt{100}-3$\\sqrt{2}$$$.$";
console.log("DB String output:");
console.log(renderMathContent(dbString));

const dbString2 = "b) Rút gọn biểu thức Rút gọn biểu thức $P=$\\left($ $\\frac{x+1}{x-2$\\sqrt{x}$}-$\\frac{1}{$\\sqrt{x}-2}+$$\\frac{1}{$\\sqrt{x}$} \\right)$\\cdot$ $\\frac{$\\sqrt{x}-2}{$\\sqrt{x}+1}$$$$$$,$ với $x>0$ và $x\\ne 4.$";
console.log("\nDB String 2 output:");
console.log(renderMathContent(dbString2));

const dbString3 = "c) Tìm $a$ để đường thẳng $y=2x+a$ cắt đồ thị của hàm số $y=2{{x}^2}$ tại điểm có hoành độ bằng $-1.$";
console.log("\nDB String 3 output:");
console.log(renderMathContent(dbString3));
