export default function SectionIntro({ index, label, title, aside }: { index: string; label: string; title: React.ReactNode; aside?: string }) {
  return <header className={`sectionIntro ${aside ? "sectionIntroWithAside" : ""}`}>
    <div className="sectionMarker"><span>{index}</span><span>{label}</span></div>
    <div className="sectionHeading"><h2>{title}</h2></div>
    {aside && <p className="sectionAside">{aside}</p>}
  </header>;
}
