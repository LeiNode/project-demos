import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Project1.css'

type HopData = { fps: number, hops_ms: number[], total_count: number }

type Demo = { id: string, label: string }

const DEMOS: Demo[] = [
  { id: 'demo-1', label: 'Federer & Wawrinka' },
  { id: 'demo-2', label: 'Federer & Berdych' },
  { id: 'demo-3', label: 'Nicolas Jarry rally' },
]

// A hop is "current" while the video's playhead sits within this many ms of it,
// so the cue stays visible for a beat instead of flashing for a single frame.
const CUE_WINDOW_MS = 350

function Project1() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [activeDemo, setActiveDemo] = useState<Demo>(DEMOS[0])
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [uploadedName, setUploadedName] = useState<string | null>(null)
  const [hopData, setHopData] = useState<HopData | null>(null)
  const [count, setCount] = useState(0)
  const [cueOn, setCueOn] = useState(false)

  const isUpload = uploadedUrl !== null
  const videoSrc = isUpload ? uploadedUrl : `/split-step/${activeDemo.id}.mp4`

  useEffect(() => {
    if (isUpload) {
      setHopData(null)
      return
    }
    fetch(`/split-step/${activeDemo.id}-hops.json`)
      .then((res) => res.json())
      .then(setHopData)
      .catch(() => setHopData(null))
  }, [activeDemo, isUpload])

  useEffect(() => {
    setCount(0)
    setCueOn(false)
  }, [videoSrc])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hopData) return

    const handleTimeUpdate = () => {
      const ms = video.currentTime * 1000
      const passed = hopData.hops_ms.filter((t) => t <= ms)
      setCount(passed.length)

      const latest = passed[passed.length - 1]
      setCueOn(latest !== undefined && ms - latest <= CUE_WINDOW_MS)
    }

    const handleSeeking = () => {
      setCount(hopData.hops_ms.filter((t) => t <= video.currentTime * 1000).length)
      setCueOn(false)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('seeking', handleSeeking)
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('seeking', handleSeeking)
    }
  }, [hopData])

  const pickDemo = (demo: Demo) => {
    if (uploadedUrl) URL.revokeObjectURL(uploadedUrl)
    setUploadedUrl(null)
    setUploadedName(null)
    setActiveDemo(demo)
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (uploadedUrl) URL.revokeObjectURL(uploadedUrl)
    setUploadedUrl(URL.createObjectURL(file))
    setUploadedName(file.name)
  }

  return (
    <div className='project1-container'>
      <div className='project1-intro'>
        <h1>Split Step Counter</h1>
        <p>
          A computer vision model that watches a tennis rally, tracks the
          player's pose frame by frame, and counts every split step &mdash;
          the small hop players make just before their opponent strikes the
          ball. Pick a clip below to see the detector running on it; the
          badge lights up live each time it registers a hop.
        </p>
      </div>

      <div className='demo-picker'>
        {DEMOS.map((demo) => (
          <button
            key={demo.id}
            className={`demo-button ${!isUpload && activeDemo.id === demo.id ? 'active' : ''}`}
            onClick={() => pickDemo(demo)}
          >
            {demo.label}
          </button>
        ))}
        <button
          className={`demo-button upload-button ${isUpload ? 'active' : ''}`}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload your own video
        </button>
        <input
          ref={fileInputRef}
          type='file'
          accept='video/*'
          className='upload-input'
          onChange={handleUpload}
        />
      </div>

      <div className={`video-stage ${cueOn ? 'cue-active' : ''}`}>
        <video
          ref={videoRef}
          key={videoSrc}
          className='demo-video'
          src={videoSrc}
          controls
          loop={!isUpload}
          muted
          playsInline
        />
        {!isUpload && (
          <>
            <div className='hop-cue' aria-hidden='true'>SPLIT STEP!</div>
            <div className='hop-counter'>
              <span className='hop-counter-label'>Split Steps</span>
              <span className='hop-counter-value'>{count}</span>
            </div>
          </>
        )}
        {isUpload && (
          <div className='upload-note'>
            Playing {uploadedName} &mdash; live detection runs in the desktop
            app, so uploads here are playback-only (no hop badge).
          </div>
        )}
      </div>

      <Link to='/projects' className='back-link'>← Back to Projects</Link>
    </div>
  )
}

export default Project1
