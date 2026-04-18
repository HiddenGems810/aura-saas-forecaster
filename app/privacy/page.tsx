export const metadata = {
  title: 'Privacy Policy | Aura SaaS Insights',
  description:
    'Read the full Privacy Policy for Aura SaaS Insights, covering data collection, advertising, cookies, GDPR rights, and CCPA rights.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] px-6 py-20 flex justify-center">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-[var(--text-secondary)] text-sm mb-12">
          Last updated: April 17, 2025 &nbsp;&bull;&nbsp; Effective immediately upon publication.
        </p>

        <div className="prose prose-invert prose-lg prose-headings:text-[var(--accent-color)] opacity-90 leading-relaxed font-sans editorial-prose space-y-2">

          <h2>1. About This Policy</h2>
          <p>
            This Privacy Policy explains how Aura SaaS Insights (&quot;Aura,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) handles information when you use our free SaaS MRR forecasting tool at aura-insights.com (the &quot;Service&quot;). We are committed to protecting your privacy and operating in full compliance with applicable data protection law, including the European Union General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and Google AdSense program policies.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            <strong className="text-white">No account or registration is required</strong> to use Aura. The forecasting inputs you enter—Starting MRR, Monthly Growth Rate, Monthly Churn Rate, and Projection Horizon—are processed entirely within your browser and stored only in the URL query string. These values are never transmitted to Aura servers and are not associated with any personally identifiable information.
          </p>
          <p>We may automatically collect the following non-personal technical data through standard server logs and analytics services:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system and device type</li>
            <li>Referring URL and exit page</li>
            <li>General geographic region (country or city level, not precise location)</li>
            <li>Pages visited and time spent on page</li>
            <li>Anonymous interaction events (e.g., slider movements, PDF downloads)</li>
          </ul>
          <p>This data is collected in aggregate and cannot be used to identify you as an individual.</p>

          <h2>3. How We Use Information</h2>
          <p>We use the information collected to:</p>
          <ul>
            <li>Understand how the tool is used and improve its functionality</li>
            <li>Monitor performance and diagnose technical issues</li>
            <li>Comply with legal obligations</li>
            <li>Serve contextually relevant advertisements through Google AdSense (see Section 4)</li>
          </ul>
          <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>

          <h2>4. Advertising &amp; Google AdSense</h2>
          <p>
            Aura uses Google AdSense to display advertisements. Google AdSense is a third-party advertising service operated by Google LLC. By displaying ads, we are able to offer this forecasting tool free of charge.
          </p>
          <p>
            Google AdSense may use cookies, web beacons, and similar tracking technologies to serve ads based on your prior visits to this website and other websites across the internet. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to Aura and/or other websites.
          </p>
          <p>
            You may opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google&apos;s Ads Settings</a>{' '}
            or by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
            Opting out means you may still see ads, but they will not be personalized to your interests.
          </p>
          <p>
            For more information on how Google collects and processes data in connection with AdSense, please review{' '}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google&apos;s Advertising Privacy Policy</a>.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Aura itself does not set first-party cookies. However, our third-party service providers—including Google AdSense and any analytics services—may set cookies on your device when you visit the Service. These cookies are governed by the respective third-party privacy policies listed above.
          </p>
          <p>
            You can control cookie behavior through your browser settings. Most browsers allow you to refuse, delete, or be notified before receiving cookies. Note that disabling cookies may affect the relevance of advertisements served.
          </p>

          <h2>6. Your Rights Under GDPR (EEA &amp; UK Residents)</h2>
          <p>If you are located in the European Economic Area or the United Kingdom, you have the following rights under GDPR:</p>
          <ul>
            <li><strong className="text-white">Right of Access</strong> — Request a copy of any personal data we hold about you.</li>
            <li><strong className="text-white">Right to Rectification</strong> — Request correction of inaccurate personal data.</li>
            <li><strong className="text-white">Right to Erasure</strong> — Request deletion of your personal data where there is no legitimate reason for continued processing.</li>
            <li><strong className="text-white">Right to Restrict Processing</strong> — Request that we limit how we use your data.</li>
            <li><strong className="text-white">Right to Object</strong> — Object to processing for direct marketing or legitimate interest purposes.</li>
            <li><strong className="text-white">Right to Data Portability</strong> — Request your data in a structured, machine-readable format.</li>
          </ul>
          <p>
            Given that Aura does not collect personally identifiable information through the core tool, many of these rights are satisfied by default. To exercise any rights or for inquiries, please contact us using the information in Section 9.
          </p>

          <h2>7. Your Rights Under CCPA (California Residents)</h2>
          <p>If you are a California resident, the CCPA grants you the following rights:</p>
          <ul>
            <li>The right to know what personal information is collected, used, shared, or sold</li>
            <li>The right to delete personal information held by businesses and their service providers</li>
            <li>The right to opt out of the sale of personal information (Aura does not sell personal information)</li>
            <li>The right to non-discrimination for exercising your CCPA rights</li>
          </ul>

          <h2>8. Data Retention &amp; Security</h2>
          <p>
            Because Aura does not store your forecasting inputs on our servers, there is no personally identifiable data to retain or delete from our systems. Anonymous analytics data is retained for up to 26 months in accordance with standard analytics provider policies.
          </p>
          <p>
            We implement reasonable technical and organizational measures to protect our infrastructure from unauthorized access. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>9. Contact Information</h2>
          <p>
            If you have any questions, requests, or concerns regarding this Privacy Policy, please contact us at:{' '}
            <a href="mailto:privacy@aura-insights.com">privacy@aura-insights.com</a>
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. When we make material changes, we will update the &quot;Last updated&quot; date at the top of this page. Your continued use of the Service after any changes constitutes your acceptance of the updated policy.
          </p>

        </div>

        <div className="mt-16 pt-8 border-t border-[var(--border-color)]/30 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-sm text-[var(--text-secondary)]">
          <a href="/" className="hover:text-[var(--accent-color)] transition-colors">&larr; Back to Forecaster</a>
          <a href="/terms" className="hover:text-[var(--accent-color)] transition-colors">Terms of Service &rarr;</a>
        </div>
      </div>
    </div>
  );
}
