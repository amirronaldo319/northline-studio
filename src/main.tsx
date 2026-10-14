import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/bricolage-grotesque/wght.css'
import './index.css'
import App from './App'

// Lets CSS know scripting is available, so scroll reveals only hide content when they can run.
document.documentElement.classList.add('js')

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build ships the page already rendered; attach to it. In development the root is empty.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
