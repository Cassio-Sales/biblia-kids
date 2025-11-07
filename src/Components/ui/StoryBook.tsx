'use client'

import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  type FC,
  type ReactElement
} from 'react'
import HTMLFlipBook from 'react-pageflip'

interface FlipEventCustom {
  data: number
}

interface StoryBookProps {
  pages: string[]
  subtitles?: string[]
  texts?: string[]
  onPageChange?: (pageIndex: number) => void
}

interface PageProps {
  image: string
  subtitle?: string
  text?: string
  index: number
  currentPage: number
  flippingTime: number
}

/** Ajustes finos de layout */
const TEXT_BLOCK_HEIGHT = 0.48 // 48%: dá um “respiro” e evita corte no rodapé
const MIN_FONT = 11
const MAX_FONT = 18.5 // teto ligeiramente menor
const START_FONT = 20

/**
 * Componente principal do livro (estilo Kindle)
 */
const StoryBook: FC<StoryBookProps> = ({
  pages,
  subtitles = [],
  texts = [],
  onPageChange
}): ReactElement => {
  const FLIP_TIME = 1300 // manter em sincronia com prop flippingTime
  const [current, setCurrent] = useState<number>(0)

  const handleFlip = (e: FlipEventCustom): void => {
    const currentPage = e.data
    setCurrent(currentPage)
    onPageChange?.(currentPage)
  }

  return (
    <HTMLFlipBook
      width={340}
      height={600}
      minWidth={280}
      maxWidth={480}
      minHeight={400}
      maxHeight={650}
      showCover={false}
      flippingTime={FLIP_TIME}
      mobileScrollSupport={true}
      className="mx-auto rounded-xl shadow-lg bg-[#fdfaf3]"
      onFlip={handleFlip}
      style={{
        backgroundColor: '#fdfaf3',
        boxShadow: '0px 4px 16px rgba(0,0,0,0.25)',
        borderRadius: '16px'
      }}
    >
      {pages.map((src, i) => (
        <Page
          key={i}
          image={src}
          subtitle={subtitles[i]}
          text={texts[i]}
          index={i}
          currentPage={current}
          flippingTime={FLIP_TIME}
        />
      ))}
    </HTMLFlipBook>
  )
}

/**
 * Página individual — leitura estilo Kindle
 */
