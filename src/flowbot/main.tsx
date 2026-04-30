import React from 'react'
import { createRoot } from 'react-dom/client'
import { FlowbotPage } from './FlowbotPage'
import './flowbot.css'

createRoot(document.getElementById('flowbot-root')!).render(
  <React.StrictMode>
    <FlowbotPage />
  </React.StrictMode>
)
