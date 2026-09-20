import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import vinayakaMedallion from "@/assets/vinayaka-medallion.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "అన్న ప్రసాదం | శ్రీ వినాయక మండపం" },
      {
        name: "description",
        content:
          "శ్రీ వినాయక మండపం వద్ద శ్రీ మణికంట్ట యూత్ అసోసియేషన్ నిర్వహిస్తున్న అన్న ప్రసాద కార్యక్రమ ఆహ్వానం.",
      },
      { property: "og:title", content: "అన్న ప్రసాదం | శ్రీ వినాయక మండపం" },
      {
        property: "og:description",
        content: "రంగపూర్ బోద్రై వద్ద సాయంత్రం 7 గంటల నుండి అన్న ప్రసాద కార్యక్రమం.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [curtainVisible, setCurtainVisible] = useState(true);

  useEffect(() => {
    // Always show the opening sequence on first load. The invitation is intentionally
    // designed as a theatrical reveal, so it should remain visible long enough to see
    // the curtains close-to-open transition even when the browser prefers reduced motion.
    const openTimer = window.setTimeout(() => setCurtainOpen(true), 900);
    const hideTimer = window.setTimeout(() => setCurtainVisible(false), 3300);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const openCurtain = () => {
    setCurtainOpen(true);
    window.setTimeout(() => setCurtainVisible(false), 2500);
  };

  const replayCurtain = () => {
    setCurtainVisible(true);
    setCurtainOpen(false);
    window.setTimeout(() => setCurtainOpen(true), 180);
    window.setTimeout(() => setCurtainVisible(false), 2150);
  };

  return (
    <main className="invitation-page">
      <div className="ambient-pattern" aria-hidden="true" />

      <article className={curtainOpen ? "invitation invitation-revealed" : "invitation"}>
        <div className="corner-ornament corner-top-left" aria-hidden="true" />
        <div className="corner-ornament corner-top-right" aria-hidden="true" />
        <div className="corner-ornament corner-bottom-left" aria-hidden="true" />
        <div className="corner-ornament corner-bottom-right" aria-hidden="true" />

        <header className="invitation-header reveal-item reveal-first">
          <p className="auspicious-line">శ్రీ గణేశాయ నమః</p>
          <div className="sacred-divider" aria-hidden="true">
            <span />
            <b>❖</b>
            <span />
          </div>
          <img
            className="vinayaka-art"
            src={vinayakaMedallion}
            alt="ఆశీర్వదిస్తున్న శ్రీ వినాయకుడు"
            width={1024}
            height={1024}
            decoding="async"
            fetchPriority="high"
          />
          <p className="mandapam-name">శ్రీ వినాయక మండపం</p>
        </header>

        <section className="event-heading reveal-item reveal-second" aria-labelledby="event-title">
          <p className="invitation-kicker">భక్తి పూర్వక ఆహ్వానం</p>
          <h1 id="event-title">అన్న ప్రసాదం</h1>
          <p className="organizer-label">నిర్వహణ</p>
          <h2>శ్రీ మణికంట్ట యూత్ అసోసియేషన్</h2>
        </section>

        <section className="event-details reveal-item reveal-third" aria-label="కార్యక్రమ వివరాలు">
          <div className="detail-block">
            <span className="detail-icon" aria-hidden="true">⌖</span>
            <div>
              <p className="detail-label">వేదిక</p>
              <p className="detail-value">రంగపూర్ బోద్రై వద్ధా</p>
            </div>
          </div>
          <div className="detail-separator" aria-hidden="true" />
          <div className="detail-block">
            <span className="detail-icon detail-clock" aria-hidden="true">◷</span>
            <div>
              <p className="detail-label">సమయం</p>
              <p className="detail-value">సాయంత్రం 7.00 గంటల నుండి</p>
            </div>
          </div>
        </section>

        <footer className="invitation-footer reveal-item reveal-fourth">
          <div className="lotus-mark" aria-hidden="true">❀</div>
          <p>మీ అందరి రాకను సాదరంగా ఆహ్వానిస్తున్నాము</p>
        </footer>
      </article>

      {!curtainVisible && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="replay-button"
          onClick={replayCurtain}
          aria-label="తెరను మళ్ళీ చూడండి"
          title="తెరను మళ్ళీ చూడండి"
        >
          <RotateCcw aria-hidden="true" />
        </Button>
      )}

      {curtainVisible && (
        <div className={curtainOpen ? "curtain-stage curtain-stage-open" : "curtain-stage"} aria-hidden="true">
          <div className="curtain-valance">
            <div className="valance-swag valance-left" />
            <div className="valance-swag valance-center" />
            <div className="valance-swag valance-right" />
            <div className="valance-trim" />
          </div>
          <div className="curtain curtain-left">
            <div className="curtain-folds" />
            <div className="curtain-border" />
          </div>
          <div className="curtain curtain-right">
            <div className="curtain-folds" />
            <div className="curtain-border" />
          </div>
          {!curtainOpen && (
            <Button type="button" variant="ghost" className="skip-button" onClick={openCurtain} tabIndex={-1}>
              తెరవండి
            </Button>
          )}
        </div>
      )}
    </main>
  );
}