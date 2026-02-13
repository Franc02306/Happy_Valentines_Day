import { useMemo, useRef, useState, useEffect } from 'react'
import { noMessages, MAX_SEVERITY } from './constants/noMessages'
import { yesMessages } from './constants/yesMessages'
import { Button } from 'primereact/button'
import { InputSwitch } from 'primereact/inputswitch'
import FinalCard from './FinalCard'

function App() {
  const [accepted, setAccepted] = useState(false)
  const [yesMessage, setYesMessage] = useState('')

  // Música
  const audioRef = useRef(null)
  const [musicOn, setMusicOn] = useState(false)

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (musicOn) {
      audioRef.current.pause()
    } else {
      audioRef.current.volume = 0.4
      audioRef.current.play()
    }

    setMusicOn(!musicOn)
  }

  // ===== ESTADOS – JUEGO DEL NO =====
  const [severity, setSeverity] = useState(0)

  const [message, setMessage] = useState(() => {
    const msgs = noMessages[0]
    return msgs[Math.floor(Math.random() * msgs.length)]
  })

  const [hideNo, setHideNo] = useState(false)
  const [centerYes, setCenterYes] = useState(false)
  // =================================

  // Nombre
  const name = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('name') || 'alguien especial'
  }, [])

  // Tema
  const [theme, setTheme] = useState('light')

  const noBtnRef = useRef(null)
  const btnCardRef = useRef(null)

  // Tema dinámico
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

  // ===== MOVIMIENTO DEL BOTÓN NO =====
  const moveNoButton = () => {
    const btn = noBtnRef.current
    const card = btnCardRef.current
    if (!btn || !card) return

    const cardRect = card.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    const padding = 20

    const maxX = cardRect.width - btnRect.width - padding
    const maxY = cardRect.height - btnRect.height - padding

    const x = Math.random() * maxX
    const y = Math.random() * maxY

    btn.style.position = 'absolute'
    btn.style.left = `${x}px`
    btn.style.top = `${y}px`
  }

  const handleNoClick = () => {
    if (severity >= MAX_SEVERITY) return

    const nextSeverity = severity + 1
    setSeverity(nextSeverity)

    const msgs = noMessages[nextSeverity]
    setMessage(msgs[Math.floor(Math.random() * msgs.length)])

    if (nextSeverity < MAX_SEVERITY) {
      moveNoButton()
    }

    if (nextSeverity === MAX_SEVERITY) {
      setHideNo(true)
      setCenterYes(true)
    }
  }

  const handleYesClick = () => {
    const msgs = yesMessages[severity] || yesMessages[0]
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)]

    setYesMessage(randomMsg)
    setAccepted(true)
  }

  // 🔥 Si aceptó → renderiza pantalla final
  if (accepted) {
    return <FinalCard message={yesMessage} theme={theme} />
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

        <Button
          icon={musicOn ? 'pi pi-pause' : 'pi pi-play'}
          rounded
          severity="secondary"
          className="music-btn"
          onClick={toggleMusic}
        />
      </div>

      {/* Card principal */}
      <section className="card">
        <h1 className="title">¿Quieres ser mi San Valentín?</h1>
        <h2 className="name">Para: {name} ❤️</h2>
      </section>

      {/* Card botones */}
      <section
        className={`card buttons-card ${centerYes ? 'center-yes' : ''}`}
        ref={btnCardRef}
      >
        <Button
          label="Sí 💖"
          onClick={handleYesClick}
          className="p-button-rounded p-button-lg btn-yes"
        />

        {!hideNo && (
          <Button
            ref={noBtnRef}
            label="No 😭"
            onClick={handleNoClick}
            className="p-button-rounded p-button-lg btn-no"
          />
        )}
      </section>

      {/* Mensaje dinámico */}
      <section className="glass-text-box">
        <p>{message}</p>
      </section>

      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="/music/Lofi_Sv.mp3" type="audio/mpeg" />
      </audio>
    </main>
  )
}

export default App
