import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalPage } from "@/components/legal-page";
import { SITE } from "@/lib/site-data";

const TITLE = "Terms & Conditions — Prashant Nadar | PN Creation";
const DESCRIPTION =
  "The terms that apply to freelance website development, design and resume services provided by Prashant Nadar under the PN Creation brand.";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/terms" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="Last updated: July 2026"
      intro="These terms explain how freelance work under the PN Creation brand is quoted, delivered and supported. They are written to keep expectations clear on both sides."
    >
      <h2>1. Using this website</h2>
      <p>
        This site is a personal portfolio belonging to {SITE.name}. The content, code samples,
        layouts, copy and imagery here are owned by me and may not be copied or republished as your
        own work. You are welcome to reference or link to it.
      </p>

      <h2>2. Quotes and scope</h2>
      <ul>
        <li>
          The prices shown in the pricing section are indicative ranges, not fixed offers. Every
          project is quoted after a short conversation about your goals.
        </li>
        <li>
          A quote covers the pages, sections and features agreed in writing. Anything added later is
          treated as new scope and quoted separately.
        </li>
        <li>Quotes remain valid for 30 days from the date they are shared.</li>
      </ul>

      <h2>3. Payments</h2>
      <ul>
        <li>Projects normally begin with an advance of 40–50% of the agreed amount.</li>
        <li>The balance is payable before final deployment or file handover.</li>
        <li>
          Third-party costs — domains, hosting, paid plugins, stock assets or premium fonts — are
          billed to you at cost unless the quote says otherwise.
        </li>
        <li>Advance payments are non-refundable once design or development work has started.</li>
      </ul>

      <h2>4. Timelines and your input</h2>
      <p>
        Delivery timelines start once the advance and all required content — text, images, logos and
        access details — have been received. Delays in feedback or content naturally shift the
        delivery date. I will always tell you as soon as I see a timeline slipping.
      </p>

      <h2>5. Revisions</h2>
      <p>
        Each package includes a defined number of revision rounds. A revision means refinements
        within the agreed design direction. A complete change of direction, brand or structure is a
        new scope and will be quoted before any work begins.
      </p>

      <h2>6. Ownership and usage</h2>
      <ul>
        <li>
          On full payment, you own the final delivered website files, designs and content produced
          for your project.
        </li>
        <li>
          I keep the right to reuse underlying generic components, techniques and code patterns in
          future work.
        </li>
        <li>
          I may display the finished project in my portfolio and on social media unless you ask me
          in writing not to.
        </li>
      </ul>

      <h2>7. Support and maintenance</h2>
      <p>
        Each package includes a stated free support window covering bug fixes and minor content
        edits. It does not cover new features, redesigns, third-party service failures, or issues
        caused by changes made by someone else after handover. Ongoing maintenance is available as a
        separate arrangement.
      </p>

      <h2>8. Client responsibilities</h2>
      <ul>
        <li>You confirm that any content, logo or image you supply is yours to use legally.</li>
        <li>You are responsible for renewing your own domain and hosting after handover.</li>
        <li>You are responsible for keeping account credentials you own secure.</li>
      </ul>

      <h2>9. Limitation of liability</h2>
      <p>
        I deliver work with reasonable professional care, but I cannot guarantee specific business
        outcomes such as search rankings, traffic or revenue. My total liability for any project is
        limited to the amount you paid for that project.
      </p>

      <h2>10. Cancellation</h2>
      <p>
        Either side may end a project in writing. You pay for the work completed up to that point,
        and I hand over what has been produced and paid for.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of India, with jurisdiction in Mumbai, Maharashtra.
      </p>

      <h2>12. Contact</h2>
      <p>
        For anything about these terms, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or
        call <a href={SITE.phoneHref}>{SITE.phone}</a>. See also the{" "}
        <Link to="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
