import styles from "../../pages/produk/produk.module.scss";
import Link from "next/link";
import Image from "next/image";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({ products = [] }: { products?: ProductType[] }) => {
  return (
    <div className={styles.produk} data-testid="tampilan-produk">
      <h1 className={styles.produk__title} data-testid="produk-title">Daftar Produk</h1>
      <div className={styles.produk__content} data-testid="produk-content">
        {products.length > 0 ? (
          <>
            {products.map((products: ProductType) => (
              <Link
                href={`/produk/${products.id}`}
                key={products.id}
                className={styles.produk__content__item}
                data-testid={`produk-item-${products.id}`}
              >
                <div className={styles.produk__content__item__image}>
                  <img src={products.image} alt={products.name} width={200} height={200} />
                </div>
                <h4 className={styles.produk__content__item__name}>
                  {products.name}
                </h4>
                <p className={styles.produk__content__item__category}>
                  {products.category}
                </p>
                <p className={styles.produk__content__item__price}>
                  Rp {products.price.toLocaleString("id-ID")}
                </p>
              </Link>
            ))}
          </>
        ) : (
          <div className={styles.produk__content__skeleton} data-testid="produk-skeleton">
            <div className={styles.produk__content__skeleton__image}></div>
            <div className={styles.produk__content__skeleton__name}></div>
            <div className={styles.produk__content__skeleton__category}></div>
            <div className={styles.produk__content__skeleton__price}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;