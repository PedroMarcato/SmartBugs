import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { t } = useLanguage()
  const { login, loginAsAdmin } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const result = login(email, password)
    if (result.ok) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  function handleAdminAccess() {
    loginAsAdmin()
    navigate('/admin')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#3f533c] flex items-center justify-center">
                <span className="text-white font-black text-sm">SB</span>
              </div>
              <span className="text-gray-900 font-bold text-xl">SmartBugs</span>
            </div>
          </div>

          <h1 className="text-2xl font-black text-gray-900 text-center mb-6">{t('login_title')}</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">{t('login_email')}</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">{t('login_password')}</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]"
              />
            </div>
            <div className="text-right">
              <button type="button" className="text-xs text-[#3f533c] hover:underline">{t('login_forgot')}</button>
            </div>
            <button
              type="submit"
              className="w-full bg-[#3f533c] text-white py-3 rounded-xl font-bold hover:bg-[#2d3d2b] transition-colors"
            >
              {t('login_btn')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            <Link to="/cadastro" className="text-[#fb5421] font-semibold hover:underline">{t('login_register_link')}</Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-500">
            <p className="font-semibold mb-1 text-gray-600">Credenciais de demonstração:</p>
            <p>Cliente: joao@email.com / 123456</p>
            <p>Admin: admin@smartbugs.com.br / admin123</p>
          </div>

          {/* Quick admin access */}
          <button
            onClick={handleAdminAccess}
            className="mt-3 w-full border-2 border-[#fb5421] text-[#fb5421] py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors"
          >
            {t('admin_access_btn')}
          </button>
        </div>
      </div>
    </div>
  )
}
