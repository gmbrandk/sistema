import Dashboard from "../components/Dashboard";
import { RegistroProvider } from "../context/RegistroContext";

function DashboardPage () {
    return (
        <RegistroProvider>
             <Dashboard />
        </RegistroProvider>
       
    )
}

export default DashboardPage;