import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'
import FreightCalculator from '../components/FreightCalculator'
import { useState } from 'react'

export default function Carrinho() {
  const { t, lang } = useLanguage()
  const { items, removeItem, updateQty, subtotal, clearCart } = useCart()
  const [freight, setFreight] = useState(null)

  const total = subtotal + (freight?.price || 0)

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('cart_title')}</h1>
        <p className="text-gray-500 mb-6">{t('cart_empty')}</p>
        <Link to="/loja" className="bg-[#3f533c] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2d3d2b] transition-colors">
          {t('cart_empty_cta')}
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-gray-900 mb-8">{t('cart_title')}</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              const name = item.product.name[lang] || item.product.name.pt
              return (
                <div key={item.key} className="bg-white rounded-2xl p-5 shadow-sm flex gap-4">
                  <div className="w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.product.image} alt={name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900">{name}</p>
                    {item.color && (
                      <p className="text-sm text-gray-500">{t('color_label')}: {item.color}</p>
                    )}
                    <p className="text-sm font-semibold text-[#3f533c]">
                      R$ {item.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / un.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.key, item.qty - (item.product.hasMinQty ? item.product.minQty : 1))}
                        className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#3f533c] transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-16 text-center">{item.qty.toLocaleString('pt-BR')}</span>
                      <button
                        onClick={() => updateQty(item.key, item.qty + (item.product.hasMinQty ? item.product.minQty : 1))}
                        className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#3f533c] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <p className="font-bold text-gray-900">
                      R$ {(item.product.price * item.qty).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      {t('cart_remove')}
                    </button>
                  </div>
                </div>
              )
            })}

            <div className="flex justify-between items-center pt-2">
              <Link to="/loja" className="text-sm text-[#3f533c] hover:underline font-medium">
                ← {t('cart_continue')}
              </Link>
              <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 transition-colors">
                Limpar carrinho
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-4">Resumo do Pedido</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart_subtotal')}</span>
                  <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart_freight')}</span>
                  <span>{freight ? `R$ ${freight.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '—'}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-base">
                  <span>{t('cart_total')}</span>
                  <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full text-center bg-[#fb5421] text-white py-3 rounded-xl font-bold mt-5 hover:bg-orange-600 transition-colors"
              >
                {t('cart_checkout')}
              </Link>
            </div>

            <FreightCalculator onSelect={setFreight} />
          </div>
        </div>
      </div>
    </div>
  )
}
