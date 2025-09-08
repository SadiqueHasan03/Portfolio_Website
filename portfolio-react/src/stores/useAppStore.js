import { create } from 'zustand'

const useAppStore = create((set, get) => ({
  // Theme state
  theme: 'light',
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
  
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
  openSkillSections: ['frontend'], // Start with frontend open
  toggleSkillSection: (section) => set((state) => ({
    openSkillSections: state.openSkillSections.includes(section)
      ? state.openSkillSections.filter(s => s !== section)
      : [...state.openSkillSections, section]
  })),
  
  // Qualification tabs state
  activeQualificationTab: 'education',
  setActiveQualificationTab: (tab) => set({ activeQualificationTab: tab }),
  
  // Contact form state
  contactFormSubmitting: false,
  setContactFormSubmitting: (submitting) => set({ contactFormSubmitting: submitting }),
}))

export default useAppStore