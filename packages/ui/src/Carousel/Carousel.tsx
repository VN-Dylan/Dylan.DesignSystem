import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { classNames } from '@vn-dylan/utils'
import { Button } from '../Button'
import { CarouselContext, useCarousel } from './context'
import type {
  CarouselContentProps,
  CarouselControlProps,
  CarouselItemProps,
  CarouselProps,
} from './types'
import './Carousel.scss'

const CarouselRoot = forwardRef<HTMLDivElement, CarouselProps>(function Carousel(
  { orientation = 'horizontal', opts, setApi, className, children, ...rest },
  ref,
) {
  const loop = opts?.loop ?? false
  const [count, setCount] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(opts?.startIndex ?? 0)

  const registerItem = useCallback(() => {
    setCount((c) => c + 1)
    return () => setCount((c) => Math.max(0, c - 1))
  }, [])

  const clampOrWrap = useCallback(
    (index: number) => {
      if (count === 0) return 0
      if (loop) return (index + count) % count
      return Math.min(count - 1, Math.max(0, index))
    },
    [count, loop],
  )

  const scrollTo = useCallback(
    (index: number) => setSelectedIndex(clampOrWrap(index)),
    [clampOrWrap],
  )
  const scrollPrev = useCallback(() => setSelectedIndex((i) => clampOrWrap(i - 1)), [clampOrWrap])
  const scrollNext = useCallback(() => setSelectedIndex((i) => clampOrWrap(i + 1)), [clampOrWrap])

  const canScrollPrev = loop ? count > 1 : selectedIndex > 0
  const canScrollNext = loop ? count > 1 : selectedIndex < count - 1

  const api = useMemo(
    () => ({
      selectedIndex,
      count,
      canScrollPrev,
      canScrollNext,
      scrollTo,
      scrollPrev,
      scrollNext,
    }),
    [selectedIndex, count, canScrollPrev, canScrollNext, scrollTo, scrollPrev, scrollNext],
  )

  const setApiRef = useRef(setApi)
  setApiRef.current = setApi
  useEffect(() => {
    setApiRef.current?.(api)
  }, [api])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const [prev, next] =
      orientation === 'horizontal' ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown']
    if (event.key === prev) {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === next) {
      event.preventDefault()
      scrollNext()
    }
  }

  return (
    <CarouselContext.Provider value={{ ...api, orientation, registerItem }}>
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        data-orientation={orientation}
        className={classNames('dyl-carousel', className)}
        onKeyDownCapture={onKeyDown}
        {...rest}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
})

const Content = forwardRef<HTMLDivElement, CarouselContentProps>(function CarouselContent(
  { className, style, ...rest },
  ref,
) {
  const { selectedIndex, orientation } = useCarousel('Carousel.Content')
  const offset = `${-selectedIndex * 100}%`
  return (
    <div className="dyl-carousel__viewport">
      <div
        ref={ref}
        className={classNames('dyl-carousel__track', className)}
        style={{
          ...style,
          transform:
            orientation === 'horizontal'
              ? `translate3d(${offset}, 0, 0)`
              : `translate3d(0, ${offset}, 0)`,
        }}
        {...rest}
      />
    </div>
  )
})

const Item = forwardRef<HTMLDivElement, CarouselItemProps>(function CarouselItem(
  { className, ...rest },
  ref,
) {
  const { registerItem } = useCarousel('Carousel.Item')
  useEffect(() => registerItem(), [registerItem])
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={classNames('dyl-carousel__item', className)}
      {...rest}
    />
  )
})

const Previous = forwardRef<HTMLButtonElement, CarouselControlProps>(function CarouselPrevious(
  { className, variant = 'default', size = 'sm', shape = 'circle', children, ...rest },
  ref,
) {
  const { scrollPrev, canScrollPrev } = useCarousel('Carousel.Previous')
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      shape={shape}
      className={className}
      disabled={!canScrollPrev}
      aria-label="Previous slide"
      onClick={scrollPrev}
      {...rest}
    >
      {children ?? '‹'}
    </Button>
  )
})

const Next = forwardRef<HTMLButtonElement, CarouselControlProps>(function CarouselNext(
  { className, variant = 'default', size = 'sm', shape = 'circle', children, ...rest },
  ref,
) {
  const { scrollNext, canScrollNext } = useCarousel('Carousel.Next')
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      shape={shape}
      className={className}
      disabled={!canScrollNext}
      aria-label="Next slide"
      onClick={scrollNext}
      {...rest}
    >
      {children ?? '›'}
    </Button>
  )
})

/**
 * Sliding content carousel with keyboard support, built without an external
 * carousel library. Compose with `Carousel.Content`, `Carousel.Item`,
 * `Carousel.Previous` and `Carousel.Next`.
 */
export const Carousel = Object.assign(CarouselRoot, { Content, Item, Previous, Next })
