
import { useEffect, useState } from 'react'
import { VERSES, BIBLE_ID } from '../data/verses'
import { fetchPassage } from '../services/bible'
import { formatVerseContent } from '../../lib/formatVerse'

type State = { data?: string; loading: boolean; error?: string }

export function useDailyVerse() {
  const [state, setState] = useState<State>({ loading: true })

  useEffect(() => {
    const run = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_BIBLE_API_KEY
        const verseIndex = new Date().getDate() % VERSES.length
        const verseID = VERSES[verseIndex]

        const result = await fetchPassage(BIBLE_ID, verseID, apiKey)
        const content = result?.data?.content
        const ref = result?.data?.reference

        if (!content || !ref) {
          setState({ loading: false, error: 'Verso não encontrado.' })
          return
        }

        const formatted = formatVerseContent(ref, content)
        setState({ loading: false, data: formatted })
      } catch (e: unknown) {
        if (e instanceof Error) {
          setState({
            loading: false,
            error: e.message
          })
        } else {
          setState({
            loading: false,
            error: 'Erro ao carregar verso.'
          })
        }
      }
    }

    run()
  }, [])

  return state // { data, loading, error }
}
