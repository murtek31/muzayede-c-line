"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://amirimendwikcrhxhrbg.supabase.co";
const SUPABASE_KEY = "sb_publishable_rVzCIrZ5BrAw_jS4ix33Pw_GCW1c9eq";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const T = {
  tr: {
    title: "C-LINE Açık Artırma Evi",
    auctions: "Açık Artırmalar",
    currentBid: "Güncel Teklif",
    bidCount: "teklif",
    yourName: "Adınız Soyadınız",
    yourPhone: "Telefon",
    yourEmail: "E-posta",
    bidAmount: "Teklif Miktarı (₺)",
    submitBid: "Teklif Ver",
    submitting: "Gönderiliyor...",
    gdpr: "Kişisel verilerimin artırma süreci için kullanılmasına onay veriyorum.",
    notify: "Artırma sonucunda e-posta bildirimi almak istiyorum.",
    noProducts: "Henüz ürün eklenmemiştir.",
    successMsg: "✓ Teklifiniz alındı! E-posta adresinize onay gönderildi.",
    errorMsg: "Hata oluştu. Lütfen tekrar deneyin.",
    minBidError: "Teklifiniz mevcut tekliften yüksek olmalıdır.",
    footer: "C-LINE Projesi Türkiye Ulusal Ajansı tarafından desteklenmiştir.",
    partners: "Proje Ortakları: Türkiye · Letonya · İtalya",
    status_active: "Canlı", status_upcoming: "Yakında", status_closed: "Kapandı",
    selectLot: "Teklif vermek için bir lot seçin", lot: "Lot",
  },
  en: {
    title: "C-LINE Auction House",
    auctions: "Live Auctions",
    currentBid: "Current Bid",
    bidCount: "bids",
    yourName: "Full Name", yourPhone: "Phone", yourEmail: "Email",
    bidAmount: "Bid Amount (₺)", submitBid: "Place Bid", submitting: "Submitting...",
    gdpr: "I consent to my personal data being used for the auction process.",
    notify: "I want to receive email notifications about this auction.",
    noProducts: "No products added yet.",
    successMsg: "✓ Your bid has been received! A confirmation email has been sent.",
    errorMsg: "An error occurred. Please try again.",
    minBidError: "Your bid must be higher than the current bid.",
    footer: "C-LINE Project is supported by the Turkish National Agency.",
    partners: "Project Partners: Turkey · Latvia · Italy",
    status_active: "Live", status_upcoming: "Upcoming", status_closed: "Closed",
    selectLot: "Select a lot to place a bid", lot: "Lot",
  },
  it: {
    title: "C-LINE Casa d'Aste",
    auctions: "Aste in Corso",
    currentBid: "Offerta Attuale",
    bidCount: "offerte",
    yourName: "Nome e Cognome", yourPhone: "Telefono", yourEmail: "Email",
    bidAmount: "Importo Offerta (₺)", submitBid: "Fai un'Offerta", submitting: "Invio...",
    gdpr: "Acconsento al trattamento dei miei dati personali per il processo d'asta.",
    notify: "Voglio ricevere notifiche email sull'asta.",
    noProducts: "Nessun prodotto aggiunto.",
    successMsg: "✓ La tua offerta è stata ricevuta! È stata inviata un'email di conferma.",
    errorMsg: "Si è verificato un errore. Riprova.",
    minBidError: "La tua offerta deve essere superiore all'offerta attuale.",
    footer: "Il Progetto C-LINE è supportato dall'Agenzia Nazionale Turca.",
    partners: "Partner: Turchia · Lettonia · Italia",
    status_active: "In Corso", status_upcoming: "Prossimamente", status_closed: "Chiusa",
    selectLot: "Seleziona un lotto per fare un'offerta", lot: "Lotto",
  },
  lt: {
    title: "C-LINE Izsoļu Nams",
    auctions: "Aktīvās Izsoles",
    currentBid: "Pašreizējā Cena",
    bidCount: "piedāvājumi",
    yourName: "Vārds Uzvārds", yourPhone: "Tālrunis", yourEmail: "E-pasts",
    bidAmount: "Solījuma Summa (₺)", submitBid: "Solīt", submitting: "Sūta...",
    gdpr: "Piekrītu savu personas datu izmantošanai izsoles procesā.",
    notify: "Vēlos saņemt e-pasta paziņojumus par izsoli.",
    noProducts: "Vēl nav pievienotu produktu.",
    successMsg: "✓ Jūsu solījums ir saņemts! Uz e-pastu nosūtīts apstiprinājums.",
    errorMsg: "Radās kļūda. Lūdzu, mēģiniet vēlreiz.",
    minBidError: "Jūsu solījumam jābūt augstākam par pašreizējo.",
    footer: "C-LINE projektu atbalsta Turcijas Nacionālā aģentūra.",
    partners: "Projekta partneri: Turcija · Latvija · Itālija",
    status_active: "Aktīva", status_upcoming: "Drīzumā", status_closed: "Slēgta",
    selectLot: "Izvēlieties lotu, lai solītu", lot: "Lots",
  },
};

