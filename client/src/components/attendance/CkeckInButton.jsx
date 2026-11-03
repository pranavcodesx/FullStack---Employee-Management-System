import { CheckCircle2Icon, Clock3Icon, Loader2Icon, LogInIcon, LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const CkeckInButton = ({ todayRecord, onAction }) => {
    const [loading, setLoading] = useState(false)

    const handleAttendance = async () => {
        setLoading(true)
        try {
            await api.post('/attendance')
            await onAction()
        } catch (error) {
            toast.error(error?.response?.data?.error || error?.message)
        } finally {
            setLoading(false)
        }
    }

    if (todayRecord?.checkOut) {
        return (
            <section className='flex items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 sm:p-6'>
                <span className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100'>
                    <CheckCircle2Icon size={23} />
                </span>
                <div>
                    <h2 className='font-semibold text-emerald-950'>Workday complete</h2>
                    <p className='mt-1 text-sm text-emerald-800/80'>You’re all checked out for today. Have a great rest of your day.</p>
                </div>
            </section>
        )
    }

    const isCheckedIn = !!todayRecord?.checkIn

    return (
        <section className='flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/2.5 sm:flex-row sm:items-center sm:justify-between sm:p-6'>
            <div className='flex items-center gap-4'>
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ring-1 ring-inset ${isCheckedIn ? 'bg-emerald-50 text-emerald-600 ring-emerald-100' : 'bg-indigo-50 text-indigo-600 ring-indigo-100'}`}>
                    {isCheckedIn ? <Clock3Icon size={22} /> : <LogInIcon size={22} />}
                </span>
                <div>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400'>Today</p>
                    <h2 className='mt-1 font-semibold text-slate-900'>{isCheckedIn ? 'You are on the clock' : 'Ready to start your day?'}</h2>
                    <p className='mt-1 text-sm text-slate-500'>
                        {isCheckedIn ? 'Remember to check out when you finish.' : 'Check in to record your attendance.'}
                    </p>
                </div>
            </div>
            <button
                type='button'
                onClick={handleAttendance}
                disabled={loading}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${isCheckedIn ? 'bg-slate-800 shadow-slate-900/10 hover:bg-slate-900' : 'bg-linear-to-r from-indigo-600 to-violet-600 shadow-indigo-600/20 hover:from-indigo-700 hover:to-violet-700'}`}
            >
                {loading ? <Loader2Icon size={17} className='animate-spin' /> : isCheckedIn ? <LogOutIcon size={17} /> : <LogInIcon size={17} />}
                {loading ? 'Processing…' : isCheckedIn ? 'Clock out' : 'Clock in'}
            </button>
        </section>
    )
}

export default CkeckInButton
