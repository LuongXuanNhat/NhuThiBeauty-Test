'use client'

import { useState } from 'react'
import { 
  Home, 
  Users, 
  Settings, 
  FileText, 
  Calendar, 
  BookOpen,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Menu,
  X
} from 'lucide-react'

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  children?: MenuItem[]
  badge?: string
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    href: '#'
  },
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    children: [
      { id: 'users-list', label: 'User List', icon: Users, href: '#' },
      { id: 'users-roles', label: 'User Roles', icon: Users, href: '#' },
      { id: 'users-permissions', label: 'Permissions', icon: Users, href: '#' }
    ]
  },
  {
    id: 'account',
    label: 'Account',
    icon: Settings,
    children: [
      { id: 'account-profile', label: 'Profile', icon: Settings, href: '#' },
      { id: 'account-settings', label: 'Settings', icon: Settings, href: '#' },
      { id: 'account-security', label: 'Security', icon: Settings, href: '#' }
    ]
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FileText,
    children: [
      { id: 'projects-active', label: 'Active Projects', icon: FileText, href: '#' },
      { id: 'projects-completed', label: 'Completed', icon: FileText, href: '#' },
      { id: 'projects-archived', label: 'Archived', icon: FileText, href: '#' }
    ]
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: Calendar,
    href: '#',
    badge: 'New'
  },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: BookOpen,
    href: '#'
  }
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true) // Mặc định là collapsed
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
    // Khi collapse, đóng tất cả accordion
    if (!isCollapsed) {
      setExpandedItems([])
    }
  }

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const toggleExpanded = (itemId: string) => {
    if (isCollapsed) return // Không cho expand khi sidebar collapsed
    
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const IconComponent = item.icon

    if (hasChildren) {
      return (
        <li key={item.id}>
          <button
            onClick={() => toggleExpanded(item.id)}
            className={`w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 transition-colors ${
              level > 0 ? 'pl-9' : ''
            }`}
          >
            <IconComponent className="flex-shrink-0 w-4 h-4" />
            {(!isCollapsed || level > 0) && (
              <>
                <span className="flex-1">{item.label}</span>
                {!isCollapsed && (
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`} 
                  />
                )}
              </>
            )}
          </button>
          
          {!isCollapsed && isExpanded && item.children && (
            <ul className="mt-1 space-y-1">
              {item.children.map(child => renderMenuItem(child, level + 1))}
            </ul>
          )}
        </li>
      )
    }

    return (
      <li key={item.id}>
        <a
          href={item.href}
          className={`group flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 transition-colors ${
            level > 0 ? 'pl-9' : ''
          } ${item.id === 'dashboard' ? 'bg-gray-100' : ''}`}
        >
          <IconComponent className="flex-shrink-0 w-4 h-4" />
          {(!isCollapsed || level > 0) && (
            <>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="py-0.5 px-1.5 text-xs bg-gray-200 text-gray-800 rounded-full">
                  {item.badge}
                </span>
              )}
            </>
          )}
          
          {/* Tooltip cho collapsed state */}
          {isCollapsed && level === 0 && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              {item.label}
            </div>
          )}
        </a>
      </li>
    )
  }

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobile}
          className="flex justify-center items-center w-10 h-10 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile backdrop - Removed */}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 lg:translate-x-0 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <header className="p-4 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              
              {!isCollapsed && (
                <span className="font-semibold text-xl text-gray-900">Brand</span>
              )}
            </div>

            {/* Mobile close button */}
            <button
              onClick={toggleMobile}
              className="lg:hidden p-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map(item => renderMenuItem(item))}
            </ul>
          </nav>

          {/* Toggle button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={toggleCollapse}
              className="w-full flex items-center justify-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
              {!isCollapsed && (
                <span className="ml-2 text-sm">Collapse</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content area with proper margin */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Your main content goes here */}
        <div className="p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Main Content</h1>
          <p className="text-gray-600">
            This is your main content area. The sidebar will automatically adjust margins.
          </p>
        </div>
      </div>
    </>
  )
}