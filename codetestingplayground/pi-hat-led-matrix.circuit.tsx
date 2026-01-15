import { RaspberryPiHatBoard } from "@tscircuit/common"

// WS2812B-2020 addressable LED component
const WS2812B_2020 = (props: {
  name: string
  pcbX?: number
  pcbY?: number
  schX?: number
  schY?: number
}) => (
  <chip
    {...props}
    cadModel={{
      objUrl:
        "https://modelcdn.tscircuit.com/easyeda_models/download?uuid=caa88715b11f4aa189b02e52bbb84e4f&pn=C965555",
      rotationOffset: { x: 0, y: 0, z: 0 },
      positionOffset: { x: 0, y: 0, z: -0.07 },
    }}
    schPinSpacing={0.5}
    pinLabels={{
      pin1: ["DO"],
      pin2: ["GND"],
      pin3: ["DI"],
      pin4: ["VDD"],
    }}
    supplierPartNumbers={{ jlcpcb: ["C965555"] }}
    manufacturerPartNumber="WS2812B_2020"
    footprint={
      <footprint>
        <smtpad
          portHints={["pin1"]}
          pcbX="-0.915mm"
          pcbY="0.55mm"
          width="0.9mm"
          height="0.7mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin2"]}
          pcbX="-0.915mm"
          pcbY="-0.55mm"
          width="0.9mm"
          height="0.7mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin3"]}
          pcbX="0.915mm"
          pcbY="-0.55mm"
          width="0.9mm"
          height="0.7mm"
          shape="rect"
        />
        <smtpad
          portHints={["pin4"]}
          pcbX="0.915mm"
          pcbY="0.55mm"
          width="0.9mm"
          height="0.7mm"
          shape="rect"
        />
      </footprint>
    }
  />
)

// Simple grid helper function
const grid = (opts: {
  cols: number
  rows: number
  xSpacing: number
  ySpacing: number
  offsetX?: number
  offsetY?: number
}) => {
  const result: { center: { x: number; y: number }; index: number }[] = []
  const { cols, rows, xSpacing, ySpacing, offsetX = 0, offsetY = 0 } = opts

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      result.push({
        center: {
          x: col * xSpacing - ((cols - 1) * xSpacing) / 2 + offsetX,
          y: row * ySpacing - ((rows - 1) * ySpacing) / 2 + offsetY,
        },
        index: row * cols + col,
      })
    }
  }
  return result
}

export default () => (
  <RaspberryPiHatBoard name="HAT1">
    {/* 4x4 LED Matrix using WS2812B addressable LEDs */}
    {grid({
      cols: 4,
      rows: 4,
      xSpacing: 8,
      ySpacing: 8,
      offsetX: -6,
      offsetY: -5,
    }).map(({ center, index }) => {
      const ledName = `LED${index + 1}`
      return (
        <>
          <WS2812B_2020
            name={ledName}
            pcbX={center.x}
            pcbY={center.y}
            schX={center.x / 2 + 12}
            schY={center.y / 2}
          />
          {/* Connect each LED to power and ground */}
          <trace from={`.${ledName} .GND`} to="net.GND" />
          <trace from={`.${ledName} .VDD`} to="net.V5" />
          {/* Chain LEDs together via data line */}
          {index > 0 && (
            <trace from={`.LED${index} .DO`} to={`.${ledName} .DI`} />
          )}
        </>
      )
    })}

    {/* Connect first LED data input to GPIO18 */}
    <trace from=".HAT1_chip .GPIO_18" to=".LED1 .DI" />

    {/* Connect power nets to HAT header */}
    <trace from="net.V5" to=".HAT1_chip .V5_1" />
    <trace from="net.GND" to=".HAT1_chip .GND_1" />
  </RaspberryPiHatBoard>
)
