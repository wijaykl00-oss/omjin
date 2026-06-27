/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Heart, 
  Send, 
  MessageSquare, 
  Camera, 
  User, 
  Award, 
  ExternalLink, 
  Share2, 
  CheckCircle2, 
  Quote, 
  X, 
  ThumbsUp, 
  Instagram, 
  Youtube, 
  Facebook, 
  MessageCircle, 
  Music,
  Smile,
  Calendar,
  MapPin,
  Briefcase,
  BookOpen,
  Play
} from 'lucide-react';
import { BIODATA_LIST, CAREER_JOURNEY, DETAILED_BIOGRAPHY, GALLERY_PHOTOS, INITIAL_COMMENTS, PROFILE_INFO, SOCIAL_LINKS } from './data';
import { CommentItem, GalleryPhoto } from './types';

export default function App() {
  // State for Fan Comments
  const [comments, setComments] = useState<CommentItem[]>(() => {
    const saved = localStorage.getItem('omjin_fan_comments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_COMMENTS;
      }
    }
    return INITIAL_COMMENTS;
  });

  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for Photo Modal
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // State for Share Toast
  const [showToast, setShowToast] = useState(false);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem('omjin_fan_comments', JSON.stringify(comments));
  }, [comments]);

  // Handle Submit Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newComment: CommentItem = {
        id: 'c_' + Date.now(),
        name: authorName.trim(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(authorName)}`,
        message: commentText.trim(),
        createdAt: 'Baru saja',
        likes: 0,
        isLiked: false
      };

      setComments([newComment, ...comments]);
      setAuthorName('');
      setCommentText('');
      setIsSubmitting(false);
    }, 400);
  };

  // Handle Like Comment
  const handleToggleLike = (id: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === id) {
        const liked = !c.isLiked;
        return {
          ...c,
          isLiked: liked,
          likes: liked ? c.likes + 1 : Math.max(0, c.likes - 1)
        };
      }
      return c;
    }));
  };

  // Handle Share Profile
  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `Biodata Resmi ${PROFILE_INFO.name}`,
        text: PROFILE_INFO.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  // Helper icon renderer for social platform
  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'tiktok': return <Music className="w-5 h-5" />;
      case 'message-circle': return <MessageCircle className="w-5 h-5" />;
      default: return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950 pb-16">
      {/* Background Decorative Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[130px] rounded-full" />
      </div>

      {/* Main Single-View Container */}
      <main id="main-content" className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        
        {/* Top Floating Badge & Share */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Profil Resmi Seniman Ludruk & Tokoh Kemanusiaan Indonesia</span>
          </div>

          <button 
            id="share-profile-btn"
            onClick={handleShareProfile}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 text-xs font-medium transition active:scale-95 shadow-sm cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Bagikan Profil</span>
          </button>
        </div>

        {/* HERO PROFILE SECTION */}
        <section id="hero-profile" className="flex flex-col items-center text-center bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md mb-10">
          {/* Subtle Corner Ornament */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-bl-full pointer-events-none" />
          
          {/* Profile Photo with Golden Ring */}
          <div className="relative mb-6 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-full blur-sm opacity-80 group-hover:opacity-100 transition duration-500" />
            <img 
              src={PROFILE_INFO.avatarUrl} 
              alt={PROFILE_INFO.name} 
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-slate-950 shadow-2xl mx-auto"
            />
            <div className="absolute bottom-1 right-2 bg-amber-500 text-slate-950 p-1.5 sm:p-2 rounded-full shadow-lg border-2 border-slate-950" title="Terverifikasi Sahabat Anak Indonesia">
              <Smile className="w-5 h-5 fill-slate-950 stroke-amber-500" />
            </div>
          </div>

          {/* Name & Titles */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              {PROFILE_INFO.name}
            </h1>
            <CheckCircle2 className="w-6 h-6 text-amber-400 shrink-0" title="Akun Resmi Terverifikasi" />
          </div>

          <p className="text-sm sm:text-base font-semibold text-amber-400 tracking-wide uppercase mb-3">
            {PROFILE_INFO.title}
          </p>

          <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed mb-6 font-normal">
            {PROFILE_INFO.bioShort}
          </p>

          {/* Key Highlight Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl mb-8">
            <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <MapPin className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-xs text-slate-400">Asal Kota</span>
              <span className="text-sm font-bold text-slate-200">Surabaya</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <Award className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-xs text-slate-400">Seni Budaya</span>
              <span className="text-sm font-bold text-slate-200">Ludruk & Teater</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col items-center p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <Heart className="w-5 h-5 text-amber-400 mb-1" />
              <span className="text-xs text-slate-400">Misi Utama</span>
              <span className="text-sm font-bold text-slate-200">Sosial & Kemanusiaan</span>
            </div>
          </div>

          {/* SOCIAL MEDIA CONNECTIONS */}
          <div className="w-full pt-6 border-t border-slate-800/80">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-4">
              Terhubung Lebih Dekat di Media Sosial Resmi
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {SOCIAL_LINKS.map((soc, idx) => (
                <a
                  key={idx}
                  id={`social-link-${soc.iconName}`}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 text-slate-200 text-xs sm:text-sm font-medium transition duration-200 hover:shadow-lg hover:shadow-amber-500/5 cursor-pointer"
                >
                  <span className="text-amber-400 group-hover:scale-110 transition duration-200">
                    {renderSocialIcon(soc.iconName)}
                  </span>
                  <span>{soc.platform}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 opacity-60 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </section>


        {/* BIODATA & PERJALANAN KARIR */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Kolom Kiri: Tabel Biodata */}
          <section id="biodata-section" className="md:col-span-5 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md self-start">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Biodata Profil</h2>
                <p className="text-xs text-slate-400">Identitas resmi artis & tokoh</p>
              </div>
            </div>

            <dl className="space-y-4 text-sm">
              {BIODATA_LIST.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-800/50 last:border-0 gap-1 sm:gap-4">
                  <dt className="text-slate-400 shrink-0 font-medium">{item.label}</dt>
                  <dd className="text-slate-100 font-semibold sm:text-right">{item.value}</dd>
                </div>
              ))}
            </dl>

            {/* Motto Box */}
            <div className="mt-6 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 relative">
              <Quote className="w-6 h-6 text-amber-500/20 absolute -top-2 left-3" />
              <p className="text-xs italic text-amber-200/90 leading-relaxed text-center relative z-10 pt-1">
                {PROFILE_INFO.tagline}
              </p>
            </div>
          </section>

          {/* Kolom Kanan: Perjalanan Karir */}
          <section id="career-journey-section" className="md:col-span-7 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Perjalanan Karir di Dunia Entertain</h2>
                <p className="text-xs text-slate-400">Dedikasi sebagai Sahabat Anak Indonesia</p>
              </div>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 sm:before:left-3.5 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-indigo-500 before:to-slate-800">
              {CAREER_JOURNEY.map((step, idx) => (
                <div key={idx} className="relative flex items-start pl-8 sm:pl-10 group">
                  {/* Timeline bullet badge */}
                  <div className="absolute left-1 sm:left-1.5 top-1 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-400 group-hover:scale-125 group-hover:bg-amber-400 transition duration-300 shadow-md" />
                  
                  <div className="w-full">
                    <span className="inline-block px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 text-xs font-semibold tracking-wider mb-2">
                      {step.year}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition duration-200 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>


        {/* KISAH INSPIRATIF / BIOGRAFI LENGKAP */}
        <section id="biography-narrative-section" className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-md mb-12 relative overflow-hidden">
          {/* Decorative design glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Kisah Inspiratif Agus Pengampon</h2>
              <p className="text-xs sm:text-sm text-slate-400">Biografi lengkap & dedikasi seni Om Jin Sahabat Anak Indonesia</p>
            </div>
          </div>

          {/* Intro Paragraph */}
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-8 relative overflow-hidden">
            <Quote className="w-10 h-10 text-amber-500/10 absolute -top-4 left-4" />
            <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-medium relative z-10">
              {DETAILED_BIOGRAPHY.intro}
            </p>
          </div>

          {/* Biography Grid Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {DETAILED_BIOGRAPHY.sections.map((sec, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/40 border border-slate-800/60 hover:border-amber-500/30 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-amber-500/10 text-[10px] font-bold uppercase tracking-wider text-amber-400 border border-amber-500/20">
                      {sec.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">
                    {sec.title}
                  </h3>
                  <div className="space-y-3">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* YouTube Video Link Promo Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-950 to-slate-950 border border-red-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-500/10 text-red-500 shrink-0">
                <Youtube className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">Lihat Dokumentasi Video di YouTube</h3>
                <p className="text-xs text-slate-400 max-w-md mt-1">
                  Saksikan pementasan teater ludruk, sulap, dan liputan aksi sosial kemanusiaan Om Jin secara langsung di YouTube.
                </p>
              </div>
            </div>
            <a 
              href={DETAILED_BIOGRAPHY.youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold transition shadow-lg shadow-red-600/20 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Buka Pencarian YouTube</span>
            </a>
          </div>
        </section>


        {/* GALERI FOTO CERIA */}
        <section id="gallery-section" className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-md mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Galeri Foto Ceria</h2>
                <p className="text-xs sm:text-sm text-slate-400">Dokumentasi roadshow, sulap jenaka, dan kebahagiaan anak-anak</p>
              </div>
            </div>
            
            <div className="text-xs text-amber-300 font-medium px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 self-start sm:self-auto">
              Klik foto untuk memperbesar
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GALLERY_PHOTOS.map((photo) => (
              <div 
                key={photo.id}
                id={`photo-card-${photo.id}`}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-500/40 aspect-[4/3]"
              >
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition duration-300" />
                
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-500 text-slate-950 mb-1.5">
                    {photo.category}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5 opacity-80 group-hover:opacity-100 font-normal">
                    {photo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* KOLOM KOMENTAR PENGGEMAR */}
        <section id="comments-section" className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Pesan & Komentar Penggemar</h2>
              <p className="text-xs sm:text-sm text-slate-400">Tulis semangat, rasa kagum, atau kenangan masa kecil bersama Om Jin</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Input Komentar */}
            <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800/80 p-6 rounded-2xl self-start">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                <span>Berikan Komentar Anda</span>
              </h3>

              <form onSubmit={handleAddComment} className="space-y-4">
                <div>
                  <label htmlFor="fan-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Nama Anda / Sahabat Anak <span className="text-amber-400">*</span>
                  </label>
                  <input
                    id="fan-name"
                    type="text"
                    required
                    placeholder="Contoh: Kak Budi / Bunda Aisyah"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div>
                  <label htmlFor="fan-message" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Pesan Semangat / Cerita Dongeng <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    id="fan-message"
                    required
                    rows={4}
                    placeholder="Tulis ucapan sehat selalu, kenangan menonton sulap Om Jin, atau request daerah roadshow..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition resize-none"
                  />
                </div>

                <button
                  id="submit-comment-btn"
                  type="submit"
                  disabled={isSubmitting || !authorName.trim() || !commentText.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Mengirim pesan...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Komentar Penggemar</span>
                    </>
                  )}
                </button>
              </form>
            </div>


            {/* Wall Komentar */}
            <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Total Komentar Masuk: <strong className="text-white font-semibold">{comments.length}</strong></span>
                <span className="text-[11px]">Tersimpan instan di peramban</span>
              </div>

              {comments.map((item) => (
                <div 
                  key={item.id}
                  id={`comment-item-${item.id}`}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700/80 transition duration-200 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">{item.name}</h4>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          {item.createdAt}
                        </span>
                      </div>
                    </div>

                    <button
                      id={`like-comment-${item.id}`}
                      onClick={() => handleToggleLike(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
                        item.isLiked 
                          ? 'bg-pink-500/20 border-pink-500/40 text-pink-300' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${item.isLiked ? 'fill-pink-400 text-pink-400' : ''}`} />
                      <span>{item.likes}</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal pl-1 sm:pl-13">
                    "{item.message}"
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* FOOTER */}
        <footer id="app-footer" className="mt-16 text-center text-xs text-slate-500 pt-8 border-t border-slate-900 space-y-2">
          <p className="text-amber-400/80 text-sm font-bold tracking-wide">
            {PROFILE_INFO.realName}
          </p>
          <p className="text-slate-400 font-medium">
            © {new Date().getFullYear()} {PROFILE_INFO.name} — {PROFILE_INFO.title}
          </p>
          <p>
            Putra asli Surabaya yang mendedikasikan seluruh jiwa raganya melalui seni ludruk, teater, dan aksi kemanusiaan untuk Indonesia.
          </p>
          <p className="pt-2">
            <span className="text-slate-600">Karir sejak 1988 · Teater SAE · Komunitas Ludruk Jakarta (KLJ) · Ludruk Kontjo Lawas</span>
          </p>
        </footer>

      </main>


      {/* MODAL ZOOM FOTO GALERI (LIGHTBOX) */}
      {selectedPhoto && (
        <div 
          id="photo-preview-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="close-modal-btn"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title} 
                className="w-full h-auto max-h-[65vh] object-contain"
              />
            </div>

            <div className="p-6 sm:p-8 bg-slate-900 space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded text-xs uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {selectedPhoto.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* COPY TOAST */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>Tautan profil berhasil disalin!</span>
        </div>
      )}

    </div>
  );
}
