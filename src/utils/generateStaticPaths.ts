import { useStoryblokApi } from "@storyblok/astro"
import isPreview from "./isPreview"

export default async function generateStaticPaths() {
  const storyblokApi = useStoryblokApi()
  const links = await storyblokApi.getAll("cdn/links", {
    version: isPreview() ? "draft" : "published",
    resolve_relations: "page.canonical",
    resolve_links: "url"
  })
  // @ts-ignore
  let paths = []
  links
    //Don't generate paths for folders
    .filter((link) => !link.is_folder)
    //Don't generate paths for global links except in preview mode
    .filter((link) => {
      return link.slug.split("/")[0] !== "global" || isPreview() === true
    })
    .forEach((link: { slug: string }) => {
      let slug = link.slug === "home" ? undefined : link.slug
      //This will be used for generating all the urls for astro

      paths.push({
        props: { slug },
        params: {
          slug: slug,
          name: link.name
        }
      })
    })

  // @ts-ignore
  return paths
}
