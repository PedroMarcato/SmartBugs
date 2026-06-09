import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useCart } from '../context/CartContext'

const PAYMENTS = ['pix', 'debit', 'credit', 'boleto']
const INSTALLMENT_OPTIONS = [1, 2, 3, 6, 10, 12]

export default function Checkout() {
  const { t, lang } = useLanguage()
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState('form') // 'form' | 'success'
  const [payment, setPayment] = useState('pix')
  const [installments, setInstallments] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', cpf: '', phone: '',
    cep: '', street: '', number: '', complement: '',
    neighborhood: '', city: '', state: '',
  })
  const [orderNum] = useState('#SB-' + Math.random().toString(36).slice(2, 8).toUpperCase())

  function handleSubmit(e) {
    e.preventDefault()
    setStep('success')
    clearCart()
  }

  function handleChange(key, val) {
    setForm(f => ({ ...f, [key]: val }))
  }

  const paymentKey = { pix: 'checkout_pix', debit: 'checkout_debit', credit: 'checkout_credit', boleto: 'checkout_boleto' }

  if (step === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#3f533c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">{t('checkout_success_title')}</h1>
          <p className="text-gray-600 mb-4">{t('checkout_success_text')}</p>
          <p className="text-sm text-gray-500 mb-8">
            {t('checkout_order_number')}: <strong className="text-[#3f533c]">{orderNum}</strong>
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="bg-[#3f533c] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2d3d2b] transition-colors">
              Voltar ao Início
            </Link>
            <Link to="/loja" className="border-2 border-[#3f533c] text-[#3f533c] px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-black text-gray-900 mb-8">{t('checkout_title')}</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Address + Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-5">{t('checkout_address')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: t('checkout_name'), colSpan: 2 },
                    { key: 'cpf', label: t('checkout_cpf') },
                    { key: 'phone', label: t('checkout_phone') },
                    { key: 'email', label: t('checkout_email'), colSpan: 2 },
                    { key: 'cep', label: t('checkout_cep') },
                    { key: 'state', label: t('checkout_state') },
                    { key: 'street', label: t('checkout_street'), colSpan: 2 },
                    { key: 'number', label: t('checkout_number') },
                    { key: 'complement', label: t('checkout_complement') },
                    { key: 'neighborhood', label: t('checkout_neighborhood') },
                    { key: 'city', label: t('checkout_city') },
                  ].map(field => (
                    <div key={field.key} className={field.colSpan === 2 ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">{field.label}</label>
                      <input
                        type="text"
                        value={form[field.key]}
                        onChange={e => handleChange(field.key, e.target.value)}
                        required={field.key !== 'complement'}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c] focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-5">{t('checkout_payment')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {PAYMENTS.map(p => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPayment(p)}
                      className={`py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                        payment === p
                          ? 'border-[#3f533c] bg-[#e8f0e7] text-[#3f533c]'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {p === 'pix' && <i className="fa-solid fa-qrcode mr-1"></i>}
                      {p === 'debit' && <i className="fa-solid fa-credit-card mr-1"></i>}
                      {p === 'credit' && <i className="fa-solid fa-credit-card mr-1"></i>}
                      {p === 'boleto' && <i className="fa-solid fa-file-invoice mr-1"></i>}
                      {t(paymentKey[p])}
                    </button>
                  ))}
                </div>

                {/* PIX */}
                {payment === 'pix' && (
                  <div className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="w-40 h-40 bg-white border border-gray-300 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-1 p-3">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className={`w-8 h-8 rounded-sm ${i % 3 === 0 || i === 4 ? 'bg-gray-800' : 'bg-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">QR Code PIX (simulado)</p>
                    <p className="text-xs text-gray-400 mt-1">Chave: smartbugs@smartbugs.com.br</p>
                  </div>
                )}

                {/* Credit card installments */}
                {payment === 'credit' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">{t('checkout_installments')}</label>
                    <select
                      value={installments}
                      onChange={e => setInstallments(Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3f533c]"
                    >
                      {INSTALLMENT_OPTIONS.map(n => (
                        <option key={n} value={n}>
                          {n}x de R$ {(subtotal / n).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          {n > 6 ? ' (com juros)' : ' (sem juros)'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Boleto */}
                {payment === 'boleto' && (
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600">
                    <p>O boleto será gerado após a confirmação do pedido e enviado para seu e-mail.</p>
                    <p className="text-xs text-gray-400 mt-1">Vencimento: 3 dias úteis</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order summary */}
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
                <h2 className="font-bold text-gray-900 mb-4">Seus Produtos</h2>
                <div className="space-y-3 mb-4">
                  {items.map(item => {
                    const name = item.product.name[lang] || item.product.name.pt
                    return (
                      <div key={item.key} className="flex justify-between text-sm text-gray-600">
                        <span className="truncate">{name} × {item.qty.toLocaleString('pt-BR')}</span>
                        <span className="flex-shrink-0 ml-2 font-medium">
                          R$ {(item.product.price * item.qty).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between font-black text-gray-900 text-lg">
                    <span>{t('cart_total')}</span>
                    <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#fb5421] text-white py-4 rounded-xl font-black text-lg mt-5 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200"
                >
                  {t('checkout_confirm')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
