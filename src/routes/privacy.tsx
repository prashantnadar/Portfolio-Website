import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site-data";

const TITLE = "Privacy Policy — Prashant Nadar | PN Creation";
const DESCRIPTION =
  "How Prashant Nadar and PN Creation collect, use and protect the information you share through this portfolio's contact form.";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/privacy" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="Last updated: July 2026"
      intro="This page is maintained by Prashant Nadar to explain, in plain language, what happens to the information you share on this website."
    >
      <h2>Who this policy covers</h2>
      <p>
        This website is a personal portfolio operated by {SITE.name}, who also offers freelance
        services under the PN Creation brand from {SITE.location}. Any reference to “I” or “we”
        below means the same person.
      </p>

      <h2>What information is collected</h2>
      <ul>
        <li>
          <strong>Contact form details</strong> — the name, email address, subject and message you
          voluntarily submit so I can reply to your enquiry.
        </li>
        <li>
          <strong>Direct messages</strong> — anything you send me by email, phone or WhatsApp using
          the contact details published on this site.
        </li>
        <li>
          <strong>Theme preference</strong> — your light or dark mode choice is stored in your own
          browser's local storage. It never leaves your device and is not used to identify you.
        </li>
      </ul>
      <p>
        This site does not run advertising trackers, does not sell data, and does not ask you to
        create an account.
      </p>

      <h2>How the information is used</h2>
      <ul>
        <li>To respond to your enquiry and discuss a possible project.</li>
        <li>To prepare quotes, scopes and deliverables you have asked for.</li>
        <li>To keep a basic record of project communication while we work together.</li>
      </ul>
      <p>Your details are never sold, rented or shared for marketing purposes.</p>

      <h2>Third parties</h2>
      <p>
        Enquiries may reach me through standard email, phone or WhatsApp, which are operated by
        their own providers under their own privacy terms. Fonts are loaded from Google Fonts, and
        hosting is handled by the platform serving this site. I only share your information with a
        third party when it is necessary to deliver work you have commissioned, or when the law
        requires it.
      </p>

      <h2>Retention and deletion</h2>
      <p>
        Enquiry messages are kept only as long as they are useful for the conversation or project
        they relate to. You can ask me to delete your details at any time by writing to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, and I will remove what I hold unless I am
        legally required to keep it.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Ask what information I currently hold about you.</li>
        <li>Ask for corrections or deletion.</li>
        <li>Withdraw from further contact at any time.</li>
      </ul>

      <h2>Security</h2>
      <p>
        This site is served over HTTPS and I take reasonable care with the messages I receive. No
        method of transmission over the internet can be guaranteed to be perfectly secure, so please
        avoid sending sensitive documents or credentials through the contact form.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
        <a href={SITE.phoneHref}>{SITE.phone}</a>. You can also read the{" "}
        <Link to="/terms">Terms &amp; Conditions</Link>.
      </p>
    </LegalPage>
  );
}
