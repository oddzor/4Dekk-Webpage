import React from 'react'
import { 
  CheckCircleIcon, 
  CircleStackIcon, 
  WrenchScrewdriverIcon, 
  BuildingOfficeIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  MapPinIcon,   
  EnvelopeIcon,
  ChevronDownIcon,
  UserGroupIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

interface IconProps {
  name: string
  className?: string
}

export default function Icon({ name, className = "w-6 h-6" }: IconProps) {
  const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
    check: CheckCircleIcon,
    tire: CircleStackIcon,
    wrench: WrenchScrewdriverIcon,
    hotel: BuildingOfficeIcon,
    clock: ClockIcon,
    currency: CurrencyDollarIcon,
    menu: Bars3Icon,
    close: XMarkIcon,
    phone: PhoneIcon,
    map: MapPinIcon,
    email: EnvelopeIcon,
    chevron: ChevronDownIcon,
    users: UserGroupIcon,
    heart: HeartIcon
  }

  const IconComponent = icons[name]
  
  if (!IconComponent) {
    return <CurrencyDollarIcon className={className} />
  }

  return <IconComponent className={className} />
}
