import { render, screen } from "@testing-library/react"
import TampilanProduk from "@/views/produk"

// ── Mock next/link ────────────────────────────────────────────────────────
jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: any }) => (
    <a href={href} {...rest}>{children}</a>
  )
  MockLink.displayName = "MockLink"
  return MockLink
})

// ── helpers ───────────────────────────────────────────────────────────────
const mockProducts = [
  { id: "1", name: "Sepatu Lari", price: 250000, image: "/img/sepatu.jpg", category: "Olahraga" },
  { id: "2", name: "Tas Sekolah", price: 120000, image: "/img/tas.jpg",    category: "Perlengkapan" },
]

describe("TampilanProduk Component", () => {
  // ── 1. No products ──────────────────────────────────────────────────────
  describe("when products list is empty", () => {
    it("renders skeleton placeholder (snapshot)", () => {
      const { container } = render(<TampilanProduk products={[]} />)
      expect(container).toMatchSnapshot()
    })

    it("shows skeleton via getByTestId", () => {
      render(<TampilanProduk products={[]} />)
      expect(screen.getByTestId("produk-skeleton")).toBeTruthy()
    })

    it("heading text is 'Daftar Produk' (toBe)", () => {
      render(<TampilanProduk products={[]} />)
      expect(screen.getByTestId("produk-title").textContent).toBe("Daftar Produk")
    })
  })

  // ── 2. No props at all (default value guard) ────────────────────────────
  describe("when no products prop is passed", () => {
    it("renders without crashing and shows skeleton", () => {
      render(<TampilanProduk />)
      expect(screen.getByTestId("produk-skeleton")).toBeTruthy()
    })
  })

  // ── 3. With products ────────────────────────────────────────────────────
  describe("when products are provided", () => {
    it("renders product list (snapshot)", () => {
      const { container } = render(<TampilanProduk products={mockProducts} />)
      expect(container).toMatchSnapshot()
    })

    it("renders wrapper with correct testid (getByTestId)", () => {
      render(<TampilanProduk products={mockProducts} />)
      expect(screen.getByTestId("tampilan-produk")).toBeTruthy()
    })

    it("does NOT render skeleton when products are present (toBe)", () => {
      render(<TampilanProduk products={mockProducts} />)
      expect(screen.queryByTestId("produk-skeleton")).toBe(null)
    })

    it("renders all product items", () => {
      render(<TampilanProduk products={mockProducts} />)
      mockProducts.forEach((p) => {
        expect(screen.getByTestId(`produk-item-${p.id}`)).toBeTruthy()
      })
    })

    it("first product name matches (toBe)", () => {
      render(<TampilanProduk products={mockProducts} />)
      const item = screen.getByTestId("produk-item-1")
      expect(item.querySelector("h4")?.textContent).toBe("Sepatu Lari")
    })

    it("first product category is correct (toBe)", () => {
      render(<TampilanProduk products={mockProducts} />)
      const item = screen.getByTestId("produk-item-1")
      const paragraphs = item.querySelectorAll("p")
      expect(paragraphs[0].textContent).toBe("Olahraga")
    })

    it("product link href points to correct path (toBe)", () => {
      render(<TampilanProduk products={mockProducts} />)
      const item = screen.getByTestId("produk-item-2")
      expect(item.getAttribute("href")).toBe("/produk/2")
    })
  })
})
