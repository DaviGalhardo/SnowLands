import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Droplets, Leaf, Menu, Recycle, Sparkles, TreePine, Users, X } from 'lucide-react'

const images = {
  penguin: '/images/penguin.png',
  penguinSword: '/images/penguin-espada.png',
  sword: '/images/sword.png',
  heart: '/images/heart.png',
  healing: '/images/healing-item.png',
}

const team = [
  { number: '01', file: '/images/team/integrante-1.jpg', roles: ['História', 'Game Designer', 'Roteirista e Designer de Narrativa', 'Programador'] },
  { number: '02', file: '/images/team/integrante-2.jpg', roles: ['Programador', 'Produtor', 'Analista de Qualidade', 'Marketing e Community Manager'] },
  { number: '03', file: '/images/team/integrante-3.jpg', roles: ['Artista Gráfico', 'Roteirista', 'Sound Designer'] },
  { number: '04', file: '/images/team/integrante-4.jpg', roles: ['Artista Gráfico', 'Roteirista', 'Sound Designer'] },
]

const navLinks = [['Início', '#inicio'], ['O jogo', '#sobre'], ['Personagem', '#personagem'], ['Nossa missão', '#missao'], ['Impacto ambiental', '#impacto'], ['Equipe', '#equipe']]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#080a0e]/80 backdrop-blur-xl">
      <div className="section-wrap flex h-[74px] items-center justify-between">
        <a href="#inicio" className="pixel text-[11px] text-white sm:text-sm">SNOW<span className="text-cyan-300">LANDS</span></a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(([label, href]) => <a key={href} href={href} className="text-sm text-slate-300 transition hover:text-cyan-200">{label}</a>)}
        </nav>
        <a href="#sobre" className="hidden items-center rounded-full border border-cyan-200/30 px-5 py-2.5 text-xs font-bold text-cyan-100 transition hover:bg-cyan-200 hover:text-slate-950 md:inline-flex">Explorar <ArrowUpRight size={15} className="ml-2" /></a>
        <button onClick={() => setMenuOpen((open) => !open)} className="text-cyan-100 md:hidden" aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav className="section-wrap grid gap-4 pb-5 md:hidden">{navLinks.map(([label, href]) => <a key={href} onClick={() => setMenuOpen(false)} href={href} className="text-sm text-slate-200">{label}</a>)}</nav>}
    </header>
  )
}

function FloatingItem({ children, reducedMotion, variant = 'slow' }) {
  return <div className={reducedMotion ? '' : `float-${variant}`}>{children}</div>
}

function Equipment({ title, description, active, onToggle, children }) {
  return <div className="group relative" onMouseEnter={() => onToggle(true)} onMouseLeave={() => onToggle(false)}>
    <button type="button" onClick={() => onToggle(!active)} onFocus={() => onToggle(true)} onBlur={() => onToggle(false)} aria-label={title} aria-expanded={active} className="relative block cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80">
      {children}
    </button>
    <motion.div initial={false} animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6, scale: active ? 1 : .96 }} transition={{ duration: .18 }} className={`pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-xl border border-cyan-200/25 bg-[#081018]/95 p-3 text-left shadow-[0_0_24px_rgba(80,205,255,.16)] ${active ? 'visible' : 'invisible'}`}>
      <p className="text-xs font-bold text-cyan-100">{title}</p>
      <p className="mt-1.5 text-[11px] leading-5 text-slate-300">{description}</p>
    </motion.div>
  </div>
}

