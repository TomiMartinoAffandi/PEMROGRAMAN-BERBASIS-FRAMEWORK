import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.error}>
    <head>
        <title>404 - Halaman Tidak Ditemukan</title>
    </head>
        <img src="/404.png" alt="404" className={styles.error__image} />
      <h1 className="text-3xl font-bold text-blue-600 ">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-3xl font-bold text-blue-600 ">Maaf, halaman yang Anda cari tidak ada.</p>
    </div>
  );
};

export default Custom404;
