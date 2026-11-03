import { ArrowRightIcon, BriefcaseBusinessIcon, ShieldCheckIcon, UserRoundIcon } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import LoginLeftSide from '../components/LoginLeftSide'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'

const portalOptions = [
    {
        to: '/login/admin',
        title: 'Administrator',
        eyebrow: 'ADMIN PORTAL',
        description: 'Manage your people, payroll, and the day-to-day running of your organization.',
        icon: ShieldCheckIcon,
        iconStyle: 'bg-indigo-50 text-indigo-600 ring-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:ring-indigo-600',
    },
    {
        to: '/login/employee',
        title: 'Employee',
        eyebrow: 'EMPLOYEE PORTAL',
        description: 'Check attendance, request time off, and find your payslips in one place.',
        icon: UserRoundIcon,
        iconStyle: 'bg-violet-50 text-violet-600 ring-violet-100 group-hover:bg-violet-600 group-hover:text-white group-hover:ring-violet-600',
    },
]

const LoginLanding = () => {
    const { user, loading } = useAuth()

    if (loading) return <Loading />
    if (user) return <Navigate to='/' />

    return (
        <main className='flex min-h-screen flex-col bg-slate-50 md:flex-row'>
            <LoginLeftSide />

            <section className='relative flex min-h-screen w-full flex-col items-center overflow-hidden px-5 py-10 sm:px-10 md:w-1/2 md:px-12 lg:px-16'>
                <div className='pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-indigo-100/70 blur-3xl' />
                <div className='pointer-events-none absolute -bottom-40 -left-36 size-96 rounded-full bg-violet-100/60 blur-3xl' />

                <div className='relative z-10 my-auto w-full max-w-md animate-fade-in'>
                    <div className='mb-10 flex items-center gap-3 md:hidden'>
                        <span className='flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20'>
                            <BriefcaseBusinessIcon size={20} />
                        </span>
                        <span>
                            <span className='block text-sm font-semibold text-slate-900'>Employee MS</span>
                            <span className='text-[10px] font-medium tracking-[0.14em] text-slate-500'>PEOPLE & OPERATIONS</span>
                        </span>
                    </div>

                    <div className='mb-8'>
                        <p className='mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600'>Welcome back</p>
                        <h2 className='text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-[2.15rem]'>Choose your workspace</h2>
                        <p className='mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base'>
                            Select the portal that matches your role to securely sign in.
                        </p>
                    </div>

                    <div className='space-y-3.5'>
                        {portalOptions.map(({ to, title, eyebrow, description, icon: Icon, iconStyle }) => (
                            <Link
                                key={to}
                                to={to}
                                className='group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm shadow-slate-900/3 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-950/[0.07] sm:gap-5 sm:p-5'
                            >
                                <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1 transition-all duration-200 ${iconStyle}`}>
                                    <Icon size={21} strokeWidth={1.8} aria-hidden='true' />
                                </span>
                                <span className='min-w-0 flex-1'>
                                    <span className='mb-1 block text-[10px] font-semibold tracking-[0.15em] text-slate-400'>{eyebrow}</span>
                                    <span className='block text-base font-semibold tracking-tight text-slate-900'>{title}</span>
                                    <span className='mt-1 block text-[13px] leading-5 text-slate-500'>{description}</span>
                                </span>
                                <ArrowRightIcon size={18} className='shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-indigo-600' aria-hidden='true' />
                            </Link>
                        ))}
                    </div>

                    <div className='mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 sm:justify-start'>
                        <ShieldCheckIcon size={14} className='text-emerald-500' />
                        <span>Your account is protected with secure sign-in</span>
                    </div>
                </div>
                <p className='relative z-10 mt-8 w-full max-w-md text-center text-xs text-slate-400 sm:text-left md:mt-6'>
                    © {new Date().getFullYear()} Pranav Web Studio. All rights reserved.
                </p>
            </section>
        </main>
    )
}

export default LoginLanding
