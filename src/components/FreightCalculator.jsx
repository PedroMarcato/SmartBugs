import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const CARRIERS = [
  { name: 'Jadlog', icon: 'fa-box', baseDays: 3, basePrice: 45 },
  { name: 'Azul Cargo', icon: 'fa-plane', baseDays: 2, basePrice: 62 },
  { name: 'Sequoia', icon: 'fa-truck', baseDays: 4, basePrice: 38 },
]

function mockFreight(cep) {
  const digits = cep.replace(/\D/g, '')
  const seed = parseInt(digits.slice(0, 2)) || 10
  return CARRIERS.map((c, i) => ({
    ...c,
    price: parseFloat((c.basePrice + seed * 0.7 + i * 5).toFixed(2)),
    days: c.baseDays + (seed % 2),
  }))
}

export default function FreightCalculator({ onSelect }) {
  const { t } = useLanguage()
  const [cep, setCep] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)

  function formatCep(v) {
    const d = v.replace(/\D/g, '').slice(0, 8)
    return d.length > 5 ? d.slice(0, 5) + '-' + d.slice(5) : d
  }

  function handleCalc() {
    const digits = cep.replace(/\D/g, '')
    if (digits.length < 8) return
    setLoading(true)
    setTimeout(() => {
      setResults(mockFreight(digits))
      setLoading(false)
    }, 800)
  }

  function handleSelect(carrier) {
    setSelected(carrier.name)
    if (onSelect) onSelect(carrier)
  }

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <i className="fa-solid fa-location-dot text-[#3f533c] w-5 h-5"></i>
        {t('freight_title')}
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={cep}
          onChange={e => setCep(formatCep(e.target.value))}
          placeholder={t('freight_cep')}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]"
          maxLength={9}
          onKeyDown={e => e.key === 'Enter' && handleCalc()}
        />
        <button
          onClick={handleCalc}
          disabled={loading}
          className="bg-[#3f533c] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2d3d2b] transition-colors disabled:opacity-60"
        >
          {loading ? '...' : t('freight_calc')}
        </button>
      </div>

      {results && (
        <div className="mt-3 space-y-2">
          {results.map(r => (
            <button
              key={r.name}
              onClick={() => handleSelect(r)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                selected === r.name
                  ? 'border-[#3f533c] bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#e8f0e7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid ${r.icon} text-[#3f533c] text-sm`}></i>
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.days} {t('freight_days')}</p>
                </div>
              </div>
              <span className="font-bold text-[#3f533c]">
                R$ {r.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
