/**
 * OMML (Office Math Markup Language) → LaTeX converter
 * 
 * Parses the XML inside .docx files and converts math equations
 * from Microsoft's OMML format to LaTeX notation.
 * 
 * Supports: fractions, radicals, superscripts, subscripts, 
 * delimiters, matrices, accents, bars, and more.
 */

interface OmmlNode {
  tag: string;
  attrs: Record<string, string>;
  children: OmmlNode[];
  text?: string;
}

/**
 * Simple XML parser that extracts OMML nodes from document XML.
 * We parse only the m: namespace elements we care about.
 */
function parseXmlNodes(xml: string): OmmlNode[] {
  const nodes: OmmlNode[] = [];
  let pos = 0;

  function skipWhitespace() {
    while (pos < xml.length && /\s/.test(xml[pos])) pos++;
  }

  function parseNode(): OmmlNode | null {
    skipWhitespace();
    if (pos >= xml.length || xml[pos] !== '<') return null;
    if (xml[pos + 1] === '/') return null; // closing tag

    // Parse opening tag
    const tagStart = pos;
    pos++; // skip <
    let tagName = '';
    while (pos < xml.length && !/[\s/>]/.test(xml[pos])) {
      tagName += xml[pos++];
    }

    // Parse attributes
    const attrs: Record<string, string> = {};
    while (pos < xml.length && xml[pos] !== '>' && xml[pos] !== '/') {
      skipWhitespace();
      if (xml[pos] === '>' || xml[pos] === '/') break;
      let attrName = '';
      while (pos < xml.length && !/[\s=/>]/.test(xml[pos])) {
        attrName += xml[pos++];
      }
      if (xml[pos] === '=') {
        pos++; // skip =
        if (xml[pos] === '"') {
          pos++; // skip opening quote
          let attrVal = '';
          while (pos < xml.length && xml[pos] !== '"') {
            attrVal += xml[pos++];
          }
          pos++; // skip closing quote
          attrs[attrName] = attrVal;
        }
      }
    }

    // Self-closing tag
    if (xml[pos] === '/') {
      pos += 2; // skip />
      return { tag: tagName, attrs, children: [], text: undefined };
    }
    pos++; // skip >

    // Parse children and text
    const children: OmmlNode[] = [];
    let text = '';

    while (pos < xml.length) {
      if (xml[pos] === '<') {
        if (xml[pos + 1] === '/') {
          // Closing tag - skip it
          while (pos < xml.length && xml[pos] !== '>') pos++;
          pos++; // skip >
          break;
        }
        const child = parseNode();
        if (child) children.push(child);
      } else {
        text += xml[pos++];
      }
    }

    return { tag: tagName, attrs, children, text: text.trim() || undefined };
  }

  while (pos < xml.length) {
    if (xml[pos] === '<' && xml[pos + 1] !== '/') {
      const node = parseNode();
      if (node) nodes.push(node);
    } else {
      pos++;
    }
  }

  return nodes;
}

function findChild(node: OmmlNode, tag: string): OmmlNode | undefined {
  return node.children.find(c => c.tag === tag || c.tag.endsWith(':' + tag.split(':').pop()));
}

function findChildren(node: OmmlNode, tag: string): OmmlNode[] {
  const suffix = ':' + tag.split(':').pop();
  return node.children.filter(c => c.tag === tag || c.tag.endsWith(suffix));
}

function getTextContent(node: OmmlNode): string {
  if (node.text) return node.text;
  return node.children.map(c => getTextContent(c)).join('');
}

