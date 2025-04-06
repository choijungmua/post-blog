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

function Header() {
  const { theme, setTheme } = useTheme();
  // 메뉴 데이터 구조화
  const menuItems = [
    {
      title: "Home",
      submenu: [
        {
          title: "홈",
          href: "/",
          description: "메인 페이지",
        },
      ],
      width: "300px",
    },
    {
      title: "Design",
      submenu: [
        {
          title: "색상",
          href: "/design/color",
          description: "블로그의 현재 색상 테마를 보여줍니다.",
        },
        {
          title: "폰트",
          href: "/design/font",
          description: "블로그의 현재 폰트 테마를 보여줍니다.",
        },
      ],
      width: "300px",
    },
    // {
    //   title: "Introduction",
    //   submenu: [
    //     {
    //       title: "개발자 소개",
    //       href: "/about/history",
    //       description: "개발자의 소개입니다.",
    //     },
    //   ],
    //   width: "300px",
    // },
  ];

  return (
    <nav className="flex items-center justify-center p-4">
      <div className="flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            {menuItems.map((menuItem, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{menuItem.title}</NavigationMenuTrigger>
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
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        {/* 다크모드 화이트모드 */}
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setTheme("light")}>
            <SunIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setTheme("dark")}>
            <MoonIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