const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ image, subtitle, text, index, currentPage, flippingTime }, ref) => {
    const textRef = useRef<HTMLDivElement | null>(null)
    const [fontSize, setFontSize] = useState<number>(18)
    const [lineHeight, setLineHeight] = useState<number>(1.6)

    // Página “visível” durante o flip: a atual e a próxima face
    const isVisible = index === currentPage || index === currentPage + 1

    /** Ajuste com busca binária para caber com folga */
    const adjustFont = React.useCallback(() => {
      const el = textRef.current
      const parent = el?.parentElement
      if (!el || !parent) return

      // reset base
      el.style.lineHeight = '1.6'
      setLineHeight(1.6)

      const available = parent.clientHeight - 2 // folguinha
      let low = MIN_FONT
      let high = Math.min(START_FONT, MAX_FONT)
      let best = high

      // primeiro, tenta grande
      el.style.fontSize = `${high}px`
      if (el.scrollHeight <= available) {
        best = high
      } else {
        // busca binária para achar o maior que caiba
        while (low <= high) {
          const mid = Math.floor(((low + high) / 2) * 10) / 10 // passos de 0.1
          el.style.fontSize = `${mid}px`
          if (el.scrollHeight <= available) {
            best = mid
            low = mid + 0.1
          } else {
            high = mid - 0.1
          }
        }
      }

      // “Texto muito longo”: se o ajuste precisou reduzir mais de 4px
      if (START_FONT - best > 4) {
        const tweaked = Math.max(best - 0.5, MIN_FONT)
        el.style.fontSize = `${tweaked}px`
        best = tweaked
        setLineHeight(1.58)
        el.style.lineHeight = '1.58'
      }

      // “Texto muito curto”: se ocupa menos de 50% da área, diminui 1.5px só
      if (el.scrollHeight < available * 0.5) {
        const shorter = Math.max(best - 1.5, MIN_FONT + 1)
        el.style.fontSize = `${shorter}px`
        best = shorter
      }

      // Garante teto agradável
      if (best > MAX_FONT) {
        best = MAX_FONT
        el.style.fontSize = `${best}px`
      }

      // 🔹 Reduz 2% o tamanho final (pequeno ajuste global)
      best = best * 0.98
      el.style.fontSize = `${best}px`

      setFontSize(best)
    }, [])

    // ① Recalcula em mount + quando o texto muda
    useLayoutEffect(() => {
      if (!text) return
      requestAnimationFrame(() => {
        requestAnimationFrame(() => adjustFont())
      })
    }, [text, adjustFont])

    // ② Recalcula quando a página fica visível (após a animação de flip)
    useEffect(() => {
      if (!isVisible) return
      const id = setTimeout(() => {
        adjustFont()
      }, Math.max(0, flippingTime - 40)) // sincroniza com a animação
      return () => clearTimeout(id)
    }, [isVisible, flippingTime, adjustFont, currentPage])

    // ③ Recalcula quando a imagem carregar (altura útil pode mudar)
    const handleImageLoad = () => {
      requestAnimationFrame(() => adjustFont())
    }

    // ④ Observa mudanças de tamanho do container do texto
    useEffect(() => {
      const el = textRef.current
      const parent = el?.parentElement
      if (!parent) return
      const ro = new ResizeObserver(() => adjustFont())
      ro.observe(parent)
      return () => ro.disconnect()
    }, [adjustFont])

    // ⑤ Reajuste adicional para a PRIMEIRA página
    useEffect(() => {
      if (index !== 0) return
      const t1 = setTimeout(adjustFont, 0)
      const t2 = setTimeout(adjustFont, 250)
      const t3 = setTimeout(adjustFont, flippingTime)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
        clearTimeout(t3)
      }
    }, [index, adjustFont, flippingTime])

    return (
      <div
        ref={ref}
        className="relative w-full h-full bg-[#fdfaf3] px-5 overflow-hidden"
        style={{
          fontFamily: 'Georgia, serif',
          color: '#8b5e3c'
        }}
      >
        {/* imagem (40%) */}
        <div className="relative w-full h-[40%] rounded-md overflow-hidden shadow-sm">
          <img
            src={image}
            alt={`Página ${index + 1}`}
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
            onLoad={handleImageLoad}
          />
        </div>

        {/* título (10%) */}
        {subtitle && (
          <div
            className="flex items-center justify-center w-full h-[10%] mt-1"
            style={{
              color: '#8b5e3c',
              fontFamily: '"Baloo 2", sans-serif'
            }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center leading-tight tracking-wide">
              {subtitle}
            </h2>
          </div>
        )}

        {/* texto (48%) */}
        {text && (
          <div
            className="absolute bottom-0 left-0 w-full px-5 pb-3 flex justify-center items-center"
            style={{
              height: `${TEXT_BLOCK_HEIGHT * 100}%`,
              backgroundColor: '#fdfaf3',
              color: '#8b5e3c',
              overflow: 'hidden'
            }}
          >
            <div
              ref={textRef}
              className="h-full w-full overflow-hidden"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
                letterSpacing: '0.25px',
                textAlign: 'justify',
                fontFamily: 'Georgia, serif',
                whiteSpace: 'pre-line'
              }}
            >
              {text.trim()}
            </div>
          </div>
        )}

        {/* número da página */}
        <div className="absolute bottom-1 right-3 text-[10px] sm:text-xs text-gray-500">
          {index + 1}
        </div>
      </div>
    )
  }
)

Page.displayName = 'Page'
export default StoryBook
