import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./StudioSection.module.css";

export default function StudioSection({ id, titleId, background = "/studio-office-background.png", children }: {
  id: string; titleId: string; background?: string; children: ReactNode;
}) {
  return <section className={styles.section} id={id} aria-labelledby={titleId}>
    <div className={styles.background} aria-hidden="true"><Image src={background} alt="" fill sizes="100vw" /></div>
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.container} data-reveal="true">{children}</div>
  </section>;
}
