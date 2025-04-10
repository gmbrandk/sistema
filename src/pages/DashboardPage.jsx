import Dashboard from "../components/Dashboard";
import { ClienteProvider } from "../context/ClienteContext";

function DashboardPage () {
    return (
        <ClienteProvider>
             <Dashboard />
        </ClienteProvider>
       
    )
}

export default DashboardPage;