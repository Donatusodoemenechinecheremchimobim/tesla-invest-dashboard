'use client';
import LegalLayout from '@/components/LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p className="lead">Last Updated: January 14, 2026</p>
      
      <h3>1. Institutional Commitment to Privacy</h3>
      <p>Verde Capital ("Verde", "we", "us") maintains the highest standards of data integrity and confidentiality. As a provider of institutional-grade financial infrastructure, we treat your personal and financial data with the same security protocols used for our own capital reserves.</p>

      <h3>2. Information Collection & Telemetry</h3>
      <p>We collect information necessary to provide our services, comply with regulatory obligations (KYC/AML), and enhance platform security:</p>
      <ul>
        <li><strong>Identity Verification:</strong> Government-issued ID, biometric data for app access, and proof of residence.</li>
        <li><strong>Financial Data:</strong> Bank account details, transaction history, and source of funds declarations.</li>
        <li><strong>Device Telemetry:</strong> IP addresses, device fingerprints, and geolocation data to prevent fraud and unauthorized account access.</li>
      </ul>

      <h3>3. Data Sovereignty & Encryption</h3>
      <p>All client data is encrypted at rest using AES-256 standards and in transit using TLS 1.3. Our primary data centers are located in privacy-focused jurisdictions (Switzerland and Singapore), ensuring your data remains protected under strict banking secrecy laws.</p>

      <h3>4. Information Sharing</h3>
      <p>Verde Capital does not sell client data. We only share information with:</p>
      <ul>
        <li><strong>Clearing Partners:</strong> To execute trades and settle transactions (e.g., Goldman Sachs, Apex Clearing).</li>
        <li><strong>Regulatory Bodies:</strong> When legally compelled by a valid court order or subpoena in the jurisdiction of record.</li>
      </ul>

      <h3>5. Your Rights</h3>
      <p>You have the right to request access to, correction of, or deletion of your personal data, subject to mandatory record-keeping laws for financial institutions.</p>
    </LegalLayout>
  );
}
