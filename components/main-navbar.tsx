import * as React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const CenterNavigationMenu: React.FC = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Catalog</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="px-4 flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">AP</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Unlimited AI-generated practice on Advanced Placement
                      tests.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/courses/calc-ab" title="AP Calculus AB">
                8 units
              </ListItem>
              <ListItem href="/courses/physics-1" title="AP Physics 1">
                7 units
              </ListItem>
              <ListItem href="/chem" title="AP Chemistry">
                9 units
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/changelog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Change Log
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const MainNavigationBar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <CenterNavigationMenu />
        <div className="flex gap-2">
          <Input className="w-96" placeholder="Search" />
          <Button
            variant="secondary"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Log in
          </Button>
        </div>
      </div>
    </header>
  );
};
