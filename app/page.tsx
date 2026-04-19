"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://amirimendwikcrhxhrbg.supabase.co";
const SUPABASE_KEY = "sb_publishable_rVzCIrZ5BrAw_jS4ix33Pw_GCW1c9eq";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const T = {
  tr: {
    title: "C-LINE Açık Artırma Evi",
    subtitle: "Erasmus+ KA210-SCH Projesi",
    auctions: "Açık Artırmalar",
    currentBid: "Güncel Teklif",
    leader: "Lider",
    bidCount: "teklif",
    yourName: "Adınız Soyadınız",
    yourPhone: "Telefon",
    yourEmail: "E-posta",
    bidAmount: "Teklif Miktarı (₺)",
    submitBid: "Teklif Ver",
    submitting: "Gönderiliyor...",
    gdpr: "Kişisel verilerimin artırma süreci için kullanılmasına onay veriyorum.",
    notify: "Artırma sonucunda e-posta bildirimi almak istiyorum.",
    minBid: "Minimum teklif",
    noProducts: "Henüz ürün eklenmemiştir.",
    successMsg: "Teklifiniz alındı! E-posta adresinize onay gönderildi.",
    errorMsg: "Hata oluştu. Lütfen tekrar deneyin.",
    minBidError: "Teklifiniz mevcut tekliften yüksek olmalıdır.",
    footer: "C-LINE Projesi Türkiye Ulusal Ajansı tarafından desteklenmiştir.",
    partners: "Proje Ortakları: Türkiye · Letonya · İtalya",
    status_active: "Canlı",
    status_upcoming: "Yakında",
    status_closed: "Kapandı",
    selectLot: "Teklif vermek için bir lot seçin",
    lot: "Lot",
  },
  en: {
    title: "C-LINE Auction House",
    subtitle: "Erasmus+ KA210-SCH Project",
    auctions: "Live Auctions",
    currentBid: "Current Bid",
    leader: "Leader",
    bidCount: "bids",
    yourName: "Full Name",
    yourPhone: "Phone",
    yourEmail: "Email",
    bidAmount: "Bid Amount (₺)",
    submitBid: "Place Bid",
    submitting: "Submitting...",
    gdpr: "I consent to my personal data being used for the auction process.",
    notify: "I want to receive email notifications about this auction.",
    minBid: "Minimum bid",
    noProducts: "No products added yet.",
    successMsg: "Your bid has been received! A confirmation email has been sent.",
    errorMsg: "An error occurred. Please try again.",
    minBidError: "Your bid must be higher than the current bid.",
    footer: "C-LINE Project is supported by the Turkish National Agency.",
    partners: "Project Partners: Turkey · Latvia · Italy",
    status_active: "Live",
    status_upcoming: "Upcoming",
    status_closed: "Closed",
    selectLot: "Select a lot to place a bid",
    lot: "Lot",
  },
  it: {
    title: "C-LINE Casa d'Aste",
    subtitle: "Progetto Erasmus+ KA210-SCH",
    auctions: "Aste in Corso",
    currentBid: "Offerta Attuale",
    leader: "Leader",
    bidCount: "offerte",
    yourName: "Nome e Cognome",
    yourPhone: "Telefono",
    yourEmail: "Email",
    bidAmount: "Importo Offerta (₺)",
    submitBid: "Fai un'Offerta",
    submitting: "Invio...",
    gdpr: "Acconsento al trattamento dei miei dati personali per il processo d'asta.",
    notify: "Voglio ricevere notifiche email sull'asta.",
    minBid: "Offerta minima",
    noProducts: "Nessun prodotto aggiunto.",
    successMsg: "La tua offerta è stata ricevuta! È stata inviata un'email di conferma.",
    errorMsg: "Si è verificato un errore. Riprova.",
    minBidError: "La tua offerta deve essere superiore all'offerta attuale.",
    footer: "Il Progetto C-LINE è supportato dall'Agenzia Nazionale Turca.",
    partners: "Partner del Progetto: Turchia · Lettonia · Italia",
    status_active: "In Corso",
    status_upcoming: "Prossimamente",
    status_closed: "Chiusa",
    selectLot: "Seleziona un lotto per fare un'offerta",
    lot: "Lotto",
  },
  lt: {
    title: "C-LINE Izsoļu Nams",
    subtitle: "Erasmus+ KA210-SCH Projekts",
    auctions: "Aktīvās Izsoles",
    currentBid: "Pašreizējā Cena",
    leader: "Līderis",
    bidCount: "piedāvājumi",
    yourName: "Vārds Uzvārds",
    yourPhone: "Tālrunis",
    yourEmail: "E-pasts",
    bidAmount: "Solījuma Summa (₺)",
    submitBid: "Solīt",
    submitting: "Sūta...",
    gdpr: "Piekrītu savu personas datu izmantošanai izsoles procesā.",
    notify: "Vēlos saņemt e-pasta paziņojumus par izsoli.",
    minBid: "Minimālais solījums",
    noProducts: "Vēl nav pievienotu produktu.",
    successMsg: "Jūsu solījums ir saņemts! Uz e-pastu nosūtīts apstiprinājums.",
    errorMsg: "Radās kļūda. Lūdzu, mēģiniet vēlreiz.",
    minBidError: "Jūsu solījumam jābūt augstākam par pašreizējo.",
    footer: "C-LINE projektu atbalsta Turcijas Nacionālā aģentūra.",
    partners: "Projekta partneri: Turcija · Latvija · Itālija",
    status_active: "Aktīva",
    status_upcoming: "Drīzumā",
    status_closed: "Slēgta",
    selectLot: "Izvēlieties lotu, lai solītu",
    lot: "Lots",
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

export default function Home() {
  const [lang, setLang] = useState<Lang>("tr");
  const [products, setProducts] = useState<Product[]>([]);
  const [bids, setBids] = useState<Record<string, Bid[]>>({});
  const [selected, setSelected] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", amount: "", gdpr: false, notify: true });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const t = T[lang];

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*").order("created_at");
    if (data) {
      setProducts(data);
      data.forEach((p: Product) => fetchBids(p.id));
    }
  }

  async function fetchBids(productId: string) {
    const { data } = await supabase.from("bids").select("*").eq("product_id", productId).order("amount", { ascending: false });
    if (data) setBids(prev => ({ ...prev, [productId]: data }));
  }

  function getName(p: Product) {
    return p[`name_${lang}` as keyof Product] as string || p.name_tr;
  }
  function getDesc(p: Product) {
    return p[`description_${lang}` as keyof Product] as string || p.description_tr;
  }

  function getTopBid(productId: string) {
    const b = bids[productId];
    if (!b || b.length === 0) return null;
    return b[0];
  }

  function getCurrentAmount(p: Product) {
    const top = getTopBid(p.id);
    return top ? top.amount : p.start_bid;
  }

  async function handleSubmit() {
    if (!selected) return;
    if (!form.name || !form.phone || !form.email || !form.amount) {
      setMsg({ text: "Lütfen tüm alanları doldurun.", ok: false });
      return;
    }
    if (!form.gdpr) {
      setMsg({ text: "KVKK onayı gereklidir.", ok: false });
      return;
    }
    const amt = parseFloat(form.amount);
    const current = getCurrentAmount(selected);
    if (amt <= current) {
      setMsg({ text: t.minBidError, ok: false });
      return;
    }
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.from("bids").insert({
      product_id: selected.id,
      bidder_name: form.name,
      bidder_phone: form.phone,
      bidder_email: form.email,
      amount: amt,
    });
    setLoading(false);
    if (error) {
      setMsg({ text: t.errorMsg, ok: false });
    } else {
      setMsg({ text: t.successMsg, ok: true });
      setForm({ name: "", phone: "", email: "", amount: "", gdpr: false, notify: true });
      fetchBids(selected.id);
    }
  }

  const statusColor: Record<string, string> = {
    active: "#2C4A3E",
    upcoming: "#1A1612",
    closed: "#888",
  };
  const statusLabel = (s: string) => {
    if (s === "active") return t.status_active;
    if (s === "upcoming") return t.status_upcoming;
    return t.status_closed;
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF8F4", minHeight: "100vh", color: "#1A1612" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* LANG BAR */}
      <div style={{ background: "#1A1612", display: "flex", justifyContent: "flex-end", padding: "8px 32px", gap: 16 }}>
        {(["tr", "en", "it", "lt"] as Lang[]).map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: lang === l ? "#C9A96E" : "rgba(255,255,255,0.4)",
            fontSize: 11, letterSpacing: 2, textTransform: "uppercase",
            borderBottom: lang === l ? "1px solid #C9A96E" : "1px solid transparent",
            paddingBottom: 2, fontFamily: "'DM Sans', sans-serif"
          }}>{l.toUpperCase()}</button>
        ))}
      </div>

      {/* HEADER */}
      <div style={{ background: "#1A1612", padding: "40px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: "#C9A96E", textTransform: "uppercase", marginBottom: 10 }}>Erasmus+ KA210-SCH</div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, color: "#fff", letterSpacing: 2 }}>
          C-LINE <em style={{ color: "#C9A96E" }}>Exclusive</em>
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "rgba(255,255,255,0.6)", marginTop: -4 }}>{t.title}</div>
        <div style={{ width: 60, height: 1, background: "#C9A96E", margin: "16px auto 0", opacity: 0.5 }} />
        <div style={{ marginTop: 16, fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
          Türkiye · Letonya · İtalya
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>

        {/* SECTION TITLE */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300 }}>{t.auctions}</span>
          <div style={{ flex: 1, height: 1, background: "#D4C9B5" }} />
          <span style={{ fontSize: 10, letterSpacing: 2, color: "#8A8078", textTransform: "uppercase" }}>
            {products.filter(p => p.status === "active").length} aktif
          </span>
        </div>

        {products.length === 0 && (
          <p style={{ color: "#8A8078", fontSize: 14 }}>{t.noProducts}</p>
        )}

        {/* LOTS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24, marginBottom: 48 }}>
          {products.map(p => {
            const topBid = getTopBid(p.id);
            const current = getCurrentAmount(p);
            const isSelected = selected?.id === p.id;
            return (
              <div key={p.id} onClick={() => { setSelected(p); setMsg(null); }}
                style={{
                  background: "#fff", border: isSelected ? "2px solid #C9A96E" : "1px solid #D4C9B5",
                  cursor: "pointer", transition: "transform .2s",
                  transform: isSelected ? "translateY(-2px)" : undefined,
                  boxShadow: isSelected ? "0 8px 32px rgba(26,22,18,0.12)" : undefined,
                }}>
                {/* IMAGE */}
                <div style={{ height: 180, background: "linear-gradient(135deg,#e8e0d4,#d5cec5)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  {p.image_url
                    ? <img src={p.image_url} alt={getName(p)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: "#9a9088" }}>Görsel Yükleniyor</span>
                  }
                  <span style={{
                    position: "absolute", top: 10, left: 10, fontSize: 9, letterSpacing: 2,
                    textTransform: "uppercase", padding: "3px 8px",
                    background: statusColor[p.status] || "#888", color: "#a8d4c4"
                  }}>
                    {p.status === "active" && <span style={{ display: "inline-block", width: 6, height: 6, background: "#4CAF50", borderRadius: "50%", marginRight: 4 }} />}
                    {statusLabel(p.status)}
                  </span>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: "#8A8078", textTransform: "uppercase", marginBottom: 4 }}>
                    {t.lot} {products.indexOf(p) + 1}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, marginBottom: 8, lineHeight: 1.3 }}>{getName(p)}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #D4C9B5", paddingTop: 10 }}>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: 1, color: "#8A8078", textTransform: "uppercase", marginBottom: 2 }}>{t.currentBid}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#8B6914" }}>₺ {current.toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "#8A8078" }}>{bids[p.id]?.length || 0} {t.bidCount}</div>
                      {topBid && <div style={{ fontSize: 11, color: "#8A8078" }}>{topBid.bidder_name.split(" ")[0]}</div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BID FORM */}
        <div style={{ background: "#F0EBE0", border: "1px solid #D4C9B5", padding: "32px 36px", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 300, marginBottom: 4 }}>
            {selected ? `${t.lot} ${products.indexOf(selected) + 1} — ${getName(selected)}` : t.selectLot}
          </div>
          {selected && <div style={{ fontSize: 12, color: "#8A8078", marginBottom: 24 }}>{getDesc(selected)}</div>}

          {selected && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                {[
                  { key: "name", label: t.yourName, type: "text", placeholder: "Ali Yılmaz" },
                  { key: "phone", label: t.yourPhone, type: "tel", placeholder: "+90 5xx xxx xx xx" },
                  { key: "email", label: t.yourEmail, type: "email", placeholder: "ornek@mail.com" },
                ].map(f => (
                  <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#8A8078" }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      value={form[f.key as keyof typeof form] as string}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      style={{ background: "#fff", border: "1px solid #D4C9B5", padding: "10px 12px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }}
                    />
                  </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#8A8078" }}>{t.bidAmount}</label>
                  <div style={{ display: "flex" }}>
                    <span style={{ background: "#8B6914", color: "#fff", padding: "10px 12px", fontSize: 14, fontWeight: 500 }}>₺</span>
                    <input type="number" placeholder={`Min. ${(getCurrentAmount(selected) + 1).toLocaleString()}`}
                      value={form.amount}
                      onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))}
                      style={{ flex: 1, border: "1px solid #D4C9B5", borderLeft: "none", padding: "10px 12px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid #D4C9B5", paddingTop: 16, marginBottom: 20 }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: "#8A8078", lineHeight: 1.6, cursor: "pointer" }}>
                  <input type="checkbox" checked={form.gdpr} onChange={e => setForm(p => ({ ...p, gdpr: e.target.checked }))} style={{ marginTop: 3, accentColor: "#8B6914" }} />
                  {t.gdpr}
                </label>
                <label style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 12, color: "#8A8078", lineHeight: 1.6, cursor: "pointer", marginTop: 10 }}>
                  <input type="checkbox" checked={form.notify} onChange={e => setForm(p => ({ ...p, notify: e.target.checked }))} style={{ marginTop: 3, accentColor: "#8B6914" }} />
                  {t.notify}
                </label>
              </div>

              <button onClick={handleSubmit} disabled={loading}
                style={{
                  background: loading ? "#888" : "#1A1612", color: "#C9A96E",
                  border: "none", padding: "13px 36px", fontSize: 11, letterSpacing: 3,
                  textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                {loading ? t.submitting : t.submitBid} →
              </button>

              {msg && (
                <div style={{ marginTop: 16, padding: "12px 16px", background: msg.ok ? "#EAF3DE" : "#FCEBEB", border: `1px solid ${msg.ok ? "#97C459" : "#F09595"}`, fontSize: 13, color: msg.ok ? "#3B6D11" : "#A32D2D" }}>
                  {msg.text}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#1A1612", padding: "32px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#fff", marginBottom: 8 }}>C-LINE</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>{t.footer}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>{t.partners}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 16, letterSpacing: 1 }}>C-LINE PROJECT © 2026</div>
      </div>
    </div>
  );
}
