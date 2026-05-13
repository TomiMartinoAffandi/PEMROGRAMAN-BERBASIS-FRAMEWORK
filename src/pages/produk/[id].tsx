import DetailProduk from "../../views/DetailProduk";
import { ProductType } from "@/types/Product.type";

const HalamanProduk = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanProduk;

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/produk/${params.id}`);
  const response: { data: ProductType } = await res.json();

  if (!response.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: response.data,
    },
  };
}