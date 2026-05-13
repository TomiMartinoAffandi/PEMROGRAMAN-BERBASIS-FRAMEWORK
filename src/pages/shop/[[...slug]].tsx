import { useRouter } from "next/router";

const HalamanToko = () => {
  // const Router = useRouter();
  //console.log(Router);
  const { query } = useRouter();

  const { slug } = query;

  return (
    <div>
      <h1>Halaman Toko</h1>
      <p>Toko: {`${query.slug && query.slug[0] + "-" + query.slug[1]}`}</p> {/* menggunakan backtick bukan petik satu*/}

      <p>
        Kategori: {slug ? slug[0] : "Semua Kategori"}
      </p>
    </div>
  );
};

export default HalamanToko;
