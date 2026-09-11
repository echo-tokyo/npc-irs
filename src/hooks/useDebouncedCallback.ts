import { useCallback, useEffect, useRef } from 'react'

export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delayMs = 300,
): (...args: Args) => void {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  useEffect(() => {
    callbackRef.current = callback
  })

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return useCallback(
    (...args: Args) => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(
        () => callbackRef.current(...args),
        delayMs,
      )
    },
    [delayMs],
  )
}
