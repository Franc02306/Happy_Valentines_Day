import FallingHearts from "./FallingHearts"

function FinalCard({ message, theme }) {
  return (
    <main className={`valentine-bg ${theme}`}>
      <FallingHearts />
      <section className="card final-card">

        {/* 🎥 Video arriba del texto */}
        <video
          src="/gifs/gif_bears.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="final-video"
        />

        <h1>💖</h1>
        <h2>{message}</h2>
      </section>
    </main>
  )
}

export default FinalCard
