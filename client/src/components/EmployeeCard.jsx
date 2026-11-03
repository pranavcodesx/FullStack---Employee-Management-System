import { AlertTriangleIcon, Loader2Icon, PencilIcon, Trash2Icon, UserRoundIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import Dialog from './Dialog'

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const firstName = employee.firstName || ''
    const lastName = employee.lastName || ''
    const initials = `${firstName[0] || ''}${lastName[0] || ''}` || 'U'

    const handleDelete = async () => {
        setDeleting(true)
        try {
            await api.delete(`/employees/${employee.id}`)
            setShowDeleteDialog(false)
            onDelete()
        } catch (error) {
            toast.error(error.response?.data?.error || error.message)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <article className='group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-900/6'>
            <div className='relative flex h-28 items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-indigo-50/70 to-violet-50/80'>
                <div className='absolute -right-6 -top-14 size-36 rounded-full border border-indigo-200/40' />
                <div className='absolute -bottom-16 -left-7 size-36 rounded-full border border-white/80' />
                <span className='relative flex size-16 items-center justify-center rounded-2xl bg-white text-lg font-semibold tracking-wide text-indigo-600 shadow-md shadow-indigo-950/[0.07] ring-1 ring-indigo-100'>
                    {initials}
                </span>
                <div className='absolute left-3 top-3 flex max-w-[75%] flex-wrap gap-1.5'>
                    {employee.department && (
                        <span className='max-w-full truncate rounded-full border border-white/80 bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-slate-600 shadow-sm backdrop-blur'>
                            {employee.department}
                        </span>
                    )}
                    {employee.isDeleted && (
                        <span className='rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-semibold text-rose-700'>Inactive</span>
                    )}
                </div>
            </div>

            <div className='p-4'>
                <div className='flex items-start gap-3'>
                    <span className='mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 ring-1 ring-inset ring-slate-100'>
                        <UserRoundIcon size={17} />
                    </span>
                    <div className='min-w-0 flex-1'>
                        <h3 className='truncate text-sm font-semibold text-slate-900'>{firstName} {lastName}</h3>
                        <p className='mt-1 truncate text-xs text-slate-500'>{employee.position || 'Team member'}</p>
                    </div>
                </div>

                {!employee.isDeleted && (
                    <div className='mt-4 flex gap-2 border-t border-slate-100 pt-3'>
                        <button
                            type='button'
                            onClick={() => onEdit(employee)}
                            className='inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
                        >
                            <PencilIcon size={14} />
                            Edit
                        </button>
                        <button
                            type='button'
                            onClick={() => setShowDeleteDialog(true)}
                            aria-label={`Delete ${firstName} ${lastName}`}
                            className='inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-400 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500'
                        >
                            <Trash2Icon size={14} />
                        </button>
                    </div>
                )}
            </div>
            {showDeleteDialog && (
                <Dialog titleId={`delete-employee-title-${employee.id}`} onClose={() => !deleting && setShowDeleteDialog(false)} maxWidthClass='max-w-md'>
                    <div className='p-6 sm:p-7'>
                        <div className='flex items-start gap-4'>
                            <span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-100'>
                                <AlertTriangleIcon size={20} />
                            </span>
                            <div>
                                <h2 id={`delete-employee-title-${employee.id}`} className='font-semibold text-slate-900'>Delete employee?</h2>
                                <p className='mt-2 text-sm leading-6 text-slate-500'>
                                    Are you sure you want to delete <span className='font-semibold text-slate-700'>{firstName} {lastName}</span>? This action will remove this employee from the active directory.
                                </p>
                            </div>
                            <button type='button' aria-label='Close delete confirmation' disabled={deleting} onClick={() => setShowDeleteDialog(false)} className='-mr-2 -mt-2 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50'>
                                <XIcon size={18} />
                            </button>
                        </div>
                        <div className='mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end'>
                            <button type='button' disabled={deleting} onClick={() => setShowDeleteDialog(false)} className='btn-secondary rounded-xl disabled:opacity-50'>
                                Cancel
                            </button>
                            <button type='button' disabled={deleting} onClick={handleDelete} className='inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-600/15 transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60'>
                                {deleting && <Loader2Icon size={16} className='animate-spin' />}
                                {deleting ? 'Deleting…' : 'Delete employee'}
                            </button>
                        </div>
                    </div>
                </Dialog>
            )}
        </article>
    )
}

export default EmployeeCard
