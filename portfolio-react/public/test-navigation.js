// Test script to verify navigation and download functionality
// This script can be run in the browser console to test the implemented features

console.log('🚀 Testing Portfolio Website Navigation and Download Features...')

// Test 1: Check if all navigation targets exist
const testNavigationTargets = () => {
  console.log('📍 Testing navigation targets...')
  const navigationTargets = ['home', 'about', 'skills', 'services', 'qualification', 'contact']
  const results = {}
  
  navigationTargets.forEach(target => {
    const element = document.getElementById(target)
    results[target] = element ? '✅ Found' : '❌ Missing'
    console.log(`  ${target}: ${results[target]}`)
  })
  
  return results
}

// Test 2: Test smooth scroll functionality
const testSmoothScroll = () => {
  console.log('🔄 Testing smooth scroll functionality...')
  
  // Check if smoothScrollTo function is available
  if (typeof window.smoothScrollTo === 'function') {
    console.log('  ✅ smoothScrollTo function is available')
    return true
  } else {
    console.log('  ❌ smoothScrollTo function not found')
    return false
  }
}

// Test 3: Check if CV file exists
const testCVDownload = async () => {
  console.log('📄 Testing CV download functionality...')
  
  try {
    const response = await fetch('/assets/documents/Sadique_Hasan_CV.pdf')
    if (response.ok) {
      console.log('  ✅ CV file is accessible')
      return true
    } else {
      console.log(`  ❌ CV file not accessible (${response.status})`)
      return false
    }
  } catch (error) {
    console.log(`  ❌ Error accessing CV file: ${error.message}`)
    return false
  }
}

// Test 4: Check if services data is loaded
const testServicesData = () => {
  console.log('🔧 Testing services data...')
  
  // Check if services section exists
  const servicesSection = document.getElementById('services')
  if (servicesSection) {
    console.log('  ✅ Services section found')
    
    // Check if services cards are rendered
    const serviceCards = servicesSection.querySelectorAll('[class*="card"], .bg-primary-100, .bg-primary-900')
    console.log(`  📊 Found ${serviceCards.length} service elements`)
    
    return serviceCards.length > 0
  } else {
    console.log('  ❌ Services section not found')
    return false
  }
}

// Run all tests
const runTests = async () => {
  console.log('🧪 Running all tests...\n')
  
  const navigationTest = testNavigationTargets()
  const scrollTest = testSmoothScroll()
  const cvTest = await testCVDownload()
  const servicesTest = testServicesData()
  
  console.log('\n📊 Test Results Summary:')
  console.log('='.repeat(40))
  console.log(`Navigation Targets: ${Object.values(navigationTest).every(r => r.includes('✅')) ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Smooth Scroll: ${scrollTest ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`CV Download: ${cvTest ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`Services Section: ${servicesTest ? '✅ PASS' : '❌ FAIL'}`)
  
  const allTestsPassed = Object.values(navigationTest).every(r => r.includes('✅')) && 
                         scrollTest && cvTest && servicesTest
  
  console.log(`\n🎯 Overall Result: ${allTestsPassed ? '🎉 ALL TESTS PASSED!' : '⚠️ SOME TESTS FAILED'}`)
  
  return allTestsPassed
}

// Instructions for manual testing
console.log(`
📋 Manual Testing Instructions:
1. Navigate to the portfolio website
2. Open browser console and paste this script
3. Run: runTests()
4. Test navigation by clicking menu items
5. Test CV download button in About section
6. Verify smooth scrolling between sections

🔗 Test these navigation scenarios:
- Click "Home" → should scroll to top
- Click "About" → should scroll to about section  
- Click "Skills" → should scroll to skills section
- Click "Services" → should scroll to new services section
- Click "Qualification" → should scroll to qualification section
- Click "Contact" → should scroll to contact section
- Click "Download CV" → should download/open CV file
`)

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runTests, testNavigationTargets, testSmoothScroll, testCVDownload, testServicesData }
}