import { useNavigate } from "react-router-dom"


const UnauthorizedPage = () => {
    const navigate = useNavigate()
  return (
    <div className="container font-bold text-2xl flex justify-center mt-20">
    <div>403 Access Denied</div>

    <div><button onClick={() => navigate('/home')}>Home</button></div>

       
    </div>
  )
}

export default UnauthorizedPage