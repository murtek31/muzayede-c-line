"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://amirimendwikcrhxhrbg.supabase.co";
const SUPABASE_KEY = "sb_publishable_rVzCIrZ5BrAw_jS4ix33Pw_GCW1c9eq";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const T = {
  tr: {
    title: "C-LINE Açık Artırma Evi", auctions: "Açık Artırmalar",
    currentBid: "Güncel Teklif", bidCount: "teklif",
    yourName: "Ad Soyad *", yourPhone: "Telefon *", yourEmail: "E-posta *",
    bidAmount: "Teklif Miktarı (€) *", submitBid: "Teklif Ver", submitting: "Gönderiliyor...",
    gdpr: "Kişisel verilerimin açık artırma süreci için işlenmesine onay veriyorum. *",
    notify: "Artırma sonucunda (kazanma/geride kalma) e-posta bildirimi almak istiyorum.",
    noProducts: "Henüz ürün eklenmemiştir.",
    successMsg: "✓ Teklifiniz alındı! E-posta adresinize onay gönderildi.",
    errorMsg: "Hata oluştu. Lütfen tekrar deneyin.",
    minBidError: "Teklifiniz mevcut en yüksek tekliften fazla olmalıdır.",
    fillAll: "Lütfen zorunlu alanları (*) doldurunuz.",
    gdprRequired: "Devam etmek için KVKK onayı gereklidir.",
    footer1: "Bu proje Türkiye Ulusal Ajansı tarafından desteklenmiştir.",
    footer2: "Erasmus+ KA210-SCH — A Common Language for Integrative Entrepreneurship (C-LINE)",
    footer3: "Bakırköy Bilim ve Sanat Merkezi koordinatörlüğünde; Türkiye, Letonya ve İtalya ortaklığıyla yürütülmektedir.",
    status_active: "Canlı", status_upcoming: "Yakında", status_closed: "Kapandı",
    selectLot: "Teklif vermek için yukarıdan bir lot seçin ↑", lot: "Lot",
    required: "* zorunlu alan", partners: "Türkiye · Letonya · İtalya",
    timeLeft: "Kalan Süre", days: "gün", hours: "sa", mins: "dk", secs: "sn",
    ended: "Artırma Sona Erdi", noTimer: "Süresiz",
  },
  en: {
    title: "C-LINE Auction House", auctions: "Live Auctions",
    currentBid: "Current Bid", bidCount: "bids",
    yourName: "Full Name *", yourPhone: "Phone *", yourEmail: "Email *",
    bidAmount: "Bid Amount (€) *", submitBid: "Place Bid", submitting: "Submitting...",
    gdpr: "I consent to my personal data being processed for the auction. *",
    notify: "I want to receive email notifications (win/outbid) for this auction.",
    noProducts: "No products added yet.",
    successMsg: "✓ Your bid has been received! A confirmation email has been sent.",
    errorMsg: "An error occurred. Please try again.",
    minBidError: "Your bid must be higher than the current highest bid.",
    fillAll: "Please fill in all required fields (*).",
    gdprRequired: "GDPR consent is required to continue.",
    footer1: "This project is supported by the Turkish National Agency.",
    footer2: "Erasmus+ KA210-SCH — A Common Language for Integrative Entrepreneurship (C-LINE)",
    footer3: "Coordinated by Bakırköy Science and Art Centre; partnership of Turkey, Latvia and Italy.",
    status_active: "Live", status_upcoming: "Upcoming", status_closed: "Closed",
    selectLot: "Select a lot above to place a bid ↑", lot: "Lot",
    required: "* required field", partners: "Turkey · Latvia · Italy",
    timeLeft: "Time Left", days: "d", hours: "h", mins: "m", secs: "s",
    ended: "Auction Ended", noTimer: "Open",
  },
  it: {
    title: "C-LINE Casa d'Aste", auctions: "Aste in Corso",
    currentBid: "Offerta Attuale", bidCount: "offerte",
    yourName: "Nome e Cognome *", yourPhone: "Telefono *", yourEmail: "Email *",
    bidAmount: "Importo Offerta (€) *", submitBid: "Fai un'Offerta", submitting: "Invio...",
    gdpr: "Acconsento al trattamento dei miei dati personali per l'asta. *",
    notify: "Voglio ricevere notifiche email (vincita/superata) per questa asta.",
    noProducts: "Nessun prodotto aggiunto.",
    successMsg: "✓ La tua offerta è stata ricevuta! Email di conferma inviata.",
    errorMsg: "Si è verificato un errore. Riprova.",
    minBidError: "La tua offerta deve essere superiore all'offerta attuale.",
    fillAll: "Compila tutti i campi obbligatori (*).",
    gdprRequired: "Il consenso GDPR è obbligatorio per continuare.",
    footer1: "Questo progetto è supportato dall'Agenzia Nazionale Turca.",
    footer2: "Erasmus+ KA210-SCH — A Common Language for Integrative Entrepreneurship (C-LINE)",
    footer3: "Coordinato dal Centro Scientifico e Artistico di Bakırköy; partnership tra Turchia, Lettonia e Italia.",
    status_active: "In Corso", status_upcoming: "Prossimamente", status_closed: "Chiusa",
    selectLot: "Seleziona un lotto qui sopra per fare un'offerta ↑", lot: "Lotto",
    required: "* campo obbligatorio", partners: "Turchia · Lettonia · Italia",
    timeLeft: "Tempo Rimasto", days: "g", hours: "h", mins: "m", secs: "s",
    ended: "Asta Terminata", noTimer: "Aperto",
  },
  lv: {
    title: "C-LINE Izsoļu Nams", auctions: "Aktīvās Izsoles",
    currentBid: "Pašreizējā Cena", bidCount: "piedāvājumi",
    yourName: "Vārds Uzvārds *", yourPhone: "Tālrunis *", yourEmail: "E-pasts *",
    bidAmount: "Solījuma Summa (€) *", submitBid: "Solīt", submitting: "Sūta...",
    gdpr: "Piekrītu savu personas datu apstrādei izsoles procesā. *",
    notify: "Vēlos saņemt e-pasta paziņojumus (uzvara/pārsolīts) par izsoli.",
    noProducts: "Vēl nav pievienotu produktu.",
    successMsg: "✓ Jūsu solījums ir saņemts! Apstiprinājums nosūtīts uz e-pastu.",
    errorMsg: "Radās kļūda. Lūdzu, mēģiniet vēlreiz.",
    minBidError: "Jūsu solījumam jābūt augstākam par pašreizējo.",
    fillAll: "Lūdzu, aizpildiet visus obligātos laukus (*).",
    gdprRequired: "Lai turpinātu, nepieciešama GDPR piekrišana.",
    footer1: "Šo projektu atbalsta Turcijas Nacionālā aģentūra.",
    footer2: "Erasmus+ KA210-SCH — A Common Language for Integrative Entrepreneurship (C-LINE)",
    footer3: "Koordinē Bakırköy Zinātnes un mākslas centrs; Turcijas, Latvijas un Itālijas partnerība.",
    status_active: "Aktīva", status_upcoming: "Drīzumā", status_closed: "Slēgta",
    selectLot: "Izvēlieties lotu augstāk, lai solītu ↑", lot: "Lots",
    required: "* obligāts lauks", partners: "Turcija · Latvija · Itālija",
    timeLeft: "Atlikušais Laiks", days: "d", hours: "h", mins: "min", secs: "s",
    ended: "Izsole Beigusies", noTimer: "Atvērts",
  },
};

