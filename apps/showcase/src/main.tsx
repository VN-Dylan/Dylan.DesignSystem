import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// In dev, `@vn-dylan/ui` is aliased to source and imports its own SCSS entry.
// A production build against the published package would add:
//   import '@vn-dylan/ui/styles.css'
import '@vn-dylan/tokens/scss/brand-booking'
import { App } from './App'

const container = document.getElementById('root')
if (!container) throw new Error('#root not found')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
