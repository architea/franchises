import { defineConfig, passthroughImageService } from "astro/config"
import { storyblok } from "@storyblok/astro"
import { loadEnv } from "vite"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"
import sitemap from "@astrojs/sitemap"

import favicons from "astro-favicons"

const env = loadEnv("", process.cwd(), "STORYBLOK")

export default defineConfig({
  site: "https://franchise-architea.fr/",

  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: import.meta.env.STORYBLOK_IS_PREVIEW !== "yes",
      apiOptions: {
        region: "eu"
      },
      components: {
        page: "storyblok/Page",
        actu: "storyblok/Page",
        slider: "storyblok/Slider",
        button: "storyblok/Button",
        about: "storyblok/About",
        feature1: "storyblok/Feature1",
        feature2: "storyblok/Feature2",
        feature3: "storyblok/Feature3",
        feature4: "storyblok/Feature4",
        logomarquee: "storyblok/LogoMarquee",
        ariane: "storyblok/Ariane",
        iconGallery: "storyblok/IconGallery",
        map: "storyblok/Map",
        contact: "storyblok/Contact",
        videoGallery: "storyblok/VideoGallery",
        allActus: "storyblok/AllActus",
        actupreview: "storyblok/ActuPreview"
      }
    }),
    sitemap(),
    favicons()
  ],

  output: env.STORYBLOK_IS_PREVIEW === "yes" ? "server" : "static",
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      minimumCacheTTL: 86400,
      sizes: [300, 720, 1080, 1560, 1920, 2560],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "a.storyblok.com",
          pathname: `/f/${env.STORYBLOK_SPACEID}/**`
        }
      ]
    }
  }),

  vite: {
    plugins: [tailwindcss()]
  },

  image: {
    service: passthroughImageService(),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
        pathname: `/f/${env.STORYBLOK_SPACEID}/**`
      }
    ]
  }
})
