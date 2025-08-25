import DashboardLayout from "@/components/DashboardLayout";


export default async function RootLayout({ children, params }) {
const {lang} = await params
    return (
        <DashboardLayout lang={lang}>
            {children}
        </DashboardLayout>
    );
}
