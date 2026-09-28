import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Caught by ErrorBoundary:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.fallback || (
          <div className="flex items-center justify-center p-6 text-center font-mono text-xs text-muted">
            <span className="rounded border border-line bg-ink-soft px-3 py-2">
              [COMPONENT_STANDBY]
            </span>
          </div>
        )
      )
    }

    return this.props.children
  }

  private get fallback() {
    return this.props.fallback
  }
}
