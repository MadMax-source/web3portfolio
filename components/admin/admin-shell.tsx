'use client'

import { useState } from 'react'
import AdminSidebar from './admin-sidebar'
import AdminDashboard from './admin-dashboard'
import BlogManager from './blog-manager'
import ProjectManager from './project-manager'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

type Tab = 'dashboard' | 'blog' | 'projects'

export default function AdminShell() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderPanel = () => {
    if (activeTab === 'blog') return <BlogManager />
    if (activeTab === 'projects') return <ProjectManager />
    return <AdminDashboard setActiveTab={setActiveTab} />
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed left-0 top-0 bottom-0 z-50 lg:hidden"
            >
              <AdminSidebar
                activeTab={activeTab}
                setActiveTab={(tab) => { setActiveTab(tab as Tab); setSidebarOpen(false) }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="lg:hidden" />
          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">Live</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-primary font-mono text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Panel */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {renderPanel()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
