function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Loading...
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner;