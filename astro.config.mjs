import { defineConfig } from "astro/config"
import { storyblok } from "@storyblok/astro"
import { loadEnv } from "vite"
import vercel from "@astrojs/vercel"

import tailwindcss from "@tailwindcss/vite"

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
        button: "storyblok/Button",
        about: "storyblok/About",
        feature1: "storyblok/Feature1",
        feature2: "storyblok/Feature2",
        feature3: "storyblok/Feature3",
        feature4: "storyblok/Feature4",
        feature5: "storyblok/Feature5",
        logomarquee: "storyblok/LogoMarquee",
        ariane: "storyblok/Ariane"
      }
    })
  ],

  output: env.STORYBLOK_IS_PREVIEW === "yes" ? "server" : "static",
  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
})
