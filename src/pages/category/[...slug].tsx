import { useRouter } from "next/router";

const HalamanCategory = () => {
  const { query } = useRouter();
  const slugs = Array.isArray(query.slug) ? query.slug : [];

  return (
    <div>
      <h1>Halaman Toko</h1>

      <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
        <p>Kategori:</p>
        <ul>
          {slugs.map((slug, index) => (
            <li key={index}>{slug}</li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default HalamanCategory;