import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

const ESTADOS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

export default function Cadastro() {
  const { t } = useLanguage()
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', cpf: '', email: '', phone: '',
    password: '', confirmPass: '',
    cep: '', street: '', number: '', complement: '',
    neighborhood: '', city: '', state: 'PR',
  })
  const [error, setError] = useState('')

  function handleChange(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirmPass) {
      setError('As senhas não coincidem.')
      return
    }
    register(form)
    navigate('/')
  }

  const fields = [
    { key: 'name', label: t('register_name'), type: 'text', span: 2 },
    { key: 'cpf', label: t('register_cpf'), type: 'text' },
    { key: 'phone', label: t('register_phone'), type: 'tel' },
    { key: 'email', label: t('register_email'), type: 'email', span: 2 },
    { key: 'password', label: t('register_password'), type: 'password' },
    { key: 'confirmPass', label: t('register_confirm_pass'), type: 'password' },
    { key: 'cep', label: t('register_cep'), type: 'text' },
    { key: 'state', label: t('register_state'), type: 'select' },
    { key: 'street', label: t('register_street'), type: 'text', span: 2 },
    { key: 'number', label: t('register_number'), type: 'text' },
    { key: 'complement', label: t('register_complement'), type: 'text' },
    { key: 'neighborhood', label: t('register_neighborhood'), type: 'text' },
    { key: 'city', label: t('register_city'), type: 'text' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#3f533c] flex items-center justify-center">
                <span className="text-white font-black text-sm">SB</span>
              </div>
              <span className="text-gray-900 font-bold text-xl">SmartBugs</span>
            </div>
          </div>

          <h1 className="text-2xl font-black text-gray-900 text-center mb-6">{t('register_title')}</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map(field => (
                <div key={field.key} className={field.span === 2 ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      value={form[field.key]}
                      onChange={e => handleChange(field.key, e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]"
                    >
                      {ESTADOS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={e => handleChange(field.key, e.target.value)}
                      required={field.key !== 'complement'}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#3f533c] text-white py-4 rounded-xl font-bold text-base mt-6 hover:bg-[#2d3d2b] transition-colors"
            >
              {t('register_btn')}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            <Link to="/login" className="text-[#fb5421] font-semibold hover:underline">{t('register_login_link')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
