import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    CalendarCheck2Icon,
    CalendarDaysIcon,
    Clock3Icon,
    FileTextIcon,
    WalletCardsIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const EmployeeDashboard = ({ data }) => {
    const employee = data.employee
    const firstName = employee?.firstName || 'there'
    const pendingLeaves = Number(data.pendingLeaves) || 0

    const cards = [
        {
            icon: CalendarCheck2Icon,
            value: data.currentMonthAttendance ?? 0,
            title: 'Days present',
            subtitle: 'This month',
            href: '/attendance',
            style: 'bg-indigo-50 text-indigo-600 ring-indigo-100',
        },
        {
            icon: Clock3Icon,
            value: pendingLeaves,
            title: 'Pending leave',
            subtitle: pendingLeaves ? 'Awaiting review' : 'No requests waiting',
            href: '/leave',
            style: pendingLeaves ? 'bg-amber-50 text-amber-600 ring-amber-100' : 'bg-emerald-50 text-emerald-600 ring-emerald-100',
        },
        {
            icon: WalletCardsIcon,
            value: data.latestPayslip ? `$${data.latestPayslip.netSalary?.toLocaleString() ?? '—'}` : '—',
            title: 'Latest payslip',
            subtitle: 'Most recent payout',
            href: '/payslips',
            style: 'bg-sky-50 text-sky-600 ring-sky-100',
        },
    ]

    return (
        <div className='animate-fade-in space-y-7 sm:space-y-8'>
            <section className='relative isolate overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-lg shadow-indigo-950/10 sm:px-8 lg:px-10'>
                <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_10%,rgba(56,189,248,0.28),transparent_42%),radial-gradient(ellipse_at_25%_120%,rgba(99,102,241,0.3),transparent_45%)]' />
                <div className='pointer-events-none absolute -right-10 -top-28 -z-10 size-72 rounded-full border border-white/8' />
                <div className='flex flex-col justify-between gap-5 sm:flex-row sm:items-center'>
                    <div className='max-w-2xl'>
                        <p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-200'>Your employee workspace</p>
                        <h1 className='text-3xl font-semibold tracking-[-0.04em] sm:text-4xl'>Welcome, {firstName}.</h1>
                        <p className='mt-2 text-sm text-slate-300 sm:text-base'>
                            {employee?.position || 'Your workspace'}{employee?.department ? ` · ${employee.department}` : ''}
                        </p>
                    </div>
                    <span className='inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/6 px-3.5 py-3 text-sm text-slate-200'>
                        <CalendarDaysIcon size={16} className='text-sky-300' />
                        {new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}
                    </span>
                </div>
            </section>

            <section aria-label='Personal overview'>
                <div className='mb-4'>
                    <h2 className='text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl'>Your overview</h2>
                    <p className='mt-1 text-sm text-slate-500'>A quick look at your attendance, leave, and pay.</p>
                </div>
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4'>
                    {cards.map(({ icon: Icon, value, title, subtitle, href, style }) => (
                        <Link
                            key={title}
                            to={href}
                            className='group flex min-h-40 items-start justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'
                        >
                            <div>
                                <span className={`flex size-11 items-center justify-center rounded-xl ring-1 ring-inset ${style}`}>
                                    <Icon size={20} strokeWidth={1.8} />
                                </span>
                                <p className='mt-4 text-2xl font-semibold tabular-nums tracking-tight text-slate-950'>{value}</p>
                                <p className='mt-1 text-sm font-medium text-slate-700'>{title}</p>
                                <p className='mt-1 text-xs text-slate-400'>{subtitle}</p>
                            </div>
                            <ArrowUpRightIcon size={16} className='text-slate-300 transition-colors group-hover:text-indigo-500' />
                        </Link>
                    ))}
                </div>
            </section>

            <section aria-label='Helpful links' className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <Link to='/attendance' className='group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'>
                    <span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600'>
                        <CalendarCheck2Icon size={20} />
                    </span>
                    <span className='min-w-0 flex-1'>
                        <span className='block font-semibold text-slate-800'>Go to attendance</span>
                        <span className='mt-1 block text-sm text-slate-500'>Check in or review your workday history.</span>
                    </span>
                    <ArrowRightIcon size={17} className='shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-indigo-600' />
                </Link>
                <Link to='/leave' className='group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-violet-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500'>
                    <span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600'>
                        <FileTextIcon size={20} />
                    </span>
                    <span className='min-w-0 flex-1'>
                        <span className='block font-semibold text-slate-800'>Request time off</span>
                        <span className='mt-1 block text-sm text-slate-500'>Submit a leave request or check its status.</span>
                    </span>
                    <ArrowRightIcon size={17} className='shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-violet-600' />
                </Link>
            </section>
        </div>
    )
}

export default EmployeeDashboard
