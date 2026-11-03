import { format } from 'date-fns'
import { Download, FileTextIcon } from 'lucide-react'

const PayslipList = ({payslips, isAdmin}) => {
  return (
    <div className='overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/2.5'>
          <div className='overflow-x-auto'>
            <table className='table-modern'>
              <thead>
                <tr>
                    {isAdmin && <th>Employee</th>}
                  <th>Period</th>
                  <th>Basic Salary</th>
                  <th>Net Salary</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
                <tbody>
                  {payslips.length === 0 ? (
                    <tr>
                      <td colSpan={isAdmin ? 5 : 4} className='px-6 py-14 text-center'>
                        <span className='mx-auto mb-3 flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400'>
                          <FileTextIcon size={19} />
                        </span>
                        <p className='font-medium text-slate-700'>No payslips found</p>
                        <p className='mt-1 text-sm text-slate-400'>Generated payslips will appear here.</p>
                      </td>
                    </tr>
                  ) : (
                    payslips.map((payslip)=>{
                       return (
                        <tr key={payslip._id || payslip.id}>
                            {isAdmin && (
                                <td className='text-slate-900'>
                            {payslip.employee?.firstName}
                            {payslip.employee?.lastName}
                          </td>
                            )}
    
                          <td className='text-slate-500'>
                            {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}  
                          </td>
    
                          <td className='text-slate-500'>
                                ${payslip.basicSalary?.toLocaleString() ?? '—'}
                          </td>

                          <td className='font-medium text-slate-800'>
                                ${payslip.netSalary?.toLocaleString() ?? '—'}
                          </td>
    
                          <td className='text-center'>
                               <button type='button' onClick={()=> window.open(`/print/payslips/${payslip._id || payslip.id}`, '_blank', 'noopener,noreferrer')} className='inline-flex items-center rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-100 transition-colors hover:bg-indigo-100'>
                                <Download className='mr-1.5 h-3.5 w-3.5'/> Download
                               </button>
                          </td>
    
                          
                          
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

export default PayslipList
