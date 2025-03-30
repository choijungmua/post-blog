import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "./navigation-menu";
import Link from "next/link";

function Header() {
  // 메뉴 데이터 구조화
  const menuItems = [
    {
      title: "홈",
      submenu: [
        {
          title: "홈 서브메뉴 1",
          href: "/",
          description: "홈 서브메뉴 1에 대한 설명입니다.",
        },
        {
          title: "홈 서브메뉴 2",
          href: "/home/submenu2",
          description: "홈 서브메뉴 2에 대한 설명입니다.",
        },
      ],
      width: "300px",
    },
    {
      title: "Design",
      submenu: [
        {
          title: "Color",
          href: "/design/color",
          description: "블로그의 현재 색상 테마를 보여줍니다.",
        },
        {
          title: "Font",
          href: "/design/font",
          description: "블로그의 현재 폰트 테마를 보여줍니다.",
        },
      ],
      width: "300px",
    },
    {
      title: "소개",
      submenu: [
        {
          title: "회사 역사",
          href: "/about/history",
          description: "회사의 역사에 대한 설명입니다.",
        },
        {
          title: "팀 소개",
          href: "/about/team",
          description: "우리 팀에 대한 소개입니다.",
        },
      ],
      width: "300px",
    },
    {
      title: "문의",
      submenu: [
        {
          title: "이메일 문의",
          href: "/contact/email",
          description: "이메일로 문의하기",
        },
        {
          title: "양식 작성",
          href: "/contact/form",
          description: "문의 양식 작성하기",
        },
      ],
      width: "300px",
    },
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
      </div>
    </nav>
  );
}

export default Header;
