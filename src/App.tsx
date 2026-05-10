import { ExperienceSection } from './components/ExperienceSection'
import { Navbar } from './components/Navbar'
import { ProfilePhoto } from './components/ProfilePhoto'
import { ProjectSection } from './components/ProjectSection'
import { SkillsSection } from './components/SkillsSection'

function App() {
  return (
    <div className="box-border min-h-dvh w-full px-[clamp(1.25rem,5vw,4.5rem)] sm:px-[clamp(1.5rem,6vw,5.5rem)]">
      <div className="mx-auto box-border flex h-auto min-h-dvh w-full max-w-[1180px] flex-col gap-[clamp(12px,1.8vh,18px)] pb-7 pt-[clamp(14px,2.2vw,22px)] max-md:min-h-dvh md:h-dvh md:max-h-dvh md:overflow-hidden md:pb-[clamp(14px,2.2vw,22px)]">
        <Navbar />
        <div className="flex justify-center py-0.5 sm:hidden">
          <ProfilePhoto className="max-w-[12rem]" />
        </div>
        <div className="grid min-h-0 w-full min-w-0 flex-1 grid-cols-1 gap-[clamp(12px,2vw,20px)] max-md:flex-none md:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] md:items-stretch">
          <div className="flex min-h-0 min-w-0 flex-col gap-3 md:h-full md:min-h-0">
            <ExperienceSection />
            <SkillsSection />
          </div>
          <ProjectSection />
        </div>
      </div>
    </div>
  )
}

export default App
