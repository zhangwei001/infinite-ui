import { isDev } from './is-dev'

export function devWarning(component: string, message: string): void {
  if (isDev) {
    console.warn(`[infinite-ui: ${component}] ${message}`)
  }
}

export function devError(component: string, message: string) {
  if (isDev) {
    console.error(`[infinite-ui: ${component}] ${message}`)
  }
}
