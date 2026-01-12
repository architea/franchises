import { storyblokFetch } from "../lib/storyblok.js"
import isPreview from "./isPreview.js"

export default async function generateStaticPaths() {
  const response = await storyblokFetch("cdn/links", {
    version: isPreview() ? "draft" : "published"
  })
  
  // cdn/links returns { data: { links: { uuid: {...}, ... } } }
  const linksObj = response.data?.links
  if (!linksObj) {
    console.error('No links found:', response)
    return []
  }
  
  // Convert object to array
  const links = Object.values(linksObj) as any[]
  console.log(`Found ${links.length} links`)
  
  const paths = links
    .filter((link: any) => !link.is_folder)
    .filter((link: any) => {
      const firstFolder = link.slug.split("/")[0]
      return firstFolder !== "global" || isPreview()
    })
    .map((link: any) => {
      const slug = link.slug === "home" ? undefined : link.slug  // undefined for home!
      return {
        params: { path: slug },
        props: { path: slug, name: link.name }
      }
    })
  
  console.log(`Generated ${paths.length} paths`)
  return paths
}
