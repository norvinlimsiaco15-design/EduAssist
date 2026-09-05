import React from 'react'
import { Camera } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Input } from '../../components/ui/Misc'
import { ProgressBar } from '../../components/ui/Misc'

export default function Profile() {
  return (
    <DashboardShell role="student" title="My Profile">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 text-center lg:col-span-1 h-fit">
          <div className="relative mx-auto w-fit">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-100 font-display text-3xl font-bold text-primary-700">MS</div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white shadow-lift">
              <Camera size={14} />
            </button>
          </div>
          <h2 className="mt-4 font-display text-lg font-bold text-ink-900">Maria Santos</h2>
          <p className="text-sm text-ink-500">BS Information Technology</p>
          <p className="mt-1 text-xs text-ink-500">maria.santos@email.com</p>

          <div className="mt-6 text-left">
            <div className="mb-1.5 flex justify-between text-xs font-medium text-ink-700">
              <span>Profile completion</span><span>80%</span>
            </div>
            <ProgressBar value={80} />
          </div>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <h3 className="mb-4 font-display text-base font-semibold text-ink-900">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full Name" defaultValue="Maria Santos" />
              <Input label="Date of Birth" type="date" defaultValue="2003-04-12" />
              <Input label="Nationality" defaultValue="Filipino" />
              <Input label="Contact Number" defaultValue="+63 917 123 4567" />
              <Input label="Address" className="sm:col-span-2" defaultValue="Davao City, Davao Region, Philippines" />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 font-display text-base font-semibold text-ink-900">Passport Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Passport Number" defaultValue="P1234567A" />
              <Input label="Expiry Date" type="date" defaultValue="2030-06-20" />
            </div>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
