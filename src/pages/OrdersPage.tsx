import { useState } from 'react';
import Icon from '@/components/ui/icon';

const allOrders = [
  { id: '#1910213', client: 'Алексей Морозов', phone: '+7 999 123-45-67', amount: '₽2 600', status: 'В работе', date: '11.05.2026', items: 2 },
  { id: '#1910212', client: 'Маша Иванова', phone: '+7 912 234-56-78', amount: '₽7 800', status: 'В работе', date: '11.05.2026', items: 5 },
  { id: '#1910211', client: 'Дмитрий Соколов', phone: '+7 925 345-67-89', amount: '₽1 200', status: 'В работе', date: '11.05.2026', items: 1 },
  { id: '#1910210', client: 'ООО "Техносила"', phone: '+7 495 456-78-90', amount: '₽22 500', status: 'В работе', date: '11.05.2026', items: 12 },
  { id: '#1910209', client: 'Кристина Волкова', phone: '+7 903 567-89-01', amount: '₽5 600', status: 'В работе', date: '10.05.2026', items: 3 },
  { id: '#1910208', client: 'Игорь Петров', phone: '+7 916 678-90-12', amount: '₽9 100', status: 'В работе', date: '10.05.2026', items: 6 },
  { id: '#1910207', client: 'Анна Сидорова', phone: '+7 985 789-01-23', amount: '₽2 300', status: 'В работе', date: '10.05.2026', items: 2 },
  { id: '#1910206', client: 'ИП Козлов А.В.', phone: '+7 977 890-12-34', amount: '₽14 700', status: 'В работе', date: '10.05.2026', items: 9 },
  { id: '#1910205', client: 'Наталья Белова', phone: '+7 926 901-23-45', amount: '₽4 200', status: 'В работе', date: '10.05.2026', items: 3 },
  { id: '#1910204', client: 'Сергей Новиков', phone: '+7 963 012-34-56', amount: '₽6 800', status: 'В работе', date: '09.05.2026', items: 4 },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  'Новый':    { color: 'var(--neon-green)', bg: 'rgba(0,255,135,0.12)' },
  'В работе': { color: 'var(--neon-orange)', bg: 'rgba(249,115,22,0.12)' },
  'Готов':    { color: 'var(--neon-blue)', bg: 'rgba(59,130,246,0.12)' },
  'Доставка': { color: 'var(--neon-purple)', bg: 'rgba(168,85,247,0.12)' },
  'Выполнен': { color: '#6b7280', bg: 'rgba(107,114,128,0.12)' },
  'Отменён':  { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
};

const filters = ['Все', 'Новый', 'В работе', 'Готов', 'Доставка', 'Выполнен', 'Отменён'];

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Все');

  const filtered = allOrders.filter(o => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.phone.includes(search);
    const matchFilter = activeFilter === 'Все' || o.status === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Заказы</h1>
          <p className="text-muted-foreground text-sm mt-1">{allOrders.length} заказов всего</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
          style={{ background: 'var(--neon-green)', color: '#0a0f0d' }}>
          <Icon name="Plus" size={16} />
          Новый заказ
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск по номеру (#1910213), клиенту или телефону..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all"
          style={{ '--tw-ring-color': 'var(--neon-green)' } as React.CSSProperties}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--neon-green)')}
          onBlur={e => (e.currentTarget.style.borderColor = '')}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filters.map(f => {
          const isActive = activeFilter === f;
          const cfg = statusConfig[f];
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border"
              style={isActive && cfg
                ? { background: cfg.bg, color: cfg.color, borderColor: cfg.color + '60' }
                : isActive
                ? { background: 'var(--neon-green)', color: '#0a0f0d', borderColor: 'var(--neon-green)' }
                : { background: 'transparent', color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(var(--border))' }
              }
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Orders table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Icon name="SearchX" size={40} className="mb-3 opacity-40" />
            <p className="font-medium">Заказы не найдены</p>
            <p className="text-sm mt-1">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <>
            <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 px-6 py-3 border-b border-border">
              {['Номер', 'Клиент', 'Сумма', 'Статус', 'Дата'].map(h => (
                <span key={h} className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</span>
              ))}
            </div>
            <div className="divide-y divide-border">
              {filtered.map((order, i) => {
                const cfg = statusConfig[order.status] || { color: '#6b7280', bg: 'rgba(107,114,128,0.12)' };
                return (
                  <div
                    key={order.id}
                    className="px-6 py-4 hover:bg-secondary/40 transition-colors cursor-pointer group animate-slide-up"
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <div className="md:grid md:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 items-center">
                      <span className="font-display font-semibold text-foreground tracking-wide">{order.id}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{order.client}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{order.phone} · {order.items} поз.</p>
                      </div>
                      <span className="font-semibold text-foreground">{order.amount}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
                        style={{ background: cfg.bg, color: cfg.color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
                        {order.status}
                      </span>
                      <span className="text-sm text-muted-foreground">{order.date}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}