/** Convert a single OMML node to LaTeX */
function nodeToLatex(node: OmmlNode): string {
  const tag = node.tag.split(':').pop() || node.tag;

  switch (tag) {
    case 'oMath':
    case 'oMathPara':
      return node.children.map(c => nodeToLatex(c)).join('');

    case 'r': {
      // Math run - contains m:t (text)
      const tNode = findChild(node, 'm:t');
      if (!tNode) return getTextContent(node);
      const text = getTextContent(tNode);
      // Check style
      const rPr = findChild(node, 'm:rPr');
      if (rPr) {
        const sty = findChild(rPr, 'm:sty');
        if (sty) {
          const val = sty.attrs['m:val'];
          if (val === 'p') return text; // plain
          if (val === 'b') return `\\mathbf{${text}}`;
          if (val === 'bi') return `\\boldsymbol{${text}}`;
        }
      }
      return text;
    }

    case 'f': {
      // Fraction
      const num = findChild(node, 'm:num');
      const den = findChild(node, 'm:den');
      const numLatex = num ? num.children.map(c => nodeToLatex(c)).join('') : '?';
      const denLatex = den ? den.children.map(c => nodeToLatex(c)).join('') : '?';
      return `\\frac{${numLatex}}{${denLatex}}`;
    }

    case 'rad': {
      // Radical (square root or nth root)
      const radPr = findChild(node, 'm:radPr');
      const deg = findChild(node, 'm:deg');
      const e = findChild(node, 'm:e');
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '?';
      
      // Check if degree is hidden (square root)
      const degHide = radPr ? findChild(radPr, 'm:degHide') : null;
      const isSquareRoot = degHide?.attrs['m:val'] === '1';
      
      if (isSquareRoot || !deg || getTextContent(deg).trim() === '') {
        return `\\sqrt{${eLatex}}`;
      }
      const degLatex = deg.children.map(c => nodeToLatex(c)).join('');
      return `\\sqrt[${degLatex}]{${eLatex}}`;
    }

    case 'sSup': {
      // Superscript
      const e = findChild(node, 'm:e');
      const sup = findChild(node, 'm:sup');
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '?';
      const supLatex = sup ? sup.children.map(c => nodeToLatex(c)).join('') : '?';
      return `${eLatex}^{${supLatex}}`;
    }

    case 'sSub': {
      // Subscript
      const e = findChild(node, 'm:e');
      const sub = findChild(node, 'm:sub');
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '?';
      const subLatex = sub ? sub.children.map(c => nodeToLatex(c)).join('') : '?';
      return `${eLatex}_{${subLatex}}`;
    }

    case 'sSubSup': {
      // Subscript + Superscript
      const e = findChild(node, 'm:e');
      const sub = findChild(node, 'm:sub');
      const sup = findChild(node, 'm:sup');
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '?';
      const subLatex = sub ? sub.children.map(c => nodeToLatex(c)).join('') : '?';
      const supLatex = sup ? sup.children.map(c => nodeToLatex(c)).join('') : '?';
      return `${eLatex}_{${subLatex}}^{${supLatex}}`;
    }

    case 'd': {
      // Delimiter (parentheses, brackets, etc.)
      const dPr = findChild(node, 'm:dPr');
      let begChar = '(', endChar = ')';
      if (dPr) {
        const bc = findChild(dPr, 'm:begChr');
        const ec = findChild(dPr, 'm:endChr');
        if (bc) begChar = bc.attrs['m:val'] || '(';
        if (ec) endChar = ec.attrs['m:val'] || ')';
      }
      const elements = findChildren(node, 'm:e');
      const inner = elements.map(el => el.children.map(c => nodeToLatex(c)).join('')).join(', ');
      
      // Map delimiter chars to LaTeX
      const delimMap: Record<string, string> = {
        '(': '(', ')': ')', '[': '[', ']': ']',
        '{': '\\{', '}': '\\}', '|': '|',
        '⌈': '\\lceil', '⌉': '\\rceil',
        '⌊': '\\lfloor', '⌋': '\\rfloor',
        '⟨': '\\langle', '⟩': '\\rangle',
      };
      const left = delimMap[begChar] || begChar;
      const right = delimMap[endChar] || endChar;
      
      return `\\left${left}${inner}\\right${right}`;
    }

    case 'nary': {
      // N-ary operator (sum, product, integral, etc.)
      const naryPr = findChild(node, 'm:naryPr');
      const sub = findChild(node, 'm:sub');
      const sup = findChild(node, 'm:sup');
      const e = findChild(node, 'm:e');
      
      let op = '\\sum';
      if (naryPr) {
        const chr = findChild(naryPr, 'm:chr');
        if (chr) {
          const val = chr.attrs['m:val'];
          const opMap: Record<string, string> = {
            '∑': '\\sum', '∏': '\\prod', '∫': '\\int',
            '∬': '\\iint', '∭': '\\iiint', '∮': '\\oint',
            '⋃': '\\bigcup', '⋂': '\\bigcap',
          };
          op = opMap[val] || `\\operatorname{${val}}`;
        }
      }
      
      const subLatex = sub ? sub.children.map(c => nodeToLatex(c)).join('') : '';
      const supLatex = sup ? sup.children.map(c => nodeToLatex(c)).join('') : '';
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '';
      
      let result = op;
      if (subLatex) result += `_{${subLatex}}`;
      if (supLatex) result += `^{${supLatex}}`;
      result += ` ${eLatex}`;
      return result;
    }

    case 'func': {
      // Function (sin, cos, log, etc.)
      const fName = findChild(node, 'm:fName');
      const e = findChild(node, 'm:e');
      const name = fName ? fName.children.map(c => nodeToLatex(c)).join('') : '';
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '';
      
      // Known functions
      const knownFuncs = ['sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'log', 'ln', 'lim', 'max', 'min', 'gcd'];
      const cleanName = name.replace(/\\/g, '').trim();
      if (knownFuncs.includes(cleanName)) {
        return `\\${cleanName} ${eLatex}`;
      }
      return `\\operatorname{${cleanName}} ${eLatex}`;
    }

    case 'acc': {
      // Accent (hat, bar, vec, dot, etc.)
      const accPr = findChild(node, 'm:accPr');
      const e = findChild(node, 'm:e');
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '?';
      
      let accent = '\\hat';
      if (accPr) {
        const chr = findChild(accPr, 'm:chr');
        if (chr) {
          const val = chr.attrs['m:val'];
          const accMap: Record<string, string> = {
            '̂': '\\hat', '̃': '\\tilde', '̄': '\\bar',
            '⃗': '\\vec', '̇': '\\dot', '̈': '\\ddot',
            '⌢': '\\frown', '˘': '\\breve',
          };
          accent = accMap[val] || '\\hat';
        }
      }
      return `${accent}{${eLatex}}`;
    }

    case 'bar': {
      // Overbar/underbar
      const barPr = findChild(node, 'm:barPr');
      const e = findChild(node, 'm:e');
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '?';
      
      let pos = 'top';
      if (barPr) {
        const posNode = findChild(barPr, 'm:pos');
        if (posNode) pos = posNode.attrs['m:val'] || 'top';
      }
      return pos === 'bot' ? `\\underline{${eLatex}}` : `\\overline{${eLatex}}`;
    }

    case 'eqArr': {
      // Equation array (like align)
      const elements = findChildren(node, 'm:e');
      const lines = elements.map(el => el.children.map(c => nodeToLatex(c)).join(''));
      if (lines.length <= 1) return lines.join('');
      return `\\begin{aligned} ${lines.join(' \\\\ ')} \\end{aligned}`;
    }

    case 'm': {
      // Matrix
      const rows = findChildren(node, 'm:mr');
      const matrixLines = rows.map(row => {
        const cells = findChildren(row, 'm:e');
        return cells.map(cell => cell.children.map(c => nodeToLatex(c)).join('')).join(' & ');
      });
      return `\\begin{pmatrix} ${matrixLines.join(' \\\\ ')} \\end{pmatrix}`;
    }

    case 'limLow': {
      // Lower limit (e.g., lim_{x→∞})
      const e = findChild(node, 'm:e');
      const lim = findChild(node, 'm:lim');
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '';
      const limLatex = lim ? lim.children.map(c => nodeToLatex(c)).join('') : '';
      return `${eLatex}_{${limLatex}}`;
    }

    case 'limUpp': {
      // Upper limit
      const e = findChild(node, 'm:e');
      const lim = findChild(node, 'm:lim');
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '';
      const limLatex = lim ? lim.children.map(c => nodeToLatex(c)).join('') : '';
      return `${eLatex}^{${limLatex}}`;
    }

    case 'groupChr': {
      // Group character (underbrace, overbrace)
      const e = findChild(node, 'm:e');
      const eLatex = e ? e.children.map(c => nodeToLatex(c)).join('') : '?';
      return eLatex;
    }

    case 'borderBox':
    case 'box': {
      const e = findChild(node, 'm:e');
      return e ? e.children.map(c => nodeToLatex(c)).join('') : '';
    }

    // Properties nodes - skip
    case 'fPr': case 'radPr': case 'sSubPr': case 'sSupPr': 
    case 'sSubSupPr': case 'dPr': case 'naryPr': case 'ctrlPr':
    case 'accPr': case 'barPr': case 'funcPr': case 'eqArrPr':
    case 'mPr': case 'rPr': case 'limLowPr': case 'limUppPr':
    case 'groupChrPr': case 'borderBoxPr': case 'boxPr':
      return '';

    // Element containers
    case 'e': case 'num': case 'den': case 'sub': case 'sup':
    case 'deg': case 'lim': case 'fName':
      return node.children.map(c => nodeToLatex(c)).join('');

    case 't':
      return getTextContent(node);

    default:
      // For unknown tags, try to process children
      if (node.children.length > 0) {
        return node.children.map(c => nodeToLatex(c)).join('');
      }
      return node.text || '';
  }
}

/** Unicode → LaTeX symbol mapping for common math characters */
const UNICODE_TO_LATEX: Record<string, string> = {
  '≤': '\\leq', '≥': '\\geq', '≠': '\\neq', '≈': '\\approx',
  '±': '\\pm', '∓': '\\mp', '×': '\\times', '÷': '\\div',
  '∞': '\\infty', '∈': '\\in', '∉': '\\notin',
  '⊂': '\\subset', '⊃': '\\supset', '⊆': '\\subseteq', '⊇': '\\supseteq',
  '∪': '\\cup', '∩': '\\cap',
  '∀': '\\forall', '∃': '\\exists',
  '→': '\\to', '←': '\\leftarrow', '↔': '\\leftrightarrow',
  '⇒': '\\Rightarrow', '⇐': '\\Leftarrow', '⇔': '\\Leftrightarrow',
  '∠': '\\angle', '△': '\\triangle', '⊥': '\\perp', '∥': '\\parallel',
  '°': '^{\\circ}',
  'α': '\\alpha', 'β': '\\beta', 'γ': '\\gamma', 'δ': '\\delta',
  'ε': '\\varepsilon', 'ζ': '\\zeta', 'η': '\\eta', 'θ': '\\theta',
  'λ': '\\lambda', 'μ': '\\mu', 'π': '\\pi', 'ρ': '\\rho',
  'σ': '\\sigma', 'τ': '\\tau', 'φ': '\\varphi', 'ω': '\\omega',
  'Δ': '\\Delta', 'Σ': '\\Sigma', 'Π': '\\Pi', 'Φ': '\\Phi', 'Ω': '\\Omega',
  '∴': '\\therefore', '∵': '\\because',
  '⋅': '\\cdot', '…': '\\ldots', '⋯': '\\cdots',
  '′': "'", '″': "''",
};

function replaceUnicodeSymbols(latex: string): string {
  for (const [unicode, replacement] of Object.entries(UNICODE_TO_LATEX)) {
    latex = latex.split(unicode).join(replacement);
  }
  return latex;
}

/**
 * Extract text and math from the document XML, preserving paragraph structure.
 * Returns the full document text with OMML equations converted to $...$ LaTeX.
 */
export function extractDocxContent(documentXml: string): string {
  // We need to walk through the XML and extract text runs and math blocks in order
  const result: string[] = [];
  let currentParagraph = '';

  // Find all paragraphs (w:p elements) and process them
  const paragraphs = extractParagraphs(documentXml);
  
  for (const para of paragraphs) {
    const line = processParagraph(para);
    if (line !== null) {
      result.push(line);
    }
  }

  return result.join('\n');
}

/**
 * Extract paragraph XML blocks from document
 */
function extractParagraphs(xml: string): string[] {
  const paragraphs: string[] = [];
  // Match w:p elements (including nested content)
  let depth = 0;
  let start = -1;
  let pos = 0;
  
  while (pos < xml.length) {
    if (xml.startsWith('<w:p ', pos) || xml.startsWith('<w:p>', pos)) {
      if (depth === 0) start = pos;
      depth++;
    } else if (xml.startsWith('</w:p>', pos)) {
      depth--;
      if (depth === 0 && start >= 0) {
        paragraphs.push(xml.substring(start, pos + 6));
        start = -1;
      }
    }
    pos++;
  }
  
  return paragraphs;
}

/**
 * Process a single paragraph XML, returning its text with inline math
 */
function processParagraph(paraXml: string): string | null {
  const parts: string[] = [];
  let pos = 0;
  
  while (pos < paraXml.length) {
    // Look for math blocks (m:oMath or m:oMathPara)
    const mathIdx = findNextMath(paraXml, pos);
    // Look for text runs (w:r)
    const runIdx = paraXml.indexOf('<w:r ', pos);
    const runIdx2 = paraXml.indexOf('<w:r>', pos);
    const actualRunIdx = runIdx >= 0 && runIdx2 >= 0 ? Math.min(runIdx, runIdx2) :
                         runIdx >= 0 ? runIdx : runIdx2;

    if (mathIdx >= 0 && (actualRunIdx < 0 || mathIdx < actualRunIdx)) {
      // Process math block first
      const mathEnd = findMatchingClose(paraXml, mathIdx);
      if (mathEnd > mathIdx) {
        const mathXml = paraXml.substring(mathIdx, mathEnd);
        const nodes = parseXmlNodes(mathXml);
        let latex = nodes.map(n => nodeToLatex(n)).join('');
        latex = replaceUnicodeSymbols(latex);
        latex = cleanLatex(latex);
        if (latex.trim()) {
          parts.push(`$${latex.trim()}$`);
        }
        pos = mathEnd;
      } else {
        pos++;
      }
    } else if (actualRunIdx >= 0) {
      // Process text run
      const runEnd = findMatchingCloseTag(paraXml, actualRunIdx, 'w:r');
      if (runEnd > actualRunIdx) {
        const runXml = paraXml.substring(actualRunIdx, runEnd);
        // Extract text from w:t elements
        const textRegex = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;
        let textMatch;
        while ((textMatch = textRegex.exec(runXml)) !== null) {
          parts.push(textMatch[1]);
        }
        // Check for w:tab (tab character)
        if (runXml.includes('<w:tab')) {
          parts.push('\t');
        }
        // Check for w:br (line break)
        if (runXml.includes('<w:br')) {
          parts.push('\n');
        }
        pos = runEnd;
      } else {
        pos++;
      }
    } else {
      // No more runs or math in this paragraph
      break;
    }
  }
  
  const line = parts.join('').trim();
  return line || null;
}

function findNextMath(xml: string, startPos: number): number {
  const idx1 = xml.indexOf('<m:oMath>', startPos);
  const idx2 = xml.indexOf('<m:oMath ', startPos);
  const idx3 = xml.indexOf('<m:oMathPara>', startPos);
  const idx4 = xml.indexOf('<m:oMathPara ', startPos);
  
  const candidates = [idx1, idx2, idx3, idx4].filter(i => i >= 0);
  return candidates.length > 0 ? Math.min(...candidates) : -1;
}

function findMatchingClose(xml: string, startPos: number): number {
  // Determine the tag name
  const tagMatch = xml.substring(startPos).match(/^<([\w:]+)/);
  if (!tagMatch) return -1;
  return findMatchingCloseTag(xml, startPos, tagMatch[1]);
}

function findMatchingCloseTag(xml: string, startPos: number, tagName: string): number {
  let depth = 0;
  let pos = startPos;
  const openTag = `<${tagName}`;
  const closeTag = `</${tagName}>`;
  
  while (pos < xml.length) {
    if (xml.startsWith(openTag, pos) && (xml[pos + openTag.length] === ' ' || xml[pos + openTag.length] === '>')) {
      // Check for self-closing
      const gt = xml.indexOf('>', pos);
      if (gt >= 0 && xml[gt - 1] === '/') {
        if (depth === 0) return gt + 1;
      } else {
        depth++;
      }
      pos = gt >= 0 ? gt + 1 : pos + 1;
    } else if (xml.startsWith(closeTag, pos)) {
      depth--;
      if (depth === 0) return pos + closeTag.length;
      pos += closeTag.length;
    } else {
      pos++;
    }
  }
  return -1;
}

/** Clean up LaTeX output */
function cleanLatex(latex: string): string {
  return latex
    .replace(/\s+/g, ' ')          // collapse whitespace
    .replace(/\{\s+/g, '{')        // remove space after {
    .replace(/\s+\}/g, '}')        // remove space before }
    .replace(/\^\{(\w)\}/g, '^$1') // simplify single char superscript
    .replace(/_\{(\w)\}/g, '_$1')  // simplify single char subscript
    .trim();
}
