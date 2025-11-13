"use client"

import Navigation from "@/components/navigation"
import { User, BookOpen, Award, Code2 } from "lucide-react"

export default function Profile() {
  const profileData = {
    name: "Salsabila Diva",
    nim: "21120123140044",
    group: "Kelompok 22",
    university: "Universitas Diponegoro",
    program: "Teknik Komputer",
    role: "Full Stack Developer",
    joinDate: "November 2024",
    bio: "Passionate about creating modern web applications with focus on PWA technology and responsive design. Enthusiastic about coffee culture and innovative beverage technologies.",
  }

  const achievements = [
    {
      icon: Award,
      title: "PWA Expert",
      description: "Specialized in Progressive Web App development",
    },
    {
      icon: Code2,
      title: "Full Stack Developer",
      description: "Building complete web solutions from frontend to backend",
    },
    {
      icon: User,
      title: "UI/UX Designer",
      description: "Creating beautiful and functional interfaces",
    },
  ]

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Progressive Web Apps",
    "Service Workers",
    "Web Design",
    "Responsive Development",
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Profile Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/30 to-transparent"></div>
        <div className="absolute -left-40 top-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Profile Avatar */}
            <div className="lg:col-span-1 text-center">
              <div className="relative w-56 h-56 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 to-amber-500/40 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50 border-4 border-orange-400/50">
                  <User className="w-24 h-24 text-white" />
                </div>
              </div>

              <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                {profileData.name}
              </h1>
              <p className="text-lg font-bold text-primary mb-1">{profileData.nim}</p>
              <p className="text-muted-foreground">{profileData.group}</p>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="bg-card/50 backdrop-blur border border-orange-500/20 rounded-2xl p-8 space-y-6">
                <h2 className="text-3xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent mb-8">
                  Profile Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { label: "Nama Lengkap", value: profileData.name },
                    { label: "NIM", value: profileData.nim },
                    { label: "Kelompok", value: profileData.group },
                    { label: "Universitas", value: profileData.university },
                    { label: "Program Studi", value: profileData.program },
                    { label: "Posisi", value: profileData.role },
                  ].map((item, i) => (
                    <div key={i} className="border-b border-orange-500/20 pb-4">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                        {item.label}
                      </label>
                      <p className="text-lg font-semibold mt-2 text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t-2 border-orange-500/20">
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-bold">About</label>
                  <p className="text-base mt-3 leading-relaxed text-muted-foreground">{profileData.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-16 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Achievements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, i) => (
              <div
                key={i}
                className="group bg-card/50 backdrop-blur border border-orange-500/20 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:bg-card/80"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/10 to-transparent"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-4xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="px-5 py-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-foreground rounded-full border border-primary/50 hover:border-primary hover:from-orange-500/30 hover:to-amber-500/30 transition-all font-semibold cursor-pointer hover:scale-110"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="p-8 bg-card/50 backdrop-blur border-2 border-primary/50 rounded-2xl hover:border-primary transition-all">
            <h3 className="text-2xl font-bold mb-3 text-primary">Member Since</h3>
            <p className="text-lg text-muted-foreground">{profileData.joinDate}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
