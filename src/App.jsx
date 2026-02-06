import { useMemo, useRef, useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'

function App() {
  const name = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('name') || 'alguien especial'
  }, [])

  const [theme, setTheme] = useState('light')

  const noBtnRef = useRef(null)
  const btnCardRef = useRef(null)

  // Cargar tema dinámicamente
  useEffect(() => {
    const themeLinkId = 'primereact-theme'

    let link = document.getElementById(themeLinkId)
    if (!link) {
      link = document.createElement('link')
      link.id = themeLinkId
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }

    link.href =
      theme === 'light'
        ? 'https://unpkg.com/primereact/resources/themes/lara-light-pink/theme.css'
        : 'https://unpkg.com/primereact/resources/themes/lara-dark-pink/theme.css'
  }, [theme])

  const moveNoButton = () => {
    const btn = noBtnRef.current
    const card = btnCardRef.current
    if (!btn || !card) return

    const cardRect = card.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    const padding = 20

    const maxX = (cardRect.width - btnRect.width) / 2 - padding
    const maxY = (cardRect.height - btnRect.height) / 2 - padding

    const x = Math.random() * (maxX * 2) - maxX
    const y = Math.random() * (maxY * 2) - maxY

    btn.style.transition = 'transform 0.08s linear'
    btn.style.transform = `translate(${x}px, ${y}px)`
  }

  return (
    <main className={`valentine-bg ${theme}`}>
      {/* Toggle de tema */}
      <div className="theme-switch">
        <span className={`icon sun ${theme === 'light' ? 'active' : ''}`}>☀️</span>

        <InputSwitch
          checked={theme === 'dark'}
          onChange={(e) => setTheme(e.value ? 'dark' : 'light')}
        />

        <span className={`icon moon ${theme === 'dark' ? 'active' : ''}`}>🌙</span>
      </div>

      {/* Card del mensaje */}
      <section className="card">
        <h1 className="title">¿Quieres ser mi San Valentín?</h1>
        <h2 className="name">Para: {name} ❤️</h2>
      </section>

      {/* Card de botones */}
      <section className="card buttons-card" ref={btnCardRef}>
        <Button label="Sí 💖" className="p-button-rounded p-button-lg btn-yes" />

        <Button
          ref={noBtnRef}
          label="No 😭"
          onClick={() => console.log("CLIC EN NO")}
          className="p-button-rounded p-button-lg btn-no"
          onMouseEnter={moveNoButton}
          onMouseMove={moveNoButton}
        />
      </section>
    </main>
  )
}

export default App
