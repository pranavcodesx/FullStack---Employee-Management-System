import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import {format} from 'date-fns'
import api from '../api/axios';
import { ArrowLeftIcon, BriefcaseBusinessIcon, DownloadIcon, WalletCardsIcon } from 'lucide-react'

const PrintPayslip = () => {
    const { id } = useParams();
    const [payslip, setPayslip] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        api.get(`/payslips/${id}`).then((res)=> setPayslip(res.data)).catch(console.error).finally(()=> setLoading(false))
    },[id])

    if(loading) return <Loading />
    if(!payslip) return <p className='text-center py-12 text-slate-400'>Payslip not found</p>

    const period = format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")

    return (
        <main className='min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 print:min-h-0 print:bg-white print:p-0'>
        <div className='mx-auto max-w-3xl animate-fade-in overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/6 print:max-w-none print:rounded-none print:border-0 print:shadow-none'>
            <header className='flex flex-col gap-5 border-b border-slate-100 bg-linear-to-br from-slate-50 to-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-7 print:bg-white'>
                <div className='flex items-center gap-3'>
                    <span className='flex size-11 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20 print:bg-slate-900'>
                        <BriefcaseBusinessIcon size={20}/>
                    </span>
                    <span>
                        <span className='block text-sm font-semibold text-slate-900'>Employee MS</span>
                        <span className='text-xs text-slate-500'>People & Operations</span>
                    </span>
                </div>
                <div className='flex flex-col gap-2 sm:flex-row'>
                    <Link to='/payslips' className='btn-secondary print:hidden inline-flex items-center justify-center gap-2 rounded-xl'>
                        <ArrowLeftIcon size={16}/> Back to payslips
                    </Link>
                    <button className='btn-primary print:hidden inline-flex items-center justify-center gap-2 rounded-xl' onClick={()=> window.print()}>
                        <DownloadIcon size={16}/> Print payslip
                    </button>
                </div>
            </header>

            <div className='px-6 py-7 sm:px-9 sm:py-9'>
            <div className='mb-7 flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                    <p className='mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600'>Salary statement</p>
                    <h1 className='text-3xl font-semibold tracking-tight text-slate-950'>Payslip</h1>
                    <p className='mt-1 text-sm text-slate-500'>Pay period · {period}</p>
                </div>
                <span className='inline-flex w-fit items-center gap-2 rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-100'>
                    <WalletCardsIcon size={17}/> {period}
                </span>
            </div>

            <section aria-label='Employee details' className='mb-8 grid grid-cols-1 gap-5 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 sm:p-6 print:bg-white'>
                <div>
                    <p className='mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>Employee name</p>
                    <p className='font-semibold text-slate-900'>{payslip.employee?.firstName} {payslip.employee?.lastName}</p>
                </div>

                <div>
                    <p className='mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>Position</p>
                    <p className='font-semibold text-slate-900'>{payslip.employee?.position || '—'}</p>
                </div>

                <div>
                    <p className='mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>Email</p>
                    <p className='break-all font-semibold text-slate-900'>{payslip.employee?.email || '—'}</p>
                </div>
                <div>
                    <p className='mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400'>Pay period</p>
                    <p className='font-semibold text-slate-900'>{period}</p>
                </div>
            </section>
            <div className='mb-8 overflow-hidden rounded-2xl border border-slate-200'>
                <table className='w-full text-sm'>
                    <thead>
                        <tr className='bg-slate-50 print:bg-white'>
                            <th className='px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Description</th>
                            <th className='px-5 py-3.5 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border-t border-slate-100'>
                            <td className='px-5 py-4 text-slate-700'>Basic salary</td>
                            <td className='px-5 py-4 text-right font-medium text-slate-900'>${payslip.basicSalary?.toLocaleString() ?? '—'}</td>
                        </tr>

                        <tr className='border-t border-slate-100'>
                            <td className='px-5 py-4 text-slate-700'>Allowances</td>
                            <td className='px-5 py-4 text-right font-medium text-emerald-700'>+${payslip.allowances?.toLocaleString() ?? '—'}</td>
                        </tr>

                        <tr className='border-t border-slate-100'>
                            <td className='px-5 py-4 text-slate-700'>Deductions</td>
                            <td className='px-5 py-4 text-right font-medium text-rose-700'>-${payslip.deductions?.toLocaleString() ?? '—'}</td>
                        </tr>

                        <tr className='border-t-2 border-indigo-100 bg-indigo-50/50 print:bg-white'>
                            <td className='px-5 py-4 font-semibold text-slate-900'>Net salary</td>
                            <td className='px-5 py-4 text-right text-lg font-bold tabular-nums text-slate-950'>${payslip.netSalary?.toLocaleString() ?? '—'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className='text-center text-xs text-slate-400'>This document is an official salary statement for {period}.</p>
            </div>
        </div>
        </main>
    )
}

export default PrintPayslip