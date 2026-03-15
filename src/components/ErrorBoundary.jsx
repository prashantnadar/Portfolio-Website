import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen flex items-center justify-center text-center">
                    <p>Something went wrong.</p>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary;