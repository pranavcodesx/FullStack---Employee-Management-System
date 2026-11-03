import { useCallback, useEffect, useState } from "react"
import { FileTextIcon, WalletCardsIcon } from "lucide-react";
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast  from "react-hot-toast"

const Payslips = () => {
    const [payslips, setPayslips] = useState([])
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true);

    const {user} = useAuth()
    const isAdmin = user?.role === "ADMIN";

    const fetchPayslips = useCallback(async ()=>{
        try {
            const res = await api.get('/payslips')
            setPayslips(res.data.data || [])
        } catch (error) {
            toast.error(error?.response?.data?.error || error?.message);
        }finally{
            setLoading(false)
        }
    },[])

    useEffect(()=>{
        let isCurrent = true
        api.get('/payslips')
            .then((res) => {
                if (isCurrent) setPayslips(res.data.data || [])
            })
            .catch((error) => {
                if (isCurrent) toast.error(error?.response?.data?.error || error?.message)
            })
            .finally(() => {
                if (isCurrent) setLoading(false)
            })

        return () => {
            isCurrent = false
        }
    },[])

    useEffect(()=>{
        if(isAdmin) api.get("/employees").then((res)=> setEmployees(res.data.filter((e)=> !e.isDeleted))).catch(()=>{})
    },[isAdmin])

    if(loading) return<Loading />

    return (
        <div className="animate-fade-in space-y-6 sm:space-y-7">
            <section className="flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/3 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-inset ring-sky-100">
                        <WalletCardsIcon size={22} />
                    </span>
                    <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700">{isAdmin ? "Payroll workspace" : "Your compensation"}</p>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Payslips</h1>
                        <p className="mt-1 text-sm text-slate-500">{isAdmin ? "Generate and manage employee payroll records." : "Review and download your payslip history."}</p>
                    </div>
                </div>
                {isAdmin && <GeneratePayslipForm employees={employees} onSuccess={fetchPayslips}/>}
            </section>

            <section>
                <div className="mb-4 flex items-end justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900">{isAdmin ? "Payroll records" : "Your payslips"}</h2>
                        <p className="mt-1 text-sm text-slate-500">{isAdmin ? "A history of generated employee payslips." : "Your secure salary statements, all in one place."}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                        <FileTextIcon size={13} />
                        {payslips.length} {payslips.length === 1 ? "record" : "records"}
                    </span>
                </div>
                <PayslipList payslips={payslips} isAdmin={isAdmin}/>
            </section>
        </div>
    )
}

export default Payslips