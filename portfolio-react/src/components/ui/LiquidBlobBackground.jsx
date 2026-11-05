import { useMemo } from 'react'

function LiquidBlobBackground({
  variant = 'default',
  className = '',
  blobCount = 3,
  reducedIntensity = false
}) {
  const blobs = useMemo(() => {
    const variants = {
      default: [
        { size: 'w-96 h-96', gradient: 'from-blue-400/30 via-indigo-400/20 to-purple-400/30', gradientDark: 'from-blue-600/15 via-indigo-600/10 to-purple-600/15', position: '-top-48 -left-48', animation: 'liquid-blob', blur: 'blur-3xl', speed: '8s' },
        { size: 'w-80 h-80', gradient: 'from-teal-300/20 via-emerald-400/20 to-cyan-400/20', gradientDark: 'from-teal-500/10 via-emerald-500/10 to-cyan-500/10', position: '-bottom-32 -right-32', animation: 'liquid-blob-2', blur: 'blur-3xl', speed: '12s' },
        { size: 'w-64 h-64', gradient: 'from-pink-300/20 via-rose-400/15 to-orange-300/20', gradientDark: 'from-pink-500/10 via-rose-500/10 to-orange-500/10', position: 'top-1/2 -right-20', animation: 'liquid-blob-3', blur: 'blur-3xl', speed: '10s' }
      ],
      warm: [
        { size: 'w-96 h-96', gradient: 'from-orange-400/20 via-rose-400/20 to-pink-400/20', gradientDark: 'from-orange-600/15 via-rose-600/10 to-pink-600/15', position: '-top-48 -left-48', animation: 'liquid-blob', blur: 'blur-3xl', speed: '8s' },
        { size: 'w-72 h-72', gradient: 'from-yellow-300/15 via-amber-400/15 to-orange-400/15', gradientDark: 'from-yellow-500/10 via-amber-500/10 to-orange-500/10', position: '-bottom-24 -right-24', animation: 'liquid-blob-2', blur: 'blur-3xl', speed: '12s' }
      ],
      cool: [
        { size: 'w-80 h-80', gradient: 'from-cyan-400/20 via-blue-400/20 to-indigo-400/20', gradientDark: 'from-cyan-600/15 via-blue-600/10 to-indigo-600/15', position: '-top-40 -left-32', animation: 'liquid-blob', blur: 'blur-3xl', speed: '10s' },
        { size: 'w-72 h-72', gradient: 'from-violet-300/15 via-purple-400/15 to-fuchsia-400/15', gradientDark: 'from-violet-500/10 via-purple-600/10 to-fuchsia-600/10', position: '-bottom-28 -right-28', animation: 'liquid-blob-2', blur: 'blur-3xl', speed: '14s' },
        { size: 'w-56 h-56', gradient: 'from-blue-300/15 via-sky-400/10 to-cyan-300/15', gradientDark: 'from-blue-500/10 via-sky-500/10 to-cyan-500/10', position: 'top-1/3 left-1/2', animation: 'liquid-blob-3', blur: 'blur-3xl', speed: '11s' }
      ]
    }
    const selected = variants[variant] || variants.default
    return selected.slice(0, reducedIntensity ? 2 : blobCount)
  }, [variant, blobCount, reducedIntensity])

  if (blobs.length === 0) return null

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="liquidBlob">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
              <animate attributeName="baseFrequency" values="0.015;0.02;0.015" dur="10s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G">
              <animate attributeName="scale" values="30;40;30" dur="8s" repeatCount="indefinite" />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`absolute ${blob.position} ${blob.size} ${blob.blur} ${blob.animation} opacity-70 dark:opacity-50 transition-all duration-1000`}
          style={{ animationDuration: blob.speed, willChange: 'transform, border-radius' }}
        >
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${blob.gradient}`} />
        </div>
      ))}
    </div>
  )
}

export default LiquidBlobBackground
