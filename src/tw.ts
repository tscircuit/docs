import { install, tw, defineConfig } from "@twind/core"
import presetTailwind from "@twind/preset-tailwind"

install(
  defineConfig({
    presets: [
      presetTailwind({
        disablePreflight: true,
      }),
    ],
    preflight: false,
  }),
)

export { tw }
