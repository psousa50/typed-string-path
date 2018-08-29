import { PATH, pathOf } from "../src/pathOf"

describe("pathOf", () => {
  type Test = {
    a: {
      b: number[]
      c: {
        d: boolean
        e: symbol
        path: {
          xx: number,
          yy: string
        }
      }
      PATH: boolean,
    }
    f: number
  }

  const pathOfTest = pathOf<Test>()

  it("returns the full path", () => {
    const path = pathOfTest.a.c.e[PATH]
    expect(path).toBe("a.c.e")
  })

  it("returns part of the path", () => {
    const path = pathOfTest.a.c[PATH]
    expect(path).toBe("a.c")
  })

  it("returns the full path from an object", () => {
    const obj = {
      x: 2,
      y: {
        w: "abc",
        z: true,
      },
    }

    const path = pathOf<typeof obj>().y.w[PATH]
    expect(path).toBe("y.w")
  })
})
