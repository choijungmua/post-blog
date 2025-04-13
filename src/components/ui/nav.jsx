"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "../shadcn/navigation-menu";
import Link from "next/link";
import { Button } from "../shadcn";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { menuItems } from "@/utils/data/siteData";

function Header() {
  const { theme, setTheme } = useTheme();
  // 메뉴 데이터 구조화

  return (
    <nav className="flex items-center justify-center p-4">
      <div className="flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((menuItem, index) => (
              <NavigationMenuItem key={index}>
                {menuItem.submenu.length === 1 ? (
                  <Link
                    href={menuItem.submenu[0].href}
                    className="flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    {menuItem.title}
                  </Link>
                ) : (
                  <>
                    <NavigationMenuTrigger>
                      {menuItem.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div
                        className="grid gap-3 p-2"
                        style={{ width: menuItem.width }}
                      >
                        {menuItem.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block p-2 hover:bg-accent/70 hover:backdrop-blur-3xl rounded-md transition-all relative overflow-hidden group"
                          >
                            <div className="absolute inset-0 bg-transparent group-hover:bg-accent/30 group-hover:backdrop-blur-3xl transition-all rounded-md"></div>
                            <div className="relative z-10">
                              <div className="font-medium">{subItem.title}</div>
                              <p className="text-sm text-muted-foreground">
                                {subItem.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {/* 다크모드 화이트모드 */}
        <div className="flex items-center ">
          {theme === "light" ? (
            <Button
              variant="ghost"
              size="icon"
              className="hover:cursor-pointer"
              onClick={() => setTheme("dark")}
            >
              <SunIcon className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hover:cursor-pointer"
              onClick={() => setTheme("light")}
            >
              <MoonIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
