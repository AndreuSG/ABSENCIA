import { getCachedDocument } from '@/utilities/getDocument'

export async function getPageData(slug: string) {
  // 'pages' es el nombre de tu colección en Payload
  const getPage = getCachedDocument('pages', slug)
  return await getPage()
}
