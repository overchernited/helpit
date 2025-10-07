<img width="2949" height="815" alt="helpit" src="https://github.com/user-attachments/assets/58a16187-1ef2-4daf-9d89-43a3e88a568b" />
<p align="center "><strong>BARRACUDA</strong></p>
<p align="center">Marlon Hernández & Carlos Rivera</p>

[**HelpIt**](https://helpit-eight.vercel.app) Es nuestra propuesta para la hackathon [HACK4FUTURE SENA](https://formacionprofesional-oit.org/hackathon) en su categoria inclusión y diversidad.

HelpIt es un foro anonimo de ayuda y orientación mental, en donde las personas pueden contar sus pensamientos y/o desahogarse con el fin de visibilizar sus situaciones y recibir ayuda de otras personas que esten interesadas en hacerlo o esten pasando por algo similar. Facilitando ademas lineas de ayuda y recursos de la salud mental.

---

<img width="2951" height="797" alt="whyhelpit" src="https://github.com/user-attachments/assets/43a9773d-c121-4c9e-9553-4acc1c8e741f" />

Este sitio-web multiplataforma añade diferentes caracteristicas en el foro para mitigar la hostilidad que puede presentar la salud mental como:

- ✨ Asistente IA : HelpIt integra a Flubber nuestra mascota virtual que te puede ayudar en cualquier momento dentro de la pagina, enseñando a utilizar la pagina asi como tambien como un consejero. Aunque esta claro que no reemplaza la ayuda psicologica el puede brindar lineas de atencion entre otros recursos.
- ✨ Anonimato: HelpIt es un foro anonimo con nombres y contraseñas auto-generadas, permitiendo una creacion facil unicamente en 3 pasos. Esto puede librar la opresión de ser conocido permitiendo que las interacciones sean mas espontaneas y autenticas. Ademas de integrar codigos QR con los que se puede iniciar sesión de manera rapida en nuevos dispositivos.
- ✨ Gamificación: HelpIt integra un sistema de niveles, experencia y logros. Donde por interactuar en el foro eres recompensado generando una sana competencia que a su véz, salva vidas.
- ✨ Ajustes: HelpIt añade ajustes respecto a la apariencia, tema oscuro, claro y de alto contraste enfocado en las personas con visibilidad reducida.
- ✨ Interacciones: En helpIt puedes crear publicaciones, comentarios y likes en diferentes categorias que mejor se ajusten a tu pensamiento las cuales impactan directamente en las personas ademas de dar incentivos como experiencia y logros.
- ✨ Notificaciones: Puedes saber cada vez que entras si has recibido alguna nueva interacción que puede salvarte. 🫂

---

<img width="2951" height="802" alt="techstack" src="https://github.com/user-attachments/assets/a16610f7-c27a-48d1-aff6-042b7039e024" />

Este sitio web ha sido construido sobre las tecnologias mas demandantes del mercado como:

- ⚡**SolidStart**
- ⚡**Supabase**
- ⚡**Tailwind**
- ⚡**SCSS**
- ⚡**Node.js**

y para el diseño de nuestra propuesta:

- 🖌️Krita
- 🖌️Blender
- 🖌️Figma

---

<img width="2942" height="814" alt="developinghelpit" src="https://github.com/user-attachments/assets/ced7e7a9-fa5b-4bca-ab35-52a143c37a55" />

Asegurate de tener 
- 🔹[**Node.JS**](https://nodejs.org/es)
- 🔹[**Docker**](https://www.docker.com)
- 🔹[**Supabase CLI**](https://supabase.com/docs/guides/local-development/cli/getting-started)
- 🔹[**PNPM**](https://pnpm.io/es)
- 🔹[**PostgreSQL**](https://www.postgresql.org/download/windows/)

1. **Clonar Repositorio**

```bash
git clone https://github.com/overchernited/helpit
cd helpit

```

2. **Instalar y ajustar dependencias**

Verifica tener Docker abierto.

```bash
pnpm install
pnpx supabase init
pnpx supabase start
psql "postgresql://postgres:postgres@localhost:54322/postgres" -f ./supabase/schema.sql

```

3. **Iniciar desarrollo**

```
pnpm run dev
```

Ya estarias listo para colaborar con HelpIt.
