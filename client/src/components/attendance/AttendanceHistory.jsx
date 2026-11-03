import { getDayTypeDisplay, getWorkingHoursDisplay } from '../../assets/assets'
import {format} from 'date-fns'

const AttendanceHistory = ({history}) => {
  return (
    <div className='overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-slate-900/2.5 shadow-sm'>
      <div className='flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6'>
        <div>
          <h3 className='font-semibold text-slate-900'>Attendance history</h3>
          <p className='mt-1 text-xs text-slate-500'>Your recent check-ins and workday records</p>
        </div>
        <span className='rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500'>{history.length} records</span>
      </div>
      <div className='overflow-x-auto'>
        <table className='table-modern'>
          <thead>
            <tr>
              <th className='px-6 py-4'>Date</th>
              <th className='px-6 py-4'>Check In</th>
              <th className='px-6 py-4'>Check Out</th>
              <th className='px-6 py-4'>Working Hours</th>
              <th className='px-6 py-4'>Day Type</th>
              <th className='px-6 py-4'>Status</th>
            </tr>
          </thead>
            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan={6} className='px-6 py-14 text-center'>
                    <p className='font-medium text-slate-700'>No attendance records yet</p>
                    <p className='mt-1 text-sm text-slate-400'>Your check-in history will appear here.</p>
                  </td>
                </tr>
              ) : (
                history.map((record)=>{
                   const dayType = getDayTypeDisplay(record)
                   return (
                    <tr key={record._id || record.id}>
                      <td className='px-6 py-4 font-medium text-slate-900 whitespace-nowrap'>
                        {format(new Date(record.date), "MMM dd, yyyy")}
                      </td>

                      <td className='px-6 py-4 text-slate-600'>
                        {record.checkIn ? format(new Date(record.checkIn), "hh:mm a") : "—"}
                      </td>

                      <td className='px-6 py-4 text-slate-600'>
                        {record.checkOut ? format(new Date(record.checkOut), "hh:mm a") : "—"}
                      </td>

                      <td className='px-6 py-4 text-slate-600 font-medium'>
                         {getWorkingHoursDisplay(record)}   
                      </td>

                      <td className='px-6 py-4'>
                        {dayType.label !== "-" ? <span className={`badge ${dayType.className}`}>{dayType.label}</span> : "—"}
                      </td>

                      <td className='px-6 py-4'>
                        <span className={`badge ${record.status === "PRESENT" ? "badge-success" : record.status === "LATE" ? "badge-warning" : "badge-danger"}`}>
                          {record.status}
                          </span>    
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

export default AttendanceHistory
