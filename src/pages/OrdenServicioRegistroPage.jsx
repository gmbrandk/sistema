import OrdenReciente from "../components/OrdenReciente";
import { RegistroProvider } from "../context/RegistroContext";

function DashboardPage () {
    return (
        <RegistroProvider>
             <OrdenReciente />
        </RegistroProvider>
       
    )
}

export default DashboardPage;