import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import NotificationContainer from './components/ui/Notification'
import { ConfirmDialogContainer } from './components/ui/ConfirmDialog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>

      <NotificationContainer position="top-right" maxNotifications={5} />
      <ConfirmDialogContainer />
    </div>
  )
}

export default App