function AdventureScene() {
  const sceneRef = useRef(null)
  const [activeEquipment, setActiveEquipment] = useState(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start start', 'end end'] })
  const copyOpacity = useTransform(scrollYProgress, [0, 0.2, 0.48], [1, 0.8, 0])
  const copyY = useTransform(scrollYProgress, [0, 0.45], ['0vh', '-12vh'])
  const characterX = useTransform(scrollYProgress, [0, 0.62], ['25vw', '0vw'])
  const characterY = useTransform(scrollYProgress, [0, 0.62], ['-18vh', '9vh'])
  const characterScale = useTransform(scrollYProgress, [0, 0.62], [0.7, 1])
  const characterOpacity = useTransform(scrollYProgress, [0, 0.12, 0.62], [0.72, 1, 1])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.62], [0.35, 0.82])
  const backSwordOpacity = useTransform(scrollYProgress, [0.08, 0.2, 0.2001], [1, 1, 0])
  const plainPenguinOpacity = useTransform(scrollYProgress, [0.08, 0.2, 0.2001], [0, 0, 1])
  const swordOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])
  const swordScale = useTransform(scrollYProgress, [0.2, 0.3], [0.45, 1])
  const swordX = useTransform(scrollYProgress, [0.2, 0.3], ['4vw', '-6vw'])
  const swordY = useTransform(scrollYProgress, [0.2, 0.3], ['8px', '-8px'])
  const heartOpacity = useTransform(scrollYProgress, [0.28, 0.46], [0, 1])
  const heartScale = useTransform(scrollYProgress, [0.28, 0.46], [0.45, 1])
  const heartX = useTransform(scrollYProgress, [0.28, 0.46], ['-2vw', '12vw'])
  const heartY = useTransform(scrollYProgress, [0.28, 0.46], ['12px', '-20px'])
  const healingOpacity = useTransform(scrollYProgress, [0.38, 0.56], [0, 1])
  const healingScale = useTransform(scrollYProgress, [0.38, 0.56], [0.45, 1])
  const healingX = useTransform(scrollYProgress, [0.38, 0.56], ['2vw', '9vw'])
  const healingY = useTransform(scrollYProgress, [0.38, 0.56], ['-8px', '10vw'])

  return (
    <section ref={sceneRef} id="inicio" className="relative h-[240vh] bg-[#080a0e]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="dark-grid absolute inset-0 opacity-50" />
        <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[110px] sm:h-[520px] sm:w-[520px]" />
        <div className="section-wrap relative z-10 grid w-full items-center gap-4 md:grid-cols-[.82fr_1.18fr]">
          <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative z-40 max-w-sm">
            <p className="text-[10px] font-bold uppercase tracking-[.35em] text-cyan-300">Uma aventura congelante</p>
            <h1 className="pixel mt-6 text-2xl leading-[1.8] sm:text-4xl">DESCUBRA O<br /><span className="text-cyan-300">MUNDO GELADO</span></h1>
            <p className="mt-7 text-base leading-8 text-slate-400">Uma jornada em pixel art, coragem e descobertas no universo de SnowLands.</p>
            <a href="#personagem" className="mt-9 inline-flex items-center gap-3 rounded-full bg-cyan-300 px-6 py-3 text-xs font-bold text-slate-950 transition hover:bg-white">Conheça o protagonista <ArrowDown size={15} /></a>
          </motion.div>
          <div id="personagem" className="relative h-[440px] md:h-[590px]">
            <motion.div style={{ x: characterX, y: characterY, scale: characterScale, opacity: characterOpacity }} className="absolute left-1/2 top-1/2 z-20 w-[min(56vw,350px)] -translate-x-1/2 -translate-y-1/2 sm:w-[min(40vw,390px)]">
              <motion.div className="relative" initial={reducedMotion ? false : { opacity: 0, scale: .88, y: 14 }} animate={reducedMotion ? undefined : { opacity: 1, scale: 1, y: [0, -10, 0] }} transition={reducedMotion ? undefined : { opacity: { duration: .7 }, scale: { duration: .7, ease: 'easeOut' }, y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } }}>
                <motion.img style={{ opacity: plainPenguinOpacity }} src={images.penguin} alt="" aria-hidden="true" className="pixel-art absolute inset-0 z-20 w-full object-contain drop-shadow-[0_0_28px_rgba(80,205,255,0.22)]" />
                <motion.img style={{ opacity: backSwordOpacity }} src={images.penguinSword} alt="Pinguim de SnowLands em pixel art com espada nas costas" className="pixel-art relative z-20 w-full object-contain drop-shadow-[0_0_28px_rgba(80,205,255,0.22)]" />
              </motion.div>
              <motion.div style={{ x: swordX, y: swordY, opacity: swordOpacity, scale: swordScale }} className="absolute left-[8%] top-[16%] z-10">
                <FloatingItem reducedMotion={reducedMotion} variant="sword"><Equipment title="Espada" description="Equipamento utilizado pelo personagem durante sua jornada. Representa sua capacidade de enfrentar desafios e superar obstáculos." active={activeEquipment === 'sword'} onToggle={(visible) => setActiveEquipment(visible ? 'sword' : null)}><div className="absolute -inset-4 rounded-full bg-blue-400/15 blur-xl" /><img src={images.sword} alt="Espada do personagem" className="pixel-art relative h-24 w-24 object-contain sm:h-32 sm:w-32" /></Equipment></FloatingItem>
              </motion.div>
              <motion.div style={{ x: heartX, y: heartY, opacity: heartOpacity, scale: heartScale }} className="absolute left-[34%] top-[18%] z-30">
                <FloatingItem reducedMotion={reducedMotion} variant="heart"><Equipment title="Vida" description="Representa a vida e a energia do personagem. É um elemento importante para acompanhar sua condição durante a aventura." active={activeEquipment === 'heart'} onToggle={(visible) => setActiveEquipment(visible ? 'heart' : null)}><div className="absolute inset-0 scale-150 rounded-full bg-rose-400/20 blur-xl" /><img src={images.heart} alt="Vida" className="pixel-art relative h-16 w-16 object-contain drop-shadow-[0_0_22px_rgba(251,113,133,.35)] sm:h-20 sm:w-20" /></Equipment></FloatingItem>
              </motion.div>
              <motion.div style={{ x: healingX, y: healingY, opacity: healingOpacity, scale: healingScale }} className="absolute left-[32%] top-[28%] z-30">
                <FloatingItem reducedMotion={reducedMotion} variant="healing"><Equipment title="Item de cura" description="Item utilizado para recuperar a vida do personagem e ajudá-lo a continuar sua jornada." active={activeEquipment === 'healing'} onToggle={(visible) => setActiveEquipment(visible ? 'healing' : null)}><div className="absolute inset-0 scale-150 rounded-full bg-emerald-300/15 blur-xl" /><img src={images.healing} alt="Item de cura" className="pixel-art relative h-16 w-16 object-contain drop-shadow-[0_0_22px_rgba(110,231,183,.3)] sm:h-20 sm:w-20" /></Equipment></FloatingItem>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ eyebrow, title, text }) {
  return <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[.3em] text-cyan-300">{eyebrow}</p><h2 className="pixel mt-5 text-lg leading-[1.9] sm:text-2xl">{title}</h2>{text && <p className="mt-5 leading-7 text-slate-400">{text}</p>}</div>
}

