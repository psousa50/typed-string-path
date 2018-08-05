import { pathOf } from "../src/pathOf"

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

  it("return the full path", () => {
    const path = pathOf<Test>().a.c.e[0]
    expect(path).toBe("a.c.e")
  })

  it("part of the path", () => {
    const path = pathOf<Test>().a.c.e[1]
    expect(path).toBe("c.e")
  })

  it("part of the path from the end", () => {
    const path = pathOf<Test>().a.c.e[-1]
    expect(path).toBe("e")
  })
})
