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

  describe("for a specific type returns", () => {
    it("the full path", () => {
      const path = pathOf<Test>().a.c.e[0]
      expect(path).toBe("a.c.e")
    })

    it("path of the path", () => {
      const path = pathOf<Test>().a.c.e[2]
      expect(path).toBe("e")
    })

    it("path of the path from the end", () => {
      const path = pathOf<Test>().a.c.e[-2]
      expect(path).toBe("c.e")
    })
  })
})
