import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "games" | "friends" | "profile" | "rating" | "history" | "coins" | "voice";

const GAMES = [
  { id: "cards", name: "Карты", emoji: "🃏", color: "#EC4899", players: "2-4", online: 142 },
  { id: "puzzles", name: "Пазлы", emoji: "🧩", color: "#7C3AED", players: "1-2", online: 87 },
  { id: "billiards", name: "Бильярд", emoji: "🎱", color: "#10B981", players: "2", online: 64 },
  { id: "checkers", name: "Шашки", emoji: "⚫", color: "#F97316", players: "2", online: 95 },
  { id: "chess", name: "Шахматы", emoji: "♟️", color: "#3B82F6", players: "2", online: 231 },
  { id: "crossword", name: "Кроссворды", emoji: "📝", color: "#FBBF24", players: "1-4", online: 53 },
  { id: "tennis", name: "Теннис", emoji: "🏓", color: "#06B6D4", players: "2", online: 78 },
  { id: "bingo", name: "Бинго", emoji: "🎰", color: "#EF4444", players: "2-8", online: 119 },
  { id: "whoareyou", name: "Угадай кто я", emoji: "🎭", color: "#8B5CF6", players: "3-8", online: 44 },
  { id: "seabattle", name: "Морской бой", emoji: "⚓", color: "#0EA5E9", players: "2", online: 167 },
  { id: "nardi", name: "Нарды", emoji: "🎲", color: "#D97706", players: "2", online: 203 },
];

const FRIENDS = [
  { id: 1, name: "Алексей К.", avatar: "🧑", status: "online", game: "Шахматы", level: 24 },
  { id: 2, name: "Маша Петрова", avatar: "👩", status: "online", game: null, level: 18 },
  { id: 3, name: "Дима Смирнов", avatar: "🧔", status: "online", game: "Нарды", level: 31 },
  { id: 4, name: "Катя Волкова", avatar: "👱‍♀️", status: "offline", game: null, level: 12 },
  { id: 5, name: "Рустам А.", avatar: "👨‍🦱", status: "online", game: "Бинго", level: 27 },
  { id: 6, name: "Света Кузьмина", avatar: "👩‍🦰", status: "offline", game: null, level: 9 },
];

const RATING = [
  { pos: 1, name: "ProGamer777", avatar: "🥇", score: 18420, wins: 342 },
  { pos: 2, name: "Алексей К.", avatar: "🥈", score: 15890, wins: 289 },
  { pos: 3, name: "QueenOfGames", avatar: "🥉", score: 14200, wins: 271 },
  { pos: 4, name: "Дима Смирнов", avatar: "👤", score: 12100, wins: 198 },
  { pos: 5, name: "Рустам А.", avatar: "👤", score: 11340, wins: 177 },
  { pos: 6, name: "Ты", avatar: "⭐", score: 8750, wins: 134, isMe: true },
];

const HISTORY = [
  { game: "Шахматы", emoji: "♟️", result: "win", opponent: "Алексей К.", time: "10 мин назад", coins: "+45" },
  { game: "Нарды", emoji: "🎲", result: "lose", opponent: "ProGamer777", time: "1 час назад", coins: "-20" },
  { game: "Морской бой", emoji: "⚓", result: "win", opponent: "Маша Петрова", time: "2 часа назад", coins: "+30" },
  { game: "Бинго", emoji: "🎰", result: "win", opponent: "Дима Смирнов", time: "Вчера", coins: "+60" },
  { game: "Шашки", emoji: "⚫", result: "lose", opponent: "QueenOfGames", time: "Вчера", coins: "-25" },
];

const VOICE_ROOMS = [
  { id: 1, name: "Casual Gaming 🎮", members: 5, max: 8, game: "Разные игры", active: true },
  { id: 2, name: "Шахматный клуб", members: 3, max: 6, game: "Шахматы", active: true },
  { id: 3, name: "Вечерний покер 🃏", members: 7, max: 8, game: "Карты", active: true },
  { id: 4, name: "Нарды — профи", members: 2, max: 4, game: "Нарды", active: false },
];

