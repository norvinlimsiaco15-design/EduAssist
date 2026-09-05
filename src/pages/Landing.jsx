import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GraduationCap, Calculator, Globe2, ShieldCheck, ArrowRight, Star, Plane } from 'lucide-react'
import { countries } from '../lib/data'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Logo from '../components/brand/Logo.jsx'

const features = [
  { icon: Globe2, title: 'Explore 10+ destinations', text: 'Compare tuition, living costs, and partner schools across the world\'s top study destinations.' },
  { icon: Calculator, title: 'Real-time cost computation', text: 'Get an itemized breakdown of tuition, visa, medical, and living expenses converted to PHP instantly.' },
  { icon: ShieldCheck, title: 'Guided by real consultants', text: 'Every application is reviewed and tracked by a licensed study-abroad consultant, end to end.' },
]

const testimonials = [
  { name: 'Maria Santos', role: 'BSIT student, now in Melbourne', quote: 'Cost computation showed me exactly what I needed before I even applied. No surprises.' },
  { name: 'Jared Cruz', role: 'BS Nursing, Toronto-bound', quote: 'My consultant tracked every document. I always knew what stage my visa was at.' },
  { name: 'Angela Reyes', role: 'MS Data Science, Munich', quote: 'The country comparison tool made choosing Germany an easy, informed decision.' },
]

export default function Landing() {
  return (
    <div className="bg-surface">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-ink-900/5 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo imgClassName="h-11 w-auto max-w-[240px] object-contain object-left sm:h-12 sm:max-w-[280px]" />
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-700 md:flex">
            <a href="#destinations" className="hover:text-primary-600">Destinations</a>
            <a href="#features" className="hover:text-primary-600">Features</a>
            <a href="#testimonials" className="hover:text-primary-600">Stories</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden text-sm font-semibold text-ink-700 hover:text-primary-600 sm:block">Sign in</Link>
            <Link to="/login"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="absolute left-1/3 top-40 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-700">
              <Star size={13} className="fill-primary-600 text-primary-600" /> Trusted by 1,200+ Filipino students
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-ink-900 sm:text-5xl lg:text-[3.4rem]">
              Your Study Abroad Journey Starts Here.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-500">
              Plan, budget, and track your international education path — from choosing a country to lodging your visa — all in one consultancy platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#destinations"><Button size="lg" icon={Globe2}>Explore Countries</Button></a>
              <Link to="/student/cost-calculator"><Button size="lg" variant="secondary" icon={Calculator}>Estimate Costs</Button></Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-ink-500">
              <div><p className="font-display text-2xl font-bold text-ink-900">10</p>Destinations</div>
              <div className="h-8 w-px bg-ink-300/50" />
              <div><p className="font-display text-2xl font-bold text-ink-900">80+</p>Partner schools</div>
              <div className="h-8 w-px bg-ink-300/50" />
              <div><p className="font-display text-2xl font-bold text-ink-900">96%</p>Visa success rate</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <Card className="animate-floaty p-6">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-semibold text-ink-900">Estimated Total Cost</p>
                <span className="rounded-full bg-success-50 px-2.5 py-1 text-xs font-semibold text-success-500">On budget</span>
              </div>
              <p className="mt-3 font-display text-3xl font-bold text-primary-600">₱1,842,300</p>
              <p className="text-sm text-ink-500">University of Melbourne · BS Information Technology</p>
              <div className="mt-5 space-y-2.5">
                {[['Tuition', 62], ['Living expenses', 24], ['Visa & processing', 14]].map(([label, pct]) => (
                  <div key={label}>
                    <div className="mb-1 flex justify-between text-xs text-ink-500"><span>{label}</span><span>{pct}%</span></div>
                    <div className="h-1.5 w-full rounded-full bg-ink-900/5">
                      <div className="h-full rounded-full bg-primary-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <motion.div
              animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-6 -left-8 hidden rounded-2xl bg-white p-3.5 shadow-lift sm:flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-600"><Plane size={18} /></div>
              <div>
                <p className="text-xs font-semibold text-ink-900">Visa Lodged</p>
                <p className="text-[11px] text-ink-500">Melbourne, Australia</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted partners */}
      <section className="border-y border-ink-900/5 bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wide text-ink-500">Trusted partner schools</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-ink-300">
            {['Melbourne', 'Toronto', 'TU Munich', 'Auckland', 'Manchester', 'IE University'].map((n) => (
              <span key={n} className="font-display text-lg font-bold text-ink-500/60">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink-900">Everything you need, in one place</h2>
          <p className="mt-3 text-ink-500">From first research to visa lodgement, EduAssist keeps your whole journey organized.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <Card key={i} hover className="p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <f.icon size={22} />
              </div>
              <h3 className="font-display text-base font-semibold text-ink-900">{f.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{f.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-ink-900">Popular destinations</h2>
              <p className="mt-2 text-ink-500">Explore tuition ranges and living costs before you commit.</p>
            </div>
            <Link to="/student/countries" className="hidden items-center gap-1.5 text-sm font-semibold text-primary-600 sm:flex">
              View all <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {countries.slice(0, 8).map((c) => (
              <Card key={c.code} hover className="overflow-hidden p-0">
                <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }} />
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.flag}</span>
                    <p className="font-display text-sm font-semibold text-ink-900">{c.name}</p>
                  </div>
                  <p className="mt-2 text-xs text-ink-500">Tuition: {c.tuition}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center font-display text-3xl font-bold text-ink-900">Stories from our students</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card key={i} className="p-7">
              <div className="mb-3 flex gap-0.5 text-accent-500">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={14} className="fill-accent-500" />)}
              </div>
              <p className="text-sm text-ink-700">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                  {t.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{t.name}</p>
                  <p className="text-xs text-ink-500">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-xl3 bg-primary-600 px-8 py-14 text-center sm:px-16">
          <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <GraduationCap className="mx-auto mb-4 text-white/90" size={36} />
          <h2 className="font-display text-3xl font-bold text-white">Ready to plan your journey?</h2>
          <p className="mx-auto mt-3 max-w-md text-primary-100">Create your free account and get a personalized cost estimate in minutes.</p>
          <Link to="/login" className="mt-7 inline-block">
            <Button variant="accent" size="lg">Get Started — It's Free</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink-900/5 bg-white px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Logo imgClassName="h-10 w-auto max-w-[220px] object-contain object-left" />
            <p className="mt-3 text-sm text-ink-500">Consultancy management and cost system, made simple.</p>
          </div>
          {[
            { title: 'Product', links: ['Countries', 'Partner Schools', 'Cost Calculator', 'Currency Converter'] },
            { title: 'Company', links: ['About', 'Careers', 'Contact'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service'] },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-sm font-semibold text-ink-900">{col.title}</p>
              <ul className="space-y-2 text-sm text-ink-500">
                {col.links.map((l) => <li key={l} className="hover:text-primary-600">{l}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-7xl text-xs text-ink-500">© 2026 EduAssist. A BSIT capstone project. UI prototype only.</p>
      </footer>
    </div>
  )
}