type Lang = "tr" | "en" | "it" | "lv";

interface Product {
  id: string;
  name_tr: string; name_en: string; name_lv: string; name_it: string;
  description_tr: string; description_en: string; description_lv: string; description_it: string;
  image_url: string; start_bid: number; status: string; end_time: string;
}
interface Bid { id: string; product_id: string; bidder_name: string; amount: number; }

const C = {
  orange: "#F4A96A", orangeLight: "#FDE8D4", orangeDark: "#C46A20",
  teal: "#5BBCB0", tealLight: "#D4F0ED", tealDark: "#2A7A72",
  blue: "#7AACDA", blueLight: "#D6EBFA", blueDark: "#2E6A9E",
  yellow: "#F5D36A", yellowLight: "#FDF5D4", yellowDark: "#8A6800",
  green: "#8DC98A", greenLight: "#DFF2DE", greenDark: "#2E6A2A",
  pink: "#F4A0C0", pinkLight: "#FDE0EC", pinkDark: "#A02060",
  bg: "#FDFAF5", bgWarm: "#FEF6EC", ink: "#2D2418",
  inkLight: "#6B5A47", inkMuted: "#A09080", white: "#FFFFFF", border: "#E8DDD0",
};

const cardAccents = [
  { bg: C.orangeLight, dot: C.orange, badge: C.orangeDark, price: C.orangeDark },
  { bg: C.tealLight, dot: C.teal, badge: C.tealDark, price: C.tealDark },
  { bg: C.blueLight, dot: C.blue, badge: C.blueDark, price: C.blueDark },
  { bg: C.yellowLight, dot: C.yellow, badge: C.yellowDark, price: C.yellowDark },
  { bg: C.greenLight, dot: C.green, badge: C.greenDark, price: C.greenDark },
  { bg: C.pinkLight, dot: C.pink, badge: C.pinkDark, price: C.pinkDark },
];

