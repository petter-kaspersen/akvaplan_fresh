type ContactPerson = {
  name: string;
  title: string;
  email: string;
  phone: string;
  img: string;
};

type ArticleContactProps = {
  contactPerson: ContactPerson;
};

export default function ArticleContact({ contactPerson }: ArticleContactProps) {
  const { name, email, phone, title, img } = contactPerson;
  return (
    <section class="article-contact">
      <div class="left-section">
        <span>Kontaktperson</span>

        <div class="name-and-title">
          <h3>{name}</h3>
          <span>{title}</span>
        </div>
        <div class="contact-info">
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${phone}`}>{phone}</a>
          <span></span>
        </div>
      </div>
      <img
        alt=""
        class="right-section"
        src={img}
      />
    </section>
  );
}
