import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    title: "Speech to Text",
    description: "Practice speaking English and see your words transcribed in real time. Record sessions and track your progress over time.",
    href: "/speech-to-text",
    gradient: "from-red-500 to-pink-500",
    shadowColor: "shadow-red-500/20",
    badgeColor: "bg-red-500/10 text-red-300 border-red-500/30",
    badgeText: "Speaking Practice",
    bullets: ["Real-time transcription", "Multiple English accents", "Save & review sessions"],
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    title: "Text to Speech",
    description: "Type any English text and listen to natural pronunciation. Adjust speed, pitch, and choose from multiple voices.",
    href: "/text-to-speech",
    gradient: "from-purple-500 to-blue-500",
    shadowColor: "shadow-purple-500/20",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    badgeText: "Listening Practice",
    bullets: ["Natural voice synthesis", "Adjustable speed & pitch", "Word-by-word highlighting"],
  },
];

const tips = [
  {
    icon: "💡",
    title: "Listen & Repeat",
    description: "Use Text to Speech to hear correct pronunciation, then practice speaking with Speech to Text.",
  },
  {
    icon: "📅",
    title: "Practice Daily",
    description: "Consistency is key. Even 10 minutes of daily practice can significantly improve your English.",
  },
  {
    icon: "📊",
    title: "Track Progress",
    description: "Review your saved sessions in History to see how much you've improved over time.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-28 text-center">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-purple-500/5 blur-3xl" />
          <div className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Powered by Chrome Web Speech API
          </div>

          <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="text-slate-100">Practice English</span>
            <br />
            <span className="gradient-text">with AI Voice</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 leading-relaxed">
            Improve your English speaking and listening skills using your browser's built-in
            speech technology. No downloads, no subscriptions — just practice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/speech-to-text"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
              Start Speaking
            </Link>
            <Link
              href="/text-to-speech"
              className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-8 py-3.5 text-base font-semibold text-purple-300 hover:bg-purple-500/20 hover:scale-105 transition-all duration-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              Listen & Learn
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`glass-card p-8 hover:border-purple-500/40 transition-all duration-300 group ${feature.shadowColor}`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                  {feature.icon}
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-medium ${feature.badgeColor}`}>
                  {feature.badgeText}
                </span>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-slate-100">{feature.title}</h2>
              <p className="mb-5 text-slate-400 leading-relaxed">{feature.description}</p>

              <ul className="mb-6 space-y-2">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2 text-sm text-slate-300">
                    <svg className="h-4 w-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {bullet}
                  </li>
                ))}
              </ul>

              <Link
                href={feature.href}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${feature.gradient} px-6 py-3 text-sm font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-200`}
              >
                Start Practice
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-100 mb-3">Quick Tips</h2>
          <p className="text-slate-400">Get the most out of your practice sessions</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="glass-card p-6 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="mb-3 text-3xl">{tip.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-100">{tip.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Browser Support Note */}
      <section className="px-4 pb-16 max-w-7xl mx-auto">
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 flex items-start gap-3">
          <svg className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-sm text-yellow-200/80">
            <span className="font-semibold text-yellow-300">Browser Compatibility:</span>{" "}
            Speech recognition and synthesis work best in Google Chrome. Some features may not be available in other browsers.
          </p>
        </div>
      </section>
    </div>
  );
}
