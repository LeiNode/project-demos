import "./Earth.css"

const continents = [1, 2, 3, 4, 5, 6]
const clouds = [1, 2, 3]

// One full turn of the planet's surface; drawn twice so the spin loops seamlessly
function SurfaceHalf() {
  return (
    <div className='earth-half'>
      {continents.map((n) => <span key={`continent-${n}`} className={`continent continent-${n}`}></span>)}
      {clouds.map((n) => <span key={`cloud-${n}`} className={`cloud cloud-${n}`}></span>)}
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
