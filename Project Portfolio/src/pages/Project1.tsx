import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Page.css'
import './Project1.css'

type HopData = { hops_ms: number[] }

type Demo = { id: string, label: string }

// demo-3 (Nicolas Jarry rally) is left out: the detector finds no split steps
// in it yet, so it would show a counter stuck at 0.
const DEMOS: Demo[] = [
  { id: 'demo-1', label: 'Federer & Wawrinka' },
  { id: 'demo-2', label: 'Federer & Berdych' },
]

// A hop is "current" while the video's playhead sits within this many ms of it,
// so the cue stays visible for a beat instead of flashing for a single frame.
const CUE_WINDOW_MS = 350

// Rejects anything that isn't a list of hop times, e.g. an HTML error page,
// and sorts the times since the counter relies on them being in order.
function parseHopData(json: unknown): HopData {
  const hops = (json as { hops_ms?: unknown } | null)?.hops_ms
  if (!Array.isArray(hops) || !hops.every((t) => typeof t === 'number' && Number.isFinite(t))) {
    throw new Error('Malformed hop data')
  }
  return { hops_ms: [...hops].sort((a, b) => a - b) }
}

// Number of hops at or before `ms`; hops are sorted.
function countPassed(hops: number[], ms: number) {
  const next = hops.findIndex((t) => t > ms)
  return next === -1 ? hops.length : next
}

function Project1() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [activeDemo, setActiveDemo] = useState<Demo>(DEMOS[0])
  const [upload, setUpload] = useState<{ url: string, name: string } | null>(null)
  // Hop data tagged with the demo it belongs to; data is null if loading it failed
  const [loaded, setLoaded] = useState<{ id: string, data: HopData | null } | null>(null)
  const [count, setCount] = useState(0)
  const [cueOn, setCueOn] = useState(false)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  const isUpload = upload !== null
  const videoSrc = isUpload ? upload.url : `/split-step/${activeDemo.id}.mp4`
  const loadedForDemo = !isUpload && loaded?.id === activeDemo.id ? loaded : null
  const hopData = loadedForDemo?.data ?? null
  const hopDataFailed = loadedForDemo !== null && loadedForDemo.data === null
  const videoFailed = failedSrc === videoSrc

  useEffect(() => {
    if (isUpload) return
    const id = activeDemo.id
    // Aborting means a slow response for a demo the visitor already left
    // can't overwrite the data for the one they're watching now
    const controller = new AbortController()
    fetch(`/split-step/${id}-hops.json`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => setLoaded({ id, data: parseHopData(json) }))
      .catch(() => {
        if (!controller.signal.aborted) setLoaded({ id, data: null })
      })
    return () => controller.abort()
  }, [activeDemo.id, isUpload])

  // Re-run on videoSrc too: the <video> is keyed by its source, so switching
  // clips mounts a new element and the listeners have to move to it.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !hopData) return
    const hops = hopData.hops_ms

    const update = () => {
      const ms = video.currentTime * 1000
      const passed = countPassed(hops, ms)
      setCount(passed)
      const latest = hops[passed - 1]
      setCueOn(latest !== undefined && ms - latest <= CUE_WINDOW_MS)
    }
    const clearCue = () => setCueOn(false)

    // timeupdate only fires about every 250ms, which makes the cue visibly
    // late, so check on every rendered frame where the browser supports it
    let frameHandle: number | null = null
    const onFrame = () => {
      update()
      frameHandle = video.requestVideoFrameCallback(onFrame)
    }
    if (typeof video.requestVideoFrameCallback === 'function') {
      frameHandle = video.requestVideoFrameCallback(onFrame)
    }

    video.addEventListener('timeupdate', update)
    video.addEventListener('seeking', clearCue)
    video.addEventListener('seeked', update)
    return () => {
      if (frameHandle !== null) video.cancelVideoFrameCallback(frameHandle)
      video.removeEventListener('timeupdate', update)
      video.removeEventListener('seeking', clearCue)
      video.removeEventListener('seeked', update)
    }
  }, [hopData, videoSrc])

  // Frees the uploaded file's object URL once it's replaced or the page closes
  useEffect(() => {
    if (!upload) return
    return () => URL.revokeObjectURL(upload.url)
  }, [upload])

  const resetCounter = () => {
    setCount(0)
    setCueOn(false)
  }

  const pickDemo = (demo: Demo) => {
    setUpload(null)
    setActiveDemo(demo)
    resetCounter()
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    // Cleared so choosing the same file again still fires a change event
    e.target.value = ''
    if (!file) return
    setUpload({ url: URL.createObjectURL(file), name: file.name })
    resetCounter()
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
            type='button'
            className={`demo-button ${!isUpload && activeDemo.id === demo.id ? 'active' : ''}`}
            aria-pressed={!isUpload && activeDemo.id === demo.id}
            onClick={() => pickDemo(demo)}
          >
            {demo.label}
          </button>
        ))}
        <button
          type='button'
          className={`demo-button upload-button ${isUpload ? 'active' : ''}`}
          aria-pressed={isUpload}
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
          preload='metadata'
          onError={() => setFailedSrc(videoSrc)}
        />
        {!isUpload && hopData && (
          <>
            <div className='hop-cue' aria-hidden='true'>SPLIT STEP!</div>
            <div className='hop-counter'>
              <span className='hop-counter-label'>Split Steps</span>
              <span className='hop-counter-value'>{count}</span>
            </div>
          </>
        )}
        {videoFailed ? (
          <div className='upload-note' role='alert'>
            {isUpload
              ? `Your browser can't play ${upload.name}. Try an MP4 (H.264) file.`
              : "This clip couldn't be loaded. Try another one."}
          </div>
        ) : isUpload ? (
          <div className='upload-note'>
            Playing {upload.name} &mdash; live detection runs in the desktop
            app, so uploads here are playback-only (no hop badge).
          </div>
        ) : hopDataFailed && (
          <div className='upload-note' role='alert'>
            The detector's results for this clip couldn't be loaded, so the
            split step counter is off.
          </div>
        )}
      </div>

      <Link to='/projects' className='back-link'>← Back to Projects</Link>
    </div>
  )
}

export default Project1
