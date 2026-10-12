import { CardboardScene } from '@/components/cardboard-scene'
import { Contact } from '@/components/contact'
import { HmrcScroll } from '@/components/hmrc-scroll'
import { IndustryScroll } from '@/components/industry-scroll'
import { Marquee } from '@/components/marquee'
import { Packages } from '@/components/packages'
import { ProcessTimeline } from '@/components/process-timeline'
import { ScrollProgress } from '@/components/scroll-progress'
import { ServicesStack } from '@/components/services-stack'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SmoothScroll } from '@/components/smooth-scroll'
import { VideoHero } from '@/components/video-hero'

export default function Page() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <SiteHeader />
      <main>
        <VideoHero />
        <Marquee />
        <IndustryScroll />
        <CardboardScene />
        <HmrcScroll />
        <ServicesStack />
        <ProcessTimeline />
        <Packages />
        <Contact />
      </main>
      <SiteFooter />
    </SmoothScroll>
  )
}
