import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowUpRight, BookOpen, CloudSun, Download, Factory, Gamepad2, Globe2, Leaf, Menu, MonitorDown, PackageOpen, Snowflake, Sparkles, X } from 'lucide-react'

const images = {
  penguin: '/images/penguin.png',
  penguinSword: '/images/penguin-espada.png',
  sword: '/images/sword.png',
  heart: '/images/heart.png',
  healing: '/images/healing-item.png',
}

const team = [
  { number: '01', file: '/images/team/integrante-1.jpeg', tone: 'from-[#a77d83]/45 via-[#5f5368]/35 to-[#1b202d]', accent: 'from-[#c48e93] via-[#a994b8] to-[#829bb5]', roles: ['História', 'Game Designer', 'Roteirista e Designer de Narrativa', 'Programador'] },
  { number: '02', file: '/images/team/integrante-2.jpeg', tone: 'from-[#9aa4c0]/45 via-[#64738b]/35 to-[#19232e]', accent: 'from-[#9da8c2] via-[#8bb1b2] to-[#b4b28b]', roles: ['Programador', 'Produtor', 'Analista de Qualidade', 'Marketing e Community Manager'] },
  { number: '03', file: '/images/team/integrante-3.jpeg', tone: 'from-[#8cae9c]/45 via-[#637f78]/35 to-[#18262a]', accent: 'from-[#91bda5] via-[#9ca9bb] to-[#b99cae]', roles: ['Artista Gráfico', 'Roteirista', 'Sound Designer'] },
  { number: '04', file: '/images/team/integrante-4.jpeg', tone: 'from-[#b2a378]/45 via-[#817b76]/35 to-[#24272d]', accent: 'from-[#c3a982] via-[#b69ca7] to-[#9da8bd]', roles: ['Artista Gráfico', 'Roteirista', 'Sound Designer'] },
]

const navLinks = [['Início', '#inicio'], ['O jogo', '#sobre'], ['Personagem', '#personagem'], ['Nossa missão', '#missao'], ['Impacto ambiental', '#impacto'], ['Equipe', '#equipe']]

