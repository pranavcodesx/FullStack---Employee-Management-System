import { AlertCircleIcon, CalculatorIcon, ClockIcon } from 'lucide-react'

const AttendanceStats = ({ history }) => {
    const totalPresent = history.filter((record) => record.status === 'PRESENT' || record.status === 'LATE').length
    const totalLate = history.filter((record) => record.status === 'LATE').length

    const stats = [
        { label: 'Days present', value: totalPresent, icon: CalculatorIcon, style: 'bg-indigo-50 text-indigo-600 ring-indigo-100' },
        { label: 'Late arrivals', value: totalLate, icon: AlertCircleIcon, style: 'bg-amber-50 text-amber-600 ring-amber-100' },
        { label: 'Avg. work hours', value: '8.5 hrs', icon: ClockIcon, style: 'bg-sky-50 text-sky-600 ring-sky-100' },
    ]

    return (
        <section aria-label='Attendance summary' className='mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4'>
            {stats.map(({ label, value, icon: Icon, style }) => (
                <div key={label} className='flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-slate-900/2.5 shadow-sm sm:p-5'>
                    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${style}`}>
                        <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <div className='min-w-0'>
                        <p className='text-xs font-medium text-slate-500'>{label}</p>
                        <p className='mt-1 text-2xl font-semibold tabular-nums tracking-tight text-slate-900'>{value}</p>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default AttendanceStats
