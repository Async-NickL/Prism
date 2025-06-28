"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const ThemeMenu = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-card border-2 border-foreground/50 rounded-md !outline-none text-foreground hover:bg-accent hover:text-accent-foreground w-10 px-4"
        >
          <Sun className="h-[2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-popover/95 backdrop-blur-md border-border p-2 min-w-[80px]"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer flex flex-col items-center w-auto px-4"
          style={{ minWidth: "unset" }}
        >
          <Sun className="h-4 w-2" />
          <span className="max-sm:hidden">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer flex flex-col items-center px-4"
          style={{ minWidth: "unset" }}
        >
          <Moon className="h-4 w-2" />
          <span className="max-sm:hidden">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer flex flex-col items-center w-auto px-4"
          style={{ minWidth: "unset" }}
        >
          <Monitor className="h-4 w-2" />
          <span className="max-sm:hidden">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeMenu;
