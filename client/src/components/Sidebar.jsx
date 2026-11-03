import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    BriefcaseBusinessIcon,
    CalendarDaysIcon,
    ChevronRightIcon,
    CircleDollarSignIcon,
    FileTextIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    MenuIcon,
    SettingsIcon,
    ShieldCheckIcon,
    UserRoundIcon,
    XIcon,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'

const Sidebar = () => {
    const { pathname } = useLocation()
    const [userName, setUserName] = useState('')
    const [mobileOpenAt, setMobileOpenAt] = useState(null)
    const { user, logout } = useAuth()
    const contextName = [user?.firstName, user?.lastName].filter(Boolean).join(' ')
    const mobileOpen = mobileOpenAt === pathname

    useEffect(() => {
        let isCurrent = true

        if (contextName) {
            return undefined
        }

        api.get('/profile')
            .then(({ data }) => {
                if (isCurrent && data.firstName) {
                    setUserName(`${data.firstName} ${data.lastName || ''}`.trim())
                }
            })
            .catch((error) => {
                if (isCurrent) console.error('Unable to load sidebar profile', error)
            })

        return () => {
            isCurrent = false
        }
    }, [contextName])

    const role = user?.role
    const navItems = [
        { name: 'Dashboard', href: '/dashboard', Icon: LayoutDashboardIcon },
        role === 'ADMIN'
            ? { name: 'Employees', href: '/employees', Icon: UserRoundIcon }
            : { name: 'Attendance', href: '/attendance', Icon: CalendarDaysIcon },
        { name: 'Leave', href: '/leave', Icon: FileTextIcon },
        { name: 'Payslips', href: '/payslips', Icon: CircleDollarSignIcon },
        { name: 'Settings', href: '/settings', Icon: SettingsIcon },
    ]

    const displayName = contextName || userName || user?.name || 'Your account'
    const initials = displayName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')

    const handleLogout = () => {
        logout()
        window.location.href = '/login'
    }

    const sidebarContent = (
        <>
            <div className='flex items-center justify-between border-b border-white/[0.07] px-5 py-5'>
                <Link to='/dashboard' className='group flex min-w-0 items-center gap-3' aria-label='Employee MS dashboard'>
                    <span className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-400 to-violet-600 text-white shadow-lg shadow-indigo-950/40 ring-1 ring-white/15 transition-transform duration-200 group-hover:scale-105'>
                        <BriefcaseBusinessIcon size={21} strokeWidth={1.8} />
                    </span>
                    <span className='min-w-0'>
                        <span className='block truncate text-[15px] font-semibold tracking-tight text-white'>Employee MS</span>
                        <span className='mt-0.5 block truncate text-[11px] font-medium tracking-wide text-slate-400'>PEOPLE & OPERATIONS</span>
                    </span>
                </Link>
                <button
                    type='button'
                    onClick={() => setMobileOpenAt(null)}
                    aria-label='Close navigation menu'
                    className='rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white lg:hidden'
                >
                    <XIcon size={19} />
                </button>
            </div>

            <div className='px-5 pb-2 pt-7'>
                <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500'>Workspace</p>
            </div>

            <nav aria-label='Main navigation' className='flex-1 space-y-1 overflow-y-auto px-3 pb-4'>
                {navItems.map(({ name, href, Icon }) => {
                    const isActive = pathname === href || pathname.startsWith(`${href}/`)

                    return (
                        <Link
                            key={name}
                            to={href}
                            aria-current={isActive ? 'page' : undefined}
                            className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium transition-all duration-200 ${
                                isActive
                                    ? 'bg-indigo-500/15 text-white shadow-sm shadow-black/10 ring-1 ring-inset ring-indigo-300/10'
                                    : 'text-slate-400 hover:bg-white/6 hover:text-slate-100'
                            }`}
                        >
                            {isActive && <span className='absolute bottom-2.5 left-0 top-2.5 w-0.5 rounded-r-full bg-indigo-400' />}
                            <Icon
                                size={18}
                                strokeWidth={1.8}
                                className={`shrink-0 transition-colors ${isActive ? 'text-indigo-300' : 'text-slate-500 group-hover:text-slate-300'}`}
                            />
                            <span className='flex-1'>{name}</span>
                            {isActive && <ChevronRightIcon size={15} className='text-indigo-300/80' />}
                        </Link>
                    )
                })}
            </nav>

            <div className='mt-auto border-t border-white/[0.07] p-3'>
                <div className='mb-2 flex items-center gap-3 rounded-xl bg-white/4.5 p-3 ring-1 ring-inset ring-white/6'>
                    <span className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-slate-700 to-slate-800 text-xs font-semibold tracking-wide text-indigo-200 ring-1 ring-white/10'>
                        {initials || 'U'}
                    </span>
                    <span className='min-w-0 flex-1'>
                        <span className='block truncate text-[13px] font-medium text-slate-100'>{displayName}</span>
                        <span className='mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400'>
                            <ShieldCheckIcon size={12} className='text-emerald-400' />
                            {role === 'ADMIN' ? 'Administrator' : 'Employee'}
                        </span>
                    </span>
                </div>
                <button
                    type='button'
                    onClick={handleLogout}
                    className='group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-slate-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300'
                >
                    <LogOutIcon size={17} className='text-slate-500 transition-colors group-hover:text-rose-300' />
                    <span>Log out</span>
                </button>
            </div>
        </>
    )

    return (
        <>
            <button
                type='button'
                onClick={() => setMobileOpenAt(pathname)}
                aria-label='Open navigation menu'
                aria-expanded={mobileOpen}
                className='fixed left-4 top-4 z-40 flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-lg shadow-slate-900/10 transition hover:border-indigo-200 hover:text-indigo-600 lg:hidden'
            >
                <MenuIcon size={20} />
            </button>

            {mobileOpen && (
                <button
                    type='button'
                    aria-label='Close navigation menu'
                    className='fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-[2px] lg:hidden'
                    onClick={() => setMobileOpenAt(null)}
                />
            )}

            <aside className='hidden h-full w-64 shrink-0 flex-col border-r border-white/6 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white lg:flex'>
                {sidebarContent}
            </aside>

            <aside
                aria-label='Mobile navigation'
                className={`fixed inset-y-0 left-0 z-50 flex w-[min(20rem,85vw)] flex-col border-r border-white/6 bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-2xl shadow-slate-950/30 transition-transform duration-300 ease-out lg:hidden ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {sidebarContent}
            </aside>
        </>
    )
}

export default Sidebar
