"use client";

import { useEffect, useState } from "react";
import { site } from "../src/config/site";

const asset = (name: string) => `/web-${name}.svg`;
const roomAsset = (name: string) => ({
  bar1: "/bar1.png",
  entrada1: "/entrada1.png",
  mesinhas2: "/mesinhas2.png",
}[name] ?? asset(name));
const whatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
const destination = site.address.line1 + ", " + site.address.line2;
const mapsRoute = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
const wazeRoute = `https://waze.com/ul?q=${encodeURIComponent(destination)}&navigate=yes&utm_source=casa119`;
const uberRoute = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(destination)}`;

const rooms = [
  { id: "bar", label: "Bar", image: "bar1", kicker: "para brindar", title: "O bar que puxa a conversa.", copy: "Drinks autorais, clássicos e sem álcool para começar a noite do jeito certo." },
  { id: "casa", label: "A Casa", image: "entrada1", kicker: "para ficar", title: "Uma casa para ocupar sem pressa.", copy: "Pátio, luz baixa, plantas, música e aquele tipo de encontro que vira história." },
  { id: "comidinhas", label: "Comidinhas", image: "mesinhas2", kicker: "para dividir", title: "Comida no centro da mesa.", copy: "Porções, sandubas e sabores para acompanhar a mesa cheia e a conversa solta." },
];
const instagramPosts = [
  { image: "som-para-ficar-mais-um-pouco", tag: "agenda", title: "O que vai acontecer na Casa", copy: "shows, DJs e encontros toda semana" },
  { image: "o-bar-que-puxa-a-conversa", tag: "música", title: "Som para ficar mais um pouco", copy: "do primeiro brinde ao último refrão" },
  { image: "comida-que-chama-conversa", tag: "mesa", title: "Comida que chama conversa", copy: "feito para dividir sem cerimônia" },
  { image: "a-casa-e-feita-de-gente", tag: "comunidade", title: "A casa é feita de gente", copy: "chegue como você é" },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Mark() { return <span className="wordmark" aria-label="Casa 119">CASA <b>119</b></span>; }
function FoodMenu() { return <div className="menu-sections"><div><h3>♧ Saladas</h3><span>Salada de Cogumelos <b>R$42</b></span><span>Salada Tropical <b>R$28</b></span><span>Salada Tropical com Frango <b>R$30</b></span><span>Salada de Cabra <b>R$32</b></span></div><div><h3>◉ Sandubas <small>das 18h &agrave;s 23h</small></h3><span>Caprese Capril <b>R$18</b></span><span>Invocado <b>R$15</b></span><span>C&oacute;digo Verde <b>R$20</b></span><span>Brasa 119 <b>R$22</b></span></div><div><h3>✦ Bolinhos</h3><span>Cabra &amp; Caponata <b>R$15</b></span><span>Cogumelo &amp; Queijo <b>R$11</b></span><span>Cupim &amp; Ovo Perfeito <b>R$15</b></span><span>Cupim &amp; Queijo <b>R$18</b></span></div><div><h3>✺ Por&ccedil;&otilde;es · Molhos</h3><span>Chips da Casa <b>R$34</b></span><span>Couve-flor Apimentada <b>R$39</b></span><span>Frango Crocante <b>R$44</b></span><span>Gergelim C&iacute;trico <b>R$4</b></span><span>Verde Queimado <b>R$3</b></span><span>Holand&ecirc;s <b>R$10</b></span><span>Pesto Genov&ecirc;s <b>R$6</b></span></div></div>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<"food" | "brunch" | null>(null);
  const [active, setActive] = useState("top");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = panel ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [panel]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-45% 0px -45%" });
    ["top", ...rooms.map((room) => room.id), "brunch", "info"].forEach((id) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <button className="header-brand" onClick={() => go("top")} aria-label="Voltar ao início"><Mark /></button>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {rooms.map((room) => <button key={room.id} className={active === room.id ? "current" : ""} onClick={() => go(room.id)}>{room.label}</button>)}
        <button className={active === "brunch" ? "current" : ""} onClick={() => go("brunch")}>Brunch</button>
        <button className={active === "info" ? "current" : ""} onClick={() => go("info")}>Como chegar</button>
      </nav>
      <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">Ver programação <Arrow /></a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><span>{menuOpen ? "Fechar" : "Menu"}</span><i /></button>
    </header>

    <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`}>
      <p>Casa 119 <span>· Jundiaí</span></p>
      {rooms.map((room) => <button key={room.id} onClick={() => go(room.id)}>{room.label}<Arrow /></button>)}
      <button onClick={() => go("brunch")}>Brunch<Arrow /></button>
      <button onClick={() => go("info")}>Como chegar<Arrow /></button>
      <a href={whatsapp} target="_blank" rel="noreferrer">Ver programação <Arrow /></a>
    </div>

    <main id="conteudo">
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-panel">
          <div className="hero-meta"><span>Jundiaí · SP</span><span>Aberta para encontros</span></div>
          <Mark />
          <div className="hero-message"><p className="eyebrow">Cultura · comida · música</p><h1 id="hero-title">Chega mais.<br /><i>A casa é sua.</i></h1><p className="hero-copy">Um endereço vivo para comer bem, brindar sem pressa e encontrar o que você nem sabia que estava procurando.</p><div className="hero-actions"><a href="https://instagram.com/119acasa" target="_blank" rel="noopener noreferrer">Conheça a Casa <span>↗</span></a><a href="https://instagram.com/119acasa" target="_blank" rel="noopener noreferrer">O que está rolando <Arrow /></a></div></div>
          <p className="hero-footnote">Av. Dr. Olavo Guimarães, 119<br />Vila Arens — Jundiaí/SP</p>
        </div>
        <div className="hero-image"><img src="/hero-casa119-hq.svg" alt="Pátio aberto da Casa 119 com mesas, árvores e cadeiras" fetchPriority="high" /><div className="image-note">um lugar<br /><strong>para ficar</strong></div><div className="vertical-label">CASA 119 · DESDE SEMPRE EM BOA COMPANHIA</div></div>
      </section>

      <section className="intro-band" aria-label="Manifesto"><p className="eyebrow">A Casa por dentro</p><h2>Você não vem só para consumir.<br /><i>Você vem para fazer parte.</i></h2><p className="intro-detail">A Casa 119 mistura gastronomia, arte, música e gente em um espaço que muda conforme o dia. É bar, pátio, palco, mesa e ponto de encontro.</p></section>

      <section className="room-index" aria-label="Explore a Casa">
        <div className="section-head"><p className="eyebrow">Escolha seu cômodo</p><p className="section-count">01 — 03</p></div>
        <div className="room-grid">{rooms.map((room, index) => <button className={`room-card room-card-${index + 1}`} key={room.id} onClick={() => go(room.id)}><span className="room-number">0{index + 1}</span><img src={roomAsset(room.image)} alt={room.label === "Bar" ? "Bar da Casa 119 com balcão vermelho e estantes de madeira" : room.label === "A Casa" ? "Entrada da Casa 119 com paredes de tijolo e plantas" : "Pátio ensolarado da Casa 119"} /><span className="room-card-text"><small>{room.kicker}</small><strong>{room.label}</strong><span>{room.copy}</span><em>Explorar <Arrow /></em></span></button>)}</div>
      </section>

      <section id="bar" className="feature feature-bar" aria-labelledby="bar-title"><div className="feature-image"><img src={asset("o-bar-que-puxa-a-conversa")} alt="Balcão do bar da Casa 119 com paredes vermelhas e marcenaria" /><span className="image-caption">Bar da Casa 119 · 05</span></div><div className="feature-content"><p className="eyebrow">01 · Para brindar</p><h2 id="bar-title">O bar que puxa<br /><i>a conversa.</i></h2><p>Clássicos, criações autorais e opções sem álcool. O bar acompanha o ritmo da Casa — do primeiro oi ao último brinde.</p><div className="feature-list"><span><b>01</b>Banzeiro</span><span><b>02</b>Paloma 119</span><span><b>03</b>Goiaba em Chamas</span><span><b>04</b>Spritz 119</span></div><p className="hours"><b>{site.hours.bar}</b><span>Consulte a carta no balcão</span></p><a className="text-link" href={site.menuUrl} onClick={(event) => site.menuUrl === "#" && event.preventDefault()}>Espiar a carta <Arrow /></a></div></section>

      <section id="casa" className="feature feature-casa" aria-labelledby="casa-title"><div className="feature-content"><p className="eyebrow">02 · Para ficar</p><h2 id="casa-title">Uma casa para<br /><i>ocupar sem pressa.</i></h2><p>Pátio aberto, luz baixa, plantas, música e uma arquitetura que convida a desacelerar. A melhor parte é que cada visita encontra uma Casa diferente.</p><div className="quote">“Chegue para conhecer.<br /><i>Fique pelo que acontece.</i>”</div><a className="text-link" href={whatsapp} target="_blank" rel="noreferrer">Ver o que está rolando <Arrow /></a></div><div className="feature-image"><img src={asset("uma-casa-para-ocupar-sem-pressa")} alt="Corredor de entrada da Casa 119 com tijolos brancos, plantas e luminárias" /><span className="image-caption">A entrada · 03</span></div></section>

      <section id="comidinhas" className="food-section" aria-labelledby="food-title"><div className="food-heading"><p className="eyebrow">03 · Para dividir</p><h2 id="food-title">Comida no<br /><i>centro da mesa.</i></h2><p>Porções, sandubas e sabores para acompanhar a mesa cheia e a conversa solta.</p><button className="text-link" onClick={() => setPanel("food")}>Conhecer as comidinhas <Arrow /></button></div><div className="food-image"><img src={asset("comida-que-chama-conversa")} alt="Comida da Casa 119 para compartilhar" /><span>feito para<br /><strong>compartilhar</strong></span></div><div className="food-notes"><div><small>Para começar</small><b>Chips da Casa</b><span>batatas · banana-da-terra</span></div><div><small>Para dividir</small><b>Cabra &amp; Caponata</b><span>bolinho · tomate · conforto</span></div><div><small>Para matar a fome</small><b>Brasa 119</b><span>sanduíche · cupim · brasa</span></div></div></section>

      <section id="brunch" className="brunch-section" aria-labelledby="brunch-title"><div className="brunch-image"><img src={asset("a-tarde-tem-outro-sabor")} alt="Pátio da Casa 119 durante o dia" /><span className="round-stamp">brunch<br /><b>15—18h</b></span></div><div className="brunch-copy"><p className="eyebrow">04 · Para desacelerar</p><h2 id="brunch-title">A tarde tem<br /><i>outro sabor.</i></h2><p>Um intervalo gostoso entre o dia e a noite: bruschettas, café, conversa e a Casa banhada de sol.</p><p className="brunch-time"><b>{site.hours.brunch}</b><span>De quarta a domingo</span></p><button className="text-link" onClick={() => setPanel("brunch")}>Ver o brunch <Arrow /></button></div></section>

      <section className="instagram-section" aria-labelledby="instagram-title"><div className="instagram-head"><div><p className="eyebrow">Do feed para a Casa</p><h2 id="instagram-title">Sempre tem<br /><i>algo acontecendo.</i></h2></div><a className="text-link" href="https://instagram.com/119acasa" target="_blank" rel="noreferrer">Acompanhar no Instagram <Arrow /></a></div><div className="instagram-grid">{instagramPosts.map((post, index) => <div className={`post-card post-card-${index + 1}`} key={post.title}><img src={asset(post.image)} alt="" /><span className="post-wash" /><div className="post-copy"><small>{post.tag} · 119</small><strong>{post.title}</strong><span>{post.copy}</span></div><b className="post-index">0{index + 1}</b></div>)}</div></section>

      <section id="info" className="info-section" aria-labelledby="info-title"><div className="info-heading"><p className="eyebrow">Antes de chegar</p><h2 id="info-title">A porta<br /><i>está aberta.</i></h2></div><div className="info-grid"><article><span>Horários</span><strong>15h — 22h</strong><p>Aberta todos os dias, exceto terça-feira.<br />Brunch das 15h às 18h.</p></article><article><span>Endereço</span><strong>Av. Dr. Olavo<br />Guimarães, 119</strong><p>Vila Arens · Jundiaí/SP</p><a href={site.mapUrl} target="_blank" rel="noreferrer">Abrir no mapa <Arrow /></a></article><article><span>Programação</span><strong>Tem novidade<br />toda semana.</strong><p>Eventos, noites temáticas e encontros especiais.</p><a href={whatsapp} target="_blank" rel="noreferrer">Falar no WhatsApp <Arrow /></a></article></div><div className="map-card"><div className="map-copy"><p className="eyebrow">Como chegar</p><h3>Encontre a Casa<br /><i>sem perder o caminho.</i></h3><p>Av. Dr. Olavo Guimarães, 119<br />Vila Arens · Jundiaí/SP</p><div className="transport-actions"><a className="map-button" aria-label="Solicitar Uber para a Casa 119" href={uberRoute} target="_blank" rel="noopener noreferrer">Ir de Uber <Arrow /></a><a className="map-button" aria-label="Abrir rota para a Casa 119 no Waze" href={wazeRoute} target="_blank" rel="noopener noreferrer">Abrir no Waze <Arrow /></a><a className="map-button" aria-label="Abrir rota para a Casa 119 no Google Maps" href={mapsRoute} target="_blank" rel="noopener noreferrer">Abrir no Maps <Arrow /></a></div></div><iframe title="Mapa da Casa 119" src="https://www.google.com/maps?q=Av.+Dr.+Olavo+Guimar%C3%A3es,+119,+Jundia%C3%AD&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></section>
    </main>

    {panel && <div className="detail-overlay" role="dialog" aria-modal="true" aria-label={panel === "food" ? "Comidinhas da Casa 119" : "Informações do brunch"} onClick={() => setPanel(null)}><div className="detail-panel" onClick={(event) => event.stopPropagation()}><button className="detail-close" onClick={() => setPanel(null)} aria-label="Fechar">×</button>{panel === "food" ? <><p className="eyebrow">Comidinhas · Casa 119</p><h2>Para colocar<br /><i>no centro da mesa.</i></h2><FoodMenu /></> : <><p className="eyebrow">Brunch · Casa 119</p><h2>A tarde tem<br /><i>outro sabor.</i></h2><p className="detail-copy">Um intervalo gostoso entre o dia e a noite, com café, bruschettas, pratos para compartilhar e a Casa banhada de sol.</p><div className="detail-list"><span>☼ <b>{site.hours.brunch}</b></span><span>♧ <b>De quarta a domingo</b></span><span>✦ <b>Café, bruschettas e conversa</b></span></div><a className="detail-cta" href="https://instagram.com/119acasa" target="_blank" rel="noopener noreferrer">Ver novidades no Instagram <Arrow /></a></>}</div></div>}<footer className="site-footer"><div className="footer-top"><img src="/logo-casa119.svg" alt="Casa 119" /><p>Uma Casa feita de encontros.<br /><span>Jundiaí · SP</span></p><a href="https://instagram.com/119acasa" target="_blank" rel="noreferrer">Instagram <Arrow /></a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <Arrow /></a></div><div className="footer-bottom"><small>© Casa 119 · Feito para viver sem pressa.</small><small>Casa 119</small></div></footer>
  </>;
}