const FlagTR = () => (
  <svg width="32" height="22" viewBox="0 0 32 22" style={{ borderRadius: 3, display: "block" }}>
    <rect width="32" height="22" fill="#E30A17"/>
    <circle cx="13" cy="11" r="5.5" fill="#fff"/>
    <circle cx="14.8" cy="11" r="4.3" fill="#E30A17"/>
    <polygon points="20,11 18.2,12.5 18.8,10.3 17,9 19.3,9 20,6.8 20.7,9 23,9 21.2,10.3 21.8,12.5" fill="#fff"/>
  </svg>
);
const FlagLV = () => (
  <svg width="32" height="22" viewBox="0 0 32 22" style={{ borderRadius: 3, display: "block" }}>
    <rect width="32" height="22" fill="#9E3039"/>
    <rect width="32" height="6.6" y="7.7" fill="#fff"/>
  </svg>
);
const FlagIT = () => (
  <svg width="32" height="22" viewBox="0 0 32 22" style={{ borderRadius: 3, display: "block" }}>
    <rect width="32" height="22" fill="#CE2B37"/>
    <rect width="21.4" height="22" fill="#fff"/>
    <rect width="10.7" height="22" fill="#009246"/>
  </svg>
);
const ErasmusLogo = () => (
  <svg width="120" height="80" viewBox="0 0 120 80" style={{ display: "block" }}>
    <rect width="80" height="53" x="20" y="0" rx="3" fill="#003399"/>
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i * 30 - 90) * Math.PI / 180;
      const cx = 60 + 17 * Math.cos(a), cy = 26 + 17 * Math.sin(a);
      return <polygon key={i} points={`${cx},${cy-3.5} ${cx+1.1},${cy-1} ${cx+3.3},${cy-1} ${cx+1.7},${cy+1} ${cx+2.2},${cy+3.2} ${cx},${cy+1.8} ${cx-2.2},${cy+3.2} ${cx-1.7},${cy+1} ${cx-3.3},${cy-1} ${cx-1.1},${cy-1}`} fill="#FFDD00"/>;
    })}
    <text x="60" y="70" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="bold" fill="#003399">Erasmus+</text>
  </svg>
);

