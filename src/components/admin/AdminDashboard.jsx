export default function AdminDashboard({ data }) {
  const activeBookings = data.bookings.filter(b => b.status === "active");
  const totalUsers = data.users.filter(u => u.role !== "admin");
  const openTournaments = data.tournaments.filter(t => t.status === "open");

  return (
    <div>
      <div className="section-title">Панель администратора</div>
      <div className="section-sub">Обзор системы кибер-арены</div>

      <div className="grid-4 mb-6">
        {[
          { label: "Пользователей", value: totalUsers.length, icon: "👤", color: "var(--cyan)" },
          { label: "Активных броней", value: activeBookings.length, icon: "📅", color: "#ff6b35" },
          { label: "Команд", value: data.teams.length, icon: "👥", color: "#a855f7" },
          { label: "Открытых турниров", value: openTournaments.length, icon: "🏆", color: "#10b981" },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value" style={{ color: s.color, fontSize: 24 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">ПОСЛЕДНИЕ БРОНИРОВАНИЯ</div>
          {activeBookings.length === 0
            ? <div style={{ color: "var(--muted)", fontSize: 13 }}>Нет активных бронирований</div>
            : activeBookings.slice(0, 5).map(b => {
              const user = data.users.find(u => u.id === b.userId);
              const zone = data.zones.find(z => z.id === b.zoneId);
              return (
                <div key={b.id} className="booking-row">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{user?.nick} → {zone?.name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{b.date} · {b.startHour}:00 ({b.duration}ч)</div>
                  </div>
                  <span className="badge badge-green">Место {b.seat}</span>
                </div>
              );
            })}
        </div>
        <div className="card">
          <div className="card-title">ЗАГРУЗКА ЗОН</div>
          {data.zones.map(zone => {
            const zoneBookings = activeBookings.filter(b => b.zoneId === zone.id).length;
            const load = Math.round(zoneBookings / zone.seats * 100);
            return (
              <div key={zone.id} style={{ marginBottom: 14 }}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{zone.icon} {zone.name}</span>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>{zoneBookings}/{zone.seats} мест</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${load}%`, background: load > 70 ? "linear-gradient(90deg, #ef4444, #ff6b35)" : "linear-gradient(90deg, var(--cyan), #0088ff)" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
