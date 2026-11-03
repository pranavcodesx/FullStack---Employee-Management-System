import { Check, Loader2, X } from 'lucide-react'
import { useState } from 'react'
import {format} from 'date-fns'
import api from '../../api/axios'
import toast from 'react-hot-toast'

const LeaveHistory = ({leaves, isAdmin, onUpdate}) => {
    const [processing, setProcessing] = useState(null)

    const handleStatusUpdate = async (id, status) => {
        setProcessing(id)
        try {
          await api.patch(`/leave/${id}`, {status})
          onUpdate();
        } catch (error) {
          toast.error(error?.response?.data?.error || error?.message)
        }finally{
          setProcessing(null)
        }
    }
  return (
    <div className='overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/2.5'>
          <div className='overflow-x-auto'>
            <table className='table-modern'>
              <thead>
                <tr>
                    {isAdmin && <th>Employee</th>}
                  <th>Type</th>
                  <th>Dates</th>
                  <th>Reason</th>
                  <th>Status</th>
                  {isAdmin && <th className='text-center'>Actions</th>}
                </tr>
              </thead>
                <tbody>
                  {leaves.length === 0 ? (
                    <tr>
                      <td colSpan={isAdmin ? 6 : 4} className='px-6 py-14 text-center'>
                        <p className='font-medium text-slate-700'>No leave requests yet</p>
                        <p className='mt-1 text-sm text-slate-400'>Submitted applications will appear here.</p>
                      </td>
                    </tr>
                  ) : (
                    leaves.map((leave)=>{
                       return (
                        <tr key={leave._id || leave.id}>
                            {isAdmin && (
                                <td className='text-slate-900'>
                            {leave.employee?.firstName}
                            {leave.employee?.lastName}
                          </td>
                            )}
    
                          <td>
                            <span className='badge bg-slate-100 text-slate-600'>{leave.type}</span>  
                          </td>
    
                          <td className='whitespace-nowrap text-xs text-slate-500'>
                            {format(new Date(leave.startDate), "MMM dd")} - {format(new Date(leave.endDate), "MMM dd, yyyy")}
                          </td>
    
                          <td className='max-w-xs truncate text-slate-500' title={leave.reason}>
                                {leave.reason}
                          </td>
    
                          <td>
                                <span className={`badge ${leave.status === "APPROVED" ? "badge-success" : leave.status === "REJECTED" ? "badge-danger" : "badge-warning"}`}>
                                    {leave.status}
                                </span>
                          </td>
                            {isAdmin && (
                              <td>
                               {leave.status === "PENDING" && (
                                <div className='flex justify-center gap-2'>
                                    <button type='button' title='Approve leave request' aria-label='Approve leave request' disabled={!!processing} onClick={()=> handleStatusUpdate(leave._id || leave.id, "APPROVED")} className='rounded-lg bg-emerald-50 p-2 text-emerald-600 transition-colors hover:bg-emerald-100 disabled:opacity-50'>
                                        {processing === (leave._id || leave.id) ? <Loader2 className='w-4 h-4 animate-spin'/> : <Check className='w-4 h-4'/>}
                                    </button>
                                    <button type='button' title='Reject leave request' aria-label='Reject leave request' onClick={()=> handleStatusUpdate(leave._id || leave.id, "REJECTED")} disabled={!!processing} className='rounded-lg bg-rose-50 p-2 text-rose-600 transition-colors hover:bg-rose-100 disabled:opacity-50'>
                                        {processing === (leave._id || leave.id) ? <Loader2 className='w-4 h-4 animate-spin'/> : <X className='w-4 h-4'/>}
                                    </button>
                                </div>
                               )}                         
                            </td>
                            )}
                          
                        </tr>
                       )
                    })
                  )}
                </tbody>
            </table>
          </div>
          
        </div>
  )
}

export default LeaveHistory
