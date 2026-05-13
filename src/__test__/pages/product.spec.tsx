import { render, screen } from "@testing-library/react"
import ProductPage from "@/pages/produk"

// ── 1. Mock next/router ────────────────────────────────────────────────────
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/produk",
      pathname: "/produk",
      query: {},
      asPath: "/produk",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    }
  },
}))

// ── 2. Mock SWR ────────────────────────────────────────────────────────────
jest.mock("swr", () => ({
  __esModule: true,
  default: jest.fn(),
}))

import useSWR from "swr"
const mockUseSWR = useSWR as jest.Mock

// ── 3. Mock next/link ──────────────────────────────────────────────────────
jest.mock("next/link", () => {
  const MockLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: any }) => (
    <a href={href} {...rest}>{children}</a>
  )
  MockLink.displayName = "MockLink"
  return MockLink
})

// ── helpers ────────────────────────────────────────────────────────────────
const sampleProducts = [
  { id: "1", name: "Produk A", price: 50000, image: "/img/a.jpg", category: "Kategori X" },
  { id: "2", name: "Produk B", price: 75000, image: "/img/b.jpg", category: "Kategori Y" },
]

describe("Product Page", () => {
  // ── 3a. Loading state ────────────────────────────────────────────────────
  describe("when data is loading", () => {
    beforeEach(() => {
      mockUseSWR.mockReturnValue({ data: undefined, error: undefined, isLoading: true })
    })

    it("renders skeleton while loading (snapshot)", () => {
      const { container } = render(<ProductPage />)
      expect(container).toMatchSnapshot()
    })

    it("shows the skeleton placeholder via getByTestId", () => {
      render(<ProductPage />)
      const skeleton = screen.getByTestId("produk-skeleton")
      expect(skeleton).toBeTruthy()
    })

    it("shows the page title via getByTestId and toBe", () => {
      render(<ProductPage />)
      const title = screen.getByTestId("produk-title")
      expect(title.textContent).toBe("Daftar Produk")
    })
  })

  // ── 3b. Data loaded state ────────────────────────────────────────────────
  describe("when data has loaded", () => {
    beforeEach(() => {
      mockUseSWR.mockReturnValue({
        data: { data: sampleProducts },
        error: undefined,
        isLoading: false,
      })
    })

    it("renders product list correctly (snapshot)", () => {
      const { container } = render(<ProductPage />)
      expect(container).toMatchSnapshot()
    })

    it("shows the page title via getByTestId", () => {
      render(<ProductPage />)
      expect(screen.getByTestId("produk-title")).toBeTruthy()
    })

    it("title text is 'Daftar Produk' (toBe)", () => {
      render(<ProductPage />)
      expect(screen.getByTestId("produk-title").textContent).toBe("Daftar Produk")
    })

    it("renders the correct number of product items", () => {
      render(<ProductPage />)
      const item1 = screen.getByTestId("produk-item-1")
      const item2 = screen.getByTestId("produk-item-2")
      expect(item1).toBeTruthy()
      expect(item2).toBeTruthy()
    })

    it("does NOT show the skeleton when data is present (toBe)", () => {
      render(<ProductPage />)
      const skeleton = screen.queryByTestId("produk-skeleton")
      expect(skeleton).toBe(null)
    })

    it("product item link points to correct href (toBe)", () => {
      render(<ProductPage />)
      const item = screen.getByTestId("produk-item-1")
      expect(item.getAttribute("href")).toBe("/produk/1")
    })
  })

  // ── 3c. Error state ──────────────────────────────────────────────────────
  describe("when SWR returns an error", () => {
    beforeEach(() => {
      mockUseSWR.mockReturnValue({
        data: undefined,
        error: new Error("Fetch failed"),
        isLoading: false,
      })
    })

    it("still renders the page wrapper (getByTestId)", () => {
      render(<ProductPage />)
      expect(screen.getByTestId("tampilan-produk")).toBeTruthy()
    })

    it("shows skeleton when data is undefined even after load (toBe)", () => {
      render(<ProductPage />)
      const skeleton = screen.getByTestId("produk-skeleton")
      expect(skeleton.tagName).toBe("DIV")
    })
  })
})