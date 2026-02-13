import { useMemo } from 'react'

function FallingHearts({ count = 25 }) {
	const hearts = useMemo(() => {
		return Array.from({ length: count }).map((_, i) => ({
			id: i,
			left: Math.random() * 100,
			delay: Math.random() * 5,
			duration: 6 + Math.random() * 6,
			size: 16 + Math.random() * 24
		}))
	}, [count])

	return (
		<div className="hearts-container">
			{hearts.map((heart) => (
				<span
					key={heart.id}
					className="heart"
					style={{
						left: `${heart.left}%`,
						animationDelay: `${heart.delay}s`,
						animationDuration: `${heart.duration}s`,
						fontSize: `${heart.size}px`
					}}
				>
					❤️
				</span>
			))}
		</div>
	)
}

export default FallingHearts
