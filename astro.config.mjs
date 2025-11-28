import { defineConfig } from "astro/config"
import { storyblok } from "@storyblok/astro"
import { loadEnv } from "vite"
import vercel from "@astrojs/vercel"

import tailwindcss from "@tailwindcss/vite";

const env = loadEnv("", process.cwd(), "STORYBLOK")
const { STORYBLOK_TOKEN } = loadEnv(import.meta.env.MODE, process.cwd(), "")

export default defineConfig({
  site: "https://architea-franchises.fr/",

  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      apiOptions: {
        region: "eu"
      },
      components: {
        page: "storyblok/Page",
        slider: "storyblok/Slider",
        button: "storyblok/Button"
      }
    })
  ],

  output: "server",
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
})