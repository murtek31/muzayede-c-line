"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://amirimendwikcrhxhrbg.supabase.co";
const SUPABASE_KEY = "sb_publishable_rVzCIrZ5BrAw_jS4ix33Pw_GCW1c9eq";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const C = {
  orange: "#F4A96A", orangeLight: "#FDE8D4", orangeDark: "#C46A20",
  teal: "#5BBCB0",   tealLight: "#D4F0ED",   tealDark: "#2A7A72",
  blue: "#7AACDA",   blueLight: "#D6EBFA",   blueDark: "#2E6A9E",
  red: "#F47A6A",    redLight: "#FDE8D4",     redDark: "#C43020",
  green: "#8DC98A",  greenLight: "#DFF2DE",   greenDark: "#2E6A2A",
  bg: "#FDFAF5", bgWarm: "#FEF6EC", ink: "#2D2418",
  inkLight: "#6B5A47", inkMuted: "#A09080", white: "#FFFFFF", border: "#E8DDD0",
};

interface Product {
  id: string;
  name_tr: string; name_en: string; name_lt: string; name_it: string;
  description_tr: string; description_en: string; description_lt: string; description_it: string;
  image_url: string;
  start_bid: number;
  status: string;
  created_at: string;
}

interface Bid {
  id: string;
  product_id: string;
  bidder_name: string;
  bidder_phone: string;
  bidder_email: string;
  amount: number;
  created_at: string;
}

