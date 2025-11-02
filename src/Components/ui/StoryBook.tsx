'use client'

import HTMLFlipBookOriginal from 'react-pageflip'
import React, {
  useRef,
  useEffect,
  useState,
  type FC,
  type ReactElement,
  type PropsWithChildren
} from 'react'

interface HTMLFlipBookPropsManual {
  width: number
  height: number
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  size?: 'fixed' | 'stretch'
  drawShadow?: boolean
  flippingTime?: number
  usePortrait?: boolean
  showCover?: boolean
  mobileScrollSupport?: boolean
  className?: string
  style?: React.CSSProperties
  onFlip?: (e: { data: number }) => void
}

type ExtendedHTMLFlipBookProps = PropsWithChildren<HTMLFlipBookPropsManual>

const HTMLFlipBook: FC<ExtendedHTMLFlipBookProps> = props => (
  <HTMLFlipBookOriginal {...props} />
)

interface StoryBookProps {
  pages: string[]
  subtitles?: string[]
  texts?: string[]
  onPageChange?: (page: number) => void
}

const StoryBook: FC<StoryBookProps> = ({
  pages,
  subtitles = [],
  texts = [],
  onPageChange
}): ReactElement => {
  return (
    <HTMLFlipBook
      width={340}
      height={500}
      minWidth={280}
      maxWidth={480}
      minHeight={400}
      maxHeight={650}
      size="fixed"
      className="mx-auto rounded-xl shadow-lg !bg-[#fdfaf3]"
      mobileScrollSupport={true}
      showCover={false}
      flippingTime={700}
      drawShadow={true}
      usePortrait={true}
      onFlip={e => onPageChange?.(e.data)}
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

interface PageProps {
  image: string
  subtitle?: string
  text?: string
  index: number
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ image, subtitle, text, index }, ref) => {
    const textRef = useRef<HTMLDivElement>(null)
    const [fontSize, setFontSize] = useState<number>(16.1) // +15%

    useEffect(() => {
      const adjustFont = () => {
        const el = textRef.current
        const parent = el?.parentElement
        if (!el || !parent) return
        let size = 16.1
        el.style.fontSize = `${size}px`
        while (el.scrollHeight > parent.clientHeight && size > 11.5) {
          size -= 0.5
          el.style.fontSize = `${size}px`
        }
        setFontSize(size)
      }
      adjustFont()
      window.addEventListener('resize', adjustFont)
      return () => window.removeEventListener('resize', adjustFont)
    }, [text])

    return (
      <div
        ref={ref}
        className="relative w-full h-full bg-[#fdfaf3] px-4 py-2 overflow-hidden"
        style={{
          fontFamily: 'Georgia, serif',
          color: '#8b5e3c',
          display: 'block'
        }}
      >
        {/* imagem (40%) */}
        <div className="relative w-full h-[40%] rounded-md overflow-hidden shadow-sm">
          <img
            src={image}
            alt={`Página ${index + 1}`}
            className="w-full h-full object-cover rounded-md"
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
            className="absolute bottom-0 left-0 w-full px-4 pb-3 flex justify-center items-center"
            style={{
              height: '50%',
              overflow: 'hidden',
              backgroundColor: '#fdfaf3'
            }}
          >
            <div
              ref={textRef}
              className="leading-relaxed h-full w-full overflow-hidden"
              style={{
                fontSize: `${fontSize}px`,
                color: '#8b5e3c',
                lineHeight: '1.6',
                letterSpacing: '0.25px',
                textAlign: 'justify',
                fontFamily: 'Georgia, serif'
              }}
            >
              {text
                .split(/\n+/)
                .filter(p => p.trim() !== '')
                .map((paragraph, idx) => (
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
