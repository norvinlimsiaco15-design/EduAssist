export const countries = [
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', tuition: '$18,000–35,000/yr', living: '$1,400–2,200/mo', schools: 14, image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', tuition: '$16,000–30,000/yr', living: '$1,200–1,900/mo', schools: 11, image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', tuition: '$0–3,500/yr', living: '$900–1,300/mo', schools: 9, image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', currency: 'NZD', tuition: '$15,000–28,000/yr', living: '$1,100–1,700/mo', schools: 6, image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&q=80' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', tuition: '£12,000–26,000/yr', living: '£900–1,400/mo', schools: 13, image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', tuition: '€6,000–14,000/yr', living: '€700–1,100/mo', schools: 5, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', tuition: '$22,000–48,000/yr', living: '$1,300–2,400/mo', schools: 17, image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', tuition: 'S$18,000–32,000/yr', living: 'S$1,000–1,700/mo', schools: 4, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currency: 'KRW', tuition: '₩8M–16M/yr', living: '₩900K–1.5M/mo', schools: 3, image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', currency: 'EUR', tuition: '€7,000–13,000/yr', living: '€700–1,000/mo', schools: 2, image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&q=80' },
]

export const schools = [
  { id: 1, name: 'University of Melbourne', country: 'Australia', flag: '🇦🇺', programs: ['Business', 'IT', 'Engineering'], tuition: '$32,000/yr', tuitionUSD: 22400, logo: '🏛️', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=900&q=80' },
  { id: 2, name: 'University of Toronto', country: 'Canada', flag: '🇨🇦', programs: ['Computer Science', 'Nursing'], tuition: '$28,500/yr', tuitionUSD: 20200, logo: '🏛️', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&q=80' },
  { id: 3, name: 'Technical University of Munich', country: 'Germany', flag: '🇩🇪', programs: ['Engineering', 'Data Science'], tuition: '$2,500/yr', tuitionUSD: 2700, logo: '🏛️', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=900&q=80' },
  { id: 4, name: 'University of Auckland', country: 'New Zealand', flag: '🇳🇿', programs: ['Architecture', 'Business'], tuition: '$26,000/yr', tuitionUSD: 15800, logo: '🏛️', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=900&q=80' },
  { id: 5, name: 'University of Manchester', country: 'United Kingdom', flag: '🇬🇧', programs: ['Law', 'Economics'], tuition: '£24,000/yr', tuitionUSD: 30400, logo: '🏛️', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80' },
  { id: 6, name: 'IE University', country: 'Spain', flag: '🇪🇸', programs: ['International Relations'], tuition: '€13,200/yr', tuitionUSD: 14300, logo: '🏛️', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=900&q=80' },
  { id: 7, name: 'University of California, Los Angeles', country: 'United States', flag: '🇺🇸', programs: ['Computer Science', 'Business', 'Engineering'], tuition: '$38,000/yr', tuitionUSD: 38000, logo: '🏛️', image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=900&q=80' },
  { id: 8, name: 'New York University', country: 'United States', flag: '🇺🇸', programs: ['Business', 'Law', 'Data Science'], tuition: '$56,000/yr', tuitionUSD: 56000, logo: '🏛️', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=80' },
  { id: 9, name: 'National University of Singapore', country: 'Singapore', flag: '🇸🇬', programs: ['Computer Science', 'Engineering', 'Business'], tuition: 'S$22,000/yr', tuitionUSD: 16300, logo: '🏛️', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&q=80' },
  { id: 10, name: 'Nanyang Technological University', country: 'Singapore', flag: '🇸🇬', programs: ['Engineering', 'IT', 'Data Science'], tuition: 'S$18,500/yr', tuitionUSD: 13700, logo: '🏛️', image: 'https://images.unsplash.com/photo-1565967511849-76a60a69faaf?w=900&q=80' },
  { id: 11, name: 'Seoul National University', country: 'South Korea', flag: '🇰🇷', programs: ['Engineering', 'Computer Science', 'International Relations'], tuition: '₩10M/yr', tuitionUSD: 7300, logo: '🏛️', image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=900&q=80' },
  { id: 12, name: 'Korea University', country: 'South Korea', flag: '🇰🇷', programs: ['Business', 'Economics', 'IT'], tuition: '₩12M/yr', tuitionUSD: 8800, logo: '🏛️', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80' },
  { id: 13, name: 'University of Malta', country: 'Malta', flag: '🇲🇹', programs: ['IT', 'Business', 'International Relations'], tuition: '€8,500/yr', tuitionUSD: 9200, logo: '🏛️', image: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=900&q=80' },
  { id: 14, name: 'Middlesex University Malta', country: 'Malta', flag: '🇲🇹', programs: ['Computer Science', 'Business'], tuition: '€12,500/yr', tuitionUSD: 13500, logo: '🏛️', image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80' },
]

export const tuitionRanges = [
  { id: 'any', label: 'Any' },
  { id: 'under15', label: 'Under $15,000/yr', min: 0, max: 14999 },
  { id: 'mid', label: '$15,000–30,000/yr', min: 15000, max: 30000 },
  { id: 'over30', label: '$30,000+/yr', min: 30001, max: Infinity },
]

export const applications = [
  { id: 'APP-2201', student: 'Maria Santos', avatar: 'MS', school: 'University of Melbourne', country: 'Australia', flag: '🇦🇺', program: 'BS Information Technology', status: 'COE Processing' },
  { id: 'APP-2202', student: 'Jared Cruz', avatar: 'JC', school: 'University of Toronto', country: 'Canada', flag: '🇨🇦', program: 'BS Nursing', status: 'Contract Signed' },
  { id: 'APP-2203', student: 'Angela Reyes', avatar: 'AR', school: 'TU Munich', country: 'Germany', flag: '🇩🇪', program: 'MS Data Science', status: 'Lodged' },
  { id: 'APP-2204', student: 'Paolo Bautista', avatar: 'PB', school: 'University of Auckland', country: 'New Zealand', flag: '🇳🇿', program: 'BS Architecture', status: 'Waiting for Result' },
  { id: 'APP-2205', student: 'Kim De Leon', avatar: 'KD', school: 'University of Manchester', country: 'United Kingdom', flag: '🇬🇧', program: 'BA Economics', status: 'COE Processing' },
]

export const statusColors = {
  'Contract Signed': 'bg-primary-50 text-primary-700 border-primary-100',
  'Documents Submitted': 'bg-accent-50 text-accent-600 border-accent-400/30',
  'COE Processing': 'bg-amber-50 text-amber-700 border-amber-200',
  'Lodged': 'bg-violet-50 text-violet-700 border-violet-200',
  'Lodgement': 'bg-violet-50 text-violet-700 border-violet-200',
  'Waiting for Result': 'bg-slate-100 text-slate-600 border-slate-200',
  'Completed': 'bg-success-50 text-success-500 border-success-500/20',
  'Approved': 'bg-success-50 text-success-500 border-success-500/20',
}

export const timelineStages = [
  'Contract Signed',
  'Documents Submitted',
  'COE Processing',
  'Lodgement',
  'Waiting for Result',
  'Completed',
]

export const documents = [
  { id: 1, name: 'Passport_Santos_M.pdf', category: 'Passport', status: 'Verified', size: '1.2 MB', date: 'Aug 12, 2026' },
  { id: 2, name: 'COE_Melbourne_2026.pdf', category: 'COE', status: 'Pending Review', size: '860 KB', date: 'Aug 20, 2026' },
  { id: 3, name: 'Visa_Application_Form.pdf', category: 'Visa', status: 'Verified', size: '2.1 MB', date: 'Aug 22, 2026' },
  { id: 4, name: 'Transcript_of_Records.pdf', category: 'Transcript', status: 'Verified', size: '540 KB', date: 'Jul 30, 2026' },
  { id: 5, name: 'Medical_Exam_Result.pdf', category: 'Medical', status: 'Pending Review', size: '410 KB', date: 'Aug 25, 2026' },
]

export const students = [
  { id: 1, name: 'Maria Santos', avatar: 'MS', country: 'Australia', flag: '🇦🇺', program: 'BS Information Technology', status: 'COE Processing', email: 'maria.santos@email.com' },
  { id: 2, name: 'Jared Cruz', avatar: 'JC', country: 'Canada', flag: '🇨🇦', program: 'BS Nursing', status: 'Contract Signed', email: 'jared.cruz@email.com' },
  { id: 3, name: 'Angela Reyes', avatar: 'AR', country: 'Germany', flag: '🇩🇪', program: 'MS Data Science', status: 'Lodged', email: 'angela.reyes@email.com' },
  { id: 4, name: 'Paolo Bautista', avatar: 'PB', country: 'New Zealand', flag: '🇳🇿', program: 'BS Architecture', status: 'Waiting for Result', email: 'paolo.bautista@email.com' },
  { id: 5, name: 'Kim De Leon', avatar: 'KD', country: 'United Kingdom', flag: '🇬🇧', program: 'BA Economics', status: 'COE Processing', email: 'kim.deleon@email.com' },
  { id: 6, name: 'Noel Fernandez', avatar: 'NF', country: 'Spain', flag: '🇪🇸', program: 'BA International Relations', status: 'Completed', email: 'noel.fernandez@email.com' },
]

export const exchangeRates = {
  AUD: 41.2, CAD: 41.8, USD: 58.9, GBP: 74.6, EUR: 63.8, SGD: 43.7, KRW: 0.043, NZD: 35.9,
}

export const monthlyApplications = [
  { month: 'Mar', applications: 12 }, { month: 'Apr', applications: 18 },
  { month: 'May', applications: 15 }, { month: 'Jun', applications: 24 },
  { month: 'Jul', applications: 31 }, { month: 'Aug', applications: 27 },
]

export const countryDistribution = [
  { name: 'Australia', value: 34, color: '#2563EB' },
  { name: 'Canada', value: 22, color: '#60A5FA' },
  { name: 'UK', value: 18, color: '#F59E0B' },
  { name: 'Germany', value: 14, color: '#16A34A' },
  { name: 'Others', value: 12, color: '#CBD5E1' },
]

export const users = [
  { id: 1, name: 'Maria Santos', email: 'maria.santos@email.com', role: 'Student', status: 'Active' },
  { id: 2, name: 'Carla Dizon', email: 'carla.dizon@eduassist.ph', role: 'Consultant', status: 'Active' },
  { id: 3, name: 'Renz Aquino', email: 'renz.aquino@eduassist.ph', role: 'Consultant', status: 'Active' },
  { id: 4, name: 'Jared Cruz', email: 'jared.cruz@email.com', role: 'Student', status: 'Invited' },
  { id: 5, name: 'Admin User', email: 'admin@eduassist.ph', role: 'Administrator', status: 'Active' },
  { id: 6, name: 'Angela Reyes', email: 'angela.reyes@email.com', role: 'Student', status: 'Suspended' },
]
