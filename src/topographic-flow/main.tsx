import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './page.css'
import { Page } from './Page'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
