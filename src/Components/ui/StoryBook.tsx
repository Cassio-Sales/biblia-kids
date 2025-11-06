'use client'

import React, {
  useRef,
  useEffect,
  useState,
  type FC,
  type ReactElement
} from 'react'
import HTMLFlipBook from 'react-pageflip'

/**
 * Tipagem manual do evento de flip
 * conforme comportamento real do react-pageflip
 */
interface FlipEventCustom {
  data: number
}

/**
 * Props do StoryBook
 */
interface StoryBookProps {
  pages: string[]
  subtitles?: string[]
  texts?: string[]
  onPageChange?: (pageIndex: number) => void
}

/**
 * Props de cada página
 */
interface PageProps {
  image: string
  subtitle?: string
  text?: string
  index: number
}

/**
 * Componente principal do livro
 */
const StoryBook: FC<StoryBookProps> = ({
  pages,
  subtitles = [],
  texts = [],
  onPageChange
}): ReactElement => {
  const handleFlip = (e: FlipEventCustom): void => {
    const currentPage = e.data
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
      flippingTime={1300}
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
        />
      ))}
    </HTMLFlipBook>
  )
}

/**
 * Página individual
 */
const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ image, subtitle, text, index }, ref) => {
    const textRef = useRef<HTMLDivElement | null>(null)
    const [fontSize, setFontSize] = useState<number>(
      typeof window !== 'undefined' && window.innerWidth < 768 ? 22 : 16
    )

    useEffect(() => {
      const adjustFont = (): void => {
        const el = textRef.current
        const parent = el?.parentElement
        if (!el || !parent) return

        let size = 16
        el.style.fontSize = `${size}px`
        while (el.scrollHeight > parent.clientHeight && size > 11.5) {
          size -= 0.5
          el.style.fontSize = `${size}px`
        }
        setFontSize(size)
      }

      adjustFont()
      const handleResize = (): void => adjustFont()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [text])

    return (
      <div
        ref={ref}
        className="relative w-full h-full bg-[#fdfaf3] px-4 overflow-hidden"
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
          />
        </div>

        {/* título (10%) */}
        {subtitle && (
          <div
            className="flex items-center justify-center w-full h-[10%] mt-1"
            style={{ color: '#8b5e3c', fontFamily: '"Baloo 2", sans-serif' }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center leading-tight tracking-wide">
              {subtitle}
            </h2>
          </div>
        )}

        {/* texto (50%) */}
        {text && (
          <div
            className="absolute bottom-0 left-0 w-full px-4 pb-0 flex justify-center items-center"
            style={{
              height: '50%',
              overflow: 'hidden',
              backgroundColor: '#fdfaf3',
              color: '#8b5e3c'
            }}
          >
            <div
              ref={textRef}
              className="leading-relaxed h-full w-full overflow-hidden"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: '1.6',
                letterSpacing: '0.25px',
                textAlign: 'justify',
                fontFamily: 'Georgia, serif'
              }}
            >
              {text
                .split(/\n+/)
                .filter((p: string) => p.trim() !== '')
                .map((paragraph: string, idx: number) => (
                  <p
                    key={idx}
                    style={{
                      textIndent: '1.25em',
                      marginBottom: '0.8em',
                      overflowWrap: 'break-word',
                      hyphens: 'auto'
                    }}
                  >
                    {paragraph.trim()}
                  </p>
                ))}
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
