import Icon from '@/components/ui/icon';

const stats = [
  { label: 'Заказов сегодня', value: '47', change: '+12%', color: 'var(--neon-green)', icon: 'ShoppingBag' },
  { label: 'В обработке', value: '13', change: '4 срочных', color: 'var(--neon-orange)', icon: 'Clock' },
  { label: 'Выполнено', value: '1 204', change: '+8% этот месяц', color: 'var(--neon-blue)', icon: 'CheckCircle' },
  { label: 'Выручка сегодня', value: '₽84 200', change: '+23% к вчера', color: 'var(--neon-purple)', icon: 'TrendingUp' },
];

const recentOrders = [
  { id: '#1910213', client: 'Алексей Морозов', amount: '₽3 400', status: 'Новый', time: '2 мин назад' },
  { id: '#1910212', client: 'Маша Иванова', amount: '₽7 800', status: 'В работе', time: '18 мин назад' },
  { id: '#1910211', client: 'Дмитрий Соколов', amount: '₽1 200', status: 'Готов', time: '45 мин назад' },
  { id: '#1910210', client: 'ООО "Техносила"', amount: '₽22 500', status: 'Доставка', time: '1 ч назад' },
  { id: '#1910209', client: 'Кристина Волкова', amount: '₽5 600', status: 'Выполнен', time: '2 ч назад' },
];

const statusColors: Record<string, string> = {
  'Новый': 'text-neon-green border-neon-green',
  'В работе': 'text-neon-orange',
  'Готов': 'text-neon-blue',
  'Доставка': 'text-neon-purple',
  'Выполнен': 'text-muted-foreground',
};

export default function HomePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border p-8">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: 'var(--neon-green)' }} />
        <div className="relative z-10">
          <p className="text-muted-foreground text-sm font-medium mb-1">Понедельник, 11 мая 2026</p>
          <h1 className="font-display text-4xl font-bold text-foreground tracking-wide mb-2">
            Добро пожаловать <span style={{ color: 'var(--neon-green)' }}>в Fride</span>
          </h1>
          <p className="text-muted-foreground">Сегодня поступило 47 новых заказов — продуктивный день!</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-5 hover:border-opacity-70 transition-all duration-300 cursor-default group animate-slide-up"
            style={{ animationDelay: `${i * 80}ms`, borderColor: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = stat.color + '55')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'transparent')}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: stat.color + '18' }}>
                <Icon name={stat.icon} size={18} style={{ color: stat.color }} />
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{stat.change}</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground tracking-wide mb-1" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-muted-foreground text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-display text-lg font-semibold tracking-wide text-foreground">Последние заказы</h2>
          <span className="text-xs text-muted-foreground">Сегодня</span>
        </div>
        <div className="divide-y divide-border">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center px-6 py-4 hover:bg-secondary/40 transition-colors cursor-pointer group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-display font-semibold text-foreground tracking-wide">{order.id}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColors[order.status]}`} style={{ borderColor: 'currentColor', borderOpacity: 0.3 }}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5 truncate">{order.client}</p>
              </div>
              <div className="text-right ml-4 shrink-0">
                <p className="font-semibold text-foreground">{order.amount}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{order.time}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="ml-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}