import useMessage from 'antd/es/message/useMessage'
import { ReactElement } from 'react'

export function useClipboard(message?: string): [(text: string) => Promise<void>, ReactElement] {
  const [messenger, context] = useMessage()

  const copyToClipboard = (text: string) => {
    let promise: Promise<void>
    if (navigator.clipboard && window.isSecureContext) {
      promise = navigator.clipboard.writeText(text.toString())
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = text.toString()
      textArea.style.position = 'absolute'
      textArea.style.opacity = '0'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      promise = new Promise<void>((res, rej) => {
        /* eslint-disable-next-line @typescript-eslint/no-unused-expressions */
        document.execCommand('copy') ? res() : rej()
        textArea.remove()
      })
    }
    messenger.success(message)
    return promise
  }
  return [copyToClipboard, context]
}
