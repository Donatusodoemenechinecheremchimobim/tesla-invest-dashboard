'use client';
import LegalLayout from '@/components/LegalLayout';

export default function SIPCPage() {
  return (
    <LegalLayout title="Asset Protection">
      <h3>Securities Investor Protection Corporation (SIPC)</h3>
      <p>Verde Capital is a member of the Securities Investor Protection Corporation (SIPC). SIPC protects securities customers of its members up to $500,000 (including $250,000 for claims for cash). Explanatory brochure available upon request or at <a href="https://www.sipc.org" target="_blank">www.sipc.org</a>.</p>

      <h3>Excess SIPC Coverage</h3>
      <p>In addition to SIPC protection, we maintain an excess insurance policy through Lloyd's of London. This policy provides an aggregate firm limit of $150 million, subject to sub-limits for any one customer of $37.5 million for securities and $900,000 for cash. This policy does not protect against investment loss or market fluctuation.</p>

      <h3>FDIC Insurance (Cash Sweeps)</h3>
      <p>Uninvested cash in your brokerage account is automatically swept into our network of program banks, where it is eligible for FDIC insurance up to $2.5 million per depositor ($250,000 per bank).</p>

      <h3>Crypto Asset Security</h3>
      <p><strong>Important:</strong> Cryptocurrency assets are NOT covered by SIPC or FDIC insurance. To mitigate risk, Verde Capital secures 98% of client crypto assets in air-gapped cold storage vaults distributed across three continents. We maintain a separate private insurance policy specifically for digital asset theft and cyber-attacks.</p>
    </LegalLayout>
  );
}
