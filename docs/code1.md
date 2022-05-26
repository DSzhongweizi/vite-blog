```javascript
import MarkdownIt from 'markdown-it';
import prism from 'markdown-it-prism';

import "prismjs/components/prism-clike"
import "prismjs/components/prism-java"

function component() {
  const md = new MarkdownIt();
  md.use(prism);
  const element = document.createElement('div');
  return element;
}

document.body.appendChild(component());
```