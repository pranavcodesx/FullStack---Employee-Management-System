import { useEffect, useState } from "react"
import Loading from "../components/Loading"
import { LockKeyholeIcon, Settings2Icon, ShieldCheckIcon } from "lucide-react"
import ProfileForm from "../components/ProfileForm"
import ChangePasswordModal from "../components/ChangePasswordModal"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import toast from "react-hot-toast"

const Settings = () => {
    const {user} = useAuth()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showPasswordModal, setShowPasswordModal] = useState(false)


    const fetchProfile = async () => {
        try {
            const res = await api.get("/profile")
            const profile = res.data;
            if(profile) setProfile(profile)
        } catch (err) {
            toast.error(err?.response?.data?.error || err?.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        let isCurrent = true
        api.get("/profile")
            .then(({ data }) => {
                if (isCurrent && data) setProfile(data)
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
    },[user])

    if(loading) return <Loading />

    return (
        <div className="animate-fade-in space-y-6 sm:space-y-7">
            <section className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/3 sm:p-7">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200">
                    <Settings2Icon size={22} />
                </span>
                <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Account preferences</p>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Settings</h1>
                    <p className="mt-1 text-sm text-slate-500">Manage your profile details and account security.</p>
                </div>
            </section>

            {profile && <ProfileForm initialData={profile} onSuccess={fetchProfile}/>}

            <section className="max-w-3xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-900/2.5">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100">
                        <LockKeyholeIcon className="w-5 h-5"/>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900">Password & security</p>
                        <p className="mt-1 text-sm text-slate-500">Keep your account safe with a strong password.</p>
                    </div>

                </div>
                <button onClick={()=> setShowPasswordModal(true)} className="btn-secondary inline-flex w-full items-center justify-center gap-2 rounded-xl sm:w-auto">
                    <ShieldCheckIcon size={16}/> Change password
                </button>
              </div>
            </section>
            <ChangePasswordModal open={showPasswordModal} onClose={()=> setShowPasswordModal(false)}/>
        </div>
    )
}

export default Settings