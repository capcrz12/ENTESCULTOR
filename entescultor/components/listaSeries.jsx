"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/series.module.css";
import { getAllSeries } from "@/services/series";

export default function ListaSeries() {
  const [series, setSeries] = useState([]);
  const scrollRef = useRef(null);
  const pathname = usePathname();

  // Fetch series
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllSeries();
      setSeries(data);
    };
    fetchData();
  }, []);

  // Restaurar scroll después de montar y cargar contenido
  useEffect(() => {
    const saved = sessionStorage.getItem("scrollPosition");

    if (scrollRef.current && saved) {
      // Espera un tick para asegurarte de que el DOM está renderizado
      setTimeout(() => {
        scrollRef.current.scrollTop = parseInt(saved, 10);
      }, 0);
    }
  }, [series]); // espera a que las series estén cargadas

  return (
    <section className={styles.scroll}>
      <div className={styles.child} ref={scrollRef}>
        {series.map((serie) => (
          <article key={serie.id} className={styles.contenedor}>
            <Link
              href={`/series/${serie.name}`}
              onClick={() => {
                if (scrollRef.current) {
                  sessionStorage.setItem(
                    "scrollPosition",
                    scrollRef.current.scrollTop.toString()
                  );
                  console.log("Scroll guardado:", scrollRef.current.scrollTop);
                }
              }}
              className={styles.serie}
            >
              <img
                src={serie.image}
                alt={serie.name}
                className={styles.image}
              />
              <h2 className={styles.texto}>{serie.name}</h2>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
