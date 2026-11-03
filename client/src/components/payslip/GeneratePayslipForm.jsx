import { FilePlus2Icon, Loader2, Plus, X } from 'lucide-react'
import { useState } from 'react'
import api from '../../api/axios'
import toast from 'react-hot-toast'
import Select from '../Select'
import Dialog from '../Dialog'

const GeneratePayslipForm = ({employees, onSuccess}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    if(!isOpen) return (
        <button type='button' onClick={()=>setIsOpen(true)} className='btn-primary flex w-full items-center justify-center gap-2 rounded-xl sm:w-auto'>
            <Plus className='w-4 h-4'/> Generate Payslip
        </button>
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries())
        try {
            await api.post('/payslips', data)
            setIsOpen(false)
            onSuccess()
        } catch (error) {
            toast.error(error.response?.data?.error || error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    <Dialog titleId='generate-payslip-title' onClose={()=> !loading && setIsOpen(false)}>
        <div className='flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6'>
            <div className='flex items-center gap-3'>
                <span className='flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100'><FilePlus2Icon size={19}/></span>
                <div>
                    <h3 id='generate-payslip-title' className='font-semibold text-slate-900'>Generate payslip</h3>
                    <p className='mt-0.5 text-xs text-slate-500'>Create a monthly salary statement</p>
                </div>
            </div>
            <button type='button' aria-label='Close payslip form' disabled={loading} onClick={()=> setIsOpen(false)} className='rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50'>
                <X size={20}/>
            </button>
        </div>

            <form onSubmit={handleSubmit} className='space-y-4 p-5 sm:p-6'>
                {/* ----- Select Employee -----*/}
                    <div>
                        <label htmlFor='payslip-employee' className='mb-2 block text-sm font-medium text-slate-700'>Employee</label>
                        <Select
                            id='payslip-employee'
                            name='employeeId'
                            required
                            disabled={employees.length === 0}
                            defaultValue={employees[0]?.id || ''}
                            placeholder='Select an employee'
                            options={employees.map((employee) => ({
                                value: employee.id,
                                label: `${employee.firstName} ${employee.lastName} (${employee.position})`,
                            }))}
                        />
                    </div>

                {/* ----- Select month & year -----*/}
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor='payslip-month' className='mb-2 block text-sm font-medium text-slate-700'>Month</label>
                        <Select
                            id='payslip-month'
                            name='month'
                            defaultValue={String(new Date().getMonth() + 1)}
                            options={Array.from({ length: 12 }, (_, index) => {
                                const month = index + 1
                                return {
                                    value: String(month),
                                    label: new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, index)),
                                }
                            })}
                        />
                    </div>
                    <div>
                        <label className='mb-2 block text-sm font-medium text-slate-700'>Year</label>
                        <input type='number' name='year' defaultValue={new Date().getFullYear()}></input>
                    </div>
                </div>

                {/* ----- Basic Salary -----*/}
                <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Basic Salary</label>
                        <input type='number' name='basicSalary' required placeholder='5000'/>
                    </div>


                {/* ----- Allowances & Deductions -----*/}
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Allowances</label>
                        <input type='number' name='allowances' defaultValue="0" />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-slate-700 mb-2'>Deductions</label>
                        <input type='number' name='deductions' defaultValue="0" />
                    </div>
                </div>


                {/* ----- Buttons -----*/}
                <div className='flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-4 sm:flex-row'>
                    <button onClick={()=> setIsOpen(false)} type='button' className='btn-secondary rounded-xl' disabled={loading}>
                        Cancel
                    </button>

                    <button disabled={loading || employees.length === 0} type='submit' className='btn-primary flex items-center justify-center rounded-xl'>
                        {loading && <Loader2 className='w-4 h-4 mr-2 animate-spin'/>}
                        Generate
                    </button>

                </div>
                

            </form>
    </Dialog>
  )
}

export default GeneratePayslipForm
