import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/fun", label: "Fun" },
  { to: "/three", label: "Three" },
  { to: "/styleguide", label: "Style Guide" },
];

const Wordmark = ({ onClick }: { onClick?: () => void }) => (
  <Link
    to="/"
    onClick={onClick}
    className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  >
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-green to-brand-blue font-heading text-sm font-bold text-white shadow-sm">
      PL
    </span>
    <span className="font-heading text-lg font-semibold tracking-tight">
      Peter Luong
    </span>
  </Link>
);

const desktopLinkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground"
  );

const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-md px-3 py-2.5 text-base font-medium transition-colors",
    isActive
      ? "bg-accent text-accent-foreground"
      : "text-foreground/80 hover:bg-accent/60 hover:text-accent-foreground"
  );

export const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Wordmark />

        <div className="flex items-center gap-1">
          {/* Desktop navigation */}
          <nav className="mr-1 hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={desktopLinkClasses}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <ThemeToggle />

          {/* Mobile navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader className="text-left">
                <SheetTitle>
                  <span className="font-heading text-base font-semibold">
                    Peter Luong
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={mobileLinkClasses}
                    >
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
