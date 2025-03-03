import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import './globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="p-4">
                <SidebarTrigger />
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </body>
    </html>
  )
}