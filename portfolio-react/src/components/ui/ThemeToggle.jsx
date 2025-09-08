import useAppStore from '../../stores/useAppStore'

function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <i className={`uil text-xl transition-transform duration-300 ${
        isDark ? 'uil-sun rotate-180' : 'uil-moon'
      }`}></i>
    </button>
  )
}

export default ThemeToggle;