import "./AdminLogin.scss"
const AdminShow = (props) =>{
    const {adminShow, setAdminShow} = props;
    return(<div className="button" onClick={()=>{
        setAdminShow(false)
    }}>
        Admin
    </div>
    )
}

export default AdminShow;