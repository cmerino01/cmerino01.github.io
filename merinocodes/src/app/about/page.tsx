import Nav from "@/components/nav";

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground font-[family-name:var(--font-geist-mono)] p-8 sm:p-16 lg:p-24">
      <Nav />
      <div className="max-w-3xl mx-auto space-y-16">
        <header className="space-y-2">
          <p className="text-muted-foreground text-sm tracking-widest uppercase">
            [ about ]
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Christopher
            <br />
            Merino Brito
          </h1>
          <div className="h-px bg-foreground/20 w-full mt-4" />
        </header>

        <section className="space-y-4">
          <p className="text-sm tracking-widest text-muted-foreground uppercase">
            {`// who i am`}
          </p>
          <p className="text-lg leading-relaxed">
            I was born and raised in Los Angeles, CA. Ever since I laid my hands
            on a PlayStation 2, I was fascinated by electronics and, as I later
            learned, computers. My middle school math teacher introduced me to
            programming via Code.org, and I was hooked ever since. Naturally, I
            pursued a degree in Computer Engineering at the University of
            Southern California (Fight On!). During my time at USC, I had the
            opportunity to intern at Microsoft and haven&apos;t looked back since.
            Outside of work, I&apos;m a bit of a nerd &mdash; and I wear that badge
            proudly. I love gaming, and what started as a hobby eventually
            turned into tinkering with mods, emulators, and the tools that power
            them. I also stream on Twitch, which has been a fun way to mix my
            love of tech with a genuine love of people. At the end of the day,
            I&apos;m someone who&apos;s always curious &mdash; whether that means diving deep
            into a new codebase, learning about someone&apos;s background over a
            conversation, or taking apart something just to see how it works.
          </p>
        </section>

        <section className="space-y-4">
          <p className="text-sm tracking-widest text-muted-foreground uppercase">
            {`// what i do`}
          </p>
          <ul className="space-y-2 text-lg">
            <li className="before:content-['›'] before:mr-3 before:text-muted-foreground">
              Software Engineer at Microsoft, building with React and TypeScript
              for 3+ years. Currently working on infrastructure for the Power
              Platform Admin Center.
            </li>
            <li className="before:content-['›'] before:mr-3 before:text-muted-foreground">
              C/C++ roots from computer engineering
            </li>
            <li className="before:content-['›'] before:mr-3 before:text-muted-foreground">
              Hardware background in soldering, wirewrapping, and prototyping &mdash;
              including work with the ATmega328P
            </li>
          </ul>
        </section>

        <div className="h-px bg-foreground/20 w-full" />
        <p className="text-xs text-muted-foreground tracking-widest">
          merinocodes.com &mdash; {new Date().getFullYear()}
        </p>
      </div>
    </main>
  );
}
