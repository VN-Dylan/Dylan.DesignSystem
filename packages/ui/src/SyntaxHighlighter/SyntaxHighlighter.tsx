import { useState } from 'react'
import { PrismLight as ReactSyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import { TbIcons } from '@vn-dylan/icons'
import { classNames } from '@vn-dylan/utils'
import './SyntaxHighlighter.scss'

// PrismLight ships no grammars by default — register the languages the design
// system documents its examples in. Consumers can register more via
// `SyntaxHighlighter.registerLanguage` on the underlying export if needed.
for (const [name, grammar] of Object.entries({
  bash,
  css,
  json,
  jsx,
  markup,
  html: markup,
  python,
  scss,
  tsx,
  typescript,
  ts: typescript,
  javascript,
  js: javascript,
  yaml,
})) {
  ReactSyntaxHighlighter.registerLanguage(name, grammar)
}

export interface SyntaxHighlighterProps {
  /** Source code to render. */
  children: string
  /** Language name (`tsx`, `bash`, `json`, …). @default 'tsx' */
  language?: string
  /** Show line numbers. */
  showLineNumbers?: boolean
  /** Show a copy-to-clipboard button. @default true */
  copyable?: boolean
  className?: string
}

const prefersDark = () =>
  typeof document !== 'undefined' &&
  (document.documentElement.classList.contains('dark') ||
    window.matchMedia?.('(prefers-color-scheme: dark)').matches)

/**
 * Syntax-highlighted code block (Prism via `react-syntax-highlighter`), themed
 * to match light/dark mode, with an optional copy button.
 */
export function SyntaxHighlighter({
  children,
  language = 'tsx',
  showLineNumbers = false,
  copyable = true,
  className,
}: SyntaxHighlighterProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className={classNames('dyl-syntax', className)}>
      {copyable && (
        <button
          type="button"
          className="dyl-syntax__copy"
          aria-label={copied ? 'Copied' : 'Copy code'}
          onClick={copy}
        >
          {copied ? <TbIcons.TbCheck /> : <TbIcons.TbCopy />}
        </button>
      )}
      <ReactSyntaxHighlighter
        language={language}
        style={prefersDark() ? oneDark : oneLight}
        showLineNumbers={showLineNumbers}
        customStyle={{ margin: 0, background: 'transparent', fontSize: '0.85rem' }}
        codeTagProps={{ style: { fontFamily: 'var(--dyl-font-mono)' } }}
      >
        {children}
      </ReactSyntaxHighlighter>
    </div>
  )
}