const emptyProduct = {
  name_tr: "", name_en: "", name_lt: "", name_it: "",
  description_tr: "", description_en: "", description_lt: "", description_it: "",
  image_url: "", start_bid: 0, status: "active",
};

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState<"products" | "bids">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyProduct });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [langTab, setLangTab] = useState<"tr" | "en" | "it" | "lt">("tr");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    supabase.auth.onAuthStateChange((_e, s) => setSession(s));
  }, []);

  useEffect(() => {
    if (session) { fetchProducts(); fetchBids(); }
  }, [session]);

  async function handleLogin() {
    setLoginLoading(true); setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setLoginError("E-posta veya şifre hatalı.");
    setLoginLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*").order("created_at");
    if (data) setProducts(data);
  }

  async function fetchBids() {
    const { data } = await supabase.from("bids").select("*").order("created_at", { ascending: false });
    if (data) setBids(data);
  }

  async function handleSave() {
    setSaving(true); setSaveMsg("");
    if (!form.name_tr.trim()) { setSaveMsg("❌ Türkçe ürün adı zorunludur."); setSaving(false); return; }
    const payload = {
      name_tr: form.name_tr, name_en: form.name_en || form.name_tr,
      name_lt: form.name_lt || form.name_tr, name_it: form.name_it || form.name_tr,
      description_tr: form.description_tr, description_en: form.description_en,
      description_lt: form.description_lt, description_it: form.description_it,
      image_url: form.image_url, start_bid: Number(form.start_bid), status: form.status,
    };
    let error;
    if (editId) {
      ({ error } = await supabase.from("products").update(payload).eq("id", editId));
    } else {
      ({ error } = await supabase.from("products").insert(payload));
    }
    setSaving(false);
    if (error) { setSaveMsg("❌ Hata: " + error.message); }
    else {
      setSaveMsg("✓ Kaydedildi!");
      setTimeout(() => { setShowForm(false); setSaveMsg(""); setEditId(null); setForm({ ...emptyProduct }); }, 1200);
      fetchProducts();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu ürünü ve tüm tekliflerini silmek istediğinizden emin misiniz?")) return;
    setDeleting(id);
    await supabase.from("bids").delete().eq("product_id", id);
    await supabase.from("products").delete().eq("id", id);
    setDeleting(null);
    fetchProducts(); fetchBids();
  }

  function startEdit(p: Product) {
    setForm({
      name_tr: p.name_tr, name_en: p.name_en, name_lt: p.name_lt, name_it: p.name_it,
      description_tr: p.description_tr || "", description_en: p.description_en || "",
      description_lt: p.description_lt || "", description_it: p.description_it || "",
      image_url: p.image_url || "", start_bid: p.start_bid, status: p.status,
    });
    setEditId(p.id); setShowForm(true); setSaveMsg(""); setLangTab("tr");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startNew() {
    setForm({ ...emptyProduct }); setEditId(null); setShowForm(true); setSaveMsg(""); setLangTab("tr");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const getTopBid = (pid: string) => {
    const b = bids.filter(x => x.product_id === pid).sort((a, b) => b.amount - a.amount);
    return b.length ? b[0] : null;
  };
  const getBidCount = (pid: string) => bids.filter(x => x.product_id === pid).length;
  const filteredBids = selectedProduct ? bids.filter(b => b.product_id === selectedProduct) : bids;

  // LOGIN SCREEN
  if (!session) return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:C.bg, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"/>
      <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:20, padding:"48px 44px", width:"100%", maxWidth:400, boxShadow:"0 8px 40px rgba(0,0,0,0.08)" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:32, color:C.ink }}>C-LINE</div>
          <div style={{ fontSize:11, letterSpacing:3, color:C.inkMuted, textTransform:"uppercase", marginTop:4 }}>Admin Paneli</div>
          <div style={{ width:40, height:3, borderRadius:2, background:`linear-gradient(90deg,${C.orange},${C.teal})`, margin:"12px auto 0" }}/>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:C.inkMuted, fontWeight:700, display:"block", marginBottom:6 }}>E-posta</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              placeholder="admin@mail.com"
              style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10, padding:"11px 14px", fontSize:14, fontFamily:"'Nunito',sans-serif", outline:"none", boxSizing:"border-box" }}/>
          </div>
          <div>
            <label style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:C.inkMuted, fontWeight:700, display:"block", marginBottom:6 }}>Şifre</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleLogin()}
              placeholder="••••••••"
              style={{ width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10, padding:"11px 14px", fontSize:14, fontFamily:"'Nunito',sans-serif", outline:"none", boxSizing:"border-box" }}/>
          </div>
          {loginError && <div style={{ color:C.redDark, fontSize:13, background:C.redLight, padding:"10px 14px", borderRadius:8 }}>{loginError}</div>}
          <button onClick={handleLogin} disabled={loginLoading} style={{
            background:`linear-gradient(135deg,${C.orange},${C.teal})`, color:C.white,
            border:"none", padding:"13px", fontSize:13, letterSpacing:2,
            textTransform:"uppercase", cursor:"pointer", fontFamily:"'Nunito',sans-serif",
            fontWeight:700, borderRadius:12, marginTop:4,
          }}>{loginLoading ? "Giriş yapılıyor..." : "Giriş Yap →"}</button>
        </div>
        <div style={{ textAlign:"center", marginTop:24, fontSize:11, color:C.inkMuted }}>
          <a href="/" style={{ color:C.tealDark, textDecoration:"none" }}>← Siteye dön</a>
        </div>
      </div>
    </div>
  );

  // ADMIN PANEL
  return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:C.bg, minHeight:"100vh", color:C.ink }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"/>

      {/* TOP BAR */}
      <div style={{ background:C.ink, padding:"12px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:C.white }}>C-LINE</div>
          <div style={{ fontSize:10, letterSpacing:3, color:C.orange, textTransform:"uppercase" }}>Admin Paneli</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <a href="/" target="_blank" style={{ fontSize:12, color:"rgba(255,255,255,0.5)", textDecoration:"none", letterSpacing:1 }}>
            🌐 Siteyi Gör
          </a>
          <button onClick={handleLogout} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.6)", padding:"6px 16px", borderRadius:20, cursor:"pointer", fontSize:12, fontFamily:"'Nunito',sans-serif" }}>
            Çıkış
          </button>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 24px" }}>

        {/* STATS */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:16, marginBottom:32 }}>
          {[
            { label:"Toplam Ürün", value:products.length, color:C.orange, bg:C.orangeLight },
            { label:"Aktif Artırma", value:products.filter(p=>p.status==="active").length, color:C.tealDark, bg:C.tealLight },
            { label:"Toplam Teklif", value:bids.length, color:C.blueDark, bg:C.blueLight },
            { label:"Teklifçi Sayısı", value:new Set(bids.map(b=>b.bidder_email)).size, color:C.greenDark, bg:C.greenLight },
          ].map(s => (
            <div key={s.label} style={{ background:s.bg, border:`1px solid ${C.border}`, borderRadius:14, padding:"18px 20px" }}>
              <div style={{ fontSize:11, letterSpacing:1, color:s.color, textTransform:"uppercase", fontWeight:700, marginBottom:6 }}>{s.label}</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:32, color:s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div style={{ display:"flex", gap:0, marginBottom:24, borderBottom:`2px solid ${C.border}` }}>
          {([["products","📦 Ürünler"],["bids","📋 Teklifler"]] as const).map(([key,label]) => (
            <button key={key} onClick={()=>setTab(key)} style={{
              background:"none", border:"none", padding:"12px 24px", fontSize:13,
              fontWeight:700, cursor:"pointer", fontFamily:"'Nunito',sans-serif",
              color: tab===key ? C.orangeDark : C.inkMuted,
              borderBottom: tab===key ? `2px solid ${C.orange}` : "2px solid transparent",
              marginBottom:"-2px", letterSpacing:0.5,
            }}>{label}</button>
          ))}
        </div>

        {/* PRODUCTS TAB */}
        {tab === "products" && (
          <div>
            {/* ADD/EDIT FORM */}
            {showForm && (
              <div style={{ background:C.bgWarm, border:`1px solid ${C.border}`, borderRadius:16, padding:"28px 32px", marginBottom:28, position:"relative" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22 }}>
                    {editId ? "✏️ Ürünü Düzenle" : "➕ Yeni Ürün Ekle"}
                  </div>
                  <button onClick={()=>{setShowForm(false);setEditId(null);setForm({...emptyProduct});}} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:20, padding:"4px 14px", cursor:"pointer", fontSize:12, color:C.inkMuted }}>✕ Kapat</button>
                </div>

                {/* LANG TABS */}
                <div style={{ display:"flex", gap:0, marginBottom:20, background:C.white, borderRadius:10, padding:4, width:"fit-content", border:`1px solid ${C.border}` }}>
                  {(["tr","en","it","lt"] as const).map(l => (
                    <button key={l} onClick={()=>setLangTab(l)} style={{
                      background: langTab===l ? C.orange : "none",
                      border:"none", padding:"6px 18px", borderRadius:8,
                      cursor:"pointer", fontSize:12, fontWeight:700,
                      color: langTab===l ? C.white : C.inkMuted,
                      fontFamily:"'Nunito',sans-serif",
                    }}>{l.toUpperCase()}</button>
                  ))}
                </div>

                {/* LANG FIELDS */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <label style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:C.inkMuted, fontWeight:700 }}>
                      Ürün Adı ({langTab.toUpperCase()}) {langTab==="tr"&&"*"}
                    </label>
                    <input value={form[`name_${langTab}` as keyof typeof form] as string}
                      onChange={e=>setForm(p=>({...p,[`name_${langTab}`]:e.target.value}))}
                      placeholder={`Ürün adı (${langTab.toUpperCase()})`}
                      style={{ border:`1.5px solid ${C.border}`, borderRadius:10, padding:"10px 14px", fontSize:14, fontFamily:"'Nunito',sans-serif", outline:"none", background:C.white }}/>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <label style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:C.inkMuted, fontWeight:700 }}>Açıklama ({langTab.toUpperCase()})</label>
                    <input value={form[`description_${langTab}` as keyof typeof form] as string}
                      onChange={e=>setForm(p=>({...p,[`description_${langTab}`]:e.target.value}))}
                      placeholder={`Açıklama (${langTab.toUpperCase()})`}
                      style={{ border:`1.5px solid ${C.border}`, borderRadius:10, padding:"10px 14px", fontSize:14, fontFamily:"'Nunito',sans-serif", outline:"none", background:C.white }}/>
                  </div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginBottom:20 }}>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <label style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:C.inkMuted, fontWeight:700 }}>Görsel URL</label>
                    <input value={form.image_url}
                      onChange={e=>setForm(p=>({...p,image_url:e.target.value}))}
                      placeholder="https://..."
                      style={{ border:`1.5px solid ${C.border}`, borderRadius:10, padding:"10px 14px", fontSize:14, fontFamily:"'Nunito',sans-serif", outline:"none", background:C.white }}/>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <label style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:C.inkMuted, fontWeight:700 }}>Başlangıç Teklifi (₺) *</label>
                    <input type="number" value={form.start_bid}
                      onChange={e=>setForm(p=>({...p,start_bid:Number(e.target.value)}))}
                      placeholder="0"
                      style={{ border:`1.5px solid ${C.border}`, borderRadius:10, padding:"10px 14px", fontSize:14, fontFamily:"'Nunito',sans-serif", outline:"none", background:C.white }}/>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <label style={{ fontSize:11, letterSpacing:1, textTransform:"uppercase", color:C.inkMuted, fontWeight:700 }}>Durum</label>
                    <select value={form.status} onChange={e=>setForm(p=>({...p,status:e.target.value}))}
                      style={{ border:`1.5px solid ${C.border}`, borderRadius:10, padding:"10px 14px", fontSize:14, fontFamily:"'Nunito',sans-serif", outline:"none", background:C.white }}>
                      <option value="active">🟢 Aktif (Canlı)</option>
                      <option value="upcoming">🔵 Yakında</option>
                      <option value="closed">⚫ Kapandı</option>
                    </select>
                  </div>
                </div>

                {/* Görsel önizleme */}
                {form.image_url && form.image_url.startsWith("http") && (
                  <div style={{ marginBottom:16 }}>
                    <div style={{ fontSize:11, color:C.inkMuted, marginBottom:6, letterSpacing:1, textTransform:"uppercase" }}>Görsel Önizleme</div>
                    <img src={form.image_url} alt="preview" style={{ height:100, borderRadius:8, border:`1px solid ${C.border}`, objectFit:"cover" }} onError={e=>(e.currentTarget.style.display="none")}/>
                  </div>
                )}

                <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                  <button onClick={handleSave} disabled={saving} style={{
                    background: saving ? C.inkMuted : `linear-gradient(135deg,${C.orange},${C.teal})`,
                    color:C.white, border:"none", padding:"12px 36px",
                    fontSize:13, letterSpacing:2, textTransform:"uppercase",
                    cursor: saving ? "not-allowed" : "pointer",
                    fontFamily:"'Nunito',sans-serif", fontWeight:700, borderRadius:12,
                  }}>{saving ? "Kaydediliyor..." : editId ? "Güncelle ✓" : "Ekle ✓"}</button>
                  {saveMsg && <div style={{ fontSize:13, color: saveMsg.startsWith("✓") ? C.tealDark : C.redDark, fontWeight:700 }}>{saveMsg}</div>}
                </div>
              </div>
            )}

            {/* ADD BUTTON */}
            {!showForm && (
              <button onClick={startNew} style={{
                background:`linear-gradient(135deg,${C.orange},${C.teal})`,
                color:C.white, border:"none", padding:"12px 28px",
                fontSize:13, letterSpacing:2, textTransform:"uppercase",
                cursor:"pointer", fontFamily:"'Nunito',sans-serif",
                fontWeight:700, borderRadius:12, marginBottom:24,
              }}>+ Yeni Ürün Ekle</button>
            )}

            {/* PRODUCTS TABLE */}
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontWeight:700, fontSize:14 }}>Ürün Listesi ({products.length})</div>
                <button onClick={fetchProducts} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:8, padding:"4px 12px", cursor:"pointer", fontSize:12, color:C.inkMuted }}>🔄 Yenile</button>
              </div>
              {products.length === 0
                ? <div style={{ padding:"40px", textAlign:"center", color:C.inkMuted }}>Henüz ürün eklenmemiş.</div>
                : products.map((p, idx) => {
                  const top = getTopBid(p.id);
                  const count = getBidCount(p.id);
                  const statusColors: Record<string,string> = { active:C.teal, upcoming:C.blue, closed:"#999" };
                  const statusLabels: Record<string,string> = { active:"Canlı", upcoming:"Yakında", closed:"Kapandı" };
                  return (
                    <div key={p.id} style={{ padding:"16px 20px", borderBottom: idx < products.length-1 ? `1px solid ${C.border}` : "none", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
                      {/* Görsel */}
                      <div style={{ width:56, height:56, borderRadius:10, overflow:"hidden", background:C.orangeLight, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        {p.image_url && p.image_url.startsWith("http")
                          ? <img src={p.image_url} alt={p.name_tr} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>(e.currentTarget.style.display="none")}/>
                          : <span style={{ fontSize:20 }}>🎨</span>
                        }
                      </div>
                      {/* Info */}
                      <div style={{ flex:1, minWidth:180 }}>
                        <div style={{ fontWeight:700, fontSize:14, marginBottom:2 }}>{p.name_tr}</div>
                        <div style={{ fontSize:11, color:C.inkMuted }}>{p.name_en && p.name_en !== p.name_tr && `EN: ${p.name_en}`}</div>
                      </div>
                      {/* Status */}
                      <div style={{ background: statusColors[p.status]+"22", color: statusColors[p.status], fontSize:10, fontWeight:700, padding:"4px 12px", borderRadius:20, letterSpacing:1, textTransform:"uppercase", flexShrink:0 }}>
                        {statusLabels[p.status]}
                      </div>
                      {/* Bid info */}
                      <div style={{ textAlign:"right", minWidth:120, flexShrink:0 }}>
                        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:C.orangeDark }}>
                          ₺ {(top ? top.amount : p.start_bid).toLocaleString()}
                        </div>
                        <div style={{ fontSize:11, color:C.inkMuted }}>{count} teklif</div>
                      </div>
                      {/* Actions */}
                      <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                        <button onClick={()=>startEdit(p)} style={{ background:C.blueLight, color:C.blueDark, border:"none", padding:"7px 14px", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"'Nunito',sans-serif" }}>✏️ Düzenle</button>
                        <button onClick={()=>handleDelete(p.id)} disabled={deleting===p.id} style={{ background:C.redLight, color:C.redDark, border:"none", padding:"7px 14px", borderRadius:8, cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"'Nunito',sans-serif", opacity: deleting===p.id ? 0.5 : 1 }}>
                          {deleting===p.id ? "..." : "🗑️ Sil"}
                        </button>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}

        {/* BIDS TAB */}
        {tab === "bids" && (
          <div>
            {/* Filter by product */}
            <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
              <button onClick={()=>setSelectedProduct(null)} style={{
                background: selectedProduct===null ? C.ink : C.white,
                color: selectedProduct===null ? C.white : C.inkMuted,
                border:`1px solid ${C.border}`, padding:"6px 16px", borderRadius:20,
                cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"'Nunito',sans-serif"
              }}>Tümü ({bids.length})</button>
              {products.map(p => (
                <button key={p.id} onClick={()=>setSelectedProduct(p.id)} style={{
                  background: selectedProduct===p.id ? C.orange : C.white,
                  color: selectedProduct===p.id ? C.white : C.inkMuted,
                  border:`1px solid ${C.border}`, padding:"6px 16px", borderRadius:20,
                  cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"'Nunito',sans-serif"
                }}>{p.name_tr} ({getBidCount(p.id)})</button>
              ))}
              <button onClick={()=>{fetchBids();fetchProducts();}} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:20, padding:"6px 14px", cursor:"pointer", fontSize:12, color:C.inkMuted }}>🔄</button>
            </div>

            {/* Bids table */}
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:16, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between" }}>
                <div style={{ fontWeight:700, fontSize:14 }}>Teklif Listesi ({filteredBids.length})</div>
              </div>
              {filteredBids.length === 0
                ? <div style={{ padding:"40px", textAlign:"center", color:C.inkMuted }}>Henüz teklif yok.</div>
                : filteredBids.map((b, idx) => {
                  const prod = products.find(p=>p.id===b.product_id);
                  const isTop = getTopBid(b.product_id)?.id === b.id;
                  return (
                    <div key={b.id} style={{ padding:"14px 20px", borderBottom: idx < filteredBids.length-1 ? `1px solid ${C.border}` : "none", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", background: isTop ? C.tealLight : C.white }}>
                      {isTop && <div style={{ fontSize:10, color:C.tealDark, fontWeight:700, background:C.teal+"30", padding:"2px 10px", borderRadius:20, letterSpacing:1, flexShrink:0 }}>👑 LİDER</div>}
                      <div style={{ flex:1, minWidth:160 }}>
                        <div style={{ fontWeight:700, fontSize:14 }}>{b.bidder_name}</div>
                        <div style={{ fontSize:12, color:C.inkMuted }}>{b.bidder_email}</div>
                        <div style={{ fontSize:12, color:C.inkMuted }}>{b.bidder_phone}</div>
                      </div>
                      <div style={{ fontSize:11, color:C.inkMuted, minWidth:120 }}>
                        {prod ? prod.name_tr : "—"}
                      </div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:C.orangeDark, fontWeight:600, minWidth:100, textAlign:"right" }}>
                        ₺ {b.amount.toLocaleString()}
                      </div>
                      <div style={{ fontSize:10, color:C.inkMuted, minWidth:100, textAlign:"right" }}>
                        {new Date(b.created_at).toLocaleString("tr-TR")}
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
