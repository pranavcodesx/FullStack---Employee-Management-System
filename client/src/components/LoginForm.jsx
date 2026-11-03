import { useState } from 'react'
import LoginLeftSide from './LoginLeftSide'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, BriefcaseBusinessIcon, EyeIcon, EyeOffIcon, Loader2Icon, LockKeyholeIcon, ShieldCheckIcon, UserRoundIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const LoginForm = ({ role, title, subtitle }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()
    const isAdmin = role === 'admin'
    const PortalIcon = isAdmin ? ShieldCheckIcon : UserRoundIcon
    const portalAccent = isAdmin
        ? {
            label: 'text-indigo-600',
            icon: 'bg-indigo-50 text-indigo-600 ring-indigo-100',
            focus: 'focus:border-indigo-400 focus:ring-indigo-500/15',
            button: 'from-indigo-600 to-violet-600 shadow-indigo-600/20 hover:from-indigo-700 hover:to-violet-700 hover:shadow-indigo-600/25',
            link: 'text-indigo-600 hover:text-indigo-700',
        }
        : {
            label: 'text-sky-700',
            icon: 'bg-sky-50 text-sky-600 ring-sky-100',
            focus: 'focus:border-sky-400 focus:ring-sky-500/15',
            button: 'from-sky-600 to-cyan-600 shadow-sky-600/20 hover:from-sky-700 hover:to-cyan-700 hover:shadow-sky-600/25',
            link: 'text-sky-700 hover:text-sky-800',
        }
    const otherPortal = isAdmin
        ? { href: '/login/employee', label: 'Employee portal' }
        : { href: '/login/admin', label: 'Admin portal' }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login(email, password, role)
            navigate('/dashboard')
        } catch (loginError) {
            const message = loginError.response?.data?.error || loginError.message || 'Login Failed'
            setError(message)
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='flex min-h-screen flex-col bg-slate-50 md:flex-row'>
            <LoginLeftSide role={role} />
            <section className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-5 py-10 sm:px-10 md:w-1/2 md:px-12 lg:px-16'>
                <div className='pointer-events-none absolute -right-36 -top-32 size-96 rounded-full bg-indigo-100/70 blur-3xl' />
                <div className='pointer-events-none absolute -bottom-40 -left-36 size-96 rounded-full bg-violet-100/60 blur-3xl' />

                <div className='relative z-10 w-full max-w-116 animate-fade-in'>
                    <div className='rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_24px_80px_-28px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/4 backdrop-blur-xl sm:p-9'>
                    <div className='mb-8 flex items-center justify-between'>
                        <Link to='/login' className='inline-flex items-center gap-2 rounded-lg py-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-700'>
                            <ArrowLeftIcon size={16} />
                            Choose a portal
                        </Link>
                        <span className='inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700'>
                            <ShieldCheckIcon size={13} />
                            Secure sign-in
                        </span>
                    </div>

                    <div className='mb-8 flex items-center gap-3 md:hidden'>
                        <span className='flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20'>
                            <BriefcaseBusinessIcon size={20} />
                        </span>
                        <span>
                            <span className='block text-sm font-semibold text-slate-900'>Employee MS</span>
                            <span className='text-[10px] font-medium tracking-[0.14em] text-slate-500'>PEOPLE & OPERATIONS</span>
                        </span>
                    </div>

                    <div className='mb-7'>
                        <div className={`mb-4 flex size-12 items-center justify-center rounded-2xl ring-1 ring-inset ${portalAccent.icon}`}>
                            <PortalIcon size={21} strokeWidth={1.8} />
                        </div>
                        <p className={`mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${portalAccent.label}`}>
                            {title}
                        </p>
                        <h1 className='text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-[2.15rem]'>{isAdmin ? 'Welcome, administrator' : 'Welcome to your workspace'}</h1>
                        <p className='mt-3 text-sm leading-6 text-slate-500 sm:text-base'>{subtitle}</p>
                    </div>

                    <form className='space-y-5' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='login-email' className='mb-2 block text-[13px] font-semibold text-slate-700'>Email address</label>
                            <input
                                id='login-email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete='username'
                                placeholder='you@company.com'
                                className={`rounded-xl border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-900/2 placeholder:text-slate-400 ${portalAccent.focus}`}
                            />
                        </div>
                        <div>
                            <div className='mb-2 flex items-center justify-between'>
                                <label htmlFor='login-password' className='block text-[13px] font-semibold text-slate-700'>Password</label>
                            </div>
                            <div className='relative'>
                                <LockKeyholeIcon size={17} className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' aria-hidden='true' />
                                <input
                                    id='login-password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete='current-password'
                                    placeholder='Enter your password'
                                    className={`rounded-xl border-slate-200 bg-white py-3 pl-11 pr-12 shadow-sm shadow-slate-900/2 placeholder:text-slate-400 ${portalAccent.focus}`}
                                />
                                <button
                                    type='button'
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    aria-pressed={showPassword}
                                    className='absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div role='alert' className='flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700'>
                                <span className='mt-1.5 size-1.5 shrink-0 rounded-full bg-rose-500' />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type='submit'
                            disabled={loading}
                            aria-busy={loading}
                            className={`flex w-full items-center justify-center rounded-xl bg-linear-to-r px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${portalAccent.button}`}
                        >
                            {loading && <Loader2Icon className='mr-2 size-4 animate-spin' />}
                            {loading ? 'Signing in…' : 'Sign in to your account'}
                        </button>
                    </form>

                    <div className='mt-8 flex items-center justify-center gap-2 border-t border-slate-200/80 pt-5 text-xs text-slate-400'>
                        <LockKeyholeIcon size={13} />
                        <span>Your credentials are encrypted and secure</span>
                    </div>
                    <p className='mt-5 text-center text-sm text-slate-500'>
                        Signing in as the other role?{' '}
                        <Link to={otherPortal.href} className={`font-semibold transition-colors ${portalAccent.link}`}>
                            {otherPortal.label}
                        </Link>
                    </p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default LoginForm
