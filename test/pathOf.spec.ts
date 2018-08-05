import { PATH, pathOf } from "../src/pathOf"

describe("pathOf", () => {
  type Test = {
    a: {
      b: number
      c: {
        d: boolean
        e: number
      }
    }
    f: number
  }

  it("returns the full path", () => {
    const path = pathOf<Test>().a.c.e[PATH]
    expect(path).toBe("a.c.e")
  })

  it("returns part of the path", () => {
    const path = pathOf<Test>().a.c.e[1]
    expect(path).toBe("c.e")
  })

  it("returns part of the path from the end", () => {
    const path = pathOf<Test>().a.c.e[-1]
    expect(path).toBe("e")
  })

  it("returns the full path from an object", () => {
    const obj = {
      x: 2,
      y: {
        w: "abc",
        z: true,
      },
    }

    const path = pathOf<typeof obj>().y.z[0]
    expect(path).toBe("y.z")
  })
})
