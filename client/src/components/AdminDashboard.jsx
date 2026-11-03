import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    Building2Icon,
    CalendarCheck2Icon,
    CalendarDaysIcon,
    Clock3Icon,
    FileTextIcon,
    UsersRoundIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminDashboard = ({ data }) => {
    const pendingLeaves = Number(data.pendingLeaves) || 0
    const pendingLeaveDescription = pendingLeaves === 0
        ? 'You’re all caught up'
        : `${pendingLeaves} request${pendingLeaves === 1 ? '' : 's'} waiting for review`

    const stats = [
        {
            icon: UsersRoundIcon,
            value: data.totalEmployees,
            label: 'Total employees',
            description: 'Across your organization',
            iconStyle: 'bg-indigo-50 text-indigo-600 ring-indigo-100',
            accent: 'from-indigo-500 to-violet-500',
            href: '/employees',
        },
        {
            icon: Building2Icon,
            value: data.totalDepartments,
            label: 'Departments',
            description: 'Organizational teams',
            iconStyle: 'bg-sky-50 text-sky-600 ring-sky-100',
            accent: 'from-sky-500 to-cyan-400',
            href: '/employees',
        },
        {
            icon: CalendarCheck2Icon,
            value: data.todayAttendance,
            label: "Today's attendance",
            description: 'Attendance records submitted today',
            iconStyle: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
            accent: 'from-emerald-500 to-teal-400',
            href: '/attendance',
        },
        {
            icon: FileTextIcon,
            value: pendingLeaves,
            label: 'Pending leave requests',
            description: pendingLeaveDescription,
            iconStyle: pendingLeaves > 0 ? 'bg-amber-50 text-amber-600 ring-amber-100' : 'bg-emerald-50 text-emerald-600 ring-emerald-100',
            accent: pendingLeaves > 0 ? 'from-amber-500 to-orange-400' : 'from-emerald-500 to-teal-400',
            href: '/leave',
        },
    ]

    const quickActions = [
        {
            icon: UsersRoundIcon,
            title: 'Manage employees',
            description: 'View your team and employee records',
            href: '/employees',
            style: 'bg-indigo-50 text-indigo-600',
        },
        {
            icon: CalendarDaysIcon,
            title: 'Review attendance',
            description: 'See today’s attendance and history',
            href: '/attendance',
            style: 'bg-emerald-50 text-emerald-600',
        },
        {
            icon: Clock3Icon,
            title: 'Review leave requests',
            description: 'Keep pending requests moving',
            href: '/leave',
            style: 'bg-amber-50 text-amber-600',
        },
    ]

    const today = new Intl.DateTimeFormat('en', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date())

    return (
        <div className='animate-fade-in space-y-7 sm:space-y-8'>
            <section className='relative isolate overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-lg shadow-indigo-950/10 sm:min-h-44 sm:px-8 lg:px-10'>
                <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_15%,rgba(99,102,241,0.42),transparent_42%),radial-gradient(ellipse_at_35%_120%,rgba(124,58,237,0.3),transparent_45%)]' />
                <div className='pointer-events-none absolute -right-14 -top-32 -z-10 size-80 rounded-full border border-white/8' />
                <div className='pointer-events-none absolute -right-2 -top-20 -z-10 size-56 rounded-full border border-white/[0.07]' />

                <div className='flex flex-col justify-between gap-7 sm:flex-row sm:items-center sm:gap-8'>
                    <div className='max-w-2xl'>
                        <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-indigo-100'>
                            Administrator overview
                        </div>
                        <h1 className='text-3xl font-semibold tracking-[-0.04em] sm:text-[2.15rem]'>Good to see you.</h1>
                        <p className='mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-[15px]'>
                            Here’s a clear view of your people operations today.
                        </p>
                    </div>
                    <div className='inline-flex w-fit shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/6 px-3.5 py-3 text-sm text-slate-200'>
                        <CalendarDaysIcon size={16} className='text-indigo-300' />
                        {today}
                    </div>
                </div>
            </section>

            <section aria-label='Organization overview'>
                <div className='mb-4'>
                    <div>
                        <h2 className='text-2xl font-semibold tracking-tight text-slate-900 sm:text-[28px]'>Organization overview</h2>
                        <p className='mt-1 text-sm text-slate-500'>A snapshot of your workforce and daily activity</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                    {stats.map((stat) => (
                        <Link
                            key={stat.label}
                            to={stat.href}
                            className='group relative flex min-h-44 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-900/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
                        >
                            <span className={`absolute inset-x-0 top-0 h-0.5 bg-linear-to-r ${stat.accent} opacity-80`} />
                            <div className='flex items-start justify-between gap-3'>
                                <span className={`flex size-11 items-center justify-center rounded-xl ring-1 ring-inset ${stat.iconStyle}`}>
                                    <stat.icon size={20} strokeWidth={1.8} />
                                </span>
                                <ArrowUpRightIcon size={16} className='mt-1 text-slate-300 transition-colors group-hover:text-indigo-500' />
                            </div>
                            <p className='mt-5 text-3xl font-semibold tabular-nums tracking-tight text-slate-950'>
                                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value ?? '—'}
                            </p>
                            <p className='mt-1 text-sm font-medium text-slate-700'>{stat.label}</p>
                            <p className='mt-1 text-xs text-slate-400'>{stat.description}</p>
                        </Link>
                    ))}
                </div>
            </section>

            <section aria-labelledby='quick-actions-title'>
                <div className='mb-4'>
                    <h2 id='quick-actions-title' className='text-lg font-semibold tracking-tight text-slate-900'>Quick actions</h2>
                    <p className='mt-1 text-sm text-slate-500'>Pick up where your team needs you</p>
                </div>
                <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                    {quickActions.map(({ icon: Icon, title, description, href, style }) => (
                        <Link
                            key={title}
                            to={href}
                            className='group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/2 transition-all duration-200 hover:border-indigo-200 hover:shadow-md hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
                        >
                            <span className={`mr-2 flex size-11 shrink-0 items-center justify-center rounded-xl ${style}`}>
                                <Icon size={19} strokeWidth={1.8} />
                            </span>
                            <span className='min-w-0 flex-1'>
                                <span className='block text-sm font-semibold text-slate-800'>{title}</span>
                                <span className='mt-1 block text-xs leading-5 text-slate-500'>{description}</span>
                            </span>
                            <ArrowRightIcon size={16} className='shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-indigo-600' />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default AdminDashboard
