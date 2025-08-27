'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (_data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, always show success
    // In a real implementation, this would connect to your preferred contact method
    setSubmitStatus('success')
    reset()
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-headings">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Your full name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-headings">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-headings">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-headings">
          Message *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message', { required: 'Message is required' })}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tell us about your automotive needs or questions..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 border border-green-200 rounded-lg bg-green-50">
          <p className="text-green-800">
            Thank you! Your message has been received. We'll get back to you soon.
          </p>
          <p className="mt-2 text-sm text-green-700">
            For immediate assistance, please call us at (555) 123-4567.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <p className="text-red-800">
            Sorry, there was an error processing your message. Please try calling us directly.
          </p>
        </div>
      )}

      {/* Contact Information */}
      <div className="p-4 rounded-lg bg-gray-50">
        <p className="mb-2 text-sm text-gray-600">
          <strong>Prefer to contact us directly?</strong>
        </p>
        <div className="space-y-1 text-sm text-gray-600">
          <p>📞 Call us: (555) 123-4567</p>
          <p>✉️ Email us: info@4dekk.com</p>
          <p>📍 Visit us: 123 Main Street, City, State 12345</p>
        </div>
      </div>

      {/* Privacy Notice */}
      <p className="text-sm text-gray-600">
        By submitting this form, you agree to our privacy policy and consent to being contacted regarding your inquiry.
      </p>
    </form>
  )
} 