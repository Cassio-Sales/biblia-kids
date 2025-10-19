export function formatVerseContent(reference: string, rawContent: string) {
  let texto = rawContent ?? ''

  // remove prefixo até o primeiro ']' (ex.: "[1]" etc.)
  const idx = texto.indexOf(']')
  if (idx !== -1) texto = texto.slice(idx + 1)

  // tira aspas tipográficas e duplas
  texto = texto.replace(/[“”"]/g, '').trim()

  // remove ; ou . finais duplicados
  texto = texto.replace(/[;.\s]+$/, '').trim()

  // garante pontuação final
  if (!/[.!?]$/.test(texto)) texto += '.'

  return `${reference} - ${texto}`
}
