import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { products } from '../data/products'

export default function Orcamento() {
  const { lang, t } = useLanguage()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    company: '', email: '', phone: '', product: products[0].id,
    qty: '', deadline: '', message: '',
  })

  function handleChange(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#3f533c] py-16 px-4 text-center">
        <h1 className="text-4xl font-black text-white mb-3">{t('quote_title')}</h1>
        <p className="text-green-200 text-lg max-w-2xl mx-auto">{t('quote_subtitle')}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14">
        {sent ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#3f533c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">{t('quote_success')}</h2>
            <p className="text-gray-500">Retornaremos em até 1 dia útil pelo e-mail informado.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('quote_company')}</label>
                  <input type="text" value={form.company} onChange={e => handleChange('company', e.target.value)} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('quote_email')}</label>
                  <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('quote_phone')}</label>
                  <input type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)} required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('quote_product')}</label>
                  <select value={form.product} onChange={e => handleChange('product', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]">
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name[lang] || p.name.pt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('quote_qty')}</label>
                  <input type="text" value={form.qty} onChange={e => handleChange('qty', e.target.value)} required
                    placeholder="Ex: 50.000 unidades"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('quote_deadline')}</label>
                  <input type="text" value={form.deadline} onChange={e => handleChange('deadline', e.target.value)}
                    placeholder="Ex: Janeiro/2025"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{t('quote_message')}</label>
                  <textarea value={form.message} onChange={e => handleChange('message', e.target.value)} rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] resize-none" />
                </div>
              </div>
              <button type="submit"
                className="w-full bg-[#fb5421] text-white py-4 rounded-xl font-black text-lg hover:bg-orange-600 transition-colors">
                {t('quote_submit')}
              </button>
            </form>
          </div>
        )}

        {/* Info box */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { icon: 'fa-bolt', title: 'Resposta rápida', text: 'Até 1 dia útil para retorno' },
            { icon: 'fa-box', title: 'Grandes volumes', text: 'Sem limite máximo de pedido' },
            { icon: 'fa-handshake', title: 'Negociação direta', text: 'Com nossa equipe comercial' },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <i className={`fa-solid ${item.icon} text-[#fb5421] text-3xl mb-3 block`}></i>
              <p className="font-bold text-gray-800 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
