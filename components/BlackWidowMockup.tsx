import Image from "next/image";

export default function BlackWidowMockup() {
  return <div className="software redRoomUi" role="img" aria-label="Preview conceitual do projeto Black Widow: Red Room Experience">
    <Image className="redRoomArtwork" src="/blackwidow-s-l1200.jpg" alt="" fill sizes="(max-width: 960px) 100vw, 58vw" priority={false} />
    <div className="redRoomNoise" aria-hidden="true" />
    <header className="redRoomHeader"><span>MARVEL STUDIOS / CONCEPT EXPERIENCE</span><b>RED ROOM</b><i>CLASSIFIED</i></header>
    <div className="redRoomSubject" aria-hidden="true"><span>SUBJECT</span><strong>NATASHA<br />ROMANOFF</strong><i>01 / 02</i></div>
    <div className="redRoomScanline" aria-hidden="true" />
    <div className="redRoomTarget" aria-hidden="true"><i /><i /><i /></div>
    <div className="redRoomData" aria-hidden="true"><span>IDENTITY CONFIRMED</span><span>TRANSFORMATION READY</span><span>CLICK TO INITIATE</span></div>
    <footer className="redRoomFooter"><b>PROJECT 03</b><span>RED ROOM EXPERIENCE</span><i>INTERACTIVE FRONT-END</i></footer>
  </div>;
}
