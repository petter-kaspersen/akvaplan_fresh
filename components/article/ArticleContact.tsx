type ContactPerson = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
};

type ArticleContactProps = {
  contactPerson: ContactPerson;
};

export default function ArticleContact({ contactPerson }: ArticleContactProps) {
  return (
    <section class="article-contact">
      <div class="left-section">
        <span>Kontaktperson</span>

        <div class="name-and-title">
          <h3>{contactPerson.name}</h3>
          <span>{contactPerson.title}</span>
        </div>
        <div class="contact-info">
          <a href={`mailto:${contactPerson.email}`}>{contactPerson.email}</a>
          <a href={`tel:${contactPerson.phone}`}>{contactPerson.phone}</a>
          <span>{contactPerson.location}</span>
        </div>
      </div>
      <img
        class="right-section"
        src="https://preview.sdl.no/v2/dam/ssGDst9O7xlTb0J6I2g_Lw/I583h3dwed8?v=1673953218959"
      ></img>
    </section>
  );
}
