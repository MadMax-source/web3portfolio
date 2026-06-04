import { Metadata } from 'next'
import AdminShell from '@/components/admin/admin-shell'

export const metadata: Metadata = {
  title: 'Admin Panel | Alex',
  description: 'Manage blog posts and projects.',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminShell />
}
