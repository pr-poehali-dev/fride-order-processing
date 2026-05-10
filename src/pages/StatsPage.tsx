import Icon from '@/components/ui/icon';

const weekData = [
  { day: 'Пн', orders: 34, revenue: 62000 },
  { day: 'Вт', orders: 41, revenue: 78000 },
  { day: 'Ср', orders: 28, revenue: 51000 },
  { day: 'Чт', orders: 55, revenue: 102000 },
  { day: 'Пт', orders: 63, revenue: 118000 },
  { day: 'Сб', orders: 47, revenue: 84200 },
  { day: 'Вс', orders: 19, revenue: 33000 },
];

const topClients = [
  { name: 'ООО "Техносила"', orders: 24, amount: '₽218 400', growth: '+34%' },
  { name: 'ИП Козлов А.В.', orders: 18, amount: '₽164 700', growth: '+12%' },
  { name: 'Алексей Морозов', orders: 15, amount: '₽98 500', growth: '+8%' },
  { name: 'Маша Иванова', orders: 12, amount: '₽76 800', growth: '+21%' },
  { name: 'ООО "СтройПром"', orders: 9, amount: '₽54 200', growth: '-3%' },
];

const statusStats = [
  { label: 'Выполнено', value: 847, pct: 70, color: 'var(--neon-green)' },
  { label: 'В работе', value: 156, pct: 13, color: 'var(--neon-orange)' },
  { label: 'Доставка', value: 108, pct: 9, color: 'var(--neon-purple)' },
  { label: 'Отменено', value: 93, pct: 8, color: '#ef4444' },
];

const maxRevenue = Math.max(...weekData.map(d => d.revenue));
const maxOrders = Math.max(...weekData.map(d => d.orders));

export default function StatsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Статистика</h1>
        <p className="text-muted-foreground text-sm mt-1">Аналитика за последние 7 дней</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Всего заказов', value: '1 204', sub: 'За неделю', icon: 'Package', color: 'var(--neon-green)' },
          { label: 'Выручка', value: '₽528 200', sub: 'За неделю', icon: 'Banknote', color: 'var(--neon-blue)' },
          { label: 'Ср. чек', value: '₽4 386', sub: 'За неделю', icon: 'BarChart2', color: 'var(--neon-purple)' },
          { label: 'Новых клиентов', value: '38', sub: 'За неделю', icon: 'UserPlus', color: 'var(--neon-orange)' },
        ].map((card, i) => (
          <div key={card.label} className="bg-card border border-border rounded-xl p-5 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: card.color + '18' }}>
              <Icon name={card.icon} size={18} style={{ color: card.color }} />
            </div>
            <p className="font-display text-2xl font-bold" style={{ color: card.color }}>{card.value}</p>
            <p className="text-sm text-foreground font-medium mt-0.5">{card.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue bar chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-lg font-semibold tracking-wide text-foreground">Выручка по дням</h2>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-green)' }} />Выручка</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: 'var(--neon-purple)' }} />Заказы</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 h-40">
            {weekData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="w-full flex gap-0.5 items-end" style={{ height: '120px' }}>
                  <div
                    className="flex-1 rounded-t-md transition-all duration-500 group-hover:opacity-100 opacity-80"
                    style={{ height: `${(d.revenue / maxRevenue) * 100}%`, background: 'linear-gradient(to top, var(--neon-green), rgba(0,255,135,0.4))' }}
                    title={`₽${d.revenue.toLocaleString()}`}
                  />
                  <div
                    className="flex-1 rounded-t-md transition-all duration-500 group-hover:opacity-100 opacity-60"
                    style={{ height: `${(d.orders / maxOrders) * 100}%`, background: 'linear-gradient(to top, var(--neon-purple), rgba(168,85,247,0.4))' }}
                    title={`${d.orders} заказов`}
                  />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status donut-like */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-display text-lg font-semibold tracking-wide text-foreground mb-6">По статусам</h2>
          <div className="space-y-4">
            {statusStats.map((s, i) => (
              <div key={s.label} className="animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{s.label}</span>
                  <span className="text-sm font-bold" style={{ color: s.color }}>{s.pct}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${s.pct}%`, background: s.color, boxShadow: `0 0 8px ${s.color}60`, animationDelay: `${i * 100}ms` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{s.value} заказов</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top clients */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-display text-lg font-semibold tracking-wide text-foreground">Топ клиентов</h2>
        </div>
        <div className="divide-y divide-border">
          {topClients.map((client, i) => (
            <div key={client.name} className="flex items-center px-6 py-4 hover:bg-secondary/40 transition-colors animate-slide-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0 font-display font-bold text-sm"
                style={{ background: 'var(--neon-green)18', color: 'var(--neon-green)', border: '1px solid var(--neon-green)30' }}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{client.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{client.orders} заказов</p>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold text-foreground text-sm">{client.amount}</p>
                <p className="text-xs mt-0.5 font-medium" style={{ color: client.growth.startsWith('+') ? 'var(--neon-green)' : '#ef4444' }}>
                  {client.growth}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
