"use client"
import * as React from "react";
import { ChevronRight, ChevronLeft, Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/toogleTheme";

interface CalculusItem {
  path: string;
  display: string;
}

interface CalculusData {
  [key: string]: CalculusItem[];
}

const calculusData: CalculusData = {
  "CAUCHY-EULER": [
    { path: "a", display: "EJERCICIO A)" },
    { path: "b", display: "EJERCICIO B)" },
    { path: "c", display: "EJERCICIO C)" },
    { path: "d", display: "EJERCICIO D)" },
    { path: "e", display: "EJERCICIO E)" },
  ],
  "ORDEN-SUPERIOR-1": [
    { path: "a", display: "EJERCICIO A)" },
    { path: "b", display: "EJERCICIO B)" },
    { path: "c", display: "EJERCICIO C)" },
    { path: "d", display: "EJERCICIO D)" },
  ]
};

const displayNames: { [key: string]: string } = {
  "calculoDiferencial": "Hola",
  "calculoIntegral": "Cálculo Integral",
  "CAUCHY-EULER": "Cauchy-Euler",
  "ORDEN-SUPERIOR-1": "Orden Superior 1"
};

interface MenuLinkButtonProps {
  href: string;
  path: string;
  display: string;
  isActive: boolean;
  onClick: () => void;
}

interface BreadcrumbLinkWrapperProps {
  href: string;
  children: React.ReactNode;
}

interface CalculusSidebarProps {
  children: React.ReactNode;
}

export function CalculusSidebar({ children }: CalculusSidebarProps) {
  const [activePath, setActivePath] = React.useState<string[]>([]);
  const [mounted, setMounted] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const generateUrl = (pathSegments: string[]): string => {
    return "/" + pathSegments.map(segment => encodeURIComponent(segment)).join("/");
  };

  const getDisplayName = (path: string): string => {
    if (displayNames[path]) return displayNames[path];
    
    for (const [, items] of Object.entries(calculusData)) {
      const item = items.find((item: CalculusItem) => item.path === path);
      if (item) return item.display;
    }
    return path;
  };

  const handleNavigation = (section: string, path: string) => {
    setActivePath([section, path]);
    setIsSidebarOpen(false);
  };

  const MenuLinkButton = ({ href, display, isActive, onClick }: MenuLinkButtonProps) => (
    <Link href={href} passHref>
      <SidebarMenuButton 
        asChild 
        isActive={isActive} 
        onClick={onClick}
        className="w-full"
      >
        <div>{display}</div>
      </SidebarMenuButton>
    </Link>
  );

  const BreadcrumbLinkWrapper = ({ href, children }: BreadcrumbLinkWrapperProps) => (
    <BreadcrumbLink asChild>
      <Link href={href}>
        {children}
      </Link>
    </BreadcrumbLink>
  );

  const SidebarContentComponent = () => (
    <div className="h-full flex flex-col">
      <SidebarHeader className="flex-shrink-0">
        <div className="flex items-center px-4">
          <div className="mt-2">
            <Heart size={48} />
          </div>
          <h2 className="text-xl font-bold p-4">Tarea Karly</h2>
          <div className="mt-1 ml-auto">
            <ModeToggle />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        {Object.entries(calculusData).map(([section, items]) => (
          <SidebarGroup key={section}>
            <SidebarGroupLabel className="px-4 py-2 text-lg font-medium">
              {getDisplayName(section)}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(({ path, display }) => (
                  <SidebarMenuItem key={path} className="px-2">
                    <MenuLinkButton 
                      href={generateUrl([section, path])}
                      path={path}
                      display={display}
                      isActive={activePath[1] === path}
                      onClick={() => handleNavigation(section, path)}
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </div>
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-background transform transition-transform duration-300 ease-in-out lg:hidden
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-full flex-col">
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarContentComponent />
          </div>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar className="h-screen border-r">
          <SidebarContentComponent />
        </Sidebar>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="border-b bg-background">
          <div className="flex items-center px-6 py-4">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLinkWrapper href="/">
                    Inicio
                  </BreadcrumbLinkWrapper>
                </BreadcrumbItem>
                {activePath.map((item, index) => (
                  <React.Fragment key={item}>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      {index === activePath.length - 1 ? (
                        <BreadcrumbPage>{getDisplayName(item)}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLinkWrapper href={generateUrl(activePath.slice(0, index + 1))}>
                          {getDisplayName(item)}
                        </BreadcrumbLinkWrapper>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex-1">
          <div className="h-full w-full flex flex-col">
            <div className="px-6 py-4 text-center">
              <h1 className="text-3xl font-bold">
                {activePath.length > 0
                  ? getDisplayName(activePath[activePath.length - 1])
                  : "JavaScript para Gráficar Ecuaciones Diferenciales"}
              </h1>
              {activePath.length > 0 && (
                <Link href={generateUrl(activePath.slice(0, -1))} className="inline-flex items-center text-blue-500 hover:underline mt-2">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Volver
                </Link>
              )}
            </div>
            <div className="flex-1 w-full h-full flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}