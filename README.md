
  # Futuristic Website Design (Copy)

  This is a code bundle for Futuristic Website Design (Copy). The original project is available at https://www.figma.com/design/qED6KgDZSbA9LHiMV0dTsm/Futuristic-Website-Design--Copy-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Standalone collaboration playground

  This repo also contains an isolated collaboration demo entry for a future
  `play.pills.fun` style deployment.

  Open `http://localhost:5173/play.html` after starting the dev server.

  ### How Jitsi is embedded

  The meeting area uses the Jitsi Meet External API by loading
  `https://meet.jit.si/external_api.js` at runtime inside
  `src/playground/components/MeetingPanel.tsx`.

  The room name is resolved from the `room` query parameter, with a local
  default fallback.

  ### Where to later plug in tldraw multiplayer

  The whiteboard lives in `src/playground/components/WhiteboardPanel.tsx`.
  It currently uses local persistence only.

  The future sync / multiplayer integration point is the isolated `Tldraw`
  setup inside that component, where the local persistence can be replaced by a
  multiplayer store or sync provider.

  ### How to change the room name

  You can change the room by either:

  - updating the `DEFAULT_ROOM` constant in `src/playground/CollaborationPage.tsx`
  - or opening the page with a query parameter, for example:
    `http://localhost:5173/play.html?room=PILLS-LAB-SESSION`
  
