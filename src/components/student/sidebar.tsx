
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  BrainCircuit,
  LayoutDashboard,
  Settings,
  Target,
  Star,
  Award,
  BookCheck,
  LifeBuoy,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';

const menuItems = [
  { href: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/student/mistake-mapper', label: 'Mistake Mapper', icon: Target },
  { href: '/student/assignments', label: 'Assignments', icon: BookCheck },
  { href: '/student/profile', label: 'AI Twin Profile', icon: BrainCircuit },
  { href: '/student/rewards', label: 'EduCredits', icon: Star },
  { href: '/student/certificates', label: 'Certificates', icon: Award },
  { href: '/student/ask-for-help', label: 'Ask for Help', icon: LifeBuoy },
];

export default function StudentSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {/* Manually added sample lesson link for visibility */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.includes('/student/lesson')}
              tooltip={{ children: 'Sample Lesson', side: 'right' }}
            >
              <Link href="/student/lesson/les-03">
                <BookOpen />
                <span>Sample Lesson</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/student/settings'}
              tooltip={{ children: 'Settings', side: 'right' }}
            >
              <Link href="/student/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
