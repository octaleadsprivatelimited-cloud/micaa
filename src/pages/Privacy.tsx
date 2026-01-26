import { COMPANY_INFO } from "@/lib/constants";

const Privacy = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-navy text-primary-foreground">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-primary-foreground/80">
            Last updated: January 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-6">
              {COMPANY_INFO.name} ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Information We Collect</h2>
            <p className="text-muted-foreground mb-4">We may collect information about you in various ways:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Personal information you provide (name, email, phone number, address)</li>
              <li>Information about your project requirements</li>
              <li>Communication preferences</li>
              <li>Website usage data and analytics</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Provide and maintain our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you promotional materials (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Information Sharing</h2>
            <p className="text-muted-foreground mb-6">
              We do not sell, trade, or otherwise transfer your personal information to outside parties 
              except as described in this policy. We may share information with trusted third parties 
              who assist us in operating our website and serving you.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Data Security</h2>
            <p className="text-muted-foreground mb-6">
              We implement appropriate technical and organizational security measures to protect 
              your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Your Rights</h2>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Cookies</h2>
            <p className="text-muted-foreground mb-6">
              Our website may use cookies to enhance your browsing experience. You can choose to 
              disable cookies through your browser settings, though this may affect some functionality.
            </p>

            <h2 className="text-2xl font-display font-bold mt-8 mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-none text-muted-foreground space-y-2">
              <li><strong>Email:</strong> {COMPANY_INFO.email}</li>
              <li><strong>Phone:</strong> {COMPANY_INFO.phone}</li>
              <li><strong>Address:</strong> {COMPANY_INFO.address}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
