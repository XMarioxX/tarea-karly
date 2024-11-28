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
  SidebarRail,
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

// Interfaces remain the same
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
  "calculoIntegral": "Cálculo Integral"
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
    
    for (const [section, items] of Object.entries(calculusData)) {
      const item = items.find(item => item.path === path);
      section;
      if (item) return item.display;
    }
    return path;
  };

  const MenuLinkButton = ({ href, display, isActive, onClick }: MenuLinkButtonProps) => (
    <Link href={href} passHref>
      <SidebarMenuButton 
        asChild 
        isActive={isActive} 
        onClick={() => {
          onClick();
          setIsSidebarOpen(false);
        }}
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

  // Changed to a regular function component
  const SidebarContentComponent = () => (
    <>
      <SidebarHeader>
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
      <SidebarContent>
        {Object.entries(calculusData).map(([section, items]) => (
          <SidebarGroup key={section}>
            <SidebarGroupLabel>{getDisplayName(section)}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(({ path, display }) => (
                  <SidebarMenuItem key={path}>
                    <MenuLinkButton 
                      href={generateUrl([section, path])}
                      path={path}
                      display={display}
                      isActive={activePath[1] === path}
                      onClick={() => setActivePath([section, path])}
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </>
  );

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex h-screen w-full bg-background">
      {/* Mobile Sidebar */}
      <div className={`
        fixed inset-0 z-50 bg-background transition-transform duration-300 lg:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full w-64 border-r">
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <Sidebar>
            <SidebarContentComponent />
          </Sidebar>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar className="border-r">
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