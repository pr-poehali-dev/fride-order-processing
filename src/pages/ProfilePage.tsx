import { useState } from 'react';
import Icon from '@/components/ui/icon';

const notifSettings = [
  { label: 'Новые заказы', sub: 'Уведомление при поступлении нового заказа', enabled: true },
  { label: 'Готовность заказа', sub: 'Когда заказ переходит в статус "Готов"', enabled: true },
  { label: 'Отмены', sub: 'Уведомления об отменённых заказах', enabled: false },
  { label: 'Еженедельный отчёт', sub: 'Сводка по понедельникам в 9:00', enabled: true },
];

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(notifSettings);
  const [name, setName] = useState('Александр Крылов');
  const [email, setEmail] = useState('a.krylov@fride.ru');

  const toggleNotif = (i: number) => {
    setNotifications(prev => prev.map((n, idx) => idx === i ? { ...n, enabled: !n.enabled } : n));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-wide text-foreground">Профиль</h1>
        <p className="text-muted-foreground text-sm mt-1">Настройки аккаунта и уведомлений</p>
      </div>

      {/* Avatar section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-display font-bold text-2xl"
              style={{ background: 'linear-gradient(135deg, var(--neon-green) 0%, var(--neon-blue) 100%)', color: '#0a0f0d' }}>
              АК
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card flex items-center justify-center"
              style={{ background: 'var(--neon-green)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-background" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-display text-xl font-bold text-foreground tracking-wide">{name}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{email}</p>
            <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,255,135,0.12)', color: 'var(--neon-green)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--neon-green)' }} />
              Администратор
            </span>
          </div>
          <button className="shrink-0 px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-all">
            Изменить фото
          </button>
        </div>
      </div>

      {/* Personal info */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-display text-base font-semibold tracking-wide text-foreground">Личные данные</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Имя</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none transition-all"
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--neon-green)')}
              onBlur={e => (e.currentTarget.style.borderColor = '')}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none transition-all"
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--neon-green)')}
              onBlur={e => (e.currentTarget.style.borderColor = '')}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Телефон</label>
            <input
              type="tel"
              defaultValue="+7 999 123-45-67"
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none transition-all"
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--neon-green)')}
              onBlur={e => (e.currentTarget.style.borderColor = '')}
            />
          </div>
        </div>
        <button className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: 'var(--neon-green)', color: '#0a0f0d' }}>
          Сохранить изменения
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="font-display text-base font-semibold tracking-wide text-foreground">Уведомления</h2>
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <div key={n.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex-1 pr-4">
                <p className="text-sm font-medium text-foreground">{n.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.sub}</p>
              </div>
              <button
                onClick={() => toggleNotif(i)}
                className="relative w-11 h-6 rounded-full transition-all duration-300 shrink-0"
                style={{ background: n.enabled ? 'var(--neon-green)' : 'hsl(var(--secondary))' }}
              >
                <span
                  className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300"
                  style={{ left: n.enabled ? '24px' : '4px', background: n.enabled ? '#0a0f0d' : 'hsl(var(--muted-foreground))' }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-display text-base font-semibold tracking-wide mb-4" style={{ color: '#ef4444' }}>Опасная зона</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Выйти из аккаунта</p>
            <p className="text-xs text-muted-foreground mt-0.5">Завершить текущую сессию</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all"
            style={{ borderColor: '#ef444440', color: '#ef4444' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#ef444412')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <Icon name="LogOut" size={16} />
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
}
