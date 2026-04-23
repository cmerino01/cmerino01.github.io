import Nav from "@/components/nav";

const projects = [
  {
    id: "01",
    title: "Advanced Connector Policies (UI)",
    tags: ["MSFT", "Power Platform"],
    description:
      "Next-generation Power Platform Data Loss Prevention (DLP) policies UI, enabling organizations to better protect their data across the Power Platform ecosystem.",
    url: "https://learn.microsoft.com/en-us/power-platform/admin/advanced-connector-policies",
  },
  {
    id: "02",
    title: "Environment Groups (UI)",
    tags: ["MSFT", "Power Platform"],
    description:
      "Manage and organize environments within the Power Platform, allowing for better control and governance.",
    url: "https://learn.microsoft.com/en-us/power-platform/admin/environment-groups",
  },
  {
    id: "03",
    title: "FPGA Mini-Game",
    tags: ["FPGA", "University", "Verilog"],
    description:
      "A mini-game implemented on an FPGA, showcasing hardware programming skills and creativity.",
    url: "https://github.com/cmerino01/FPGA_Game",
    demo: "https://youtu.be/yEGT6yfvHiE",
  },
  {
    id: "04",
    title: "GameThemeMusic-NG",
    tags: ["SteamOS", "Linux", "TypeScript"],
    description:
      "A Decky Loader plugin for the Steam Deck that plays theme music for your games.",
    url: "https://github.com/cmerino01/GameThemeMusic-NG",
  },
  {
    id: "05",
    title: "DualSense Companion",
    tags: ["Stream Deck", "TypeScript", "Windows"],
    description:
      "A Stream Deck plugin that puts your DualSense or DualSense Edge controller info right on your deck — battery level, connection status, firmware version, stick drift monitor, and LED color control.",
    url: "https://marketplace.elgato.com/product/dualsense-companion-af6d93a0-a897-4656-8c6a-604190452059",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen bg-background text-foreground font-[family-name:var(--font-geist-mono)] p-8 sm:p-16 lg:p-24">
      <Nav />
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <header className="space-y-2">
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            [ projects ]
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Work &<br />
            Projects
          </h1>
          <div className="h-px bg-foreground/20 w-full mt-4" />
        </header>

        {/* Project list */}
        <section className="space-y-0">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group border-b border-foreground/10 py-8 hover:bg-foreground/5 transition-colors px-2 -mx-2"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground text-xs">
                      _{project.id}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-bold group-hover:underline underline-offset-4"
                    >
                      {project.title}
                    </a>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs underline underline-offset-4 hover:text-foreground transition-colors"
                    >
                      [ demo ]
                    </a>
                  )}
                  <div className="flex gap-2 flex-wrap pt-1">
                    {project.tags.map((tag, i) => (
                      <span
                        key={`${tag}-${i}`}
                        className="text-xs border border-foreground/20 px-2 py-0.5 tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors text-lg mt-1 shrink-0">
                  →
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Footer line */}
        <div className="h-px bg-foreground/20 w-full" />
        <p className="text-xs text-muted-foreground tracking-widest">
          merinocodes.com — {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
