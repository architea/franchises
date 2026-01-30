import { storyblokFetch } from "../lib/storyblok.js"
import isPreview from "./isPreview.js"

export default async function generateStaticPaths() {
  const response = await storyblokFetch("cdn/stories", {
    version: isPreview() ? "draft" : "published",
    per_page: 100
  })

  const paths = response.data.stories
    .filter((link: any) => link.full_slug.startsWith("actualites"))
    .filter((link: any) => link.full_slug !== "global")
    .map((link: any) => {
      const slug = link.full_slug === "home" ? undefined : link.full_slug // undefined for home!
      return {
        params: { path: slug },
        props: { path: slug, name: link.name }
      }
    })

  return paths
}
