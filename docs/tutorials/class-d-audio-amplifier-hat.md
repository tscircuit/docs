---
sidebar_position: 12
title: "Class D Audio Amplifier HAT"
description: "Build a 3W stereo Class D audio amplifier HAT for Raspberry Pi using the PAM8403."
---

# Building a Class D Audio Amplifier HAT

In this tutorial, we will build a stereo Class D Audio Amplifier HAT for the Raspberry Pi using the **PAM8403** IC. This HAT will provide up to 3W of output power per channel, making it perfect for driving small 4Ω or 8Ω speakers directly from your Pi.

We will cover:
1. What a Class D amplifier is and how the PAM8403 works.
2. The complete circuit design including volume control and speaker terminals.
3. How to write the tscircuit code to generate the schematic and PCB.
4. How to configure the Raspberry Pi to output audio to the HAT.

---

## 1. Understanding Class D Amplifiers

Unlike Class A or Class AB amplifiers which use transistors in a linear mode (resulting in high power dissipation and heat), **Class D amplifiers** operate by rapidly switching the output transistors fully ON or fully OFF. 

They use **Pulse Width Modulation (PWM)** to convert the incoming analog audio signal into a train of pulses. The width of these pulses corresponds to the amplitude of the audio signal. Because the transistors are either fully on (minimal voltage drop) or fully off (zero current), Class D amplifiers are incredibly efficient—often exceeding 90%. This means the PAM8403 can deliver 3W per channel without needing a heatsink!

### The PAM8403 IC
The PAM8403 is a 3W, stereo, filterless Class-D audio amplifier. 
- **Filterless architecture:** It doesn't require bulky LC output filters; it relies on the speaker coil's own inductance to filter the high-frequency switching noise.
- **Low Voltage:** It operates beautifully on the 5V rail provided by the Raspberry Pi.

---

## 2. Circuit Design

Our HAT requires the following key components:

1. **PAM8403 IC:** The core Class D amplifier.
2. **Raspberry Pi Header (40-pin):** To mount on the Pi and draw 5V power and ground.
3. **Audio Input Jack / PWM RC Filter:** We will take the audio from the Pi. We can either route the Pi's hardware PWM pins (GPIO 12/13 or 18/19) through a low-pass filter into the amplifier, or use a standard 3.5mm audio jack.
4. **Volume Control:** A dual-gang 10kΩ logarithmic potentiometer (`pot`) on the input lines to control left and right volume simultaneously.
5. **Output Terminals:** Two 2-pin screw terminals for the Left and Right speakers.
6. **Decoupling Capacitors:** A 10µF and 0.1µF capacitor on the 5V line close to the PAM8403 to ensure stable power during heavy bass hits.

---

## 3. Writing the TSCircuit Code

Let's translate this design into `tscircuit` code. Create a file named `AudioAmplifierHat.tsx`.

