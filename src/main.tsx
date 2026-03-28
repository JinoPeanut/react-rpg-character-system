import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { useCharacterStore } from './features/characters/store/characterStore'

  ; (window as any).devTools = {
    reset: () => useCharacterStore.getState().resetAll(),
    levelUp: () => useCharacterStore.getState().levelUp(),
    addGold: (amount: number) => useCharacterStore.getState().earnGold(amount),
    getState: () => useCharacterStore.getState(),
  }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
