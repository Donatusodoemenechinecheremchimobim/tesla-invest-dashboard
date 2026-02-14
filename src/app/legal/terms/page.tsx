'use client';
import LegalLayout from '@/components/LegalLayout';

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <p className="lead">Effective Date: January 1, 2026</p>

      <h3>1. Agreement to Terms</h3>
      <p>By accessing the Verde Capital platform, creating an account, or utilizing our wealth management services, you agree to be bound by these Terms of Service. If you do not agree, you must discontinue use of our services immediately.</p>

      <h3>2. Eligibility & Accreditation</h3>
      <p>Our services are reserved for qualified individuals and entities. By using our platform, you represent that:</p>
      <ul>
        <li>You are at least 18 years of age.</li>
        <li>You are not a citizen or resident of a sanctioned jurisdiction (e.g., North Korea, Iran).</li>
        <li>For certain investment products, you meet the definition of an "Accredited Investor" or "Qualified Purchaser" as defined by the U.S. Securities and Exchange Commission (SEC).</li>
      </ul>

      <h3>3. Asset Custody & Clearing</h3>
      <p>Verde Capital partners with third-party custodians for the safekeeping of client assets. Cash deposits are swept into FDIC-insured program banks up to applicable limits. Crypto assets are held in cold storage by qualified custodians.</p>

      <h3>4. Risk Disclosure</h3>
      <p>Investing involves risk, including the potential loss of principal. Past performance of the Verde Gold Fund or other strategies is not indicative of future results. Crypto assets and derivatives are highly volatile and may not be suitable for all investors.</p>

      <h3>5. Liquidation Authority</h3>
      <p>Verde Capital reserves the right to liquidate positions in your account immediately and without prior notice to satisfy margin requirements or if we deem it necessary to protect the firm from financial risk.</p>

      <h3>6. Governing Law</h3>
      <p>These terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration.</p>
    </LegalLayout>
  );
}
