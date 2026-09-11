export type Gender = 'male' | 'female'

export type CitizenStatus = 'active' | 'archived' | 'pending'

export type StatusFilter = CitizenStatus | 'all'

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed'

export type Citizenship = 'ru' | 'foreign' | 'stateless'

export type BenefitCategory =
  'veteran' | 'disabled' | 'largeFamily' | 'lowIncome' | 'pensioner'

export type Relationship = 'spouse' | 'child' | 'parent' | 'sibling' | 'other'

export type EducationLevel =
  'secondary' | 'vocational' | 'higher' | 'postgraduate'

export type PreferredContactMethod = 'phone' | 'email' | 'mail'

export type DocumentType =
  'passport' | 'snils' | 'inn' | 'birthCertificate' | 'driverLicense'

export interface Citizen {
  id: number
  caseNumber: string
  lastName: string
  firstName: string
  middleName: string
  birthDate: string
  gender: Gender
  status: CitizenStatus
  district: string
  address: string
  phone: string
  registrationDate: string
}

export interface FamilyMember {
  id: string
  fullName: string
  relationship: Relationship
  birthDate: string
  phone: string
}

export interface EducationRecord {
  id: string
  institution: string
  level: EducationLevel
  specialty: string
  graduationYear: string
  documentNumber: string
}

export interface ContactInfo {
  phone: string
  secondaryPhone: string
  email: string
  preferredMethod: PreferredContactMethod
  smsConsent: boolean
  convenientCallTime: string
}

export interface DocumentRecord {
  id: string
  type: DocumentType
  series: string
  issueDate: string
  issuedBy: string
}

export interface CitizenGeneralInfo extends Citizen {
  birthPlace: string
  snils: string
  inn: string
  maritalStatus: MaritalStatus
  citizenship: Citizenship
  livesAtRegisteredAddress: boolean
  actualAddress: string
  benefitCategories: BenefitCategory[]
  note: string
}

export interface CitizenDetails extends CitizenGeneralInfo {
  familyMembers: FamilyMember[]
  education: EducationRecord[]
  contacts: ContactInfo
  documents: DocumentRecord[]
}

export interface CitizenDetailsDraft extends CitizenGeneralInfo {
  familyMembers?: FamilyMember[]
  education?: EducationRecord[]
  contacts?: ContactInfo
  documents?: DocumentRecord[]
}
