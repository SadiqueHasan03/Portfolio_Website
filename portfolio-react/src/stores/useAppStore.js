import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme state with system detection
      theme: 'system', // 'light' | 'dark' | 'system'
      resolvedTheme: 'light', // actual computed theme
      
      // Initialize theme from system preference
      initializeTheme: () => {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const currentState = get()
        
        let resolvedTheme
        if (currentState.theme === 'system') {
          resolvedTheme = systemPrefersDark ? 'dark' : 'light'
        } else {
          resolvedTheme = currentState.theme
        }
        
        set({ resolvedTheme })
      },
      
      // Enhanced toggle with cycling through options
      toggleTheme: () => set((state) => {
        const themeOrder = ['light', 'dark', 'system']
        const currentIndex = themeOrder.indexOf(state.theme)
        const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length]
        
        return { theme: nextTheme }
      }),
      
      // Set specific theme
      setTheme: (theme) => set({ theme }),
      
      // Update resolved theme when system preference changes
      updateResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
  
  // Navigation state
  activeSection: '',
  setActiveSection: (section) => set({ activeSection: section }),
  
  // Mobile menu state
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({
    mobileMenuOpen: !state.mobileMenuOpen
  })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  
  // Skills accordion state
  openSkillSections: ['frontend', 'backend'], // Start with both frontend and backend open
  toggleSkillSection: (section) => set((state) => ({
    openSkillSections: state.openSkillSections.includes(section)
      ? state.openSkillSections.filter(s => s !== section)
      : [...state.openSkillSections, section]
  })),
  
  // Qualification tabs state
  activeQualificationTab: 'education',
  setActiveQualificationTab: (tab) => set({ activeQualificationTab: tab }),
  

    }),
    {
      name: 'portfolio-theme-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        theme: state.theme 
      }),
    }
  )
)

export default useAppStore