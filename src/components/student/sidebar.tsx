'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  BrainCircuit,
  LayoutDashboard,
  Settings,
  Target,
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
  { href: '/student/profile', label: 'AI Twin Profile', icon: BrainCircuit },
  { href: '/student/lesson', label: 'Sample Lesson', icon: BookOpen },
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
                isActive={pathname === item.href}
                tooltip={{ children: item.label, side: 'right' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
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
