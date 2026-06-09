import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Loja() {
  const { t } = useLanguage()
  const [colorFilter, setColorFilter] = useState('all')
  const [cartFlash, setCartFlash] = useState(false)

  const allColors = [...new Set(products.flatMap(p => p.colors))]

  const filtered = colorFilter === 'all'
    ? products
    : products.filter(p => p.colors.includes(colorFilter) || p.colors.length === 0)

  function handleAdd() {
    setCartFlash(true)
    setTimeout(() => setCartFlash(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {cartFlash && (
        <div className="fixed top-20 right-4 z-50 bg-[#3f533c] text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium">
          {t('added_to_cart')}
        </div>
      )}

      {/* Header */}
      <div className="bg-[#3f533c] py-12 px-4 text-center">
        <h1 className="text-4xl font-black text-white mb-2">{t('shop_title')}</h1>
        <p className="text-green-200">{t('shop_subtitle')}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-8 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-gray-600">{t('filter_color')}:</span>
          <button
            onClick={() => setColorFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              colorFilter === 'all'
                ? 'bg-[#3f533c] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('all_colors')}
          </button>
          {allColors.map(c => (
            <button
              key={c}
              onClick={() => setColorFilter(c)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                colorFilter === c
                  ? 'ring-2 ring-[#3f533c] bg-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                style={{ backgroundColor: products[0].colorMap[c] || '#ccc' }}
              />
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={handleAdd} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Nenhum produto encontrado para este filtro.</p>
          </div>
        )}
      </div>
    </div>
  )
}
