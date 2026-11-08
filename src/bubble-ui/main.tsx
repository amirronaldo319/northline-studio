import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './page.css'
import { BubbleUiPage } from './BubbleUiPage'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

createRoot(root).render(
  <StrictMode>
    <BubbleUiPage />
  </StrictMode>,
)
