"use client";

import styles from "@/styles/gestion.module.css";
import React, { useState } from "react";
import { createObra } from "@/services/obras";

export default function AnadirObraForm({ handleCrearObra, setExito, series }) {
  const [nombreObra, setNombreObra] = useState("");
  const [material, setMaterial] = useState("");
  const [largo, setLargo] = useState("");
  const [ancho, setAncho] = useState("");
  const [alto, setAlto] = useState("");
  const [serie, setSerie] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const obraAnadir = {
        title: nombreObra,
        images,
        material,
        largo,
        ancho,
        alto,
        serieId: serie,
      };

      createObra(obraAnadir);
      setExito("Añadido con éxito");
      setTimeout(() => {
        setExito("");
      }, 4000);

      handleCrearObra();
    } catch (error) {
      setExito("Error al realizar la subida");
      console.error(error);
    }
  };

  return (
    <form
      className={styles.formulario}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <button className={styles.cerrar} onClick={handleCrearObra}>
        Cerrar
      </button>
      <h1>AÑADIR OBRA</h1>
      <div>
        <label>Nombre de la obra:</label>
        <input
          type="text"
          name="nombreObra"
          value={nombreObra}
          required
          onChange={(event) => setNombreObra(event.target.value)}
        />
      </div>
      <div>
        <label>Material de la obra:</label>
        <input
          type="text"
          name="material"
          value={material}
          required
          onChange={(event) => setMaterial(event.target.value)}
        />
      </div>
      <div>
        <label>Alto de la obra (número en cm, ejemplo: 45):</label>
        <input
          type="text"
          name="alto"
          value={alto}
          required
          onChange={(event) => setAlto(event.target.value)}
        />
      </div>
      <div>
        <label>Ancho de la obra (número en cm, ejemplo: 45):</label>
        <input
          type="text"
          name="ancho"
          value={ancho}
          required
          onChange={(event) => setAncho(event.target.value)}
        />
      </div>
      <div>
        <label>Largo de la obra (número en cm, ejemplo: 45):</label>
        <input
          type="text"
          name="largo"
          value={largo}
          required
          onChange={(event) => setLargo(event.target.value)}
        />
      </div>
      <div>
        <label>Serie a la que pertenece:</label>
        <select
          name="serie"
          value={serie}
          required
          onChange={(event) => setSerie(event.target.value)}
        >
          <option value="" disabled>
            Seleccione la serie
          </option>
          {series.map((serie) => (
            <option key={serie.id} value={serie.id}>
              {serie.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Imagen de la obra:</label>
        <input
          type="file"
          name="images[]"
          required
          multiple
          accept="image/*"
          onChange={(event) => setImages(event.target.files)}
        />
        <p>Se aceptan todo tipo de imágenes</p>
      </div>
      <button type="submit">Añadir</button>
    </form>
  );
}
