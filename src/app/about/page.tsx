import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

import BlurText from "@/components/react-spring/BlurText";

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Silany.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <BlurText
            text="I’m Sila Buranarom."
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
          />
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’ve always been curious about how things work and love exploring new ideas. 
              One of my earliest memories is of taking apart the remote-controlled car my dad bought for me, 
              just to see if I could figure out how it worked and put it back together again. 
              It wasn’t perfect somehow, the wheels never turned the same way but that little experiment sparked my fascination with technology.  
            </p>
            <p>
            As a kid, I also had a thing for building. When I was in high school, I discovered my passion for robotics competitions, 
            especially the WORLD ROBOT OLYMPIAD. Although I lost most of the time, the experience was invaluable, 
            teaching me about perseverance and teamwork. 
            One of my proudest achievements was being chosen to represent Thailand in the international competition in Qatar—a moment 
            that continues to inspire me to take on new challenges and keep pushing my limits.
            </p>
            <p>
            My passion for learning led me to experiment with coding in my teenage years. I started with simple programs, 
            like a calculator app for my friends, and kept pushing myself to learn more. Eventually, during my time at university, 
            I built my very first website, jaonin.com. It wasn’t flashy, but it was mine, 
            and it marked the beginning of my journey in discovering how technology can connect people and solve real problems.
            </p>
            <p>
            Today, I’m deeply committed to using technology as a tool for innovation and collaboration. 
            Whether it’s brainstorming new app ideas or improving existing systems, I strive to bring creativity and problem-solving to everything I do. 
            And who knows? Maybe one day, I might be like <em>Elon Musk</em>, building rockets like SpaceX.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://www.instagram.com/silanyonlygust/" icon={InstagramIcon} className="mt-4">
              Follow on Instagram
            </SocialLink>
            <SocialLink href="https://github.com/silalalany" icon={GitHubIcon} className="mt-4">
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="mailto:sila.buranarom@gmail.com"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              sila.buranarom@gmail.com
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