function About() {
  return <section id="sobre" className="border-y border-white/[.06] bg-[#0d1118] py-28"><div className="section-wrap grid gap-12 md:grid-cols-2 md:items-center"><SectionTitle eyebrow="O jogo" title={<>UMA JORNADA<br />EM SNOWLANDS</>} text="SnowLands é uma aventura em pixel art ambientada em um mundo congelado. Este espaço está preparado para receber a história oficial e os objetivos do jogo." /><div className="glass rounded-3xl p-7 sm:p-9"><p className="pixel text-xs leading-7 text-cyan-100">FICHA DO JOGO</p><div className="mt-6 divide-y divide-white/10">{[['Gênero', 'Aventura'], ['Estilo', '2D / PIXEL ART'], ['Plataforma', 'Em breve'], ['Objetivo', 'Explorar SnowLands']].map(([key, value]) => <div key={key} className="flex items-center justify-between gap-4 py-4 text-sm"><span className="text-slate-500">{key}</span><span className="text-right font-semibold text-slate-200">{value}</span></div>)}</div></div></div></section>
}

function MotionSection({ id, className = '', children }) {
  const reducedMotion = useReducedMotion()
  return <motion.section id={id} initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65 }} className={className}>{children}</motion.section>
}

const pillars = [
  { icon: Sparkles, title: 'Diversão e exploração', text: 'Exploração, desafios, evolução e descobertas formam uma experiência de jogo. A temática ambiental entra como parte da aventura, não como uma aula cansativa.' },
  { icon: Leaf, title: 'Consciência ambiental', text: 'Desmatamento, poluição, descarte inadequado e preservação podem aparecer em cenários, objetivos e consequências das escolhas — como possibilidades futuras do projeto.' },
  { icon: Users, title: 'Aprendizado que ultrapassa a tela', text: 'A experiência busca incentivar reflexões sobre preservação, consumo consciente e responsabilidade coletiva no cotidiano.' },
]

