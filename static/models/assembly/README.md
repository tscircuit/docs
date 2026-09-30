# Assembly documentation demo models

Original, simplified geometry for the assembly documentation, in millimetres. The model vertices use tscircuit board
coordinates (+Z above the board). Regenerate with
`python3 scripts/generate-assembly-models.py` from the repository root.
These assets are covered by this repository's license. They are illustrative,
not manufacturer models or fabrication specifications.

- `screw.glb`: 3 mm shaft, 6 mm shaft length, 5.6 mm head diameter. Origin is
  the center of the underside of the head; shaft points along -Z. No threads.
- `housing.glb`: open tray around a 40 × 30 mm board centered at the origin.
- `cover.glb`: 46 × 36 × 1.5 mm plate; lower face is Z = 0.
- `bracket.glb`: small L bracket; lower face is Z = 0.
- `screen.glb`: 26.7 × 19.26 mm screen body with a short cable tab. Origin is
  at the tab's attachment edge; the body extends along +Y.