```tsx
import { board, Board, Chip, Resistor, Capacitor, Potentiometer, Header } from "@tscircuit/core"

export const AudioAmplifierHat = () => {
  return (
    <board width="65mm" height="56mm">
      {/* Raspberry Pi 40-Pin Header */}
      <Header
        name="RPI_HEADER"
        pinCount={40}
        pitch="2.54mm"
        pcbX={0} pcbY={20}
      />

      {/* Power Decoupling */}
      <Capacitor name="C1" capacitance="10uF" pcbX={-10} pcbY={0} />
      <Capacitor name="C2" capacitance="0.1uF" pcbX={-5} pcbY={0} />

      {/* Dual Gang Potentiometer for Volume Control (Represented as two pots) */}
      <Potentiometer name="VR_L" resistance="10k" pcbX={15} pcbY={-15} />
      <Potentiometer name="VR_R" resistance="10k" pcbX={15} pcbY={-5} />

      {/* PAM8403 Amplifier IC (SOP-16) */}
      <Chip
        name="U1"
        manufacturerPartNumber="PAM8403"
        footprint="sop16"
        pcbX={0} pcbY={-10}
      />

      {/* Speaker Output Terminals */}
      <Header name="SPK_L" pinCount={2} pitch="5.08mm" pcbX={-20} pcbY={-20} />
      <Header name="SPK_R" pinCount={2} pitch="5.08mm" pcbX={-10} pcbY={-20} />

      {/* Power Routing */}
      <trace from=".RPI_HEADER.pin2" to=".U1.VDD" /> {/* 5V */}
      <trace from=".RPI_HEADER.pin2" to=".C1.pos" />
      <trace from=".RPI_HEADER.pin2" to=".C2.pos" />
      
      <trace from=".RPI_HEADER.pin6" to=".U1.GND" /> {/* GND */}
      <trace from=".RPI_HEADER.pin6" to=".C1.neg" />
      <trace from=".RPI_HEADER.pin6" to=".C2.neg" />

      {/* Audio Input from Pi PWM (GPIO 12 = Pin 32, GPIO 13 = Pin 33) -> Volume Pot -> PAM8403 */}
      {/* Left Channel */}
      <trace from=".RPI_HEADER.pin32" to=".VR_L.pin1" />
      <trace from=".VR_L.pin2" to=".U1.INL" />
      <trace from=".VR_L.pin3" to=".U1.GND" />

      {/* Right Channel */}
      <trace from=".RPI_HEADER.pin33" to=".VR_R.pin1" />
      <trace from=".VR_R.pin2" to=".U1.INR" />
      <trace from=".VR_R.pin3" to=".U1.GND" />

      {/* Speaker Outputs */}
      <trace from=".U1.OUTL_P" to=".SPK_L.pin1" />
      <trace from=".U1.OUTL_N" to=".SPK_L.pin2" />
      
      <trace from=".U1.OUTR_P" to=".SPK_R.pin1" />
      <trace from=".U1.OUTR_N" to=".SPK_R.pin2" />
    </board>
  )
}
```

### Explanation of the Routing
1. **Power:** We pull 5V from physical Pin 2 of the Pi header and Ground from Pin 6. The `10uF` and `0.1uF` capacitors filter the power before it reaches the PAM8403.
2. **Inputs:** We take the hardware PWM audio signals from the Pi (GPIO 12/13). They are routed into the top of the volume potentiometers. The wiper (middle pin) feeds the `INL` and `INR` pins of the PAM8403.
3. **Outputs:** The `OUTL_P/N` and `OUTR_P/N` pins are routed directly to the screw terminals. Note that Class D outputs are bridged (BTL) — **never tie the negative speaker terminals to ground!**

---

## 4. Raspberry Pi Audio Configuration

To get high-quality audio directly from the Raspberry Pi's GPIO pins without using an external DAC, we need to enable the hardware PWM audio overlay.

### Step 1: Edit the config.txt file
Open the boot configuration file on your Raspberry Pi:
```bash
sudo nano /boot/firmware/config.txt
```
*(Note: On older Raspberry Pi OS versions, this is `/boot/config.txt`)*

### Step 2: Enable PWM Audio
Add the following line to the bottom of the file to remap the audio output to GPIO 12 (Left) and GPIO 13 (Right):
```text
dtoverlay=audremap,pins_12_13
```

### Step 3: Reboot and Test
Reboot your Raspberry Pi:
```bash
sudo reboot
```

Once rebooted, connect 4Ω or 8Ω speakers to the screw terminals on your HAT. Turn the volume potentiometer down, then play a test sound:
```bash
speaker-test -t wav -c 2
```
Slowly turn up the volume potentiometer. You should hear the "Front Left" and "Front Right" voice test crystal clear!

---

## Conclusion
You have successfully designed a 3W stereo Class D audio amplifier HAT using `tscircuit`! This compact design provides loud, efficient audio directly from the Raspberry Pi's GPIO pins, perfect for arcade cabinets, smart speakers, or retro consoles.
