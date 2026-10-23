import styles from './ProjectCover.module.css'

const RED = '#ff4d4d'
const FAINT = 'rgba(255,255,255,0.14)'
const DIM = 'rgba(255,255,255,0.07)'

// Deterministic pseudo-random so covers render identically every time
function rand(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function Motif({ type }) {
  switch (type) {
    case 'rl': {
      const dots = []
      for (let x = 0; x < 12; x++) for (let y = 0; y < 7; y++) dots.push([200 + x * 24, 40 + y * 34])
      return (
        <g>
          {dots.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill={FAINT} />)}
          <polyline points="200,244 248,210 272,176 320,176 344,108 392,108 416,74 464,40" fill="none" stroke={RED} strokeWidth="2" />
          <polyline points="200,244 224,244 272,210 296,244 344,210 368,176 440,176 464,142" fill="none" stroke={FAINT} strokeWidth="1.5" strokeDasharray="4 5" />
          {[[248, 210], [344, 108], [416, 74]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" fill={RED} />)}
          <circle cx="464" cy="40" r="9" fill="none" stroke={RED} strokeWidth="1.5" />
        </g>
      )
    }
    case 'medical':
      return (
        <g>
          {[30, 60, 90, 120].map((r) => <circle key={r} cx="340" cy="150" r={r} fill="none" stroke={r === 120 ? DIM : FAINT} />)}
          <path d="M340 10v280M200 150h280" stroke={DIM} />
          <path d="M318 112c22-14 54-6 62 18 8 22-4 34-14 46-12 14-38 22-54 6-18-18-16-56 6-70z" fill="rgba(255,77,77,0.18)" stroke={RED} strokeWidth="2" />
          <path d="M300 150h-14M380 150h14M340 110V96M340 190v14" stroke={RED} strokeWidth="2" />
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2
            return <line key={i} x1={340 + Math.cos(a) * 126} y1={150 + Math.sin(a) * 126} x2={340 + Math.cos(a) * 134} y2={150 + Math.sin(a) * 134} stroke={FAINT} />
          })}
        </g>
      )
    case 'sql': {
      const r = rand(7)
      return (
        <g>
          <text x="214" y="56" fill={FAINT} fontFamily="ui-monospace, monospace" fontSize="13">SELECT name, score FROM runs</text>
          <text x="214" y="76" fill={RED} fontFamily="ui-monospace, monospace" fontSize="13">WHERE accuracy &gt; 0.87;</text>
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 4 }, (_, col) => {
              const hit = row === 2 || (row === 4 && col === 1)
              return (
                <rect key={`${row}-${col}`} x={214 + col * 62} y={100 + row * 32} width={56} height={24} rx="4"
                  fill={hit ? 'rgba(255,77,77,0.22)' : DIM} stroke={hit ? RED : 'none'}
                  opacity={hit ? 1 : 0.6 + r() * 0.4} />
              )
            })
          )}
        </g>
      )
    }
    case 'gan': {
      const cells = []
      let x = 200
      ;[40, 28, 20, 14, 10, 7].forEach((size, i) => {
        for (let y = 30; y + size <= 270; y += size + 3) cells.push({ x, y, size, i })
        x += size + 6
      })
      const r = rand(3)
      return (
        <g>
          {cells.map((c, k) => (
            <rect key={k} x={c.x} y={c.y} width={c.size} height={c.size} rx={c.size / 6}
              fill={r() > 0.86 ? RED : `rgba(255,255,255,${0.04 + c.i * 0.025})`} />
          ))}
        </g>
      )
    }
    case 'agents': {
      const nodes = [[260, 80], [380, 60], [440, 150], [330, 160], [240, 220], [400, 240]]
      const edges = [[0, 1], [1, 2], [0, 3], [1, 3], [2, 3], [3, 4], [3, 5], [2, 5], [0, 4]]
      return (
        <g>
          {edges.map(([a, b]) => <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={FAINT} />)}
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 3 ? 12 : 7} fill={i === 3 ? RED : '#1b1b20'} stroke={i === 3 ? 'none' : FAINT} />
          ))}
          <circle cx="330" cy="160" r="26" fill="none" stroke={RED} strokeOpacity="0.4" />
        </g>
      )
    }
    case 'nlp': {
      const r = rand(11)
      return (
        <g>
          {Array.from({ length: 6 }, (_, row) => {
            let x = 210
            return Array.from({ length: 4 }, (_, i) => {
              const w = 30 + r() * 46
              const el = (
                <rect key={`${row}-${i}`} x={x} y={44 + row * 36} width={w} height={18} rx="9"
                  fill={row === 3 && i === 1 ? RED : DIM} />
              )
              x += w + 8
              return el
            })
          })}
        </g>
      )
    }
    case 'flight':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M210 ${230 - i * 30} Q 340 ${40 - i * 10} 470 ${200 - i * 40}`} fill="none" stroke={i === 1 ? RED : FAINT} strokeWidth={i === 1 ? 2 : 1} strokeDasharray={i === 1 ? 'none' : '4 6'} />
          ))}
          <circle cx="210" cy="200" r="5" fill={RED} />
          <circle cx="470" cy="160" r="5" fill="none" stroke={RED} strokeWidth="2" />
        </g>
      )
    case 'timeseries':
    default: {
      const r = rand(5)
      const pts = Array.from({ length: 14 }, (_, i) => [200 + i * 14, 180 - i * 4 + Math.sin(i * 1.3) * 22 + r() * 10])
      const last = pts[pts.length - 1]
      return (
        <g>
          {[60, 120, 180, 240].map((y) => <line key={y} x1="200" x2="470" y1={y} y2={y} stroke={DIM} />)}
          <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={FAINT} strokeWidth="2" />
          <path d={`M${last[0]} ${last[1]} L470 ${last[1] - 70} L470 ${last[1] - 10} Z`} fill="rgba(255,77,77,0.12)" />
          <path d={`M${last[0]} ${last[1]} Q 420 ${last[1] - 20} 470 ${last[1] - 40}`} fill="none" stroke={RED} strokeWidth="2" strokeDasharray="5 5" />
        </g>
      )
    }
  }
}

export default function ProjectCover({ project, index, size = 'md' }) {
  return (
    <div className={`${styles.cover} ${styles[size]}`}>
      <svg className={styles.art} data-cover-art viewBox="0 0 480 300" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
        <Motif type={project.motif} />
        <path d="M-20 250 C 120 170, 240 320, 500 200" fill="none" stroke={RED} strokeOpacity="0.35" strokeWidth="1.25" />
      </svg>
      <div className={styles.meta}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        {project.year && <span>{project.year}</span>}
      </div>
      {project.metric && (
        <div className={styles.metric}>
          <span className={styles.metricValue}>{project.metric.value}</span>
          <span className={styles.metricLabel}>{project.metric.label}</span>
        </div>
      )}
    </div>
  )
}
