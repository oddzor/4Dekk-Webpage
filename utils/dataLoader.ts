import businessData from '@/data/business.json'
import businessEnData from '@/data/business-en.json'
import servicesData from '@/data/services.json'
import servicesEnData from '@/data/services-en.json'
import pricingData from '@/data/pricing.json'
import pricingEnData from '@/data/pricing-en.json'

type Language = 'no' | 'en'

export function getBusinessData(language: Language = 'no') {
  return language === 'en' ? businessEnData : businessData
}

export function getServicesData(language: Language = 'no') {
  return language === 'en' ? servicesEnData : servicesData
}

export function getPricingData(language: Language = 'no') {
  return language === 'en' ? pricingEnData : pricingData
}

export function getAllData(language: Language = 'no') {
  return {
    business: getBusinessData(language),
    services: getServicesData(language),
    pricing: getPricingData(language)
  }
}
