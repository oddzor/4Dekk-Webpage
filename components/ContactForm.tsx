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
          Fullt Navn *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Navn er påkrevd' })}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ditt fulle navn"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-headings">
          E-post Adresse *
        </label>
        <input
          type="email"
          id="email"
          {...register('email', { 
            required: 'E-post er påkrevd',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Ugyldig e-post adresse'
            }
          })}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="din.epost@eksempel.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-headings">
          Telefonnummer
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
          Melding *
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message', { required: 'Melding er påkrevd' })}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Fortell oss om dine bilbehov eller spørsmål..."
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
        {isSubmitting ? 'Sender...' : 'Send Melding'}
      </button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 border border-green-200 rounded-lg bg-green-50">
          <p className="text-green-800">
            Takk! Din melding er mottatt. Vi kommer tilbake til deg snart.
          </p>
          <p className="mt-2 text-sm text-green-700">
            For umiddelbar hjelp, vennligst ring oss på (555) 123-4567.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <p className="text-red-800">
            Beklager, det oppstod en feil ved behandling av din melding. Vennligst prøv å ringe oss direkte.
          </p>
        </div>
      )}

      {/* Contact Information */}
      <div className="p-4 rounded-lg bg-gray-50">
        <p className="mb-2 text-sm text-gray-600">
          <strong>Foretrekker å kontakte oss direkte?</strong>
        </p>
        <div className="space-y-1 text-sm text-gray-600">
          <p>📞 Ring oss: (555) 123-4567</p>
          <p>✉️ E-post oss: 4dekk4@gmail.com</p>
          <p>📍 Besøk oss: 123 Hovedgaten, By, Fylke 12345</p>
        </div>
      </div>

      {/* Privacy Notice */}
      <p className="text-sm text-gray-600">
        Ved å sende inn dette skjemaet godtar du vår personvernpolicy og samtykker til å bli kontaktet angående din henvendelse.
      </p>
    </form>
  )
} 