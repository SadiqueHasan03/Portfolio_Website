// Quick test to verify the contact form issue is fixed
import { emailService } from './src/services/emailService.js'

// Test valid form data
const testFormData = {
  name: 'Test User',
  email: 'test@example.com', 
  project: 'Test Project',
  message: 'This is a test message.'
}

// Test validation logic
console.log('Testing contact form validation...')

try {
  // Test the email service validation directly
  const result = await emailService.sendContactEmail(testFormData)
  
  console.log('Result:', result)
  
  if (result.success) {
    console.log('✅ SUCCESS: Contact form validation is working correctly!')
  } else {
    console.log('❌ FAILURE: Validation failed with message:', result.message)
    if (result.errors) {
      console.log('Validation errors:', result.errors)
    }
    if (result.fieldErrors) {
      console.log('Field errors:', result.fieldErrors)
    }
  }
} catch (error) {
  console.log('❌ ERROR: Exception occurred:', error.message)
}

// Test configuration
console.log('\nTesting EmailJS configuration...')
try {
  const configTest = await emailService.testConfiguration()
  console.log('Configuration test result:', configTest)
} catch (error) {
  console.log('Configuration test error:', error.message)
}