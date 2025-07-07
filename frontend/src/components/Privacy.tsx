import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const toc = [
  { id: 'info', label: '1. Information We Collect' },
  { id: 'use', label: '2. How We Use Your Information' },
  { id: 'security', label: '3. Data Security' },
  { id: 'sharing', label: '4. Data Sharing' },
  { id: 'rights', label: '5. Your Rights' },
  { id: 'contact', label: '6. Contact Us' },
];

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 print:bg-white">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-8 print:shadow-none print:border-none">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 print:hidden"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 font-sans">Privacy Policy</h1>
            <div className="text-gray-500 text-sm mb-2">Last updated: January 2025</div>
          </div>

          {/* Table of Contents */}
          <nav className="mb-8 print:hidden">
            <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
            <ul className="list-decimal list-inside space-y-1 text-blue-700">
              {toc.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:underline">{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <article className="prose prose-lg max-w-none font-serif text-gray-900">
            <section id="info">
              <h2 className="text-2xl font-bold mb-2">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                upload data, or contact us for support. This may include:
              </p>
              <ul>
                <li>Name and contact information</li>
                <li>Business data and analytics</li>
                <li>Usage data and preferences</li>
                <li>Communication history</li>
              </ul>
            </section>

            <section id="use">
              <h2 className="text-2xl font-bold mb-2">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and improve our AI-powered analytics services</li>
                <li>Generate sales forecasts and marketing insights</li>
                <li>Personalize your experience</li>
                <li>Communicate with you about our services</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section id="security">
              <h2 className="text-2xl font-bold mb-2">3. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your data 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section id="sharing">
              <h2 className="text-2xl font-bold mb-2">4. Data Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information only in 
                limited circumstances, such as with your consent or as required by law.
              </p>
            </section>

            <section id="rights">
              <h2 className="text-2xl font-bold mb-2">5. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information. 
                You can also opt out of certain communications and data processing activities.
              </p>
            </section>

            <section id="contact">
              <h2 className="text-2xl font-bold mb-2">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:<br />
                <span className="font-mono">privacy@kivo.ai</span><br />
                Address: KIVO AI, [Your Address]
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 