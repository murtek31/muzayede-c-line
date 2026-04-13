"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [auction, setAuction] = useState<any>(null);
  const [form, setForm] = useState({ name: '', phone: '', bid: '' });

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('auctions').select('*').limit(1).single();
      setAuction(data);
    };
    getData();
    const sub = supabase.channel('auction').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'auctions' }, 
      payload => setAuction(payload.new)).subscribe();
    return () => { supabase.removeChannel(sub); };
  }, []);

  const submitBid = async (e: any) => {
    e.preventDefault();
    if (parseFloat(form.bid) <= auction.current_bid) { alert("Daha yüksek teklif verin!"); return; }
    await supabase.from('auctions').update({ current_bid: form.bid, last_bidder_name: form.name, last_bidder_phone: form.phone }).eq('id', auction.id);
    alert("Teklif iletildi! 🎨");
    setForm({ ...form, bid: '' });
  };

  if (!auction) return <div style={{padding: '50px', textAlign: 'center', fontFamily: 'serif'}}>Yükleniyor...</div>;

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#fdfcf0', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'serif', color: '#5d4037'}}>
      <div style={{maxWidth: '400px', width: '100%', backgroundColor: 'white', border: '8px solid #d4a373', borderRadius: '40px', padding: '30px', textAlign: 'center'}}>
        <img src={auction.image_url} style={{width: '100%', borderRadius: '25px', marginBottom: '20px', border: '2px solid #faedcd'}} />
        <h1 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '10px'}}>{auction.product_name}</h1>
        <div style={{backgroundColor: '#fefae0', borderRadius: '20px', padding: '20px', marginBottom: '20px', border: '1px solid #e9edc9'}}>
          <div style={{fontSize: '40px', fontWeight: '900', color: '#606c38'}}>{auction.current_bid} ₺</div>
          <p style={{fontSize: '14px', marginTop: '10px'}}>🎨 Lider: {auction.last_bidder_name || 'Henüz Yok'}</p>
        </div>
        <form onSubmit={submitBid} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <input style={{padding: '15px', borderRadius: '15px', border: '2px solid #faedcd', outline: 'none'}} placeholder="Ad Soyad" required onChange={x => setForm({...form, name: x.target.value})} />
          <input style={{padding: '15px', borderRadius: '15px', border: '2px solid #faedcd', outline: 'none'}} placeholder="Telefon" required onChange={x => setForm({...form, phone: x.target.value})} />
          <input style={{padding: '15px', borderRadius: '15px', border: '2px solid #faedcd', outline: 'none', fontSize: '20px', fontWeight: 'bold'}} type="number" placeholder="Teklif (₺)" required value={form.bid} onChange={x => setForm({...form, bid: x.target.value})} />
          <button style={{padding: '20px', borderRadius: '50px', backgroundColor: '#606c38', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}>TEKLİF VER 🖌️</button>
        </form>
      </div>
    </div>
  );
}