type Lang = "tr" | "en" | "it" | "lt";

interface Product {
  id: string;
  name_tr: string; name_en: string; name_lt: string; name_it: string;
  description_tr: string; description_en: string; description_lt: string; description_it: string;
  image_url: string;
  start_bid: number;
  end_time: string;
  status: string;
}

interface Bid {
  id: string;
  product_id: string;
  bidder_name: string;
  bidder_email: string;
  amount: number;
  created_at: string;
}

const C = {
  orange: "#F4A96A", orangeLight: "#FDE8D4", orangeDark: "#C46A20",
  teal: "#5BBCB0",   tealLight: "#D4F0ED",   tealDark: "#2A7A72",
  blue: "#7AACDA",   blueLight: "#D6EBFA",   blueDark: "#2E6A9E",
  yellow: "#F5D36A", yellowLight: "#FDF5D4", yellowDark: "#8A6800",
  green: "#8DC98A",  greenLight: "#DFF2DE",  greenDark: "#2E6A2A",
  bg: "#FDFAF5", bgWarm: "#FEF6EC", ink: "#2D2418",
  inkLight: "#6B5A47", inkMuted: "#A09080", white: "#FFFFFF", border: "#E8DDD0",
};

const cardAccents = [
  { bg: C.orangeLight, dot: C.orange, badge: C.orangeDark, price: C.orangeDark },
  { bg: C.tealLight,   dot: C.teal,   badge: C.tealDark,   price: C.tealDark },
  { bg: C.blueLight,   dot: C.blue,   badge: C.blueDark,   price: C.blueDark },
  { bg: C.yellowLight, dot: C.yellow, badge: C.yellowDark, price: C.yellowDark },
  { bg: C.greenLight,  dot: C.green,  badge: C.greenDark,  price: C.greenDark },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const [products, setProducts] = useState<Product[]>([]);
  const [bids, setBids] = useState<Record<string, Bid[]>>({});
  const [selected, setSelected] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", amount: "", gdpr: false, notify: true });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const t = T[lang];

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*").order("created_at");
    if (data) { setProducts(data); data.forEach((p: Product) => fetchBids(p.id)); }
  }

  async function fetchBids(productId: string) {
    const { data } = await supabase.from("bids").select("*").eq("product_id", productId).order("amount", { ascending: false });
    if (data) setBids(prev => ({ ...prev, [productId]: data }));
  }

  function getName(p: Product) { return p[`name_${lang}` as keyof Product] as string || p.name_tr; }
  function getDesc(p: Product) { return p[`description_${lang}` as keyof Product] as string || p.description_tr; }
  function getTopBid(pid: string) { const b = bids[pid]; return (!b || !b.length) ? null : b[0]; }
  function getCurrentAmount(p: Product) { const top = getTopBid(p.id); return top ? top.amount : p.start_bid; }

  async function handleSubmit() {
    if (!selected) return;
    if (!form.name || !form.phone || !form.email || !form.amount) { setMsg({ text: "Lütfen tüm alanları doldurun.", ok: false }); return; }
    if (!form.gdpr) { setMsg({ text: "KVKK onayı gereklidir.", ok: false }); return; }
    const amt = parseFloat(form.amount);
    if (amt <= getCurrentAmount(selected)) { setMsg({ text: t.minBidError, ok: false }); return; }
    setLoading(true); setMsg(null);
    const { error } = await supabase.from("bids").insert({
      product_id: selected.id, bidder_name: form.name,
      bidder_phone: form.phone, bidder_email: form.email, amount: amt,
    });
    setLoading(false);
    if (error) { setMsg({ text: t.errorMsg, ok: false }); }
    else {
      setMsg({ text: t.successMsg, ok: true });
      setForm({ name: "", phone: "", email: "", amount: "", gdpr: false, notify: true });
      fetchBids(selected.id);
    }
  }

  const statusLabel = (s: string) => s === "active" ? t.status_active : s === "upcoming" ? t.status_upcoming : t.status_closed;

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: C.bg, minHeight: "100vh", color: C.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet" />

      {/* LANG BAR */}
      <div style={{ background: C.ink, display: "flex", justifyContent: "flex-end", padding: "8px 32px", gap: 8 }}>
        {(["tr","en","it","lt"] as Lang[]).map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            background: lang === l ? C.orange : "transparent",
            border: "none", cursor: "pointer",
            color: lang === l ? C.ink : "rgba(255,255,255,0.4)",
            fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
            padding: "3px 12px", borderRadius: 20,
            fontFamily: "'Nunito', sans-serif", fontWeight: 700,
          }}>{l.toUpperCase()}</button>
        ))}
      </div>

      {/* HEADER */}
      <div style={{ position: "relative", overflow: "hidden", background: C.ink, padding: "52px 32px 60px", textAlign: "center" }}>
        {/* Watercolor blobs */}
        <svg style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none" }} viewBox="0 0 1200 380" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="100" cy="80"  rx="200" ry="130" fill={C.orange} opacity="0.18" />
          <ellipse cx="320" cy="200" rx="240" ry="150" fill={C.yellow} opacity="0.15" />
          <ellipse cx="680" cy="60"  rx="280" ry="160" fill={C.teal}   opacity="0.15" />
          <ellipse cx="980" cy="170" rx="220" ry="140" fill={C.blue}   opacity="0.18" />
          <ellipse cx="1150" cy="60" rx="160" ry="110" fill={C.green}  opacity="0.16" />
          <ellipse cx="500" cy="340" rx="200" ry="80"  fill={C.orange} opacity="0.1" />
        </svg>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(244,169,106,0.18)", border:"1px solid rgba(244,169,106,0.35)", borderRadius:20, padding:"4px 18px", marginBottom:18 }}>
            <span style={{ width:6, height:6, background:C.orange, borderRadius:"50%", display:"inline-block" }}/>
            <span style={{ fontSize:10, letterSpacing:3, color:C.orange, textTransform:"uppercase" }}>Erasmus+ KA210-SCH</span>
          </div>
          <div style={{ fontFamily:"'Playfair Display', serif", fontSize:52, fontWeight:400, color:C.white, letterSpacing:1, lineHeight:1.1 }}>
            C-LINE <em style={{ color:C.orange }}>Exclusive</em>
          </div>
          <div style={{ fontFamily:"'Playfair Display', serif", fontSize:22, color:"rgba(255,255,255,0.6)", marginTop:8 }}>{t.title}</div>
          <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:20 }}>
            {[C.orange, C.teal, C.blue, C.yellow, C.green].map((c,i) => (
              <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.85 }}/>
            ))}
          </div>
          <div style={{ marginTop:12, fontSize:11, color:"rgba(255,255,255,0.28)", letterSpacing:2, textTransform:"uppercase" }}>Türkiye · Letonya · İtalya</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth:980, margin:"0 auto", padding:"44px 24px" }}>

        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
          <span style={{ fontFamily:"'Playfair Display', serif", fontSize:30, fontWeight:400 }}>{t.auctions}</span>
          <div style={{ flex:1, height:3, borderRadius:3, background:`linear-gradient(90deg,${C.orange},${C.teal},${C.blue},${C.yellow},transparent)`, opacity:0.55 }}/>
          <span style={{ fontSize:10, letterSpacing:2, color:C.inkMuted, textTransform:"uppercase" }}>
            {products.filter(p=>p.status==="active").length} aktif
          </span>
        </div>

        {products.length === 0 && <p style={{ color:C.inkMuted, fontSize:14 }}>{t.noProducts}</p>}

        {/* LOTS GRID */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px,1fr))", gap:24, marginBottom:52 }}>
          {products.map((p, idx) => {
            const acc = cardAccents[idx % cardAccents.length];
            const topBid = getTopBid(p.id);
            const current = getCurrentAmount(p);
            const isSel = selected?.id === p.id;
            return (
              <div key={p.id} onClick={() => { setSelected(p); setMsg(null); }} style={{
                background: C.white,
                border: isSel ? `2px solid ${acc.dot}` : `1px solid ${C.border}`,
                borderRadius: 16, cursor:"pointer", overflow:"hidden",
                transition:"transform .2s, box-shadow .2s",
                transform: isSel ? "translateY(-4px)" : undefined,
                boxShadow: isSel ? `0 12px 36px ${acc.dot}50` : "0 2px 10px rgba(0,0,0,0.06)",
              }}>
                {/* IMAGE */}
                <div style={{ height:190, background:acc.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                  {/* Mini watercolor blobs in card */}
                  <svg style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.4 }} viewBox="0 0 270 190">
                    <ellipse cx="220" cy="30"  rx="80" ry="55"  fill={acc.dot} opacity="0.35"/>
                    <ellipse cx="40"  cy="160" rx="65" ry="45"  fill={acc.dot} opacity="0.25"/>
                    <ellipse cx="130" cy="95"  rx="50" ry="35"  fill={acc.dot} opacity="0.15"/>
                  </svg>
                  {p.image_url
                    ? <img src={p.image_url} alt={getName(p)} style={{ width:"100%",height:"100%",objectFit:"cover",position:"absolute",top:0,left:0 }}/>
                    : <span style={{ fontFamily:"'Playfair Display', serif", fontSize:13, color:acc.badge, position:"relative", zIndex:1, opacity:0.7 }}>Görsel Yükleniyor</span>
                  }
                  <div style={{
                    position:"absolute", top:12, left:12, zIndex:2,
                    background: p.status==="active" ? acc.dot : "rgba(0,0,0,0.4)",
                    color: C.white, fontSize:9, letterSpacing:2, textTransform:"uppercase",
                    padding:"4px 12px", borderRadius:20, display:"flex", alignItems:"center", gap:5, fontWeight:700
                  }}>
                    {p.status==="active" && <span style={{ width:5,height:5,background:C.white,borderRadius:"50%",display:"inline-block" }}/>}
                    {statusLabel(p.status)}
                  </div>
                </div>
                <div style={{ padding:"16px 18px" }}>
                  <div style={{ fontSize:10, letterSpacing:2, color:C.inkMuted, textTransform:"uppercase", marginBottom:4 }}>{t.lot} {idx+1}</div>
                  <div style={{ fontFamily:"'Playfair Display', serif", fontSize:20, marginBottom:12, lineHeight:1.3 }}>{getName(p)}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", borderTop:`1px solid ${C.border}`, paddingTop:12 }}>
                    <div>
                      <div style={{ fontSize:10, letterSpacing:1, color:C.inkMuted, textTransform:"uppercase", marginBottom:2 }}>{t.currentBid}</div>
                      <div style={{ fontFamily:"'Playfair Display', serif", fontSize:24, color:acc.price, fontWeight:600 }}>₺ {current.toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ background:acc.bg, color:acc.badge, fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:12 }}>
                        {bids[p.id]?.length || 0} {t.bidCount}
                      </div>
                      {topBid && <div style={{ fontSize:11, color:C.inkMuted, marginTop:4 }}>{topBid.bidder_name.split(" ")[0]}</div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BID FORM */}
        <div style={{ position:"relative", overflow:"hidden", background:C.bgWarm, border:`1px solid ${C.border}`, borderRadius:20, padding:"36px 40px", marginBottom:40 }}>
          <svg style={{ position:"absolute",top:0,right:0,width:300,height:300,pointerEvents:"none",opacity:0.18 }} viewBox="0 0 300 300">
            <ellipse cx="200" cy="80" rx="150" ry="110" fill={C.orange}/>
            <ellipse cx="250" cy="200" rx="100" ry="80" fill={C.yellow}/>
          </svg>
          <svg style={{ position:"absolute",bottom:0,left:0,width:220,height:220,pointerEvents:"none",opacity:0.14 }} viewBox="0 0 220 220">
            <ellipse cx="60" cy="160" rx="120" ry="90" fill={C.teal}/>
          </svg>

          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontFamily:"'Playfair Display', serif", fontSize:26, fontWeight:400, marginBottom:6 }}>
              {selected ? `${t.lot} ${products.indexOf(selected)+1} — ${getName(selected)}` : t.selectLot}
            </div>
            {selected && <div style={{ fontSize:13, color:C.inkLight, marginBottom:28, lineHeight:1.6 }}>{getDesc(selected)}</div>}

            {selected && (
              <>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                  {[
                    { key:"name",  label:t.yourName,  type:"text",   ph:"Ali Yılmaz" },
                    { key:"phone", label:t.yourPhone, type:"tel",    ph:"+90 5xx xxx xx xx" },
                    { key:"email", label:t.yourEmail, type:"email",  ph:"ornek@mail.com" },
                  ].map(f => (
                    <div key={f.key} style={{ display:"flex", flexDirection:"column", gap:6 }}>
                      <label style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:C.inkMuted, fontWeight:700 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.ph}
                        value={form[f.key as keyof typeof form] as string}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        style={{ background:C.white, border:`1.5px solid ${C.border}`, borderRadius:10, padding:"11px 14px", fontSize:14, fontFamily:"'Nunito', sans-serif", outline:"none", color:C.ink }}
                      />
                    </div>
                  ))}
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <label style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:C.inkMuted, fontWeight:700 }}>{t.bidAmount}</label>
                    <div style={{ display:"flex" }}>
                      <span style={{ background:C.orange, color:C.white, padding:"11px 14px", fontSize:16, fontWeight:700, borderRadius:"10px 0 0 10px" }}>₺</span>
                      <input type="number" placeholder={`Min. ${(getCurrentAmount(selected)+1).toLocaleString()}`}
                        value={form.amount}
                        onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))}
                        style={{ flex:1, border:`1.5px solid ${C.border}`, borderLeft:"none", borderRadius:"0 10px 10px 0", padding:"11px 14px", fontSize:14, fontFamily:"'Nunito', sans-serif", outline:"none", color:C.ink }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ borderTop:`1px dashed ${C.border}`, paddingTop:16, marginBottom:22 }}>
                  {[{ key:"gdpr", label:t.gdpr }, { key:"notify", label:t.notify }].map(f => (
                    <label key={f.key} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:12, color:C.inkLight, lineHeight:1.7, cursor:"pointer", marginBottom:10 }}>
                      <input type="checkbox"
                        checked={form[f.key as "gdpr"|"notify"]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.checked }))}
                        style={{ marginTop:3, accentColor:C.orange, width:15, height:15 }}
                      />
                      {f.label}
                    </label>
                  ))}
                </div>

                <button onClick={handleSubmit} disabled={loading} style={{
                  background: loading ? C.inkMuted : `linear-gradient(135deg,${C.orange},${C.teal})`,
                  color:C.white, border:"none", padding:"13px 40px",
                  fontSize:13, letterSpacing:2, textTransform:"uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily:"'Nunito', sans-serif", fontWeight:700, borderRadius:12,
                }}>
                  {loading ? t.submitting : `${t.submitBid} →`}
                </button>

                {msg && (
                  <div style={{
                    marginTop:16, padding:"12px 18px", borderRadius:10,
                    background: msg.ok ? C.tealLight : "#FFECEC",
                    border:`1px solid ${msg.ok ? C.teal : "#F4A0A0"}`,
                    fontSize:13, color: msg.ok ? C.tealDark : "#C02020", fontWeight:600
                  }}>{msg.text}</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ position:"relative", overflow:"hidden", background:C.ink, padding:"44px 32px", textAlign:"center" }}>
        <svg style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.12 }} viewBox="0 0 1200 200" preserveAspectRatio="xMidYMid slice">
          <ellipse cx="100"  cy="100" rx="200" ry="120" fill={C.orange}/>
          <ellipse cx="400"  cy="50"  rx="180" ry="100" fill={C.teal}/>
          <ellipse cx="700"  cy="150" rx="220" ry="110" fill={C.blue}/>
          <ellipse cx="1000" cy="60"  rx="190" ry="100" fill={C.yellow}/>
          <ellipse cx="1150" cy="140" rx="160" ry="90"  fill={C.green}/>
        </svg>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ fontFamily:"'Playfair Display', serif", fontSize:28, color:C.white, marginBottom:12 }}>C-LINE</div>
          <div style={{ display:"flex", justifyContent:"center", gap:10, marginBottom:16 }}>
            {[C.orange, C.teal, C.blue, C.yellow, C.green].map((c,i) => (
              <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.9 }}/>
            ))}
          </div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.38)", lineHeight:1.8 }}>{t.footer}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.22)", marginTop:4 }}>{t.partners}</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.16)", marginTop:16, letterSpacing:1 }}>C-LINE PROJECT © 2026</div>
        </div>
      </div>
    </div>
  );
}
