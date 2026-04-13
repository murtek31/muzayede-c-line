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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('auctions').select('*').limit(1).single();
      setAuction(data);
    };
    getData();

    const sub = supabase.channel('auction').on('postgres_changes', { 
      event: 'UPDATE', 
      schema: 'public', 
      table: 'auctions' 
    }, payload => setAuction(payload.new)).subscribe();

    return () => { supabase.removeChannel(sub); };
  }, []);

  const submitBid = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const amount = parseFloat(form.bid);

    if (amount <= auction.current_bid) {
      alert("Please enter a bid higher than the current highest bid.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('auctions').update({ 
      current_bid: amount, 
      last_bidder_name: form.name, 
      last_bidder_phone: form.phone 
    }).eq('id', auction.id);

    if (!error) {
      setForm({ ...form, bid: '' });
      alert("Your bid has been successfully recorded! 🖌️");
    }
    setLoading(false);
  };

  if (!auction) return <div className="flex h-screen items-center justify-center italic text-stone-500 bg-[#fdfcf0] font-serif">Opening Auction Hall...</div>;

  return (
    <div className="min-h-screen bg-[#fdfcf0] text-[#5d4037] font-serif p-4 md:p-8 flex flex-col items-center">
      
      {/* Header Section */}
      <header className="text-center mb-10">
        <h2 className="text-sm tracking-[0.3em] uppercase opacity-60 mb-2 font-sans">C-LINE Exclusive Collection</h2>
        <h1 className="text-4xl md:text-5xl font-bold italic border-b-2 border-[#d4a373] pb-4 inline-block">Auction House</h1>
      </header>

      {/* Main Auction Card */}
      <main className="max-w-4xl w-full grid md:grid-cols-2 gap-8 bg-white border-[12px] border-[#d4a373] rounded-[3rem] p-6 md:p-10 shadow-[20px_20px_0px_#faedcd]">
        
        {/* Visual Column */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[#d4a373] rotate-2 rounded-3xl opacity-20 group-hover:rotate-0 transition-transform"></div>
          <img 
            src={auction.image_url} 
            className="relative w-full aspect-square object-cover rounded-3xl border-4 border-white shadow-lg"
            alt="Auction Masterpiece"
          />
          <div className="mt-4 text-center italic opacity-80 text-sm">
            “A rare piece crafted with passion and traditional technique.”
          </div>
        </div>

        {/* Bidding Interface Column */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-2">{auction.product_name}</h3>
            <p className="text-sm leading-relaxed opacity-75 mb-6">{auction.description}</p>
            
            <div className="bg-[#fefae0] border-2 border-dashed border-[#d4a373] rounded-3xl p-6 text-center mb-6 shadow-inner">
              <span className="text-xs uppercase font-bold tracking-widest opacity-60 font-sans">Current Highest Bid</span>
              <div className="text-5xl font-black text-[#606c38] my-2 tabular-nums">{auction.current_bid} ₺</div>
              <div className="flex justify-center items-center gap-2 text-sm italic">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Lead Bidder: {auction.last_bidder_name || "No bids yet"}
              </div>
            </div>
          </div>

          <form onSubmit={submitBid} className="space-y-3">
            <input 
              className="w-full p-4 rounded-2xl bg-stone-50 border-2 border-stone-100 focus:border-[#d4a373] outline-none transition-all" 
              placeholder="Your Full Name" required value={form.name} onChange={x => setForm({...form, name: x.target.value})} 
            />
            <input 
              className="w-full p-4 rounded-2xl bg-stone-50 border-2 border-stone-100 focus:border-[#d4a373] outline-none transition-all" 
              placeholder="Contact Number" type="tel" required value={form.phone} onChange={x => setForm({...form, phone: x.target.value})} 
            />
            <div className="relative">
              <input 
                className="w-full p-4 pl-10 rounded-2xl bg-stone-50 border-2 border-[#d4a373] focus:ring-4 focus:ring-[#faedcd] outline-none font-bold text-xl transition-all" 
                placeholder="Bid Amount (₺)" type="number" required value={form.bid} onChange={x => setForm({...form, bid: x.target.value})} 
              />
              <span className="absolute left-4 top-4 opacity-40">₺</span>
            </div>
            
            <button 
              disabled={loading}
              className="w-full bg-[#606c38] hover:bg-[#283618] text-white py-5 rounded-full font-bold text-xl shadow-xl active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Recording Bid..." : "SUBMIT BID 🖌️"}
            </button>
          </form>
        </div>
      </main>

      {/* English Erasmus+ Footer Section */}
      <footer className="max-w-4xl w-full mt-16 pb-10">
        <div className="h-[2px] bg-stone-200 w-full mb-8 relative text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfcf0] px-4 italic text-sm opacity-40 uppercase tracking-tighter">EU Project Disclosure</div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm border border-stone-200 rounded-[2rem] p-8 text-center text-sm leading-relaxed text-stone-600 shadow-sm">
          <p className="font-bold text-[#d4a373] mb-4 text-base">
            This project has been supported by the Turkish National Agency.
          </p>
          <p className="mb-4 font-medium">
            Developed within the scope of the Erasmus+ KA210-SCH project titled: <br className="hidden md:block"/>
            <span className="italic">“A Common Language for Integrative Entrepreneurship (C-LINE)”</span>
          </p>
          <p className="italic opacity-80">
            The C-LINE project is conducted by partner institutions from Turkey, Latvia, and Italy.
          </p>
          <div className="mt-8 pt-6 border-t border-stone-100 flex justify-center items-center gap-4 opacity-40">
             <span className="text-[10px] uppercase tracking-widest font-sans">C-LINE PROJECT © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
