import { ArrowUpRightIcon, BriefcaseBusinessIcon, CheckIcon, ShieldCheckIcon } from 'lucide-react'

const LoginLeftSide = ({ role }) => {
    const isAdmin = role === 'admin'
    const headline = isAdmin ? ['Lead your team.', 'We’ll handle', 'the details.'] : ['Your workday.', 'A little more', 'in your hands.']
    const description = isAdmin
        ? 'A clear view of your people operations, so you can focus on building a better workplace.'
        : 'Your attendance, time off, and payslips—together in one simple workspace.'
    const features = isAdmin ? ['People', 'Payroll', 'Operations'] : ['Attendance', 'Time off', 'Payslips']

    return (
    <aside className='relative hidden min-h-screen overflow-hidden bg-slate-950 text-white md:flex md:w-1/2 md:flex-col md:justify-between'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_18%,rgba(99,102,241,0.25),transparent_42%),radial-gradient(ellipse_at_88%_82%,rgba(124,58,237,0.18),transparent_38%)]' />
        <div className='pointer-events-none absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-size-[48px_48px] mask-[linear-gradient(to_bottom,black,transparent_75%)]' />
        <div className='pointer-events-none absolute -left-36 top-1/3 size-96 rounded-full border border-indigo-300/10' />
        <div className='pointer-events-none absolute -left-20 top-[38%] size-64 rounded-full border border-indigo-300/8' />

        <div className='relative z-10 flex items-center gap-3 px-10 pt-9 lg:px-14'>
            <span className='flex size-11 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-400 to-violet-600 shadow-lg shadow-indigo-950/50 ring-1 ring-white/20'>
                <BriefcaseBusinessIcon size={21} strokeWidth={1.8} />
            </span>
            <span>
                <span className='block text-sm font-semibold tracking-tight'>Employee MS</span>
                <span className='mt-0.5 block text-[10px] font-medium tracking-[0.16em] text-slate-400'>PEOPLE & OPERATIONS</span>
            </span>
        </div>

        <div className='relative z-10 max-w-2xl px-10 py-12 lg:px-14 xl:px-20'>
            <div className='mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/8 px-3 py-1.5 text-xs font-medium text-indigo-200'>
                <ShieldCheckIcon size={14} />
                {role ? (isAdmin ? 'ADMINISTRATOR WORKSPACE' : 'EMPLOYEE WORKSPACE') : 'A calmer way to work'}
            </div>
            <h1 className='text-4xl font-semibold leading-[1.12] tracking-[-0.04em] text-white lg:text-5xl xl:text-[3.5rem]'>
                {role ? (
                    <>
                        {headline[0]}
                        <br />
                        <span className='bg-linear-to-r from-indigo-300 via-violet-300 to-sky-200 bg-clip-text text-transparent'>{headline[1]}</span>
                        <br />
                        {headline[2]}
                    </>
                ) : (
                    <>
                        Your people.
                        <br />
                        <span className='bg-linear-to-r from-indigo-300 via-violet-300 to-sky-200 bg-clip-text text-transparent'>One better</span> workspace.
                    </>
                )}
            </h1>
            <p className='mt-6 max-w-lg text-base leading-7 text-slate-400 lg:text-lg lg:leading-8'>
                {role ? description : 'Bring everyday people operations into one thoughtfully designed place, from attendance and time off to payroll.'}
            </p>

            <div className='mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300'>
                {features.map((feature) => (
                    <span key={feature} className='inline-flex items-center gap-2'>
                        <span className='flex size-5 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300'>
                            <CheckIcon size={12} strokeWidth={2.5} />
                        </span>
                        {feature}
                    </span>
                ))}
            </div>

            <div className='mt-12 flex max-w-md items-center justify-between rounded-2xl border border-white/9 bg-white/4.5 p-4 backdrop-blur-sm'>
                <div className='flex items-center gap-3'>
                    <span className='flex size-10 items-center justify-center rounded-xl bg-white/[0.07] text-indigo-200 ring-1 ring-white/8'>
                        <ShieldCheckIcon size={19} />
                    </span>
                    <span>
                        <span className='block text-sm font-medium text-slate-100'>Your workspace, protected</span>
                        <span className='mt-0.5 block text-xs text-slate-400'>Secure access for every role</span>
                    </span>
                </div>
                <ArrowUpRightIcon size={17} className='text-slate-500' />
            </div>
        </div>

        <div className='relative z-10 flex items-center justify-between px-10 pb-7 text-xs text-slate-500 lg:px-14'>
            <span>© {new Date().getFullYear()} Pranav Web Studio</span>
            <span className='tracking-wide'>BUILT FOR YOUR TEAM</span>
        </div>
    </aside>
    )
}

export default LoginLeftSide
