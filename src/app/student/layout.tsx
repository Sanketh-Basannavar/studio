import StudentSidebar from '@/components/student/sidebar';
import UserNav from '@/components/user-nav';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <StudentSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-8">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold font-headline">Student Dashboard</h1>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
