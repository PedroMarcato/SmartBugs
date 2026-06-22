import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#2d3d2b] text-green-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              {/*<div className="w-9 h-9 rounded-full bg-[#fb5421] flex items-center justify-center">
                <span className="text-white font-black text-sm">SB</span>
              </div>*/}
              <span className="text-white font-bold text-xl">SMART BUGS</span>
            </div>
            <p className="text-sm text-green-200 mb-4">{t('footer_tagline')}</p>
            <p className="text-sm font-medium text-[#fb5421]">{t('footer_pride')}</p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-3">{t('footer_products')}</h4>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link to="/produtos" className="hover:text-white transition-colors">Caixa SMART BUGS BSF</Link></li>
              <li><Link to="/produtos" className="hover:text-white transition-colors">Gaiola de Acasalamento BSF</Link></li>
              <li><Link to="/loja" className="hover:text-white transition-colors">Loja Completa</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-3">{t('footer_company')}</h4>
            <ul className="space-y-2 text-sm text-green-200">
              <li><Link to="/" className="hover:text-white transition-colors">Sobre Nós</Link></li>
              <li><Link to="/orcamento" className="hover:text-white transition-colors">Orçamento</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Compradores Internacionais</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3">{t('footer_support')}</h4>
            <ul className="space-y-2 text-sm text-green-200">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#fb5421] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contato@smartbugs.com.br" className="hover:text-white transition-colors">
                  contato@smartbugs.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#fb5421] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+554133334444" className="hover:text-white transition-colors">
                  (41) 3333-4444
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-[#fb5421] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Paraná, Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-green-300">
          <p>{t('footer_rights')}</p>
          <div className="flex gap-4">
            <Link to="/contato" className="hover:text-white transition-colors">{t('footer_terms')}</Link>
            <Link to="/contato" className="hover:text-white transition-colors">{t('footer_privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
