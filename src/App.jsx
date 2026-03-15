import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <h1 className="text-4xl font-bold text-blue-400">
          Tailwind is Working 🚀
        </h1>
      </div>
    </>
  )
}

export default App;
