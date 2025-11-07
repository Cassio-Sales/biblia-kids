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

/**
 * Componente principal do livro (estilo Kindle)
 */
const StoryBook: FC<StoryBookProps> = ({
  pages,
  subtitles = [],
  texts = [],
  onPageChange
}): ReactElement => {
  const FLIP_TIME = 1300 // ms — mantenha em sincronia com o prop flippingTime
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

    // Página visível: a atual e a próxima (o flip mostra duas faces)
    const isVisible = index === currentPage || index === currentPage + 1

    // Recalcula fonte
    const adjustFont = React.useCallback(() => {
      const el = textRef.current
      const parent = el?.parentElement
      if (!el || !parent) return

      let size = 20 // tamanho inicial padrão
      const minSize = 11 // limite mínimo
      const maxSize = 19 // limite máximo "normal"

      el.style.fontSize = `${size}px`

      // 1) Diminui até caber (páginas longas continuam iguais)
      while (el.scrollHeight > parent.clientHeight && size > minSize) {
        size -= 0.5
        el.style.fontSize = `${size}px`
      }

      // 2) Ajuste inteligente só para textos curtos
      const textHeight = el.scrollHeight
      const availableHeight = parent.clientHeight
      if (textHeight < availableHeight * 0.5) {
        // se ocupar menos de 50% da área, reduz levemente
        size = Math.max(size - 2, minSize + 1)
        el.style.fontSize = `${size}px`
      }

      // 3) Garante teto agradável
      if (size > maxSize) {
        size = maxSize
        el.style.fontSize = `${size}px`
      }

      setFontSize(size)
    }, [])

    // ① Recalcula em mount + quando o texto muda
    useLayoutEffect(() => {
      if (!text) return
      adjustFont()
    }, [text, adjustFont])

    // ② Recalcula quando a página fica visível (com o efeito do flip)
    useEffect(() => {
      if (!isVisible) return

      // Chama no meio e no fim da animação para ver o “reencaixe”
      const mid = setTimeout(() => {
        adjustFont()
      }, flippingTime / 2)

      const end = setTimeout(() => {
        adjustFont()
      }, Math.max(0, flippingTime - 50))

      return () => {
        clearTimeout(mid)
        clearTimeout(end)
      }
    }, [isVisible, flippingTime, adjustFont, currentPage])

    // ③ Recalcula quando a imagem carregar (altura útil pode mudar)
    const handleImageLoad = () => {
      requestAnimationFrame(() => adjustFont())
    }

    // ④ Observa mudanças de tamanho do container do texto (mais confiável que window.resize)
    useEffect(() => {
      const el = textRef.current
      const parent = el?.parentElement
      if (!parent) return
      const ro = new ResizeObserver(() => adjustFont())
      ro.observe(parent)
      return () => ro.disconnect()
    }, [adjustFont])

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

        {/* texto (50%) */}
        {text && (
          <div
            className="absolute bottom-0 left-0 w-full px-5 pb-2 flex justify-center items-center"
            style={{
              height: '50%',
              backgroundColor: '#fdfaf3',
              color: '#8b5e3c',
              overflow: 'hidden'
            }}
          >
            <div
              ref={textRef}
              className="h-full w-full leading-relaxed overflow-hidden"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: '1.6',
                letterSpacing: '0.25px',
                textAlign: 'justify',
                fontFamily: 'Georgia, serif',
                whiteSpace: 'pre-line' // mantém quebras originais
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
