import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const toc = [
  { id: 'acceptance', label: '1. Acceptance of Terms' },
  { id: 'description', label: '2. Description of Service' },
  { id: 'accounts', label: '3. User Accounts' },
  { id: 'acceptable', label: '4. Acceptable Use' },
  { id: 'privacy', label: '5. Data and Privacy' },
  { id: 'ip', label: '6. Intellectual Property' },
  { id: 'disclaimers', label: '7. Disclaimers' },
  { id: 'liability', label: '8. Limitation of Liability' },
  { id: 'termination', label: '9. Termination' },
  { id: 'changes', label: '10. Changes to Terms' },
  { id: 'contact', label: '11. Contact Information' },
];

const Terms: React.FC = () => {
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
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 font-sans">Terms of Service</h1>
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
            <section id="acceptance">
              <h2 className="text-2xl font-bold mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing and using KIVO AI's services, you accept and agree to be bound by 
                the terms and provision of this agreement.
              </p>
            </section>
            <section id="description">
              <h2 className="text-2xl font-bold mb-2">2. Description of Service</h2>
              <p>
                KIVO AI provides AI-powered business analytics, sales forecasting, marketing insights, 
                and related services through our web-based platform.
              </p>
            </section>
            <section id="accounts">
              <h2 className="text-2xl font-bold mb-2">3. User Accounts</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials 
                and for all activities that occur under your account.
              </p>
            </section>
            <section id="acceptable">
              <h2 className="text-2xl font-bold mb-2">4. Acceptable Use</h2>
              <p>
                You agree to use our services only for lawful purposes and in accordance with these Terms. 
                You may not use our services to:
              </p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of our services</li>
              </ul>
            </section>
            <section id="privacy">
              <h2 className="text-2xl font-bold mb-2">5. Data and Privacy</h2>
              <p>
                Your use of our services is also governed by our Privacy Policy. By using our services, 
                you consent to the collection and use of information as detailed in our Privacy Policy.
              </p>
            </section>
            <section id="ip">
              <h2 className="text-2xl font-bold mb-2">6. Intellectual Property</h2>
              <p>
                The service and its original content, features, and functionality are owned by KIVO AI 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
            </section>
            <section id="disclaimers">
              <h2 className="text-2xl font-bold mb-2">7. Disclaimers</h2>
              <p>
                Our services are provided "as is" without warranties of any kind. We do not guarantee 
                the accuracy, completeness, or usefulness of any information provided through our services.
              </p>
            </section>
            <section id="liability">
              <h2 className="text-2xl font-bold mb-2">8. Limitation of Liability</h2>
              <p>
                KIVO AI shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of our services.
              </p>
            </section>
            <section id="termination">
              <h2 className="text-2xl font-bold mb-2">9. Termination</h2>
              <p>
                We may terminate or suspend your account and access to our services at any time, 
                with or without cause, with or without notice.
              </p>
            </section>
            <section id="changes">
              <h2 className="text-2xl font-bold mb-2">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes via email or through our website.
              </p>
            </section>
            <section id="contact">
              <h2 className="text-2xl font-bold mb-2">11. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:<br />
                <span className="font-mono">legal@kivo.ai</span><br />
                Address: KIVO AI, [Your Address]
              </p>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Terms; 