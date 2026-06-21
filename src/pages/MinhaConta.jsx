import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

const ESTADOS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

const TABS = ['personal', 'address', 'security']

function ReadonlyField({ label, value, hint }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1">
        {label}
        <span className="ml-1.5 text-gray-400" title={hint}>
          <i className="fa-solid fa-lock text-[10px]"></i>
        </span>
      </label>
      <div className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed flex items-center justify-between">
        <span>{value || '—'}</span>
        <i className="fa-solid fa-lock text-gray-300 text-xs"></i>
      </div>
      <p className="text-xs text-gray-400 mt-1">{hint}</p>
    </div>
  )
}

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all ${
      type === 'success' ? 'bg-[#3f533c]' : 'bg-red-500'
    }`}>
      <i className={`fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
      {message}
    </div>
  )
}

export default function MinhaConta() {
  const { t } = useLanguage()
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('personal')
  const [toast, setToast] = useState(null)

  // Personal form state — pre-fill from user
  const [personal, setPersonal] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  // Address form state
  const [address, setAddress] = useState({
    cep: user?.cep || '',
    street: user?.street || '',
    number: user?.number || '',
    complement: user?.complement || '',
    neighborhood: user?.neighborhood || '',
    city: user?.city || '',
    state: user?.state || 'PR',
  })

  // Password form state
  const [security, setSecurity] = useState({
    currentPass: '',
    newPass: '',
    confirmPass: '',
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  if (!user) return null

  function showToast(message, type = 'success') {
    setToast({ message, type })
  }

  // ── Handlers ──────────────────────────────

  function handleSavePersonal(e) {
    e.preventDefault()
    updateProfile({ name: personal.name, email: personal.email, phone: personal.phone })
    showToast(t('profile_saved'))
  }

  function handleSaveAddress(e) {
    e.preventDefault()
    updateProfile({ ...address })
    showToast(t('profile_saved'))
  }

  function handleSaveSecurity(e) {
    e.preventDefault()
    if (security.newPass !== security.confirmPass) {
      showToast(t('profile_pass_mismatch'), 'error')
      return
    }
    if (security.currentPass !== user.password) {
      showToast(t('profile_pass_wrong'), 'error')
      return
    }
    updateProfile({ password: security.newPass })
    setSecurity({ currentPass: '', newPass: '', confirmPass: '' })
    showToast(t('profile_pass_saved'))
  }

  // ── Tab definitions ────────────────────────

  const tabLabels = {
    personal: t('profile_tab_personal'),
    address: t('profile_tab_address'),
    security: t('profile_tab_security'),
  }

  const tabIcons = {
    personal: 'fa-user',
    address: 'fa-location-dot',
    security: 'fa-shield-halved',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Page Header */}
      <div className="bg-[#3f533c] py-14 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-5">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-[#fb5421] flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-white font-black text-2xl">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white">{user.name}</h1>
            <p className="text-green-200 text-sm mt-0.5">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white rounded-2xl p-1 shadow-sm w-fit flex-wrap">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeTab === tab
                  ? 'bg-[#3f533c] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className={`fa-solid ${tabIcons[tab]}`}></i>
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        {/* ── Tab: Dados Pessoais ── */}
        {activeTab === 'personal' && (
          <form onSubmit={handleSavePersonal}>
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-user text-[#3f533c]"></i>
                {t('profile_tab_personal')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Editable fields */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_name')}</label>
                  <input
                    type="text"
                    value={personal.name}
                    onChange={e => setPersonal(p => ({ ...p, name: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_email')}</label>
                  <input
                    type="email"
                    value={personal.email}
                    onChange={e => setPersonal(p => ({ ...p, email: e.target.value }))}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_phone')}</label>
                  <input
                    type="tel"
                    value={personal.phone}
                    onChange={e => setPersonal(p => ({ ...p, phone: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  />
                </div>

                {/* Read-only fields */}
                <div>
                  <ReadonlyField
                    label={t('profile_cpf')}
                    value={user.cpf}
                    hint={t('profile_readonly_hint')}
                  />
                </div>

                <div>
                  <ReadonlyField
                    label={t('profile_birth')}
                    value={
                      user.birthDate
                        ? new Date(user.birthDate + 'T00:00:00').toLocaleDateString('pt-BR')
                        : undefined
                    }
                    hint={t('profile_readonly_hint')}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#fb5421] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  {t('profile_save')}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ── Tab: Endereço ── */}
        {activeTab === 'address' && (
          <form onSubmit={handleSaveAddress}>
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-[#3f533c]"></i>
                {t('profile_tab_address')}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_cep')}</label>
                  <input
                    type="text"
                    value={address.cep}
                    onChange={e => setAddress(a => ({ ...a, cep: e.target.value }))}
                    maxLength={9}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_state')}</label>
                  <select
                    value={address.state}
                    onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  >
                    {ESTADOS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_street')}</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={e => setAddress(a => ({ ...a, street: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_number')}</label>
                  <input
                    type="text"
                    value={address.number}
                    onChange={e => setAddress(a => ({ ...a, number: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_complement')}</label>
                  <input
                    type="text"
                    value={address.complement}
                    onChange={e => setAddress(a => ({ ...a, complement: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_neighborhood')}</label>
                  <input
                    type="text"
                    value={address.neighborhood}
                    onChange={e => setAddress(a => ({ ...a, neighborhood: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_city')}</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#fb5421] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
                >
                  <i className="fa-solid fa-floppy-disk"></i>
                  {t('profile_save')}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* ── Tab: Segurança ── */}
        {activeTab === 'security' && (
          <form onSubmit={handleSaveSecurity}>
            <div className="bg-white rounded-3xl shadow-sm p-8">
              <h2 className="text-lg font-black text-gray-900 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-[#3f533c]"></i>
                {t('profile_tab_security')}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Escolha uma senha segura com pelo menos 8 caracteres.
              </p>

              <div className="max-w-md space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_current_pass')}</label>
                  <input
                    type="password"
                    value={security.currentPass}
                    onChange={e => setSecurity(s => ({ ...s, currentPass: e.target.value }))}
                    required
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                  />
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_new_pass')}</label>
                      <input
                        type="password"
                        value={security.newPass}
                        onChange={e => setSecurity(s => ({ ...s, newPass: e.target.value }))}
                        required
                        minLength={6}
                        placeholder="••••••••"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{t('profile_confirm_pass')}</label>
                      <input
                        type="password"
                        value={security.confirmPass}
                        onChange={e => setSecurity(s => ({ ...s, confirmPass: e.target.value }))}
                        required
                        minLength={6}
                        placeholder="••••••••"
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition ${
                          security.confirmPass && security.newPass !== security.confirmPass
                            ? 'border-red-300 focus:ring-red-300'
                            : 'border-gray-200 focus:ring-[#3f533c]'
                        }`}
                      />
                      {security.confirmPass && security.newPass !== security.confirmPass && (
                        <p className="text-xs text-red-500 mt-1">
                          <i className="fa-solid fa-circle-exclamation mr-1"></i>
                          {t('profile_pass_mismatch')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#fb5421] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
                >
                  <i className="fa-solid fa-key"></i>
                  {t('profile_save')}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
