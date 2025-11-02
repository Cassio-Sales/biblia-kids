declare module 'react-pageflip' {
  import { ComponentType, CSSProperties, ReactNode } from 'react'

  interface PageFlipEvent {
    data: number
  }

  interface HTMLFlipBookProps {
    width?: number
    height?: number
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    maxShadowOpacity?: number
    showCover?: boolean
    mobileScrollSupport?: boolean
    className?: string
    style?: CSSProperties
    onFlip?: (e: PageFlipEvent) => void
    children?: ReactNode

    
    drawShadow?: boolean
    flippingTime?: number
    useMouseEvents?: boolean
  }

  const HTMLFlipBook: ComponentType<HTMLFlipBookProps>

  export default HTMLFlipBook
}
