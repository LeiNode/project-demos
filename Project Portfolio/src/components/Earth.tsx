import "./Earth.css"

type Piece = { slot: string, shape: string }

// Each landmass is built from several overlapping pieces of different shapes
// rather than one single outline.
const landmasses: Record<string, Piece[]> = {
  namerica: [
    { slot: 'a', shape: 'hexagon' },
    { slot: 'b', shape: 'pentagon' },
    { slot: 'c', shape: 'triangle' },
  ],
  samerica: [
    { slot: 'a', shape: 'pentagon' },
    { slot: 'c', shape: 'triangle' },
    { slot: 'e', shape: 'diamond' },
  ],
  africa: [
    { slot: 'a', shape: 'hexagon' },
    { slot: 'b', shape: 'diamond' },
    { slot: 'c', shape: 'pentagon' },
  ],
  eurasia: [
    { slot: 'a', shape: 'hexagon' },
    { slot: 'b', shape: 'pentagon' },
    { slot: 'c', shape: 'triangle' },
    { slot: 'd', shape: 'diamond' },
    { slot: 'e', shape: 'hexagon' },
  ],
  australia: [
    { slot: 'a', shape: 'pentagon' },
    { slot: 'e', shape: 'triangle' },
  ],
}

function Landmass({ name, pieces }: { name: string, pieces: Piece[] }) {
  return (
    <div className={`landmass landmass-${name}`}>
      {pieces.map(({ slot, shape }, i) => (
        <span key={i} className={`piece piece-${slot} shape-${shape}`}></span>
      ))}
    </div>
  )
}

// One full turn of the planet's surface; drawn twice so the spin loops seamlessly
function SurfaceHalf() {
  return (
    <div className='earth-half'>
      {Object.entries(landmasses).map(([name, pieces]) => (
        <Landmass key={name} name={name} pieces={pieces} />
      ))}
      <span className='continent continent-antarctica'></span>
    </div>
  )
}

function Earth() {
  return (
    <div className='earth-wrapper' aria-hidden='true'>
      <div className='earth'>
        <div className='earth-surface'>
          <SurfaceHalf />
          <SurfaceHalf />
        </div>
        <div className='earth-shade'></div>
      </div>
    </div>
  )
}

export default Earth
