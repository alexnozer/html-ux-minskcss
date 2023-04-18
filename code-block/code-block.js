import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js';
export class CodeBlock extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-light.min.css">
			<style>
				:host {
					display: block;
					font-size: 16px;
					line-height: 1.5;
				}

				pre {
					margin: 0;
					font-family: inherit;
				}

				code {
					font-family: inherit;
					overflow: hidden;
					white-space: pre-wrap;
				}
			</style>
			${this._getHighlightedCode()}
		`;
	}

	_getHighlightedCode() {
		let code = this._cleanIndentation(this.innerHTML).trim();
		this.innerHTML = '';

		const codeNode = document.createElement('code');
		codeNode.classList.add(`language-${this.getAttribute('language')}`);
		codeNode.innerHTML = code;
		hljs.highlightElement(codeNode);
		
		return `<pre>${codeNode.outerHTML}</pre>`;
	}

	_cleanIndentation(str) {
    const pattern = str.match(/\s*\n[\t\s]*/);
    return str.replace(new RegExp(pattern, 'g'), '\n');
  }
}

customElements.define('code-block', CodeBlock);