function Header({ downloadPage = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const mobileLinks = downloadPage ? [['Voltar ao site', '/']] : [...navLinks, ['Fazer Download', '/download']]
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#080a0e]/80 backdrop-blur-xl">
      <div className="section-wrap flex h-[74px] items-center justify-between">
        <a href={downloadPage ? '/' : '#inicio'} className="pixel text-[11px] text-white sm:text-sm">SNOW<span className="text-cyan-300">LANDS</span></a>
        <nav className="hidden items-center gap-8 md:flex">
          {(downloadPage ? [['Voltar ao site', '/']] : navLinks).map(([label, href]) => <a key={href} href={href} className="text-sm text-slate-300 transition hover:text-cyan-200">{label}</a>)}
        </nav>
        <a href={downloadPage ? '#download' : '/download'} className="hidden items-center rounded-full border border-cyan-200/30 px-5 py-2.5 text-xs font-bold text-cyan-100 transition hover:bg-cyan-200 hover:text-slate-950 md:inline-flex">Fazer Download <ArrowUpRight size={15} className="ml-2" /></a>
        <button onClick={() => setMenuOpen((open) => !open)} className="text-cyan-100 md:hidden" aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav className="section-wrap grid gap-4 pb-5 md:hidden">{mobileLinks.map(([label, href]) => <a key={href} onClick={() => setMenuOpen(false)} href={href} className="text-sm text-slate-200">{label}</a>)}</nav>}
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

const climateCards = [
  { icon: CloudSun, title: 'O que está acontecendo?', text: 'Aquecimento global é o aumento duradouro da temperatura média do planeta. Ele ocorre principalmente porque atividades humanas elevam a concentração de gases de efeito estufa, que retêm mais calor na atmosfera.' },
  { icon: Factory, title: 'De onde vêm esses gases?', text: 'A queima de carvão, petróleo e gás, o desmatamento e algumas atividades agropecuárias aumentam as emissões. O efeito de cada atividade se soma e altera o equilíbrio climático.' },
  { icon: Snowflake, title: 'O que muda no planeta?', text: 'O aquecimento contribui para mudanças nos padrões de chuva e temperatura, derretimento de geleiras e impactos nos ecossistemas e nas espécies que dependem deles.' },
]

const approachCards = [
  { icon: Gamepad2, title: 'Desenvolvimento em 2D', text: 'Construímos SnowLands no GameMaker, criando um universo visual em pixel art e uma experiência interativa para apresentar o projeto.' },
  { icon: Sparkles, title: 'Narrativa e personagens', text: 'O pinguim protagonista e o universo congelado aproximam o jogador da temática ambiental por meio de uma aventura, sem transformar o jogo em uma aula.' },
  { icon: BookOpen, title: 'Curiosidade para refletir', text: 'A proposta é usar a exploração e a linguagem dos jogos para despertar perguntas sobre o ambiente e incentivar o jogador a conhecer melhor o aquecimento global.' },
]

function Mission() {
  return <MotionSection id="missao" className="relative overflow-hidden border-y border-white/[.06] bg-[#080a0e] py-28"><div className="section-wrap"><SectionTitle eyebrow="01 — Qual o problema?" title={<>O CLIMA ESTÁ<br /><span className="text-cyan-300">MUDANDO.</span></>} text="O aquecimento global não é apenas um dia quente: é uma alteração persistente na temperatura média da Terra. O aumento dos gases de efeito estufa, provocado principalmente por atividades humanas, intensifica a retenção de calor na atmosfera." /><div className="mt-14 grid gap-5 md:grid-cols-3">{climateCards.map(({ icon: Icon, title, text }, index) => <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} whileHover={{ y: -6 }} className="glass group rounded-2xl p-7 transition-colors hover:border-cyan-200/40"><div className="mb-7 grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950"><Icon size={22} /></div><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{text}</p></motion.article>)}</div><p className="mt-8 text-xs text-slate-500">Síntese baseada em materiais do <a className="text-cyan-200 hover:text-white" href="https://climate.nasa.gov/causes/" target="_blank" rel="noreferrer">NASA Climate Change</a> e do <a className="text-cyan-200 hover:text-white" href="https://www.ipcc.ch/report/ar6/syr/" target="_blank" rel="noreferrer">IPCC</a>.</p></div></MotionSection>
}

function Purpose() {
  return <MotionSection id="proposito" className="border-b border-white/[.06] bg-[#0d1118] py-28"><div className="section-wrap"><SectionTitle eyebrow="02 — O que nós fizemos?" title={<>UMA AVENTURA<br /><span className="text-cyan-300">COM PROPÓSITO.</span></>} text="Desenvolvemos SnowLands como uma iniciativa de entretenimento associada à reflexão ambiental. O jogo apresenta um mundo congelado e convida o visitante a conhecer a relação entre a aventura e o aquecimento global, sem afirmar resultados de conscientização que ainda não foram medidos." /><div className="mt-10 flex flex-wrap gap-3"><span className="rounded-full border border-cyan-200/20 bg-cyan-300/5 px-4 py-2 text-xs text-cyan-100">Jogo 2D</span><span className="rounded-full border border-cyan-200/20 bg-cyan-300/5 px-4 py-2 text-xs text-cyan-100">Pixel art</span><span className="rounded-full border border-cyan-200/20 bg-cyan-300/5 px-4 py-2 text-xs text-cyan-100">Reflexão ambiental</span></div></div></MotionSection>
}

