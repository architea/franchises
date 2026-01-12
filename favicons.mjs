import "dotenv/config"
import fs from "fs/promises"
import path from "path"
import StoryblokClient from "storyblok-js-client"

const storyblokApi = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN
})

async function fetchAndSaveFavicon() {
  try {
    // Fetch theme data from Storyblok
    const { data } = await storyblokApi.get("cdn/stories/global", {
      version: "draft" // Use 'draft' for preview mode
    })

    const favicon = data.story.content.favicon.filename

    if (!favicon) {
      console.log("No favicon found in the theme.")
      return
    }

    // Ensure the public/favicons directory exists
    const faviconDir = path.resolve("./public")
    await fs.mkdir(faviconDir, { recursive: true })

    // Download and save favicon file
    const faviconFileName = "favicon.svg"

    const response = await fetch(favicon)
    if (!response.ok) {
      console.error(`Failed to download favicon: ${favicon}`)
    }

    const faviconBuffer = await response.arrayBuffer()
    await fs.writeFile(
      path.join(faviconDir, faviconFileName),
      Buffer.from(faviconBuffer)
    )
    console.log(`Saved favicon: ${faviconFileName}`)

    console.log("Favicon has been downloaded and saved.")
  } catch (error) {
    console.error("Error fetching or saving favicon:", error)
  }
}

fetchAndSaveFavicon()
