"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { routes } from "@/routes/routes";
import { DropdownItemProps, ItemProps } from "./navbar.types";

export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {routes.map((route) => (
          <NavigationMenuItem key={route.name}>
            {"children" in route ? (
              <Navbar.DropdownItem {...route} />
            ) : (
              <Navbar.Item {...route} />
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

Navbar.Item = (route: ItemProps) => (
  <NavigationMenuLink asChild>
    <Link href={route.path}>{route.name}</Link>
  </NavigationMenuLink>
);

Navbar.DropdownItem = (route: DropdownItemProps) => (
  <>
    <NavigationMenuTrigger className="font-normal">
      {route.name}
    </NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="grid w-[350px] gap-2 grid-cols-1">
        {route.children.map((child) => (
          <ListItem
            key={child.name}
            title={child.name}
            href={child.path}
            children={child.description}
          />
        ))}
      </ul>
    </NavigationMenuContent>
  </>
);

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-xs leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
