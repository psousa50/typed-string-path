import { pathOf } from "../src/pathOf"

describe("pathOf", () => {
  type Test = {
    a: {
      b: number[]
      c: {
        d: boolean
        e: symbol
      }
    }
    f: number
  }

  const pathOfTest = pathOf<Test>()

  it("returns the full path", () => {
    const path = pathOfTest.a.c.e.path()
    expect(path).toBe("a.c.e")
  })

  it("returns part of the path", () => {
    const path = pathOfTest.a.c.e.path(1, 2)
    expect(path).toBe("c")
  })

  it("returns part of the path from the end", () => {
    const path = pathOfTest.a.b.path(-2, -1)
    expect(path).toBe("a")
  })

  it("returns the full path from an object", () => {
    const obj = {
      x: 2,
      y: {
        w: "abc",
        z: true,
      },
    }

    const path = pathOf<typeof obj>().y.w.path()
    expect(path).toBe("y.w")
  })
})