const CHAT_MESSAGES = [
  { id: 1, user: "Алексей К.", avatar: "🧑", text: "Кто хочет сыграть в шахматы? 🔥", time: "14:32" },
  { id: 2, user: "Маша Петрова", avatar: "👩", text: "Я! Подожди 5 минут", time: "14:33" },
  { id: 3, user: "ProGamer777", avatar: "🎮", text: "Поставил рекорд в нардах — 18420 очков!", time: "14:35" },
  { id: 4, user: "Рустам А.", avatar: "👨‍🦱", text: "Бинго комната открыта, заходите!", time: "14:37" },
  { id: 5, user: "Дима Смирнов", avatar: "🧔", text: "Gg wp все 🏆", time: "14:40" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [activeChatMsg, setActiveChatMsg] = useState("");
  const [chatMessages, setChatMessages] = useState(CHAT_MESSAGES);
  const [micOn, setMicOn] = useState(false);
  const [activeRoom, setActiveRoom] = useState<number | null>(null);
  const [showGameModal, setShowGameModal] = useState<typeof GAMES[0] | null>(null);

  const sendMessage = () => {
    if (!activeChatMsg.trim()) return;
    setChatMessages(prev => [...prev, {
      id: prev.length + 1, user: "Ты", avatar: "⭐",
      text: activeChatMsg, time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" })
    }]);
    setActiveChatMsg("");
  };

  const navItems: { id: Page; icon: string; label: string }[] = [
    { id: "home", icon: "Home", label: "Главная" },
    { id: "games", icon: "Gamepad2", label: "Игры" },
    { id: "friends", icon: "Users", label: "Друзья" },
    { id: "voice", icon: "Mic", label: "Комнаты" },
    { id: "rating", icon: "Trophy", label: "Рейтинг" },
    { id: "history", icon: "Clock", label: "История" },
    { id: "coins", icon: "Coins", label: "Монеты" },
    { id: "profile", icon: "User", label: "Профиль" },
  ];

  return (
    <div className="min-h-screen font-rubik" style={{ background: "linear-gradient(135deg, #1a0533 0%, #0d0d2b 50%, #051a33 100%)" }}>

      {/* TOP BAR */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(13,13,43,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="flex items-center gap-2">
          <span className="font-pacifico text-2xl" style={{ background: "linear-gradient(90deg,#7C3AED,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            GameZone
          </span>
          <span className="tag-badge" style={{ background: "rgba(16,185,129,0.2)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }}>
            LIVE
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="coin-badge flex items-center gap-1">
            <span>🪙</span>
            <span>8 750</span>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl cursor-pointer"
            style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>
            ⭐
          </div>
        </div>
      </header>

      {/* BOTTOM NAV (mobile first) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2 md:hidden"
        style={{ background: "rgba(13,13,43,0.95)", backdropFilter: "blur(16px)", borderTop: "1px solid rgba(124,58,237,0.2)" }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all"
            style={{ color: page === item.id ? "#EC4899" : "#6B7280" }}>
            <Icon name={item.icon} size={20} />
            <span className="text-[9px] font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* SIDEBAR (desktop) */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-56 flex-col pt-20 pb-6 px-3 z-40"
        style={{ background: "rgba(13,13,43,0.9)", backdropFilter: "blur(16px)", borderRight: "1px solid rgba(124,58,237,0.15)" }}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setPage(item.id)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1 transition-all text-left"
            style={{
              background: page === item.id ? "rgba(124,58,237,0.2)" : "transparent",
              color: page === item.id ? "#EC4899" : "#9CA3AF",
              borderLeft: page === item.id ? "3px solid #7C3AED" : "3px solid transparent"
            }}>
            <Icon name={item.icon} size={18} />
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <main className="md:ml-56 pb-20 md:pb-6 px-4 pt-4 max-w-5xl mx-auto md:mx-0">

        {/* HOME */}
        {page === "home" && (
          <div className="animate-fade-in">
            {/* Hero */}
            <div className="rounded-2xl p-6 mb-6 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(236,72,153,0.2) 100%)", border: "1px solid rgba(124,58,237,0.3)" }}>
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #EC4899, transparent)", transform: "translate(30%, -30%)" }} />
              <h1 className="text-2xl font-black text-white mb-1">Привет, игрок! 👋</h1>
              <p className="text-sm mb-4" style={{ color: "#A78BFA" }}>Готов к победе сегодня?</p>
              <div className="flex gap-3">
                <button className="btn-game text-sm" onClick={() => setPage("games")}>
                  Играть сейчас
                </button>
                <button className="text-sm font-semibold px-4 py-3 rounded-xl transition-all"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#E5E7EB" }}
                  onClick={() => setPage("friends")}>
                  Пригласить друзей
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: "Побед", value: "134", icon: "Trophy", color: "#FBBF24" },
                { label: "Уровень", value: "24", icon: "Star", color: "#7C3AED" },
                { label: "Друзья", value: "6", icon: "Users", color: "#10B981" },
              ].map(s => (
                <div key={s.label} className="game-card rounded-2xl p-4 text-center">
                  <Icon name={s.icon} size={22} style={{ color: s.color, margin: "0 auto 6px" }} />
                  <div className="text-xl font-black text-white">{s.value}</div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Online friends */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-white text-base">Друзья онлайн</h2>
                <button className="text-xs font-semibold" style={{ color: "#7C3AED" }} onClick={() => setPage("friends")}>Все →</button>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                {FRIENDS.filter(f => f.status === "online").map(f => (
                  <div key={f.id} className="flex flex-col items-center gap-1 min-w-[60px]">
                    <div className="relative w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{ background: "rgba(124,58,237,0.2)", border: "2px solid rgba(124,58,237,0.4)" }}>
                      {f.avatar}
                      <span className="online-dot absolute bottom-0 right-0" />
                    </div>
                    <span className="text-[10px] text-center font-semibold" style={{ color: "#D1D5DB" }}>{f.name.split(" ")[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick games */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-white text-base">Популярные игры</h2>
                <button className="text-xs font-semibold" style={{ color: "#7C3AED" }} onClick={() => setPage("games")}>Все →</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {GAMES.slice(0, 4).map(g => (
                  <button key={g.id} className="game-card rounded-2xl p-4 flex items-center gap-3 text-left"
                    onClick={() => setShowGameModal(g)}>
                    <span className="text-3xl">{g.emoji}</span>
                    <div>
                      <div className="font-bold text-sm text-white">{g.name}</div>
                      <div className="text-xs" style={{ color: "#10B981" }}>🟢 {g.online} онлайн</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GAMES */}
        {page === "games" && (
          <div className="animate-fade-in">
            <h1 className="text-xl font-black text-white mb-4">🎮 Все игры</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {GAMES.map(g => (
                <button key={g.id} className="game-card rounded-2xl p-5 text-center transition-all"
                  onClick={() => setShowGameModal(g)}>
                  <div className="text-5xl mb-3 animate-float">{g.emoji}</div>
                  <div className="font-black text-white text-base mb-1">{g.name}</div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="tag-badge" style={{ background: "rgba(124,58,237,0.2)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.3)" }}>
                      👥 {g.players}
                    </span>
                  </div>
                  <div className="text-xs font-semibold" style={{ color: "#10B981" }}>🟢 {g.online} играют</div>
                  <div className="btn-game mt-3 text-xs py-2 px-4 inline-block rounded-xl">Играть</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FRIENDS */}
        {page === "friends" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-black text-white">👥 Друзья</h1>
              <button className="btn-game text-xs py-2 px-4">+ Добавить</button>
            </div>
            {/* Search */}
            <div className="relative mb-4">
              <input
                placeholder="Найти игрока..."
                className="w-full rounded-xl px-4 py-3 pl-10 text-sm text-white outline-none"
                style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: "#E5E7EB" }}
              />
              <Icon name="Search" size={16} className="absolute left-3 top-3.5" style={{ color: "#7C3AED" }} />
            </div>
            <div className="space-y-3">
              {FRIENDS.map(f => (
                <div key={f.id} className="game-card rounded-2xl p-4 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: "rgba(124,58,237,0.2)", border: "2px solid rgba(124,58,237,0.4)" }}>
                    {f.avatar}
                    {f.status === "online" && <span className="online-dot absolute bottom-0 right-0" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm">{f.name}</div>
                    <div className="text-xs" style={{ color: f.status === "online" ? "#10B981" : "#6B7280" }}>
                      {f.status === "online" ? (f.game ? `Играет в ${f.game}` : "Онлайн") : "Оффлайн"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ background: "rgba(124,58,237,0.2)", color: "#A78BFA" }}>
                      Ур.{f.level}
                    </span>
                    {f.status === "online" && (
                      <button className="text-xs font-bold px-3 py-2 rounded-xl"
                        style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)", color: "white" }}>
                        Играть
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VOICE ROOMS */}
        {page === "voice" && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-black text-white">🎙️ Голосовые комнаты</h1>
              <button className="btn-game text-xs py-2 px-4">+ Создать</button>
            </div>

            {/* Active room banner */}
            {activeRoom !== null && (
              <div className="rounded-2xl p-4 mb-4 flex items-center gap-3 animate-scale-in"
                style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.25),rgba(6,182,212,0.15))", border: "1px solid rgba(16,185,129,0.4)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(16,185,129,0.3)" }}>
                  <Icon name={micOn ? "Mic" : "MicOff"} size={20} style={{ color: "#10B981" }} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{VOICE_ROOMS.find(r => r.id === activeRoom)?.name}</div>
                  <div className="text-xs" style={{ color: "#10B981" }}>Вы в комнате</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setMicOn(!micOn)}
                    className="p-2 rounded-xl transition-all"
                    style={{ background: micOn ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)", color: micOn ? "#10B981" : "#EF4444" }}>
                    <Icon name={micOn ? "Mic" : "MicOff"} size={18} />
                  </button>
                  <button onClick={() => setActiveRoom(null)}
                    className="p-2 rounded-xl"
                    style={{ background: "rgba(239,68,68,0.3)", color: "#EF4444" }}>
                    <Icon name="PhoneOff" size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Rooms */}
            <div className="space-y-3 mb-6">
              {VOICE_ROOMS.map(r => (
                <div key={r.id} className="game-card rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: "rgba(124,58,237,0.2)" }}>
                    🎙️
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm">{r.name}</div>
                    <div className="text-xs" style={{ color: "#9CA3AF" }}>{r.game}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: r.members }).map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded-full text-xs flex items-center justify-center"
                          style={{ background: "rgba(124,58,237,0.3)" }}>👤</div>
                      ))}
                      <span className="text-xs ml-1" style={{ color: "#6B7280" }}>{r.members}/{r.max}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setActiveRoom(r.id); setMicOn(true); }}
                    className="text-xs font-bold px-3 py-2 rounded-xl"
                    style={{
                      background: activeRoom === r.id ? "rgba(16,185,129,0.3)" : "linear-gradient(135deg,#7C3AED,#EC4899)",
                      color: "white"
                    }}>
                    {activeRoom === r.id ? "✓ Зашёл" : "Войти"}
                  </button>
                </div>
              ))}
            </div>

            {/* Chat */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.3)" }}>
              <div className="px-4 py-3 font-bold text-white text-sm flex items-center gap-2"
                style={{ background: "rgba(124,58,237,0.2)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}>
                <Icon name="MessageSquare" size={16} style={{ color: "#EC4899" }} />
                Общий чат
              </div>
              <div className="h-52 overflow-y-auto p-3 space-y-2 scrollbar-hide"
                style={{ background: "rgba(13,13,43,0.6)" }}>
                {chatMessages.map(m => (
                  <div key={m.id} className="flex items-start gap-2 animate-fade-in">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: "rgba(124,58,237,0.2)" }}>{m.avatar}</div>
                    <div className="flex-1">
                      <span className="text-xs font-bold mr-1" style={{ color: "#A78BFA" }}>{m.user}</span>
                      <span className="text-xs" style={{ color: "#6B7280" }}>{m.time}</span>
                      <p className="text-sm text-white">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 p-3" style={{ borderTop: "1px solid rgba(124,58,237,0.2)" }}>
                <input
                  value={activeChatMsg}
                  onChange={e => setActiveChatMsg(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Написать сообщение..."
                  className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
                  style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: "#E5E7EB" }}
                />
                <button onClick={sendMessage} className="btn-game text-sm py-2 px-4 rounded-xl">
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RATING */}
        {page === "rating" && (
          <div className="animate-fade-in">
            <h1 className="text-xl font-black text-white mb-4">🏆 Рейтинг</h1>
            <div className="space-y-2">
              {RATING.map(r => (
                <div key={r.pos} className="game-card rounded-2xl p-4 flex items-center gap-3"
                  style={r.isMe ? { border: "1px solid rgba(124,58,237,0.6)", background: "rgba(124,58,237,0.15)" } : {}}>
                  <div className="text-2xl w-8 text-center flex-shrink-0">{r.avatar}</div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: "rgba(124,58,237,0.2)" }}>
                    👤
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm" style={{ color: r.isMe ? "#EC4899" : "white" }}>
                      {r.name} {r.isMe && "← ты"}
                    </div>
                    <div className="text-xs" style={{ color: "#9CA3AF" }}>{r.wins} побед</div>
                  </div>
                  <div className="coin-badge">{r.score.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HISTORY */}
        {page === "history" && (
          <div className="animate-fade-in">
            <h1 className="text-xl font-black text-white mb-4">📋 История игр</h1>
            <div className="space-y-3">
              {HISTORY.map((h, i) => (
                <div key={i} className="game-card rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-3xl">{h.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm">{h.game}</div>
                    <div className="text-xs" style={{ color: "#9CA3AF" }}>vs {h.opponent} · {h.time}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-black px-2 py-1 rounded-lg"
                      style={{
                        background: h.result === "win" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
                        color: h.result === "win" ? "#10B981" : "#EF4444"
                      }}>
                      {h.result === "win" ? "Победа" : "Поражение"}
                    </span>
                    <span className="text-xs font-bold" style={{ color: h.result === "win" ? "#FBBF24" : "#EF4444" }}>
                      🪙 {h.coins}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COINS */}
        {page === "coins" && (
          <div className="animate-fade-in">
            <h1 className="text-xl font-black text-white mb-4">🪙 Монеты</h1>
            {/* Balance */}
            <div className="rounded-2xl p-6 mb-6 text-center"
              style={{ background: "linear-gradient(135deg,rgba(251,191,36,0.2),rgba(249,115,22,0.15))", border: "1px solid rgba(251,191,36,0.3)" }}>
              <div className="text-5xl mb-2">🪙</div>
              <div className="text-4xl font-black text-white mb-1">8 750</div>
              <div className="text-sm" style={{ color: "#FBBF24" }}>Ваш баланс</div>
            </div>
            {/* Packs */}
            <h2 className="font-bold text-white text-base mb-3">Пополнить монеты</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { coins: 1000, price: "59 ₽", bonus: "" },
                { coins: 5000, price: "249 ₽", bonus: "+500 бонус" },
                { coins: 10000, price: "449 ₽", bonus: "+2000 бонус" },
                { coins: 50000, price: "1990 ₽", bonus: "+15000 бонус 🔥" },
              ].map((pack, i) => (
                <div key={i} className="game-card rounded-2xl p-4 text-center cursor-pointer">
                  <div className="text-2xl mb-1">🪙</div>
                  <div className="font-black text-white text-lg">{pack.coins.toLocaleString()}</div>
                  {pack.bonus && <div className="text-xs mb-2" style={{ color: "#FBBF24" }}>{pack.bonus}</div>}
                  <button className="btn-game text-xs py-2 w-full mt-2">{pack.price}</button>
                </div>
              ))}
            </div>
            {/* Daily bonus */}
            <div className="rounded-2xl p-4 flex items-center gap-4"
              style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(236,72,153,0.15))", border: "1px solid rgba(124,58,237,0.3)" }}>
              <div className="text-3xl">🎁</div>
              <div className="flex-1">
                <div className="font-bold text-white text-sm">Ежедневный бонус</div>
                <div className="text-xs" style={{ color: "#9CA3AF" }}>Заходи каждый день и получай монеты</div>
              </div>
              <button className="btn-game text-xs py-2 px-4">+100 🪙</button>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {page === "profile" && (
          <div className="animate-fade-in">
            <h1 className="text-xl font-black text-white mb-4">👤 Профиль</h1>
            {/* Avatar + info */}
            <div className="rounded-2xl p-6 mb-4 text-center"
              style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.25),rgba(236,72,153,0.15))", border: "1px solid rgba(124,58,237,0.3)" }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-3 animate-pulse-glow"
                style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)" }}>
                ⭐
              </div>
              <div className="text-xl font-black text-white mb-1">GamePlayer123</div>
              <div className="text-sm mb-3" style={{ color: "#A78BFA" }}>Уровень 24 · Топ 6 в рейтинге</div>
              <div className="flex justify-center gap-3">
                <div className="text-center">
                  <div className="font-black text-white text-lg">134</div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>Победы</div>
                </div>
                <div className="w-px" style={{ background: "rgba(124,58,237,0.3)" }} />
                <div className="text-center">
                  <div className="font-black text-white text-lg">67</div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>Поражения</div>
                </div>
                <div className="w-px" style={{ background: "rgba(124,58,237,0.3)" }} />
                <div className="text-center">
                  <div className="font-black text-white text-lg">66%</div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>Винрейт</div>
                </div>
              </div>
            </div>
            {/* Favourite games */}
            <h2 className="font-bold text-white text-base mb-3">Любимые игры</h2>
            <div className="flex gap-2 flex-wrap mb-4">
              {["♟️ Шахматы", "🎲 Нарды", "⚓ Морской бой"].map(g => (
                <span key={g} className="tag-badge px-3 py-2"
                  style={{ background: "rgba(124,58,237,0.2)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.3)", fontSize: "0.8rem" }}>
                  {g}
                </span>
              ))}
            </div>
            {/* Settings */}
            <div className="space-y-2">
              {["Редактировать профиль", "Настройки уведомлений", "Конфиденциальность", "Помощь"].map(s => (
                <button key={s} className="game-card w-full rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-sm text-white font-semibold">{s}</span>
                  <Icon name="ChevronRight" size={16} style={{ color: "#7C3AED" }} />
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* GAME MODAL */}
      {showGameModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowGameModal(null)}>
          <div className="w-full max-w-sm rounded-3xl p-6 animate-scale-in"
            style={{ background: "linear-gradient(135deg, #1a0533, #0d0d2b)", border: "1px solid rgba(124,58,237,0.4)" }}
            onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="text-7xl mb-3">{showGameModal.emoji}</div>
              <h2 className="text-2xl font-black text-white mb-1">{showGameModal.name}</h2>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="tag-badge" style={{ background: "rgba(124,58,237,0.2)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.3)" }}>
                  👥 {showGameModal.players} игрока
                </span>
                <span className="tag-badge" style={{ background: "rgba(16,185,129,0.2)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }}>
                  🟢 {showGameModal.online} онлайн
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <button className="btn-game w-full text-base py-4">🎮 Играть с другом</button>
              <button className="w-full text-base py-4 rounded-xl font-bold transition-all"
                style={{ background: "rgba(124,58,237,0.2)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.3)" }}>
                🌐 Найти соперника
              </button>
              <button className="w-full text-sm py-3 rounded-xl font-semibold"
                style={{ background: "transparent", color: "#6B7280" }}
                onClick={() => setShowGameModal(null)}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
