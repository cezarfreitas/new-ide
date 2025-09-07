'use client';

interface FooterSectionProps {
  companyInfo: {
    name: string;
    description: string;
    email: string;
    phone: string;
    address: string;
  };
  services: string[];
  companyLinks: string[];
}

export default function FooterSection({ 
  companyInfo, 
  services, 
  companyLinks 
}: FooterSectionProps) {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">IDE</span>
              </div>
              <span className="text-xl font-bold">{companyInfo.name}</span>
            </div>
            <p className="text-gray-400 text-sm">
              {companyInfo.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Serviços</h3>
            <ul className="space-y-2 text-gray-400">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-yellow-500 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Navegação</h3>
            <ul className="space-y-2 text-gray-400">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-yellow-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Contato Direto</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-yellow-500 transition-colors">
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </li>
              <li className="hover:text-yellow-500 transition-colors">
                <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
              </li>
              <li className="text-sm">{companyInfo.address}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {companyInfo.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
