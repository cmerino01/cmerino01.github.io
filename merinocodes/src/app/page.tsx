import Image from "next/image";
import React from "react";
import * as NavMenu from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavMenu.NavigationMenu>
        <NavMenu.NavigationMenuList>
          <NavMenu.NavigationMenuItem>
            <NavMenu.NavigationMenuTrigger>
              About me
            </NavMenu.NavigationMenuTrigger>
            <NavMenu.NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li>
                  <a href="/about-me">My story</a>
                </li>
                <li>
                  <a href="/skills">Education & Career</a>
                </li>
                <li>
                  <a href="/resume.pdf">Resume</a>
                </li>
              </ul>
            </NavMenu.NavigationMenuContent>
          </NavMenu.NavigationMenuItem>
          <NavMenu.NavigationMenuItem>
            <NavMenu.NavigationMenuTrigger>
              Projects
            </NavMenu.NavigationMenuTrigger>
            <NavMenu.NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li>
                  <a href="">AI Fitness Trainer</a>
                </li>
                <li>
                  <a href="">TBD</a>
                </li>
                <li>
                  <a href="">TBD</a>
                </li>
              </ul>
            </NavMenu.NavigationMenuContent>
          </NavMenu.NavigationMenuItem>
          <NavMenu.NavigationMenuItem>
            <NavMenu.NavigationMenuTrigger>Other</NavMenu.NavigationMenuTrigger>
            <NavMenu.NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li>
                  <a href="">Coming soon...</a>
                </li>
              </ul>
            </NavMenu.NavigationMenuContent>
          </NavMenu.NavigationMenuItem>
        </NavMenu.NavigationMenuList>
      </NavMenu.NavigationMenu>
      <main className="flex flex-col gap-8 row-start-2 text-center">
        <h1>merinocodes.com</h1>
        <h2>new version coming soon...</h2>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/chrismerinobrito/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
