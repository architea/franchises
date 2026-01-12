import { useStoryblokApi } from "@storyblok/astro"
import isPreview from "../utils/isPreview.js"
import StoryblokClient from "storyblok-js-client"

const directClient = new StoryblokClient({
  accessToken: import.meta.env.STORYBLOK_TOKEN!,
  endpoint: "https://api-eu.storyblok.com/v1"
})

let apiCache: Record<string, any> = {}

export async function storyblokFetch(path: string, params: Record<string, any> = {}) {
  const cacheKey = `${path}:${JSON.stringify(params)}`
  if (apiCache[cacheKey]) return apiCache[cacheKey]
  
  try {
    const sbApi = useStoryblokApi()
    const response = await sbApi.get(path, params)
    apiCache[cacheKey] = response
    return response  // Return full response
  } catch {
    const response = await directClient.get(path, params)
    apiCache[cacheKey] = response
    return response
  }
}

export async function getGlobalData() {
  return storyblokFetch("cdn/stories/global", {
    version: isPreview() ? "draft" : "published",
    resolve_links: "url",
    resolve_links_level: 2
  }).then(d => d.data?.story?.content)
}
