import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard,
  Wrench,
  DollarSign,
  Image,
  Info,
  Phone,
  MessageSquare,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';

const adminMenuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Home Page', url: '/admin/home', icon: LayoutDashboard },
  { title: 'Services', url: '/admin/services', icon: Wrench },
  { title: 'Pricing', url: '/admin/pricing', icon: DollarSign },
  { title: 'Gallery', url: '/admin/gallery', icon: Image },
  { title: 'About', url: '/admin/about', icon: Info },
  { title: 'Contact', url: '/admin/contact', icon: Phone },
  { title: 'Messages', url: '/admin/messages', icon: MessageSquare },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { signOut, profile } = useAuth();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/admin') {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted/50';

  const handleSignOut = () => {
    signOut();
  };

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className={isCollapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-lg">Admin Panel</h2>
              <p className="text-sm text-muted-foreground">DM T Repairs</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/admin'}
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        {!isCollapsed && (
          <div className="mb-3">
            <p className="text-sm font-medium">{profile?.display_name || 'Admin'}</p>
            <p className="text-xs text-muted-foreground">{profile?.email}</p>
          </div>
        )}
        <Button
          variant="outline"
          size={isCollapsed ? 'icon' : 'sm'}
          onClick={handleSignOut}
          className="w-full"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}