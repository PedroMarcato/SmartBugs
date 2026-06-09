import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const LANGS = [
  { code: 'pt', flag: '🇧🇷', label: 'PT' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
]

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: t('nav_home') },
    { to: '/produtos', label: t('nav_products') },
    { to: '/loja', label: t('nav_shop') },
    { to: '/orcamento', label: t('nav_quote') },
    { to: '/contato', label: t('nav_contact') },
  ]

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#3f533c] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#fb5421] flex items-center justify-center">
            <span className="text-white font-black text-sm">SB</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">SmartBugs</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#fb5421] text-white'
                    : 'text-green-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="hidden sm:flex items-center gap-1">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`text-sm px-2 py-1 rounded transition-all ${
                  lang === l.code
                    ? 'bg-white text-[#3f533c] font-bold'
                    : 'text-green-200 hover:text-white'
                }`}
                title={l.label}
              >
                {l.flag}
              </button>
            ))}
          </div>

          {/* Cart */}
          <Link to="/carrinho" className="relative text-green-100 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#fb5421] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              {user.role === 'admin' && (
                <Link to="/admin" className="text-xs bg-[#fb5421] text-white px-2 py-1 rounded font-medium hover:bg-orange-600 transition-colors">
                  {t('nav_admin')}
                </Link>
              )}
              <button onClick={handleLogout} className="text-xs text-green-200 hover:text-white transition-colors">
                {t('nav_logout')}
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login" className="text-sm text-green-100 hover:text-white transition-colors">
                {t('nav_login')}
              </Link>
              <Link to="/cadastro" className="text-sm bg-[#fb5421] text-white px-3 py-1.5 rounded-md font-medium hover:bg-orange-600 transition-colors">
                {t('nav_register')}
              </Link>
            </div>
          )}

          {/* Mobile menu btn */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-green-100 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#2d3d2b] border-t border-white/10 px-4 py-4 space-y-2">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-[#fb5421] text-white' : 'text-green-100 hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex gap-2">
              {LANGS.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`text-sm px-2 py-1 rounded ${lang === l.code ? 'bg-white text-[#3f533c] font-bold' : 'text-green-200'}`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
            {!user && (
              <div className="flex gap-2">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm text-green-200">{t('nav_login')}</Link>
                <Link to="/cadastro" onClick={() => setMenuOpen(false)} className="text-sm bg-[#fb5421] text-white px-3 py-1 rounded">{t('nav_register')}</Link>
              </div>
            )}
            {user && (
              <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="text-sm text-green-200">
                {t('nav_logout')}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
