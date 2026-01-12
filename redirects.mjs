import "dotenv/config"
import { writeFile } from "fs/promises" // ES module import
import StoryblokClient from "storyblok-js-client"

const storyblokApi = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN
})

async function fetchAndSaveRedirects() {
  try {
    // Fetch theme data from Storyblok
    const { data } = await storyblokApi.get("cdn/stories/global", {
      version: "draft" // Use 'draft' for preview mode
    })

    if (
      !data.story.content.redirects ||
      data.story.content.redirects.length === 0
    ) {
      console.log("No redirect found.")
    }

    let redirects = [] // Download and save each redirect

    // { "source": "/user", "destination": "/api/user", "statusCode": 301 }
    for (const redirect of data.story.content.redirects) {
      redirects.push({
        source: redirect.from,
        destination: redirect.to,
        statusCode: Number(redirect.code)
      })
    }

    let content = {
      $schema: "https://openapi.vercel.sh/vercel.json",
      redirects: redirects
    }
    const json = JSON.stringify(content, null, 2) // pretty-print JSON

    console.log("Redirects saved")

    try {
      await writeFile("vercel.json", json, "utf8") // creates or overwrites file
      console.log(`Nouvelles redirections ajoutées`)
    } catch (error) {
      console.error("Error writing _redirects", error)
    }

    console.log("All redirects have been writed.")
  } catch (error) {
    console.error("Error fetching or saving redirects:", error)
  }
}

fetchAndSaveRedirects()