function Countdown({ endTime, t }: { endTime: string; t: typeof T.tr }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0, ended: false });
  const calc = useCallback(() => {
    const diff = new Date(endTime).getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, ended: true };
    return { d: Math.floor(diff/86400000), h: Math.floor((diff%86400000)/3600000), m: Math.floor((diff%3600000)/60000), s: Math.floor((diff%60000)/1000), ended: false };
  }, [endTime]);
  useEffect(() => {
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  if (timeLeft.ended) return (
    <div style={{ background:"#FFECEC", border:"1px solid #F4A0A0", borderRadius:8, padding:"6px 12px", fontSize:11, color:"#C02020", fontWeight:700, textAlign:"center" }}>{t.ended}</div>
  );
  return (
    <div style={{ display:"flex", gap:4, alignItems:"center" }}>
      <div style={{ fontSize:9, color:C.inkMuted, textTransform:"uppercase", letterSpacing:1, marginRight:2 }}>{t.timeLeft}:</div>
      {[{v:timeLeft.d,l:t.days},{v:timeLeft.h,l:t.hours},{v:timeLeft.m,l:t.mins},{v:timeLeft.s,l:t.secs}].map(({v,l}) => (
        <div key={l} style={{ background:C.ink, color:C.white, borderRadius:5, padding:"3px 6px", minWidth:32, textAlign:"center" }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:600, lineHeight:1 }}>{String(v).padStart(2,"0")}</div>
          <div style={{ fontSize:8, opacity:0.5, letterSpacing:1 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const [products, setProducts] = useState<Product[]>([]);
  const [bids, setBids] = useState<Record<string, Bid[]>>({});
  const [selected, setSelected] = useState<Product | null>(null);
  const [form, setForm] = useState({ name:"", phone:"", email:"", amount:"", gdpr:false, notify:true });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text:string; ok:boolean } | null>(null);
  const t = T[lang];

  useEffect(() => { fetchProducts(); }, []);
  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*").order("created_at");
    if (data) { setProducts(data); data.forEach((p: Product) => fetchBids(p.id)); }
  }
  async function fetchBids(pid: string) {
    const { data } = await supabase.from("bids").select("*").eq("product_id", pid).order("amount", { ascending:false });
    if (data) setBids(prev => ({ ...prev, [pid]:data }));
  }
  function getName(p: Product) { return (p[`name_${lang}` as keyof Product] as string) || p.name_tr; }
  function getDesc(p: Product) { return (p[`description_${lang}` as keyof Product] as string) || p.description_tr; }
  function getTopBid(pid: string) { const b = bids[pid]; return (!b || !b.length) ? null : b[0]; }
  function getCurrentAmount(p: Product) { const top = getTopBid(p.id); return top ? top.amount : p.start_bid; }

  async function handleSubmit() {
    if (!selected) return;
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.amount) { setMsg({ text:t.fillAll, ok:false }); return; }
    if (!form.gdpr) { setMsg({ text:t.gdprRequired, ok:false }); return; }
    const amt = parseFloat(form.amount);
    if (amt <= getCurrentAmount(selected)) { setMsg({ text:t.minBidError, ok:false }); return; }
    setLoading(true); setMsg(null);
    const { error } = await supabase.from("bids").insert({ product_id:selected.id, bidder_name:form.name.trim(), bidder_phone:form.phone.trim(), bidder_email:form.email.trim(), amount:amt });
    setLoading(false);
    if (error) { setMsg({ text:t.errorMsg, ok:false }); }
    else { setMsg({ text:t.successMsg, ok:true }); setForm({ name:"", phone:"", email:"", amount:"", gdpr:false, notify:true }); fetchBids(selected.id); }
  }

  const statusLabel = (s: string) => s==="active" ? t.status_active : s==="upcoming" ? t.status_upcoming : t.status_closed;
  const statusColor = (s: string) => s==="active" ? C.teal : s==="upcoming" ? C.blue : "#999";

  return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:C.bg, minHeight:"100vh", color:C.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet"/>

      {/* TOP BAR */}
      <div style={{ background:C.ink, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 32px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <FlagTR/><FlagLV/><FlagIT/>
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.3)", letterSpacing:1, marginLeft:4 }}>TR · LV · IT</span>
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {(["tr","en","it","lv"] as Lang[]).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ background:lang===l?C.orange:"transparent", border:"none", cursor:"pointer", color:lang===l?C.ink:"rgba(255,255,255,0.4)", fontSize:11, letterSpacing:2, textTransform:"uppercase", padding:"4px 12px", borderRadius:20, fontFamily:"'Nunito',sans-serif", fontWeight:700 }}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <div style={{ position:"relative", overflow:"hidden", background:C.ink, padding:"48px 32px 56px", textAlign:"center" }}>
        <svg style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none" }} viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="100" cy="80" rx="200" ry="130" fill={C.orange} opacity="0.18"/>
          <ellipse cx="320" cy="200" rx="240" ry="150" fill={C.yellow} opacity="0.14"/>
          <ellipse cx="680" cy="60" rx="280" ry="160" fill={C.teal} opacity="0.14"/>
          <ellipse cx="980" cy="170" rx="220" ry="140" fill={C.blue} opacity="0.16"/>
          <ellipse cx="1150" cy="50" rx="160" ry="110" fill={C.green} opacity="0.14"/>
        </svg>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(244,169,106,0.18)", border:"1px solid rgba(244,169,106,0.35)", borderRadius:20, padding:"5px 18px", marginBottom:18 }}>
            <span style={{ width:6,height:6,background:C.orange,borderRadius:"50%",display:"inline-block" }}/>
            <span style={{ fontSize:10, letterSpacing:3, color:C.orange, textTransform:"uppercase" }}>Erasmus+ KA210-SCH</span>
          </div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:52, fontWeight:400, color:C.white, letterSpacing:1, lineHeight:1.1 }}>C-LINE <em style={{ color:C.orange }}>Exclusive</em></div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"rgba(255,255,255,0.6)", marginTop:8 }}>{t.title}</div>
          <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:20 }}>
            {[C.orange,C.teal,C.blue,C.yellow,C.green,C.pink].map((c,i)=><div key={i} style={{ width:10,height:10,borderRadius:"50%",background:c,opacity:0.85 }}/>)}
          </div>
          <div style={{ marginTop:12, fontSize:11, color:"rgba(255,255,255,0.28)", letterSpacing:2, textTransform:"uppercase" }}>{t.partners}</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"44px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:400 }}>{t.auctions}</span>
          <div style={{ flex:1, height:3, borderRadius:3, background:`linear-gradient(90deg,${C.orange},${C.teal},${C.blue},${C.yellow},${C.green},transparent)`, opacity:0.55 }}/>
          <span style={{ fontSize:10, letterSpacing:2, color:C.inkMuted, textTransform:"uppercase" }}>{products.filter(p=>p.status==="active").length} aktif</span>
        </div>

        {products.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 0", color:C.inkMuted }}>
            <div style={{ fontSize:40, marginBottom:16 }}>🎨</div>
            <p style={{ fontSize:15 }}>{t.noProducts}</p>
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:20, marginBottom:52 }}>
          {products.map((p, idx) => {
            const acc = cardAccents[idx % cardAccents.length];
            const topBid = getTopBid(p.id);
            const current = getCurrentAmount(p);
            const isSel = selected?.id === p.id;
            const desc = getDesc(p);
            return (
              <div key={p.id} onClick={() => { setSelected(p); setMsg(null); window.scrollTo({ top:9999, behavior:"smooth" }); }}
                style={{ background:C.white, border:isSel?`2px solid ${acc.dot}`:`1px solid ${C.border}`, borderRadius:16, cursor:"pointer", overflow:"hidden", transition:"transform .2s,box-shadow .2s", transform:isSel?"translateY(-4px)":undefined, boxShadow:isSel?`0 12px 36px ${acc.dot}55`:"0 2px 10px rgba(0,0,0,0.06)" }}>
                {/* GÖRSEL */}
                <div style={{ height:170, background:acc.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                  <svg style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.45 }} viewBox="0 0 240 170">
                    <ellipse cx="200" cy="25" rx="75" ry="55" fill={acc.dot} opacity="0.35"/>
                    <ellipse cx="35" cy="150" rx="65" ry="45" fill={acc.dot} opacity="0.25"/>
                  </svg>
                  {p.image_url && p.image_url.startsWith("http")
                    ? <img src={p.image_url} alt={getName(p)} style={{ width:"100%",height:"100%",objectFit:"cover",position:"absolute",top:0,left:0 }}/>
                    : <span style={{ fontSize:24, position:"relative", zIndex:1, opacity:0.4 }}>🎨</span>
                  }
                  <div style={{ position:"absolute",top:10,left:10,zIndex:2,background:statusColor(p.status),color:C.white,fontSize:9,letterSpacing:2,textTransform:"uppercase",padding:"3px 10px",borderRadius:20,display:"flex",alignItems:"center",gap:5,fontWeight:700 }}>
                    {p.status==="active" && <span style={{ width:5,height:5,background:C.white,borderRadius:"50%",display:"inline-block" }}/>}
                    {statusLabel(p.status)}
                  </div>
                  {isSel && <div style={{ position:"absolute",top:10,right:10,zIndex:2,background:acc.dot,color:C.white,fontSize:9,letterSpacing:1,textTransform:"uppercase",padding:"3px 8px",borderRadius:20,fontWeight:700 }}>✓ Seçili</div>}
                </div>

                {/* KART İÇERİĞİ */}
                <div style={{ padding:"14px 16px" }}>
                  <div style={{ fontSize:10,letterSpacing:2,color:C.inkMuted,textTransform:"uppercase",marginBottom:3 }}>{t.lot} {idx+1}</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, marginBottom:6, lineHeight:1.3 }}>{getName(p)}</div>

                  {/* AÇIKLAMA — yeni eklenen kısım */}
                  {desc && (
                    <div style={{ fontSize:12, color:C.inkLight, lineHeight:1.55, marginBottom:8, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" } as React.CSSProperties}>
                      {desc}
                    </div>
                  )}

                  {/* GERİ SAYIM */}
                  {p.end_time && p.status==="active" && (
                    <div style={{ marginBottom:8 }}><Countdown endTime={p.end_time} t={t}/></div>
                  )}
                  {!p.end_time && p.status==="active" && (
                    <div style={{ fontSize:10, color:C.inkMuted, marginBottom:8 }}>⏳ {t.noTimer}</div>
                  )}

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", borderTop:`1px solid ${C.border}`, paddingTop:10 }}>
                    <div>
                      <div style={{ fontSize:9,letterSpacing:1,color:C.inkMuted,textTransform:"uppercase",marginBottom:2 }}>{t.currentBid}</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:acc.price, fontWeight:600 }}>€ {current.toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ background:acc.bg, color:acc.badge, fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:12 }}>{bids[p.id]?.length||0} {t.bidCount}</div>
                      {topBid && <div style={{ fontSize:10,color:C.inkMuted,marginTop:3 }}>{topBid.bidder_name.split(" ")[0]}</div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BID FORM */}
        <div style={{ position:"relative", overflow:"hidden", background:C.bgWarm, border:`1px solid ${C.border}`, borderRadius:20, padding:"36px 40px", marginBottom:40 }}>
          <svg style={{ position:"absolute",top:0,right:0,width:280,height:280,pointerEvents:"none",opacity:0.15 }} viewBox="0 0 280 280">
            <ellipse cx="200" cy="70" rx="140" ry="100" fill={C.orange}/>
            <ellipse cx="240" cy="200" rx="100" ry="80" fill={C.yellow}/>
          </svg>
          <svg style={{ position:"absolute",bottom:0,left:0,width:200,height:200,pointerEvents:"none",opacity:0.12 }} viewBox="0 0 200 200">
            <ellipse cx="50" cy="160" rx="120" ry="90" fill={C.teal}/>
          </svg>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:400, marginBottom:4 }}>
              {selected ? `${t.lot} ${products.indexOf(selected)+1} — ${getName(selected)}` : t.selectLot}
            </div>
            {selected && getDesc(selected) && <div style={{ fontSize:13,color:C.inkLight,marginBottom:24,lineHeight:1.6 }}>{getDesc(selected)}</div>}
            {!selected && <div style={{ color:C.inkMuted,fontSize:13,marginTop:8 }}>👆 {t.selectLot}</div>}
            {selected && (
              <>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                  {[
                    { key:"name", label:t.yourName, type:"text", ph:"Ali Yılmaz" },
                    { key:"phone", label:t.yourPhone, type:"tel", ph:"+90 5xx xxx xx xx" },
                    { key:"email", label:t.yourEmail, type:"email", ph:"ornek@mail.com" },
                  ].map(f => (
                    <div key={f.key} style={{ display:"flex",flexDirection:"column",gap:6 }}>
                      <label style={{ fontSize:11,letterSpacing:1,textTransform:"uppercase",color:C.inkMuted,fontWeight:700 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.ph} required value={form[f.key as keyof typeof form] as string} onChange={e=>setForm(prev=>({...prev,[f.key]:e.target.value}))} style={{ background:C.white,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"11px 14px",fontSize:14,fontFamily:"'Nunito',sans-serif",outline:"none",color:C.ink }}/>
                    </div>
                  ))}
                  <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                    <label style={{ fontSize:11,letterSpacing:1,textTransform:"uppercase",color:C.inkMuted,fontWeight:700 }}>{t.bidAmount}</label>
                    <div style={{ display:"flex" }}>
                      <span style={{ background:C.orange,color:C.white,padding:"11px 14px",fontSize:16,fontWeight:700,borderRadius:"10px 0 0 10px" }}>€</span>
                      <input type="number" min="0" placeholder={`Min. ${(getCurrentAmount(selected)+1).toLocaleString()}`} value={form.amount} onChange={e=>setForm(prev=>({...prev,amount:e.target.value}))} style={{ flex:1,border:`1.5px solid ${C.border}`,borderLeft:"none",borderRadius:"0 10px 10px 0",padding:"11px 14px",fontSize:14,fontFamily:"'Nunito',sans-serif",outline:"none",color:C.ink }}/>
                    </div>
                  </div>
                </div>
                <div style={{ borderTop:`1px dashed ${C.border}`,paddingTop:16,marginBottom:8 }}>
                  <label style={{ display:"flex",alignItems:"flex-start",gap:10,fontSize:12,color:C.ink,lineHeight:1.7,cursor:"pointer",marginBottom:10,fontWeight:600 }}>
                    <input type="checkbox" required checked={form.gdpr} onChange={e=>setForm(p=>({...p,gdpr:e.target.checked}))} style={{ marginTop:3,accentColor:C.orange,width:16,height:16 }}/>{t.gdpr}
                  </label>
                  <label style={{ display:"flex",alignItems:"flex-start",gap:10,fontSize:12,color:C.inkLight,lineHeight:1.7,cursor:"pointer",marginBottom:16 }}>
                    <input type="checkbox" checked={form.notify} onChange={e=>setForm(p=>({...p,notify:e.target.checked}))} style={{ marginTop:3,accentColor:C.teal,width:16,height:16 }}/>{t.notify}
                  </label>
                  <div style={{ fontSize:11,color:C.inkMuted }}>{t.required}</div>
                </div>
                <button onClick={handleSubmit} disabled={loading} style={{ background:loading?C.inkMuted:`linear-gradient(135deg,${C.orange},${C.teal})`,color:C.white,border:"none",padding:"14px 44px",fontSize:13,letterSpacing:2,textTransform:"uppercase",cursor:loading?"not-allowed":"pointer",fontFamily:"'Nunito',sans-serif",fontWeight:700,borderRadius:12,marginTop:8 }}>
                  {loading?t.submitting:`${t.submitBid} →`}
                </button>
                {msg && <div style={{ marginTop:16,padding:"12px 18px",borderRadius:10,background:msg.ok?C.tealLight:"#FFECEC",border:`1px solid ${msg.ok?C.teal:"#F4A0A0"}`,fontSize:13,color:msg.ok?C.tealDark:"#C02020",fontWeight:600 }}>{msg.text}</div>}
              </>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position:"relative",overflow:"hidden",background:C.ink,padding:"52px 32px 40px" }}>
        <svg style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.1 }} viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="100" cy="150" rx="200" ry="120" fill={C.orange}/>
          <ellipse cx="400" cy="50" rx="180" ry="100" fill={C.teal}/>
          <ellipse cx="700" cy="220" rx="220" ry="110" fill={C.blue}/>
          <ellipse cx="1000" cy="80" rx="190" ry="100" fill={C.yellow}/>
          <ellipse cx="1150" cy="200" rx="160" ry="90" fill={C.green}/>
        </svg>
        <div style={{ position:"relative",zIndex:1,maxWidth:900,margin:"0 auto" }}>
          <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:48,marginBottom:36,flexWrap:"wrap" }}>
            <ErasmusLogo/>
            <div style={{ width:1,height:80,background:"rgba(255,255,255,0.15)" }}/>
            <div style={{ display:"flex",gap:20,alignItems:"center" }}>
              {[{Flag:FlagTR,label:"TÜRKİYE"},{Flag:FlagLV,label:"LETONYA"},{Flag:FlagIT,label:"İTALYA"}].map(({Flag,label})=>(
                <div key={label} style={{ textAlign:"center" }}><Flag/><div style={{ fontSize:9,color:"rgba(255,255,255,0.4)",marginTop:5,letterSpacing:1 }}>{label}</div></div>
              ))}
            </div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Playfair Display',serif",fontSize:26,color:C.white,marginBottom:12 }}>C-LINE</div>
            <div style={{ display:"flex",justifyContent:"center",gap:8,marginBottom:20 }}>
              {[C.orange,C.teal,C.blue,C.yellow,C.green,C.pink].map((c,i)=><div key={i} style={{ width:8,height:8,borderRadius:"50%",background:c,opacity:0.9 }}/>)}
            </div>
            <div style={{ fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.9,maxWidth:600,margin:"0 auto" }}>
              <div style={{ marginBottom:6 }}>{t.footer2}</div>
              <div style={{ fontSize:12,color:"rgba(255,255,255,0.35)",marginBottom:6 }}>{t.footer3}</div>
              <div style={{ fontSize:11,color:"rgba(255,255,255,0.28)" }}>{t.footer1}</div>
            </div>
            <div style={{ marginTop:24,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.08)",fontSize:10,color:"rgba(255,255,255,0.18)",letterSpacing:1 }}>C-LINE PROJECT © 2026 — c-line.vercel.app</div>
          </div>
        </div>
      </div>
    </div>
  );
}
