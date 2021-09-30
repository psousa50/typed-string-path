import { PATH, pathOf, proxy } from "../src/pathOf"

type Test = {
  a: {
    b: number[]
    c: {
      d: boolean
      e: symbol
      path: {
        xx: number
        yy: string
      }
    }
    PATH: boolean
  }
  f: number
}

const testObject = {
  x: 2,
  y: {
    w: "abc",
    z: true,
  },
}

describe("pathOf", () => {
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

describe("proxy", () => {
  it("gets an object value", () => {
    expect(proxy(testObject).y.w).toBe(testObject.y.w)
  })
  it("return undefined if property is undefined", () => {
    const obj: Test = {} as any as Test
    expect(proxy(obj).a.c.e).toBeUndefined()
  })
})
