# TODO

Planned features and follow-ups that are out of scope for the current work,
so they don't get lost.

## Split Step demo

- **Live detection on uploaded videos**: build a backend that serves the
  Split_Step_Counter model behind an API (upload a clip, get back the
  `hops_ms` times), and bring back the "Upload your own video" button on the
  demo page wired to it. The button was removed on 2026-10-13 because uploads
  only played back with no detection, which looked broken. The response can
  reuse the existing `demo-N-hops.json` shape so the page's counter and cue
  logic work unchanged.
- **Cold-start false positive in `LSTMCounter`** (Split_Step_Counter repo): a
  fresh LSTM state outputs ~0.47 on a still frame, above the 0.4 threshold, so
  a hop is counted on the first frame and likely after every tracking-gap
  reset. The demo JSONs had this 0 ms hop stripped by hand; fix it in
  `LSTMCounter.process` before the backend serves the model.
- **demo-3 (Nicolas Jarry rally)** contains no split steps and is shown as a
  false-positive check. Re-run it whenever the model is retrained and confirm
  it still reports 0.
