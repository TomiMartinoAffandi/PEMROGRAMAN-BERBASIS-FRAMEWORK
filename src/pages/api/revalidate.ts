// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // Pengecekan keamanan: Pastikan token di URL sama dengan yang ada di environment variable
  if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({
      revalidated: false,
      message: "Insert correct token",
    });
  }

  // Pengecekan parameter data
  if (req.query.data === "produk") {
    try {
      await res.revalidate("/produk/static");
      return res.status(200).json({ revalidated: true });
    } catch (error) {
      console.error("Error in API route:", error);
      res.status(500).send({ revalidated: false });
    }
  }

  return res.json({
    revalidated: false,
    message: "Invalid query parameter. Expected 'data=produk'.",
  });
}