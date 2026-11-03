import { useCallback, useEffect, useState } from "react"
import { DEPARTMENTS } from "../assets/assets"
import { Building2Icon, Plus, Search, UsersRoundIcon, X } from "lucide-react"
import EmployeeCard from "../components/EmployeeCard"
import EmployeeForm from "../components/EmployeeForm"
import Select from "../components/Select"
import Dialog from "../components/Dialog"
import api from "../api/axios"
import toast from "react-hot-toast"

const Employees = () => {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("");
    const [selectedDept, setSelectedDept] = useState("")
    const [editEmployee, setEditEmployee] = useState(null)
    const [showCreateModal, setShowCreateModal] = useState(false)

    const fetchEmployees = useCallback(async () => {
        try {
            const url = selectedDept ? `/employees?department=${selectedDept}` : "/employees";
            const res = await api.get(url)
            setEmployees(res.data)
        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "Failed to load employees")
        }finally{
            setLoading(false)
        }
    }, [selectedDept])

    useEffect(()=>{
        let isCurrent = true
        const url = selectedDept ? `/employees?department=${selectedDept}` : "/employees"
        api.get(url)
            .then((res) => {
                if (isCurrent) setEmployees(res.data)
            })
            .catch((error) => {
                if (isCurrent) toast.error(error.response?.data?.error || error.message || "Failed to load employees")
            })
            .finally(() => {
                if (isCurrent) setLoading(false)
            })

        return () => {
            isCurrent = false
        }
    },[selectedDept])

    const filtered = employees.filter((emp)=> `${emp.firstName} ${emp.lastName} ${emp.position}`.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="animate-fade-in space-y-6 sm:space-y-7">
            <section className="flex flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/3 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-inset ring-indigo-100">
                        <UsersRoundIcon size={22} />
                    </span>
                    <div>
                        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600">People directory</p>
                        <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Employees</h1>
                        <p className="mt-1 text-sm text-slate-500">Manage your team and employee records.</p>
                    </div>
                </div>
                <button onClick={()=> setShowCreateModal(true)} className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl sm:w-auto">
                    <Plus size={17}/> Add employee
                </button>
            </section>

            <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/2 sm:p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Building2Icon size={16} className="text-slate-400" />
                    Find a team member
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4"/>
                  <input aria-label="Search employees" placeholder="Search by name or position..." className="w-full rounded-xl bg-slate-50 pl-10!" onChange={(e)=>setSearch(e.target.value)} value={search}/>
                </div>
                <div className="w-full sm:max-w-56">
                    <Select
                        aria-label="Filter by department"
                        value={selectedDept}
                        onValueChange={setSelectedDept}
                        options={[
                            { value: "", label: "All departments" },
                            ...DEPARTMENTS.map((deptName) => ({ value: deptName, label: deptName })),
                        ]}
                    />
                </div>
                </div>
            </section>

            <section className="space-y-3">
            {loading ? (
                <div className="flex justify-center rounded-2xl border border-slate-200/80 bg-white p-16">
                    <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full"/>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                        <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><UsersRoundIcon size={22}/></span>
                        <p className="font-semibold text-slate-700">No employees found</p>
                        <p className="mt-1 text-sm text-slate-500">Try another search or department filter.</p>
                    </div>
                     ) : (
                filtered.map((emp)=> <EmployeeCard key={emp.id} employee={emp} onDelete={fetchEmployees} onEdit={(e)=> setEditEmployee(e)}/>)
                )}
            </div>
            )}
            {!loading && filtered.length > 0 && (
                <p className="text-xs font-medium text-slate-400">{filtered.length} {filtered.length === 1 ? "employee" : "employees"} shown</p>
            )}
            </section>

            {/* Create employee Modal*/}
            {showCreateModal && (
                <Dialog titleId="create-employee-title" onClose={()=> setShowCreateModal(false)} maxWidthClass="max-w-3xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
                            <div>
                                <h2 id="create-employee-title" className="font-semibold text-slate-900">Add new employee</h2>
                                <p className="mt-0.5 text-xs text-slate-500">Create an account and employee profile.</p>
                            </div>
                            <button aria-label="Close add employee form" onClick={()=> setShowCreateModal(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5"/>
                            </button>
                        </div>
                        <div className="p-4 sm:p-7">
                          <EmployeeForm  onSuccess={()=>{
                                setShowCreateModal(false);
                                fetchEmployees(); 
                            }} onCancel={()=> setShowCreateModal(false)}/>
                        </div>
                </Dialog>
            )}

            {/* Edit employee Modal*/}
            {editEmployee && (
                <Dialog titleId="edit-employee-title" onClose={()=> setEditEmployee(null)} maxWidthClass="max-w-3xl">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
                            <div>
                                <h2 id="edit-employee-title" className="font-semibold text-slate-900">Edit employee</h2>
                                <p className="mt-0.5 text-xs text-slate-500">Update employee and account details.</p>
                            </div>
                            <button aria-label="Close edit employee form" onClick={()=> setEditEmployee(null)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5"/>
                            </button>
                        </div>
                        <div className="p-4 sm:p-7">
                            <EmployeeForm initialData={editEmployee} onSuccess={()=>{
                                setEditEmployee(null);
                                fetchEmployees(); 
                            }} onCancel={()=> setEditEmployee(null)}/>
                        </div>
                </Dialog>
            )}

            
        </div>
    )
}

export default Employees