function Impact() {
  return <MotionSection id="impacto" className="border-b border-white/[.06] bg-[#080a0e] py-28"><div className="section-wrap"><SectionTitle eyebrow="03 — Como fizemos?" title={<>A MENSAGEM<br /><span className="text-cyan-300">DENTRO DO JOGO.</span></>} text="Usamos o desenvolvimento de jogos para aproximar o público da temática. No GameMaker, reunimos universo visual, personagem, narrativa e exploração em uma experiência 2D de pixel art. Esses elementos apresentam a proposta do SnowLands e abrem espaço para a curiosidade e a reflexão sobre o meio ambiente." /><div className="mt-14 grid gap-5 md:grid-cols-3">{approachCards.map(({ icon: Icon, title, text }, index) => <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} whileHover={{ y: -6 }} className="glass group rounded-2xl p-7 transition-colors hover:border-cyan-200/40"><div className="mb-7 grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950"><Icon size={22} /></div><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{text}</p></motion.article>)}</div></div></MotionSection>
}

function Importance() {
  const points = [
    { icon: Globe2, title: 'Entender para agir', text: 'Compreender as mudanças climáticas ajuda a reconhecer riscos, avaliar informações e perceber como escolhas humanas influenciam o ambiente.' },
    { icon: Leaf, title: 'Ecossistemas conectados', text: 'Geleiras, florestas, oceanos, animais e comunidades fazem parte de sistemas interdependentes que enfrentam alterações com o aquecimento do planeta.' },
    { icon: Gamepad2, title: 'Jogos como apoio', text: 'Um jogo não substitui a educação científica, mas pode ser uma ferramenta complementar para despertar interesse, facilitar conversas e estimular a busca por conhecimento.' },
  ]
  return <MotionSection className="border-b border-white/[.06] bg-[#0d1118] py-28"><div className="section-wrap"><SectionTitle eyebrow="04 — Por que isso importa?" title={<>CONHECER O PROBLEMA<br /><span className="text-cyan-300">MUDA A CONVERSA.</span></>} text="A conscientização sobre o aquecimento global importa porque as mudanças climáticas afetam ecossistemas, comunidades e o futuro do planeta. Valorizar a ciência e compreender esses riscos é um passo para tomar decisões mais responsáveis." /><div className="mt-14 grid gap-5 md:grid-cols-3">{points.map(({ icon: Icon, title, text }, index) => <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} whileHover={{ y: -6 }} className="glass group rounded-2xl p-7 transition-colors hover:border-cyan-200/40"><div className="mb-7 grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200 transition group-hover:bg-cyan-300 group-hover:text-slate-950"><Icon size={22} /></div><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{text}</p></motion.article>)}</div><div className="mt-10 rounded-2xl border border-cyan-200/15 bg-cyan-300/5 p-6"><p className="text-sm leading-7 text-slate-300">SnowLands busca unir entretenimento e reflexão ambiental, incentivando os jogadores a conhecerem melhor o aquecimento global por meio de uma experiência interativa. A iniciativa é educativa em sua proposta; seus resultados de conscientização não foram medidos pela equipe.</p><p className="mt-4 text-xs leading-6 text-slate-500">Para aprofundar: <a className="text-cyan-200 hover:text-white" href="https://clima.inpe.br/" target="_blank" rel="noreferrer">INPE</a>, <a className="text-cyan-200 hover:text-white" href="https://climate.nasa.gov/" target="_blank" rel="noreferrer">NASA Climate Change</a> e <a className="text-cyan-200 hover:text-white" href="https://www.ipcc.ch/report/ar6/syr/" target="_blank" rel="noreferrer">IPCC</a>.</p></div></div></MotionSection>
}