const environmentalSituations = [
  { icon: TreePine, title: 'Floresta ameaçada', problem: 'A remoção da vegetação pode comprometer habitats e a regeneração do ambiente.', consequence: 'A perda de abrigo e de diversidade pode desequilibrar o ecossistema.', action: 'Valorizar áreas preservadas e apoiar ações de recuperação da vegetação.', challenge: 'Recuperar uma área do mapa, proteger mudas e explorar sem destruir o habitat.' },
  { icon: Recycle, title: 'Descarte inadequado', problem: 'Resíduos deixados em locais impróprios podem contaminar o ambiente e afetar animais.', consequence: 'O lixo pode se acumular e dificultar a vida das espécies e das comunidades.', action: 'Separar resíduos corretamente e reduzir o descarte desnecessário.', challenge: 'Encontrar resíduos no cenário e encaminhá-los aos destinos corretos.' },
  { icon: Droplets, title: 'Ecossistema a preservar', problem: 'Cada ambiente depende do equilíbrio entre água, solo, plantas e animais.', consequence: 'Alterações em um elemento podem afetar todo o conjunto de relações.', action: 'Usar recursos com responsabilidade e respeitar os ciclos naturais.', challenge: 'Cumprir objetivos de proteção sem esgotar os recursos do cenário.' },
]

function Mission() {
  return <MotionSection id="missao" className="relative overflow-hidden border-y border-white/[.06] bg-[#080a0e] py-28"><div className="section-wrap"><div className="mx-auto max-w-3xl text-center"><SectionTitle eyebrow="Nossa missão" title={<>ENTRETER.<br /><span className="text-cyan-300">CONSCIENTIZAR.</span><br />PRESERVAR.</>} text="SnowLands busca transformar temas ambientais em uma experiência interativa, acessível e interessante — conectando diversão, descoberta e responsabilidade coletiva." /><div className="mt-10 flex justify-center flex-wrap gap-3">{['Entreter', 'Conscientizar', 'Incentivar a preservação'].map((item) => <span key={item} className="rounded-full border border-cyan-200/20 bg-cyan-300/5 px-4 py-2 text-xs text-cyan-100">{item}</span>)}</div></div></div></MotionSection>
}

function Purpose() {
  return <MotionSection id="proposito" className="border-b border-white/[.06] bg-[#0d1118] py-28"><div className="section-wrap"><SectionTitle eyebrow="A proposta do jogo" title={<>MAIS DO QUE UM JOGO,<br /><span className="text-cyan-300">UMA EXPERIÊNCIA.</span></>} text="O objetivo é unir diversão, exploração e conscientização ambiental sem perder o prazer de jogar." /><div className="mt-14 grid gap-5 md:grid-cols-3">{pillars.map(({ icon: Icon, title, text }, index) => <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} whileHover={{ y: -8 }} className="glass group rounded-2xl p-7 transition-colors hover:border-cyan-200/40"><div className="mb-8 grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950"><Icon size={22} /></div><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{text}</p></motion.article>)}</div></div></MotionSection>
}

