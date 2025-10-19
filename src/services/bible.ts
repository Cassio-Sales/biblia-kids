
const API_BASE = 'https://api.scripture.api.bible/v1'

export type PassageResponse = {
  data?: { reference: string; content: string }
}

export async function fetchPassage(
  bibleId: string,
  passageId: string,
  apiKey?: string
) {
  if (!apiKey)
    throw new Error('Missing Bible API key (NEXT_PUBLIC_BIBLE_API_KEY).')

  const url = `${API_BASE}/bibles/${bibleId}/passages/${passageId}?content-type=text`
  const res = await fetch(url, { headers: { 'api-key': apiKey } })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Bible API error ${res.status}: ${body}`)
  }

  const json = (await res.json()) as PassageResponse
  return json
}
