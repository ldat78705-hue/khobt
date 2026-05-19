const fs = require('fs');
const path = require('path');

function replaceInFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      replaceInFiles(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('admin\\categories\\page.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // If GRADES.map is used
      if (content.includes('GRADES.map')) {
        console.log('Processing:', fullPath);
        
        // Add import { useGrades } from "@/lib/hooks"; if not exists
        if (!content.includes('useGrades')) {
          // Find last import
          const lastImportIdx = content.lastIndexOf('import ');
          if (lastImportIdx !== -1) {
            const endOfLine = content.indexOf('\n', lastImportIdx);
            content = content.substring(0, endOfLine + 1) + 'import { useGrades } from "@/lib/hooks";\n' + content.substring(endOfLine + 1);
          }
        }
        
        // Ensure the component has const activeGrades = useGrades();
        // This is tricky because we need to inject it inside the component function.
        // Instead of injecting a variable, let's just replace GRADES.map with useGrades().map
        // Note: useGrades() is a hook, so it MUST be called at the top level of a component.
        // We cannot just call useGrades().map inside JSX.
        // So we must inject `const activeGrades = useGrades();` inside the component.
        
        // Find the default export function
        const fnMatch = content.match(/export default function\s+([A-Za-z0-9_]+)\s*\([^)]*\)\s*\{/);
        if (fnMatch) {
          const fnName = fnMatch[1];
          const fnStart = fnMatch.index + fnMatch[0].length;
          content = content.substring(0, fnStart) + '\n  const activeGrades = useGrades();\n' + content.substring(fnStart);
          
          content = content.replace(/GRADES\.map/g, 'activeGrades.map');
          fs.writeFileSync(fullPath, content);
          console.log('Updated:', fullPath);
        } else {
          console.log('Failed to find export default function in:', fullPath);
        }
      }
    }
  }
}

replaceInFiles(path.join(__dirname, 'src/app'));
