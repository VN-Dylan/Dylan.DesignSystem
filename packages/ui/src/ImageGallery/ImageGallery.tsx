import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { classNames, useControllableState } from '@vn-dylan/utils'
import { Button } from '../Button'
import { Carousel } from '../Carousel'
import type { CarouselApi } from '../Carousel'
import { Portal } from '../_internal/Portal'
import { useFocusTrap } from '../_internal/useFocusTrap'
import { ImageGalleryContext, useImageGallery } from './context'
import type { ImageGalleryColumns, ImageGalleryProps } from './types'
import './ImageGallery.scss'

const defaultColumns = { sm: 2, md: 3, lg: 4 }

const normalizeColumns = (columns: ImageGalleryColumns | undefined) => {
  if (typeof columns === 'number') return { sm: columns, md: columns, lg: columns }
  return {
    sm: columns?.sm ?? defaultColumns.sm,
    md: columns?.md ?? columns?.sm ?? defaultColumns.md,
    lg: columns?.lg ?? columns?.md ?? columns?.sm ?? defaultColumns.lg,
  }
}

const normalizeIndex = (index: number | null | undefined, count: number) => {
  if (index == null || count === 0) return null
  if (index < 0 || index >= count) return null
  return index
}

function ImageGalleryLightbox() {
  const { images, currentIndex, setCurrentIndex, loop } = useImageGallery('ImageGallery.Lightbox')
  const dialogRef = useRef<HTMLDivElement>(null)
  const [api, setApi] = useState<CarouselApi | null>(null)
  const current = images[currentIndex]

  useFocusTrap(dialogRef, true)

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCurrentIndex(null)
        return
      }
      if (event.defaultPrevented) return
      if (event.key === 'ArrowLeft' && api?.canScrollPrev) {
        event.preventDefault()
        api.scrollPrev()
      }
      if (event.key === 'ArrowRight' && api?.canScrollNext) {
        event.preventDefault()
        api.scrollNext()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [api, setCurrentIndex])

  useEffect(() => {
    if (api && api.selectedIndex !== currentIndex) api.scrollTo(currentIndex)
  }, [api, currentIndex])

  const handleSetApi = useCallback(
    (nextApi: CarouselApi) => {
      setApi(nextApi)
      if (nextApi.selectedIndex !== currentIndex) setCurrentIndex(nextApi.selectedIndex)
    },
    [currentIndex, setCurrentIndex],
  )

  if (!current) return null

  return (
    <Portal>
      <div
        className="dyl-image-gallery__overlay"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setCurrentIndex(null)
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          tabIndex={-1}
          className="dyl-image-gallery__dialog"
        >
          <div className="dyl-image-gallery__viewer">
            <Carousel
              className="dyl-image-gallery__carousel"
              opts={{ startIndex: currentIndex, loop }}
              setApi={handleSetApi}
            >
              <Carousel.Previous className="dyl-image-gallery__control" />
              <Carousel.Content>
                {images.map((image) => (
                  <Carousel.Item key={image.src}>
                    <figure className="dyl-image-gallery__slide">
                      <img
                        className="dyl-image-gallery__full-image"
                        src={image.src}
                        alt={image.alt}
                      />
                      {image.caption != null && (
                        <figcaption className="dyl-image-gallery__caption">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  </Carousel.Item>
                ))}
              </Carousel.Content>
              <Carousel.Next className="dyl-image-gallery__control" />
            </Carousel>
            <Button
              className="dyl-image-gallery__close"
              size="sm"
              shape="circle"
              aria-label="Close image viewer"
              onClick={() => setCurrentIndex(null)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Button>
          </div>
          <div className="dyl-image-gallery__meta">
            <div className="dyl-image-gallery__counter" aria-live="polite">
              {currentIndex + 1} / {images.length}
            </div>
            <div className="dyl-image-gallery__thumbs" aria-label="Image thumbnails">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  className="dyl-image-gallery__thumb"
                  data-active={index === currentIndex || undefined}
                  aria-label={`View image ${index + 1}: ${image.alt}`}
                  aria-current={index === currentIndex ? 'true' : undefined}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    className="dyl-image-gallery__thumb-image"
                    src={image.thumbnail ?? image.src}
                    alt=""
                    aria-hidden
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

const ImageGalleryRoot = forwardRef<HTMLDivElement, ImageGalleryProps>(function ImageGallery(
  {
    images,
    columns,
    gap = 'md',
    aspectRatio = '4 / 3',
    defaultOpenIndex,
    open,
    onOpenChange,
    loop = true,
    className,
    style,
    ...rest
  },
  ref,
) {
  const resolvedColumns = normalizeColumns(columns)
  const [currentIndex, setCurrentIndex] = useControllableState<number | null>({
    value: open,
    defaultValue: normalizeIndex(defaultOpenIndex, images.length),
    onChange: onOpenChange,
  })
  const normalizedCurrentIndex = normalizeIndex(currentIndex, images.length)
  const context = useMemo(
    () => ({
      images,
      currentIndex: normalizedCurrentIndex ?? 0,
      setCurrentIndex,
      loop,
    }),
    [images, loop, normalizedCurrentIndex, setCurrentIndex],
  )
  const gridStyle = {
    ...style,
    '--dyl-image-gallery-cols-sm': resolvedColumns.sm,
    '--dyl-image-gallery-cols-md': resolvedColumns.md,
    '--dyl-image-gallery-cols-lg': resolvedColumns.lg,
  } as CSSProperties

  return (
    <ImageGalleryContext.Provider value={context}>
      <div
        ref={ref}
        data-gap={gap}
        className={classNames('dyl-image-gallery', className)}
        style={gridStyle}
        {...rest}
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="dyl-image-gallery__tile"
            aria-label={`View image ${index + 1}: ${image.alt}`}
            style={{ aspectRatio }}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              className="dyl-image-gallery__image"
              src={image.thumbnail ?? image.src}
              alt={image.alt}
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {normalizedCurrentIndex !== null && <ImageGalleryLightbox />}
    </ImageGalleryContext.Provider>
  )
})

/**
 * Responsive image grid with a full-screen lightbox viewer.
 */
export const ImageGallery = Object.assign(ImageGalleryRoot, {})
