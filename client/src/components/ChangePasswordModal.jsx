import { KeyRoundIcon, Loader2Icon, ShieldCheckIcon, X } from 'lucide-react'
import { useState } from 'react'
import api from '../api/axios'
import Dialog from './Dialog'

const ChangePasswordModal = ({open, onClose}) => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({type: "", text: ""})

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setMessage({ type:"", text:""});
    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    try {
        const { data } = await api.post("/auth/change-password", {currentPassword, newPassword});
        if(!data.success) throw new Error(data.error || "Failed")
            setMessage({type: "success", text: "Password updated successfully"})
            e.target.reset();
    } catch (error) {
        setMessage({
            type: "error",
            text: error.response?.data?.error || error.message || "Failed to change password",
        })
    }finally{
        setLoading(false);
    }
    }

    if(!open) return null;
  return (
    <Dialog titleId='change-password-title' onClose={()=> !loading && onClose()}>
        <div className='flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6'>
            <div className='flex items-center gap-3'>
                <span className='flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-100'><KeyRoundIcon size={19}/></span>
                <div>
                    <h2 id='change-password-title' className='font-semibold text-slate-900'>Change password</h2>
                    <p className='mt-0.5 text-xs text-slate-500'>Update your account credentials securely</p>
                </div>
            </div>
            <button type='button' aria-label='Close change password form' disabled={loading} onClick={onClose} className='rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50'>
                <X className='w-5 h-5'/>
            </button>
        </div>

        <form className='space-y-5 p-5 sm:p-6' onSubmit={handleSubmit}>
            {message.text && (
                <div role={message.type === "error" ? "alert" : "status"} className={`flex items-start gap-3 rounded-xl border p-3 text-sm ${message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
                    {message.type === "success" && <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-emerald-500" />}
                    {message.text}
                </div>
            )}
            <div>
                <label htmlFor='current-password' className='mb-2 block text-sm font-medium text-slate-700'>Current password</label>
                <input id='current-password' type='password' name='currentPassword' autoComplete='current-password' required className='rounded-xl bg-white'/>
            </div>

            <div>
                <label htmlFor='new-password' className='mb-2 block text-sm font-medium text-slate-700'>New password</label>
                <input id='new-password' type='password' name='newPassword' autoComplete='new-password' required className='rounded-xl bg-white'/>
            </div>
            <div className='flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row'>
                <button type='button' onClick={onClose} className='btn-secondary flex-1 rounded-xl' disabled={loading}>
                    Cancel
                </button>

                <button type='submit' disabled={loading} className='btn-primary flex flex-1 items-center justify-center gap-2 rounded-xl'>
                    {loading && <Loader2Icon className='w-4 h-4 animate-spin'/>}
                    Update Password
                </button>
            </div>
            <p className='flex items-center justify-center gap-1.5 text-xs text-slate-400'><ShieldCheckIcon size={13} className='text-emerald-500'/> Choose a strong password you don’t use elsewhere.</p>
        </form>
    </Dialog>
  )
}

export default ChangePasswordModal
