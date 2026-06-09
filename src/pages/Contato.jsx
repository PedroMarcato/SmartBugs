import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Contato() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('br')
  const [sent, setSent] = useState(false)
  const [sentIntl, setSentIntl] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [intlForm, setIntlForm] = useState({ name: '', email: '', company: '', country: '', message: '' })

  function handleChange(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }
  function handleIntlChange(key, val) {
    setIntlForm(f => ({ ...f, [key]: val }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#3f533c] py-16 px-4 text-center">
        <h1 className="text-4xl font-black text-white mb-3">{t('contact_title')}</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-2xl p-1 shadow-sm w-fit">
          <button
            onClick={() => { setActiveTab('br'); setSent(false); setSentIntl(false) }}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'br' ? 'bg-[#3f533c] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="fa-solid fa-flag mr-2"></i>{t('contact_tab_br')}
          </button>
          <button
            onClick={() => { setActiveTab('intl'); setSent(false); setSentIntl(false) }}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'intl' ? 'bg-[#3f533c] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <i className="fa-solid fa-globe mr-2"></i>{t('contact_tab_intl')}
          </button>
        </div>

        {/* Brazilian Contact */}
        {activeTab === 'br' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact info */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Informações de Contato</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'fa-envelope', label: t('contact_email_label'), value: 'contato@smartbugs.com.br', href: 'mailto:contato@smartbugs.com.br' },
                    { icon: 'fa-phone', label: t('contact_phone_label'), value: '(41) 3333-4444', href: 'tel:+554133334444' },
                    { icon: 'fa-brands fa-whatsapp', label: 'WhatsApp', value: '(41) 99999-8888', href: 'https://wa.me/554199998888' },
                    { icon: 'fa-location-dot', label: t('contact_address_label'), value: t('contact_address_value'), href: null },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#e8f0e7] rounded-xl flex items-center justify-center flex-shrink-0">
                        <i className={`fa-solid ${item.icon} text-[#3f533c]`}></i>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-[#3f533c] font-medium hover:underline text-sm">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-gray-800 text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#e8f0e7] rounded-2xl p-5">
                <p className="text-sm text-[#3f533c] font-medium"><i className="fa-regular fa-clock mr-1"></i> Horário de atendimento:</p>
                <p className="text-sm text-gray-700 mt-1">Segunda a Sexta, das 8h às 18h (horário de Brasília)</p>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {sent ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[#3f533c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-bold text-gray-800 mb-1">{t('contact_success')}</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{t('contact_form_name')}</label>
                    <input type="text" value={form.name} onChange={e => handleChange('name', e.target.value)} required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{t('contact_form_email')}</label>
                    <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{t('contact_form_subject')}</label>
                    <input type="text" value={form.subject} onChange={e => handleChange('subject', e.target.value)} required
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{t('contact_form_message')}</label>
                    <textarea value={form.message} onChange={e => handleChange('message', e.target.value)} required rows={4}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full bg-[#3f533c] text-white py-3 rounded-xl font-bold hover:bg-[#2d3d2b] transition-colors">
                    {t('contact_form_submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* International Contact */}
        {activeTab === 'intl' && (
          <div className="max-w-2xl">
            <div className="bg-[#3f533c] rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-black text-white mb-2">{t('contact_intl_title')}</h2>
              <p className="text-green-200 text-sm">{t('contact_intl_text')}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="mailto:export@smartbugs.com.br" className="bg-white/10 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/20 transition-colors">
                  <i className="fa-solid fa-envelope mr-1"></i> export@smartbugs.com.br
                </a>
                <a href="https://wa.me/554199998889" className="bg-[#fb5421] text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-600 transition-colors">
                  <i className="fa-brands fa-whatsapp mr-1"></i> WhatsApp (International)
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {sentIntl ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#3f533c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-bold text-gray-800">{t('contact_success')}</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSentIntl(true) }} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{t('contact_form_name')}</label>
                      <input type="text" value={intlForm.name} onChange={e => handleIntlChange('name', e.target.value)} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{t('contact_form_company')}</label>
                      <input type="text" value={intlForm.company} onChange={e => handleIntlChange('company', e.target.value)} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{t('contact_form_country')}</label>
                      <input type="text" value={intlForm.country} onChange={e => handleIntlChange('country', e.target.value)} required
                        placeholder="Ex: Argentina, USA, Chile..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{t('contact_form_email')}</label>
                      <input type="email" value={intlForm.email} onChange={e => handleIntlChange('email', e.target.value)} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{t('contact_form_message')}</label>
                      <textarea value={intlForm.message} onChange={e => handleIntlChange('message', e.target.value)} required rows={5}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] resize-none" />
                    </div>
                  </div>
                  <button type="submit"
                    className="w-full bg-[#fb5421] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
                    {t('contact_form_submit')}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
