import { CalendarDays, FileText, Loader2, Send, X } from 'lucide-react';
import { useState } from 'react'
import api from '../../api/axios';
import toast from 'react-hot-toast';
import Select from '../Select'
import Dialog from '../Dialog'

const ApplyLeaveModal = ({open, onClose, onSuccess}) => {

    const [loading, setLoading] = useState(false);

    const today = new Date();
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());
            await api.post('/leave', data)
            onSuccess();
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.error || err?.message)
        } finally {
            setLoading(false);
        }
    }

    if(!open) return null

  return (
    <Dialog titleId='apply-leave-title' onClose={()=> !loading && onClose()}>
            <div className='flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6'>
                <div className='flex items-center gap-3'>
                    <span className='flex size-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-inset ring-violet-100'>
                        <CalendarDays size={19}/>
                    </span>
                    <div>
                        <h2 id='apply-leave-title' className='font-semibold text-slate-900'>Apply for leave</h2>
                        <p className='mt-0.5 text-xs text-slate-500'>Submit a request for your manager to review</p>
                    </div>
                </div>
                <button type='button' aria-label='Close leave request form' disabled={loading} onClick={onClose} className='rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50'>
                    <X className='w-5 h-5'/>
                </button>
            </div>
            <form onSubmit={handleSubmit} className='space-y-5 p-5 sm:p-6'>
                {/* ----- Leave Type ----- */}
                <div>
                    <label htmlFor='leave-type' className='mb-2 flex items-center gap-2 text-sm font-medium text-slate-700'>
                        <FileText className='w-4 h-5 text-slate-400'/>
                        Leave Type
                    </label>
                    <Select
                        id='leave-type'
                        name='type'
                        required
                        defaultValue='SICK'
                        options={[
                            { value: 'SICK', label: 'Sick leave' },
                            { value: 'CASUAL', label: 'Casual leave' },
                            { value: 'ANNUAL', label: 'Annual leave' },
                        ]}
                    />
                </div>

                {/* ----- Duration ----- */}
                <div>
                    <label className='mb-2 flex items-center gap-2 text-sm font-medium text-slate-700'>
                        <CalendarDays className='w-4 h-5 text-slate-400'/>
                        Duration
                    </label>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor='leave-start-date' className='mb-1 block text-xs font-medium text-slate-500'>From</label>
                            <input id='leave-start-date' type='date' name='startDate' required min={minDate} />
                        </div>
                        <div>
                            <label htmlFor='leave-end-date' className='mb-1 block text-xs font-medium text-slate-500'>To</label>
                            <input id='leave-end-date' type='date' name='endDate' required min={minDate} />
                        </div>
                    </div>
                </div>

                {/* ----- Reason ----- */}
                <div>
                    <label htmlFor='leave-reason' className='mb-2 flex items-center gap-2 text-sm font-medium text-slate-700'>
                        Reason
                    </label>
                    <textarea id='leave-reason' name='reason' required rows={3} className='resize-none' placeholder='Briefly describe why you need this leave...' />
                </div>

                {/* ----- Buttons ----- */}
                <div className='flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row'>
                    <button onClick={onClose} type='button' className='btn-secondary flex-1 rounded-xl' disabled={loading}>
                        Cancel
                    </button>
                    <button disabled={loading} type='submit' className='btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl'>
                        {loading ? <Loader2 className='w-4 h-4 animate-spin'/> : <Send className='w-4 h-4'/>}
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
    </Dialog>
  )
}

export default ApplyLeaveModal
