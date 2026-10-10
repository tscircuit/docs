const DOT_PITCH = 4

// The letter "T" as a bitmap. Each string is one row of the 5x5 dot grid,
// read left-to-right, top-to-bottom. "1" = place an LED at that dot.
const LETTER_T = ["11111", "00100", "00100", "00100", "00100"]

// Flatten the bitmap into a list of lit dots with grid coordinates.
const dots = LETTER_T.flatMap((rowBits, row) =>
  rowBits.split("").map((bit, col) => ({ bit, col, row })),
).filter((dot) => dot.bit === "1")

export default () => (
  <board width="42mm" height="32mm">
    {/* Route the PCB with the built-in autorouter */}
    <autoroutingphase />

    {/* Power input: 5V from USB or a bench supply */}
    <pinheader
      name="J1"
      pinCount={2}
      pinLabels={["5V", "GND"]}
      gender="male"
      pcbX={0}
      pcbY={-13}
      schX={-9}
      schY={-8}
    />

    {/* One resistor + LED string per lit dot, laid out from the bitmap */}
    {dots.map(({ col, row }, i) => {
      const ledName = "LED" + (i + 1)
      const resName = "R" + (i + 1)
      return (
        <>
          <led
            name={ledName}
            color="red"
            footprint="0603"
            forwardVoltage="2V"
            pcbX={(col - 2) * DOT_PITCH}
            pcbY={(2 - row) * DOT_PITCH + 6}
            schX={4}
            schY={-i * 2}
          />
          <resistor
            name={resName}
            resistance="220"
            footprint="0402"
            pcbX={(i - 4) * DOT_PITCH}
            pcbY={-7}
            schX={-2}
            schY={-i * 2}
          />
          {/* 5V -> resistor -> LED anode -> LED cathode -> GND */}
          <trace from={"." + resName + " .pin1"} to="net.V5" />
          <trace
            from={"." + resName + " .pin2"}
            to={"." + ledName + " .anode"}
          />
          <trace from={"." + ledName + " .cathode"} to="net.GND" />
        </>
      )
    })}

    <trace from=".J1 .pin1" to="net.V5" />
    <trace from=".J1 .pin2" to="net.GND" />
  </board>
)
