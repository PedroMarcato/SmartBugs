import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { mockContacts } from '../../data/mockBudgets'

export default function AdminContatos() {
  const { t } = useLanguage()
  const [contacts, setContacts] = useState(mockContacts)
  const [expanded, setExpanded] = useState(null)

  function markRead(id) {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, read: true } : c))
  }

  const unread = contacts.filter(c => !c.read).length

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-black text-gray-900">{t('admin_contacts')}</h1>
        {unread > 0 && (
          <span className="bg-[#fb5421] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {unread} nova{unread > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {contacts.map(c => (
          <div
            key={c.id}
            className={`bg-white rounded-2xl shadow-sm overflow-hidden border ${c.read ? 'border-transparent' : 'border-[#fb5421]/30'}`}
          >
            <div
              className="flex flex-wrap items-center gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => { setExpanded(expanded === c.id ? null : c.id); markRead(c.id) }}
            >
              <div className="w-10 h-10 rounded-full bg-[#e8f0e7] flex items-center justify-center flex-shrink-0 font-bold text-[#3f533c]">
                {c.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-gray-900">{c.name}</p>
                  {!c.read && <span className="text-xs bg-[#fb5421] text-white px-2 py-0.5 rounded-full">Novo</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${c.type === 'internacional' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    <i className={`fa-solid ${c.type === 'internacional' ? 'fa-globe' : 'fa-flag'}`}></i>
                    {c.type === 'internacional' ? 'Internacional' : 'Nacional'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">{c.subject}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <p className="text-xs text-gray-400">{c.date}</p>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${expanded === c.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {expanded === c.id && (
              <div className="px-5 pb-5 border-t border-gray-100">
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">Nome</p>
                    <p className="text-sm text-gray-800">{c.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">E-mail</p>
                    <a href={`mailto:${c.email}`} className="text-sm text-[#3f533c] hover:underline">{c.email}</a>
                  </div>
                  {c.country && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">País</p>
                      <p className="text-sm text-gray-800">{c.country}</p>
                    </div>
                  )}
                  {c.company && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-1">Empresa</p>
                      <p className="text-sm text-gray-800">{c.company}</p>
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Assunto</p>
                    <p className="text-sm font-medium text-gray-800">{c.subject}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 mb-1">Mensagem</p>
                    <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{c.message}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href={`mailto:${c.email}?subject=Re: ${c.subject}`}
                    className="bg-[#3f533c] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#2d3d2b] transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Responder
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