function Impact() {
  const [selected, setSelected] = useState(environmentalSituations[0])
  const reducedMotion = useReducedMotion()
  return <MotionSection id="impacto" className="border-b border-white/[.06] bg-[#080a0e] py-28"><div className="section-wrap"><SectionTitle eyebrow="Impacto ambiental" title={<>SUAS ESCOLHAS<br /><span className="text-cyan-300">FAZEM A DIFERENÇA.</span></>} text="Escolha uma situação para explorar como um tema ambiental poderia ser traduzido em uma experiência dentro do SnowLands." /><div className="mt-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div className="grid gap-3">{environmentalSituations.map((situation) => { const Icon = situation.icon; const active = situation.title === selected.title; return <motion.button key={situation.title} whileHover={{ x: 4 }} onClick={() => setSelected(situation)} className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition ${active ? 'border-cyan-200/60 bg-cyan-300/10' : 'border-white/10 bg-white/[.02] hover:border-cyan-200/30'}`}><Icon size={22} className={active ? 'text-cyan-200' : 'text-slate-500'} /><span className="text-sm font-bold text-white">{situation.title}</span></motion.button> })}</div><motion.div key={selected.title} initial={reducedMotion ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-3xl p-7 sm:p-9"><h3 className="text-xl font-bold text-white">{selected.title}</h3><div className="mt-7 grid gap-5 sm:grid-cols-2"><p className="text-sm leading-7 text-slate-400"><strong className="text-cyan-100">O problema:</strong><br />{selected.problem}</p><p className="text-sm leading-7 text-slate-400"><strong className="text-cyan-100">Possível consequência:</strong><br />{selected.consequence}</p><p className="text-sm leading-7 text-slate-400"><strong className="text-cyan-100">Uma atitude:</strong><br />{selected.action}</p><p className="text-sm leading-7 text-slate-400"><strong className="text-cyan-100">No jogo, poderia ser:</strong><br />{selected.challenge}</p></div><p className="mt-8 text-[11px] text-slate-500">Demonstração conceitual, sem estatísticas ou resultados reais.</p></motion.div></div></div></MotionSection>
}

function Team() {
  const reducedMotion = useReducedMotion()
  return <section id="equipe" className="border-t border-white/[.06] bg-[#0d1118] py-28"><div className="section-wrap"><SectionTitle eyebrow="Quem está por trás do projeto" title={<>NOSSA<br />EQUIPE</>} text="Quatro espaços preparados para receber as fotografias, funções e contribuições de cada integrante do TCC." /><div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{team.map((person, index) => <motion.article key={person.number} initial={reducedMotion ? false : { opacity: 0, y: 22 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={reducedMotion ? undefined : { y: -7, boxShadow: '0 16px 40px rgba(34, 211, 238, .14)' }} className="glass group overflow-hidden rounded-2xl transition-colors duration-300 hover:border-cyan-200/35"><div className="relative flex h-56 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(50,150,190,.2),transparent_70%),#111923]"><img src={person.file} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" onError={(event) => { event.currentTarget.style.display = 'none' }} /><div className="absolute inset-0 bg-gradient-to-t from-[#0d1118]/65 to-transparent" /><div className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-cyan-200/40 bg-[#081018]/80 text-sm font-bold text-cyan-100 shadow-[0_0_18px_rgba(80,205,255,.2)]">{person.number}</div></div><div className="p-5"><h3 className="text-sm font-bold text-white">Nome do integrante</h3><p className="mt-1 text-xs text-cyan-300">Funções no desenvolvimento</p><div className="mt-4 flex flex-wrap gap-2">{person.roles.map((role) => <span key={role} className="rounded-full border border-cyan-200/15 bg-cyan-300/5 px-2.5 py-1 text-[10px] leading-4 text-slate-300 transition-colors group-hover:border-cyan-200/30 group-hover:text-cyan-100">{role}</span>)}</div></div></motion.article>)}</div></div></section>
}

function Footer() {
  return <footer className="border-t border-white/[.07] bg-[#080a0e] py-9"><div className="section-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"><span className="pixel text-xs text-white">SNOW<span className="text-cyan-300">LANDS</span></span><p className="text-xs text-slate-500">Projeto desenvolvido como Trabalho de Conclusão de Curso.</p><a href="#inicio" className="text-xs text-cyan-200 hover:text-white">Voltar ao topo ↑</a></div></footer>
}

export default function App() {
  return <><Header /><main><AdventureScene /><About /><Purpose /><Mission /><Impact /><Team /></main><Footer /></>
}
