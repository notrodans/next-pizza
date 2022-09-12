import { useEffect, useRef, useState } from 'react'

const useOutside = (inititalIsVisible: boolean) => {
  const [isShow, setIsShow] = useState<boolean>(inititalIsVisible)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: any) => {
    if (ref.current && !event.target.closest('.sort')) setIsShow(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [])

  return { ref, isShow, setIsShow }
}

export default useOutside
