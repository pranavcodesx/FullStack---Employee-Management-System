import { useState } from "react"
import { DEPARTMENTS } from "../assets/assets"
import { Loader2Icon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import toast from "react-hot-toast"
import Select from "./Select"


const EmployeeForm = ({initialData, onSuccess, onCancel}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const isEditMode = !!initialData;

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget);
        if(isEditMode){
            const pwd = formData.get("password")
            if(!pwd) formData.delete("password")
        }

        try {
            const url = isEditMode ? `/employees/${initialData.id}` : "/employees";
            const method = isEditMode ? "put" : "post";
            await api[method](url, formData)
            onSuccess ? onSuccess() : navigate("/employees")
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
        }finally{
            setLoading(false);
        }
    }
  return (
   <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-5 animate-fade-in">
    {/* Personal Information */}
   <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/2 sm:p-6">
       <h3 className="mb-5 border-b border-slate-100 pb-4 text-sm font-semibold text-slate-900">Personal information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
            <div>
                <label className="block mb-2">First Name</label>
                <input name="firstName" required defaultValue={initialData?.firstName}/>
            </div>
             <div>
                <label className="block mb-2">Last Name</label>
                <input name="lastName" required defaultValue={initialData?.lastName}/>
            </div>
             <div>
                <label className="block mb-2">Phone Number</label>
                <input name="phone" required defaultValue={initialData?.phone}/>
            </div>
             <div>
                <label className="block mb-2">Join Date</label>
                <input type="date" name="joinDate" required defaultValue={initialData?.joinDate ? new Date(initialData.joinDate).toISOString().split("T")[0] : ""}/>
            </div>
             <div className="sm:col-span-2">
                <label className="block mb-2">Bio (Optional)</label>
                <textarea name="bio" defaultValue={initialData?.bio} rows={3} className="resize-none" placeholder="Brief Description..."/>
            </div>

        </div>

    </div>

    {/* Employment Details */}
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/2 sm:p-6">
        <h3 className="mb-5 border-b border-slate-100 pb-4 text-sm font-semibold text-slate-900">Employment details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
            <div>
                <label htmlFor="employee-department" className="mb-2 block">Department</label>
                <Select
                    name="department"
                    id="employee-department"
                    defaultValue={initialData?.department || ""}
                    placeholder="Select department"
                    options={[
                        { value: "", label: "Select department" },
                        ...DEPARTMENTS.map((deptName) => ({ value: deptName, label: deptName })),
                    ]}
                />
            </div>
            <div>
                <label className="block mb-2">Position</label>
                <input name="position" required defaultValue={initialData?.position}/>
            </div>
            <div>
                <label className="block mb-2">Basic Salary</label>
                <input type="number" name="basicSalary" required min="0" step="0.01" defaultValue={initialData?.basicSalary || 0}/>
            </div>
             <div>
                <label className="block mb-2">Allowances</label>
                <input type="number" name="allowances" required min="0" step="0.01" defaultValue={initialData?.allowances || 0}/>
            </div>
            <div>
                <label className="block mb-2">Deductions</label>
                <input type="number" name="deductions" required min="0" step="0.01" defaultValue={initialData?.deductions || 0}/>
            </div>
            {isEditMode && (
                <div>
                 <label htmlFor="employee-status" className="mb-2 block">Status</label>
                <Select
                    name="employmentStatus"
                    id="employee-status"
                    defaultValue={initialData?.employmentStatus || "ACTIVE"}
                    options={[
                        { value: "ACTIVE", label: "Active" },
                        { value: "INACTIVE", label: "Inactive" },
                    ]}
                />
            </div>
            )}

        </div>

    </div>

    {/* Account Setup */}
     <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/2 sm:p-6">
        <h3 className="mb-5 border-b border-slate-100 pb-4 text-sm font-semibold text-slate-900">Account setup</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-slate-700">
            <div className="sm:col-span-2">
                <label className="block mb-2">Work Email</label>
                <input type="email" name="email" required defaultValue={initialData?.email}/>
            </div>
             {!isEditMode && (
               <div>
                <label className="block mb-2">Temporary Password</label>
                <input type="password" name="password" required />
            </div> 
             )}
             {isEditMode && (
               <div>
                <label className="block mb-2">Change Password (Optional)</label>
                <input type="password" name="password" placeholder="Leave blank to keep current" />
            </div> 
             )}
             <div>
                <label htmlFor="employee-role" className="mb-2 block">System role</label>
                <Select
                    name="role"
                    id="employee-role"
                    defaultValue={initialData?.user?.role || "EMPLOYEE"}
                    options={[
                        { value: "EMPLOYEE", label: "Employee" },
                        { value: "ADMIN", label: "Admin" },
                    ]}
                />
            </div>

        </div>

    </div>

    {/* Buttons */}
    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        <button type="button" className="btn-secondary rounded-xl" onClick={()=>(onCancel ? onCancel() : navigate(-1))}>
            Cancel
        </button>
        <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center rounded-xl">
            {loading && <Loader2Icon className="w-4 h-4 mr-2 animate-spin"/>}
            {isEditMode ? "Update Employee" : "Create Employee"}
        </button>

    </div>

   </form>
  )
}

export default EmployeeForm
