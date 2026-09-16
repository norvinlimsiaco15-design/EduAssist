import React, { useState } from 'react'
import { Search, UserPlus, Pencil, Trash2 } from 'lucide-react'
import DashboardShell from '../../components/layout/DashboardShell'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { Badge, Input, Select } from '../../components/ui/Misc'
import { accountStatusLabels } from '../../lib/data'
import { getAccounts } from '../../lib/accounts'

export default function UserManagement() {
  const [query, setQuery] = useState('')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [deleteUser, setDeleteUser] = useState(null)
  const users = getAccounts()
  const filtered = users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <DashboardShell role="admin" title="User Management">
      <Card className="p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users..."
              className="w-full rounded-xl border border-ink-300/60 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
            />
          </div>
          <Button icon={UserPlus} onClick={() => setInviteOpen(true)}>Invite User</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-900/5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                <th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Role</th><th className="pb-3 pr-4">Status</th><th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-ink-900/5 last:border-0 hover:bg-ink-900/[0.015]">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                        {u.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="font-medium text-ink-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4 text-ink-500">{u.email}</td>
                  <td className="py-3.5 pr-4 text-ink-700">{u.role}</td>
                  <td className="py-3.5 pr-4">
                    <Badge status={u.accountStatus || u.status}>{accountStatusLabels[u.accountStatus] || u.status}</Badge>
                  </td>
                  <td className="py-3.5">
                    <div className="flex gap-1.5">
                      <button onClick={() => setEditUser(u)} className="rounded-lg p-1.5 text-ink-500 hover:bg-primary-50 hover:text-primary-600"><Pencil size={15} /></button>
                      <button onClick={() => setDeleteUser(u)} className="rounded-lg p-1.5 text-ink-500 hover:bg-red-50 hover:text-red-600"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invite User"
        footer={<><Button variant="secondary" onClick={() => setInviteOpen(false)}>Cancel</Button><Button onClick={() => setInviteOpen(false)}>Send Invite</Button></>}>
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Juan Dela Cruz" />
          <Input label="Email" type="email" placeholder="juan@email.com" />
          <Select label="Role"><option>Student</option><option>Consultant</option><option>Administrator</option></Select>
        </div>
      </Modal>

      <Modal open={!!editUser} onClose={() => setEditUser(null)} title="Edit User"
        footer={<><Button variant="secondary" onClick={() => setEditUser(null)}>Cancel</Button><Button onClick={() => setEditUser(null)}>Save Changes</Button></>}>
        {editUser && (
          <div className="space-y-4">
            <Input label="Full Name" defaultValue={editUser.name} />
            <Input label="Email" defaultValue={editUser.email} />
            <Select label="Role" defaultValue={editUser.role}><option>Student</option><option>Consultant</option><option>Administrator</option></Select>
            <Select label="Status" defaultValue={editUser.status}><option>Active</option><option>Invited</option><option>Suspended</option></Select>
          </div>
        )}
      </Modal>

      <Modal open={!!deleteUser} onClose={() => setDeleteUser(null)} title="Delete User"
        footer={<><Button variant="secondary" onClick={() => setDeleteUser(null)}>Cancel</Button><Button variant="danger" onClick={() => setDeleteUser(null)}>Delete</Button></>}>
        <p className="text-sm text-ink-700">
          Are you sure you want to delete <span className="font-semibold">{deleteUser?.name}</span>? This action cannot be undone.
        </p>
      </Modal>
    </DashboardShell>
  )
}
