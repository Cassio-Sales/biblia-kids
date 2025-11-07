'use client'

import React, {
  useEffect,
  useState,
  useRef,
  type FC,
  type ReactElement
} from 'react'
import HTMLFlipBook from 'react-pageflip'

interface FlipEvent {
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
  updateKey: number
}

const StoryBook: FC<StoryBookProps> = ({
  pages,
  subtitles = [],
  texts = [],
  onPageChange
}): ReactElement => {
  const [updateKey, setUpdateKey] = useState(0)

  const handleFlip = (e: FlipEvent): void => {
    const current = e.data
    onPageChange?.(current)
    setUpdateKey(prev => prev + 1)

    window.dispatchEvent(new Event('resize'))
  }

  useEffect(() => {
    const handleOrientation = (): void => {
      window.dispatchEvent(new Event('resize'))
    }

    window.addEventListener('orientationchange', handleOrientation)
    return () =>
      window.removeEventListener('orientationchange', handleOrientation)
  }, [])

  return (
    <div
      className="flex justify-center items-center w-full"
      style={{ height: '100dvh', overflow: 'hidden' }}
    >
      <HTMLFlipBook
        width={340}
        height={600}
        minWidth={280}
        maxWidth={480}
        minHeight={400}
        maxHeight={650}
        showCover={false}
        flippingTime={1200}
        mobileScrollSupport
        className="mx-auto rounded-xl shadow-lg bg-[#fdfaf3]"
        onFlip={handleFlip}
        style={{
          backgroundColor: '#fdfaf3',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
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
            updateKey={updateKey}
          />
        ))}
      </HTMLFlipBook>
    </div>
  )
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ image, subtitle, text, index, updateKey }, ref) => {
    const textRef = useRef<HTMLDivElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [fontSize, setFontSize] = useState<number>(16)

    useEffect(() => {
      const adjustFont = (): void => {
        const el = textRef.current
        const wrap = wrapperRef.current
        if (!el || !wrap) return

        const isMobile = window.innerWidth < 768
        const maxBase = isMobile ? 22 : 18
        const maxFont = maxBase * 0.8
        let low = 11
        let high = maxFont

        const fits = (size: number): boolean => {
          el.style.fontSize = `${size}px`
          return el.scrollHeight <= wrap.clientHeight
        }

        while (high - low > 0.2) {
          const mid = (low + high) / 2
          if (fits(mid)) low = mid
          else high = mid
        }

        el.style.fontSize = `${low}px`
        setFontSize(low)
      }

      adjustFont()
      window.addEventListener('resize', adjustFont)
      return () => window.removeEventListener('resize', adjustFont)
    }, [text, updateKey])

    return (
      <div
        ref={ref}
        className="relative w-full h-full bg-[#fdfaf3] px-5 overflow-hidden"
        style={{
          fontFamily: 'Georgia, serif',
          color: '#8b5e3c'
        }}
      >
        <div className="w-full h-[40%] rounded-md overflow-hidden shadow-sm">
          <img
            src={image}
            alt={`Página ${index + 1}`}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {subtitle && (
          <div
            className="flex items-center justify-center w-full h-[10%] mt-1"
            style={{ color: '#8b5e3c', fontFamily: '"Baloo 2", sans-serif' }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
              {subtitle}
            </h2>
          </div>
        )}

        {text && (
          <div
            ref={wrapperRef}
            className="absolute bottom-0 left-0 w-full px-5 pb-2 flex justify-center items-center"
            style={{
              height: '50%',
              backgroundColor: '#fdfaf3',
              overflow: 'hidden'
            }}
          >
            <div
              ref={textRef}
              className="h-full w-full leading-relaxed overflow-hidden"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: '1.6',
                textAlign: 'justify',
                letterSpacing: '0.25px',
                color: '#8b5e3c',
                fontFamily: 'Georgia, serif',
                whiteSpace: 'pre-line'
              }}
            >
              {text.trim()}
            </div>
          </div>
        )}

        <div className="absolute bottom-1 right-3 text-[10px] sm:text-xs text-gray-500">
          {index + 1}
        </div>
      </div>
    )
  }
)

Page.displayName = 'Page'

export default StoryBook