function Team() {
  const reducedMotion = useReducedMotion()
  return <section id="equipe" className="border-t border-white/[.06] bg-[#0d1118] py-28"><div className="section-wrap"><SectionTitle eyebrow="Quem está por trás do projeto" title={<>NOSSA<br />EQUIPE</>} text="Quatro integrantes, funções e contribuições que formam o time do SnowLands." /><div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{team.map((person, index) => <motion.article key={person.number} initial={reducedMotion ? false : { opacity: 0, y: 22 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={reducedMotion ? undefined : { y: -6, boxShadow: '0 18px 38px rgba(0, 0, 0, .28)' }} className="group overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#111923]/80 shadow-xl shadow-black/10 backdrop-blur-md transition-[border-color,transform,box-shadow] duration-300 hover:border-white/25 motion-reduce:transition-none"><div className={`h-1 bg-gradient-to-r ${person.accent}`} /><div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${person.tone} p-3 sm:aspect-[5/6]`}><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,.12),transparent_55%)]" /><img src={person.file} alt={`Fotografia do integrante ${person.number}`} className="relative h-full w-full rounded-[1rem] object-cover object-center transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none" /><span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/25 bg-[#111923]/75 text-xs font-bold tracking-wider text-white/90 backdrop-blur-sm">{person.number}</span></div><div className="p-5"><h3 className="text-base font-bold tracking-wide text-white">Integrante {person.number}</h3><p className="mt-1 text-[11px] uppercase tracking-[.18em] text-slate-400">Funções no projeto</p><div className="mt-5 flex flex-wrap gap-2">{person.roles.map((role) => <span key={role} className="rounded-full border border-white/10 bg-white/[.06] px-2.5 py-1.5 text-[10px] leading-4 text-slate-300 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white motion-reduce:transition-none">{role}</span>)}</div></div></motion.article>)}</div></div></section>
}

function Footer({ downloadPage = false }) {
  return <footer className="border-t border-white/[.07] bg-[#080a0e] py-9"><div className="section-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"><span className="pixel text-xs text-white">SNOW<span className="text-cyan-300">LANDS</span></span><p className="text-xs text-slate-500">Projeto desenvolvido como Trabalho de Conclusão de Curso.</p><a href={downloadPage ? '#topo-download' : '#inicio'} className="text-xs text-cyan-200 hover:text-white">Voltar ao topo ↑</a></div></footer>
}

const snowflakes = [
  { left: '7%', delay: '0s', duration: '12s', size: '8px' },
  { left: '18%', delay: '3s', duration: '15s', size: '5px' },
  { left: '31%', delay: '7s', duration: '13s', size: '7px' },
  { left: '47%', delay: '1s', duration: '17s', size: '4px' },
  { left: '63%', delay: '5s', duration: '14s', size: '8px' },
  { left: '78%', delay: '2s', duration: '16s', size: '5px' },
  { left: '91%', delay: '8s', duration: '12s', size: '6px' },
]

const installationSteps = [
  { number: '01', title: 'Baixe o jogo', text: 'Clique no botão de download e aguarde o arquivo ZIP ser baixado.', icon: Download },
  { number: '02', title: 'Extraia os arquivos', text: 'Extraia todo o conteúdo do arquivo ZIP para uma pasta no computador.', icon: PackageOpen },
  { number: '03', title: 'Inicie sua aventura', text: 'Abra o executável incluído na exportação do GameMaker para começar.', icon: Gamepad2 },
]

function DownloadPage() {
  const reducedMotion = useReducedMotion()
  return (
    <>
      <Header downloadPage />
      <main id="topo-download" className="download-page overflow-hidden">
        <section className="download-hero relative flex min-h-screen items-center overflow-hidden pt-24">
          <div className="dark-grid absolute inset-0 opacity-60" />
          <div className="download-orb absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
          <div className="snowfall pointer-events-none absolute inset-0" aria-hidden="true">
            {snowflakes.map((flake) => <span key={flake.left} className="snowflake" style={{ left: flake.left, animationDelay: flake.delay, animationDuration: flake.duration, width: flake.size, height: flake.size }} />)}
          </div>
          <div className="section-wrap relative z-10 grid w-full items-center gap-12 py-20 lg:grid-cols-[.9fr_1.1fr]">
            <motion.div initial={reducedMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="max-w-xl">
              <p className="pixel text-[10px] leading-5 text-cyan-300 sm:text-xs">UMA NOVA AVENTURA COMEÇA AQUI</p>
              <h1 className="pixel mt-7 text-3xl leading-[1.65] text-white sm:text-5xl">SNOW<span className="text-cyan-300">LANDS</span></h1>
              <p className="mt-7 max-w-lg text-lg leading-8 text-slate-300">Prepare-se para explorar um mundo congelado em uma aventura 2D cheia de descobertas.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#download" className="download-button inline-flex items-center gap-3 rounded-xl bg-cyan-300 px-6 py-4 text-xs font-extrabold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,.25)] transition hover:-translate-y-1 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white">BAIXAR SNOWLANDS <ArrowDown size={17} /></a>
                <span className="text-xs text-slate-500">Pacote de distribuição do jogo</span>
              </div>
            </motion.div>
            <motion.div initial={reducedMotion ? false : { opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .12 }} className="relative mx-auto w-full max-w-[500px]">
              <div className="download-hero-frame absolute inset-[10%] rounded-full bg-cyan-300/10 blur-3xl" />
              <div className={`penguin-stage relative mx-auto aspect-square w-[min(80vw,460px)] ${reducedMotion ? '' : 'float-slow'}`}>
                <div className="pixel-spark absolute left-[12%] top-[20%] text-cyan-200">✦</div>
                <div className="pixel-spark absolute right-[14%] top-[31%] text-blue-200">✧</div>
                <div className="absolute inset-[8%] rounded-full border border-cyan-200/10 bg-[#0b1622]/70 shadow-[inset_0_0_60px_rgba(93,220,255,.1)]" />
                <img src={images.penguin} alt="Pinguim protagonista de SnowLands" className="pixel-art relative z-10 h-full w-full object-contain p-[12%] drop-shadow-[0_24px_30px_rgba(0,0,0,.4)]" />
              </div>
            </motion.div>
          </div>
        </section>

        <MotionSection id="aventura" className="border-y border-white/[.06] bg-[#0d1118] py-24">
          <div className="section-wrap grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <SectionTitle eyebrow="Conheça a aventura" title={<>UM PEQUENO<br /><span className="text-cyan-300">EXPLORADOR.</span></>} text="Em SnowLands, um pinguim protagonista atravessa um universo gelado em busca de descobertas. A proposta do projeto combina aventura em pixel art com uma reflexão sobre cuidado e preservação ambiental." />
              <div className="mt-8 flex items-center gap-3 text-xs text-cyan-100"><Sparkles size={16} /> Uma jornada para descobrir e preservar</div>
            </div>
            <div className="relative grid min-h-[310px] place-items-center overflow-hidden rounded-3xl border border-cyan-200/15 bg-[#09131f] p-8">
              <div className="dark-grid absolute inset-0 opacity-60" />
              <img src={images.penguinSword} alt="Pinguim de SnowLands com espada" className="pixel-art relative z-10 h-64 w-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,.45)]" />
              <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[.25em] text-slate-500">Arte do projeto</span>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#080a0e] py-24">
          <div className="section-wrap">
            <SectionTitle eyebrow="Experiência de jogo" title={<>ARTE PARA<br /><span className="text-cyan-300">EXPLORAR.</span></>} text="Conheça alguns elementos visuais do universo de SnowLands. As imagens abaixo são artes do projeto, não capturas de gameplay." />
            <div className="mt-12 grid gap-5 md:grid-cols-[1.25fr_.75fr]">
              <div className="game-art-card relative min-h-[290px] overflow-hidden rounded-3xl border border-white/10 bg-[#101b29] p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(76,201,240,.2),transparent_35%)]" />
                <img src={images.penguin} alt="Arte do pinguim protagonista" className="pixel-art relative z-10 mx-auto h-64 w-full object-contain" />
                <span className="absolute bottom-5 left-6 text-[10px] uppercase tracking-[.25em] text-cyan-100/70">Protagonista</span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-1">
                <div className="game-art-card flex min-h-[135px] items-center justify-between rounded-3xl border border-white/10 bg-[#101b29] p-6">
                  <div><p className="pixel text-[9px] text-cyan-100">EQUIPAMENTO</p><p className="mt-2 text-sm text-slate-400">Itens da aventura</p></div>
                  <img src={images.sword} alt="Espada de SnowLands" className="pixel-art h-24 w-24 object-contain" />
                </div>
                <div className="game-art-card flex min-h-[135px] items-center justify-between rounded-3xl border border-white/10 bg-[#101b29] p-6">
                  <div><p className="pixel text-[9px] text-cyan-100">DETALHES</p><p className="mt-2 text-sm text-slate-400">Pixel art original</p></div>
                  <div className="flex gap-2"><img src={images.heart} alt="Ícone de coração" className="pixel-art h-12 w-12 object-contain" /><img src={images.healing} alt="Item de cura" className="pixel-art h-12 w-12 object-contain" /></div>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection id="download" className="download-section relative border-y border-cyan-200/10 bg-[#0d1118] py-28">
          <div className="section-wrap relative z-10">
            <SectionTitle eyebrow="O momento da partida" title={<>BAIXE O<br /><span className="text-cyan-300">SNOWLANDS.</span></>} text="Baixe o pacote oficial do jogo, exportado pelo GameMaker, e prepare-se para iniciar sua aventura." />
            <div className="mx-auto mt-12 max-w-xl">
              <div className="download-card glass relative overflow-hidden rounded-3xl p-7 text-center sm:p-10">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_30px_rgba(103,232,249,.12)]"><MonitorDown size={34} /></div>
                <h3 className="pixel mt-7 text-sm leading-7 text-white">SNOW<span className="text-cyan-300">LANDS</span></h3>
                <div className="mt-6 grid gap-3 border-y border-white/10 py-5 text-left text-xs sm:grid-cols-2">
                  <p><span className="text-slate-500">Formato</span><br /><strong className="text-slate-200">ZIP do jogo exportado</strong></p>
                  <p><span className="text-slate-500">Plataforma</span><br /><strong className="text-slate-200">Conforme exportação oficial</strong></p>
                </div>
                <a href="/downloads/SnowLands.zip" download="SnowLands.zip" className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 py-4 text-xs font-extrabold text-slate-950 shadow-[0_0_30px_rgba(103,232,249,.18)] transition hover:-translate-y-1 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-describedby="download-status"><Download size={17} /> BAIXAR JOGO</a>
                <p id="download-status" className="mt-4 text-xs leading-6 text-slate-400">Pacote exportado do GameMaker em <code className="text-cyan-200">public/downloads/SnowLands.zip</code>.</p>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection className="bg-[#080a0e] py-24">
          <div className="section-wrap">
            <SectionTitle eyebrow="Como instalar" title={<>TRÊS PASSOS<br /><span className="text-cyan-300">PARA COMEÇAR.</span></>} text="Quando o pacote estiver disponível, siga estas etapas para iniciar a sua aventura." />
            <div className="mt-12 grid gap-4 md:grid-cols-3">{installationSteps.map(({ number, title, text, icon: Icon }, index) => <motion.article key={number} whileHover={reducedMotion ? undefined : { y: -6 }} transition={{ duration: .2 }} className="glass rounded-2xl p-6"><div className="flex items-center justify-between"><span className="pixel text-xs text-cyan-300">{number}</span><Icon size={20} className="text-cyan-200" /></div><h3 className="mt-8 font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{text}</p></motion.article>)}</div>
            <div className="mt-8 flex gap-3 rounded-2xl border border-cyan-200/10 bg-cyan-300/5 p-5 text-xs leading-6 text-slate-400"><ArrowLeft size={16} className="mt-1 shrink-0 text-cyan-200" /> A compatibilidade depende do formato escolhido na exportação oficial do GameMaker. Nenhum sistema operacional é prometido antes dessa confirmação.</div>
          </div>
        </MotionSection>
      </main>
      <Footer downloadPage />
    </>
  )
}

export default function App() {
  if (window.location.pathname.replace(/\/$/, '') === '/download') return <DownloadPage />
  return <><Header /><main><AdventureScene /><About /><Purpose /><Mission /><Impact /><Importance /><Team /></main><Footer /></>
}
