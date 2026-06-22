import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, onAddToCart }) {
  const { lang, t } = useLanguage()
  const { addItem } = useCart()

  const name = product.name[lang] || product.name.pt
  const tagline = product.tagline[lang] || product.tagline.pt

  function handleAdd() {
    addItem(product, product.hasMinQty ? product.minQty : 1, product.colors[0] || null)
    if (onAddToCart) onAddToCart()
  }

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col border border-gray-100 group">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-52">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.isPrototype && (
          <span className="absolute top-3 left-3 bg-[#fb5421] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {t('prototype_badge')}
          </span>
        )}
        {product.inStock ? (
          <span className="absolute top-3 right-3 bg-[#3f533c] text-white text-xs px-2 py-1 rounded-full">
            {t('in_stock')}
          </span>
        ) : (
          <span className="absolute top-3 right-3 bg-gray-400 text-white text-xs px-2 py-1 rounded-full">
            {t('on_request')}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-3 flex-1">{tagline}</p>

        {/*{product.hasMinQty && (
          <p className="text-xs text-[#fb5421] font-medium mb-3">
            {t('min_qty')}: {product.minQty.toLocaleString('pt-BR')} {t('unit')}
          </p>
        )}*/}

        {product.colors.length > 0 && (
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {product.colors.map(c => (
              <span
                key={c}
                title={c}
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: product.colorMap[c] || '#ccc' }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <span className="text-xl font-bold text-[#3f533c]">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            {product.hasMinQty && (
              <span className="text-xs text-[#fb5421] block"></span>
            )}
          </div>
          <div className="flex gap-2">
            <Link
              to={`/loja/${product.slug}`}
              className="text-sm px-3 py-2 border border-[#3f533c] text-[#3f533c] rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
              Ver
            </Link>
            <button
              onClick={handleAdd}
              className="text-sm px-3 py-2 bg-[#fb5421] text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              {t('add_to_cart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
