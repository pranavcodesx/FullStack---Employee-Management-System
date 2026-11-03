import { useCallback, useEffect, useState } from "react"
import { CalendarCheck2Icon } from "lucide-react"
import Loading from "../components/Loading"
import CheckInButton from "../components/attendance/CkeckInButton"
import AttendanceStats from "../components/attendance/AttendanceStats"
import AttendanceHistory from "../components/attendance/AttendanceHistory"
import api from "../api/axios"
import { toast } from 'react-hot-toast'

const Attendance = () => {
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [isDeleted, setIsDeleted] = useState(false)

    const fetchData = useCallback(async ()=>{
        try {
            const res = await api.get("/attendance");
            const json = res.data;
            setHistory(json.data || [])
            if(json.employee?.isDeleted) setIsDeleted(true)
        } catch (error) {
            toast.error(error?.response?.data?.error || error?.message)
        }finally{
            setLoading(false)
        }
    },[])

    useEffect(()=>{
        let isCurrent = true
        api.get("/attendance")
            .then(({ data }) => {
                if (!isCurrent) return
                setHistory(data.data || [])
                setIsDeleted(Boolean(data.employee?.isDeleted))
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

    if (loading) return <Loading />

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayRecord = history.find((r)=> new Date(r.date).toDateString() === today.toDateString())

    return (
        <div className="animate-fade-in space-y-6 sm:space-y-7">
            <section className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/3 sm:p-7">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100">
                    <CalendarCheck2Icon size={22} />
                </span>
                <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Time & presence</p>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Attendance</h1>
                    <p className="mt-1 text-sm text-slate-500">Track your work hours and daily check-ins.</p>
                </div>
            </section>

            {isDeleted ? (
                <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
                  <span className="mt-1 size-2 shrink-0 rounded-full bg-rose-500" />
                  <p className="text-rose-600">You can no longer clock in or out because your employee records have been marked as deleted.</p>
                </div>
            ): (
                <div>
                  <CheckInButton todayRecord={todayRecord} onAction={fetchData}/>
                </div>
            )}

            <AttendanceStats history={history}/>
            <AttendanceHistory history={history}/>

        </div>
    )
}

export default Attendance
