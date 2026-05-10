import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Icon from '@/components/ui/icon';
import HomePage from '@/pages/HomePage';
import OrdersPage from '@/pages/OrdersPage';
import StatsPage from '@/pages/StatsPage';
import ProfilePage from '@/pages/ProfilePage';

type Page = 'home' | 'orders' | 'stats' | 'profile';

const navItems = [
  { id: 'home' as Page, label: 'Главная', icon: 'LayoutDashboard' },
  { id: 'orders' as Page, label: 'Заказы', icon: 'ShoppingBag' },
  { id: 'stats' as Page, label: 'Статистика', icon: 'BarChart3' },
  { id: 'profile' as Page, label: 'Профиль', icon: 'User' },
];

export default function App() {
  const [page, setPage] = useState<Page>('home');

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage />;
      case 'orders': return <OrdersPage />;
      case 'stats': return <StatsPage />;
      case 'profile': return <ProfilePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Toaster />

      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex flex-col w-60 border-r border-border shrink-0 sticky top-0 h-screen">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm"
              style={{ background: 'var(--neon-green)', color: '#0a0f0d' }}>
              F
            </div>
            <div>
              <p className="font-display font-bold text-lg tracking-wider text-foreground leading-none">FRIDE</p>
              <p className="text-xs text-muted-foreground mt-0.5">Управление заказами</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => {
            const isActive = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                style={isActive
                  ? { background: 'rgba(0,255,135,0.12)', color: 'var(--neon-green)', borderLeft: '2px solid var(--neon-green)', paddingLeft: '10px' }
                  : { color: 'hsl(var(--muted-foreground))' }
                }
                onMouseEnter={e => !isActive && (e.currentTarget.style.background = 'hsl(var(--secondary))')}
                onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom user */}
        <div className="px-3 py-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-xs shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--neon-green), var(--neon-blue))', color: '#0a0f0d' }}>
              АК
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Александр Крылов</p>
              <p className="text-xs text-muted-foreground truncate">Администратор</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="hidden md:block">
            <p className="text-sm font-display font-semibold tracking-wide text-foreground">
              {navItems.find(n => n.id === page)?.label}
            </p>
          </div>
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs"
              style={{ background: 'var(--neon-green)', color: '#0a0f0d' }}>F</div>
            <span className="font-display font-bold tracking-widest text-foreground">FRIDE</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Icon name="Bell" size={18} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--neon-green)' }} />
            </button>
            <button className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Icon name="Settings" size={18} className="text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 md:px-8 py-6 pb-24 md:pb-6 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-20">
        <div className="flex">
          {navItems.map(item => {
            const isActive = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors"
                style={{ color: isActive ? 'var(--neon-green)' : 'hsl(var(--muted-foreground))' }}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
