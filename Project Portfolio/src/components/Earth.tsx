import { Link } from 'react-router-dom'
import "./Earth.css"

// top / left / width / height are percentages of the landmass's own box,
// so 0 is its top or left edge and 100 is its bottom or right edge.
type Piece = { shape: string, top: number, left: number, width: number, height: number }

// A landmass with a label and a link is a menu item; one without is just scenery.
type Landmass = { name: string, pieces: Piece[], label?: string, to?: string }

// Each landmass is built from several overlapping pieces of different shapes
// rather than one single outline.
const landmasses: Landmass[] = [
  {
    name: 'namerica', label: 'About Me', to: '/about',
    pieces: [
      { shape: 'hexagon',  top: 0,  left: 5,  width: 65, height: 55 },
      { shape: 'pentagon', top: 30, left: 40, width: 60, height: 60 },
      { shape: 'triangle', top: 55, left: 0,  width: 50, height: 45 },
    ],
  },
  {
    name: 'samerica',
    pieces: [
      { shape: 'pentagon', top: 0,  left: 5,  width: 65, height: 55 },
      { shape: 'triangle', top: 55, left: 0,  width: 50, height: 45 },
      { shape: 'diamond',  top: 60, left: 55, width: 40, height: 40 },
    ],
  },
  {
    name: 'eurasia', label: 'Projects', to: '/projects',
    pieces: [
      { shape: 'hexagon',  top: 0,  left: 5,  width: 65, height: 55 },
      { shape: 'pentagon', top: 30, left: 40, width: 60, height: 60 },
      { shape: 'triangle', top: 55, left: 0,  width: 50, height: 45 },
      { shape: 'diamond',  top: 0,  left: 55, width: 45, height: 40 },
      { shape: 'hexagon',  top: 60, left: 55, width: 40, height: 40 },
    ],
  },
  {
    name: 'africa', label: 'Connect', to: '/connect',
    pieces: [
      { shape: 'hexagon',  top: 0,  left: 5,  width: 65, height: 55 },
      { shape: 'diamond',  top: 30, left: 40, width: 60, height: 60 },
      { shape: 'pentagon', top: 55, left: 0,  width: 50, height: 45 },
    ],
  },
  {
    name: 'australia',
    pieces: [
      { shape: 'pentagon', top: 0,  left: 5,  width: 65, height: 55 },
      { shape: 'triangle', top: 60, left: 55, width: 40, height: 40 },
    ],
  },
]

function LandmassShape({ landmass }: { landmass: Landmass }) {
  const { name, pieces, label, to } = landmass
  const className = `landmass landmass-${name}`

  const shapes = pieces.map(({ shape, top, left, width, height }, i) => (
    <span
      key={i}
      className={`piece shape-${shape}`}
      style={{ top: `${top}%`, left: `${left}%`, width: `${width}%`, height: `${height}%` }}
    ></span>
  ))

  if (to) {
    return (
      <Link to={to} className={`${className} landmass-link`}>
        {shapes}
        <span className='landmass-label'>{label}</span>
      </Link>
    )
  }

  return <div className={className} aria-hidden='true'>{shapes}</div>
}

function Earth() {
  return (
    <div className='earth'>
      {landmasses.map((landmass) => (
        <LandmassShape key={landmass.name} landmass={landmass} />
      ))}
      <div className='ice-cap' aria-hidden='true'></div>
      <div className='earth-shade' aria-hidden='true'></div>
    </div>
  )
}

export default Earth
