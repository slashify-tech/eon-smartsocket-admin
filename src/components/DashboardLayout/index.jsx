import Dashboard from "./Dashboard"

const DashboardLayout = ({ children, lang }) => {
    return (
        <Dashboard lang={lang}>
            {children}
        </Dashboard>
    )
}

export default DashboardLayout