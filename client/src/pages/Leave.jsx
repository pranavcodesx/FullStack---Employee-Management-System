import { useCallback, useEffect, useState } from "react"
import Loading from "../components/Loading"
import { CalendarDaysIcon, PalmtreeIcon, PlusIcon, ThermometerIcon, UmbrellaIcon } from "lucide-react"
import LeaveHistory from "../components/leave/LeaveHistory"
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import toast from "react-hot-toast"

const Leave = () => {
    const {user} = useAuth()
    const [leaves, setLeaves] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false);
    const isAdmin = user?.role === "ADMIN";

    const fetchLeaves = useCallback(async ()=>{
        try {
            const res = await api.get('/leave');
            setLeaves(res.data.data || [])
            if(res.data.employee?.isDeleted) setIsDeleted(true)
        } catch (error) {
            toast.error(error.response?.data?.error || error.message)
        }finally{
            setLoading(false)
        }
    },[])

    useEffect(()=>{
        let isCurrent = true
        api.get('/leave')
            .then((res) => {
                if (!isCurrent) return
                setLeaves(res.data.data || [])
                setIsDeleted(Boolean(res.data.employee?.isDeleted))
            })
            .catch((error) => {
                if (isCurrent) toast.error(error.response?.data?.error || error.message)
            })
            .finally(() => {
                if (isCurrent) setLoading(false)
            })

        return () => {
            isCurrent = false
        }
    },[])

    if(loading) return <Loading />

    const sickCount = leaves.filter((l)=>l.type === "SICK").length;
    const casualCount = leaves.filter((l)=>l.type === "CASUAL").length;
    const annualCount = leaves.filter((l)=>l.type === "ANNUAL").length;

    const leaveStats = [
        {label: "Sick Leave", value: sickCount, icon: ThermometerIcon},
        {label: "Casual Leave", value: casualCount, icon: UmbrellaIcon},
        {label: "Annual Leave", value: annualCount, icon: PalmtreeIcon},
    ]

    return (
        <div className="animate-fade-in space-y-6 sm:space-y-7">
          <section className="flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/3 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 ring-1 ring-inset ring-violet-100">
                    <CalendarDaysIcon size={22} />
                </span>
                <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-700">{isAdmin ? "Team time off" : "Time away"}</p>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Leave management</h1>
                    <p className="mt-1 text-sm text-slate-500">{isAdmin ? "Review and manage employee leave applications." : "View your leave history and manage requests."}</p>
                </div>
            </div>
            {!isAdmin && !isDeleted &&(
                <button onClick={()=> setShowModal(true)} className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl sm:w-auto">
                    <PlusIcon className="w-4 h-4"/> Apply for leave
                </button>
            )}
          </section>

        {!isAdmin && (
            <section aria-label="Leave summary" className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {leaveStats.map((s)=>(
                    <div key={s.label} className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/2.5 sm:p-5">
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-inset ring-violet-100">
                            <s.icon className="w-5 h-5" />
                        </span>
                        <div>
                            <p className="text-xs font-medium text-slate-500">{s.label}</p>
                            <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-slate-900">{s.value} <span className="text-xs font-medium text-slate-400">taken</span></p>
                        </div>
                    </div>
                ))}
            </section>
        )}

        <section>
            <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">Leave requests</h2>
                    <p className="mt-1 text-sm text-slate-500">{isAdmin ? "Review applications and update their status." : "A record of your submitted leave applications."}</p>
                </div>
                {isAdmin && (
                    <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-100">
                        {leaves.filter((leave) => leave.status === "PENDING").length} pending
                    </span>
                )}
            </div>
            <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves}/>
        </section>
        <ApplyLeaveModal open={showModal} onClose={()=> setShowModal(false)} onSuccess={fetchLeaves} />

        </div>
    )
}

export default Leave