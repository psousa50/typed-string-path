interface Indexed {
  [k: string]: any
}
type BasicType = number | string | boolean | symbol | undefined | null | any[]

type PathAccessor = {
  path: (start?: number, end?: number) => string
}

type TypedPathWrapper<T> = {
  [P in keyof T]-?: T[P] extends BasicType ? TypedPathWrapper<void> : TypedPathWrapper<T[P]>
} &
  PathAccessor

export function pathOf<T extends Indexed>(path: string[] = []): TypedPathWrapper<T> {
  return new Proxy({ path: () => "" } as TypedPathWrapper<T>, {
    get(target: TypedPathWrapper<T>, prop: string) {
      return prop === "path" ? (start?: number, end?: number) => getPath(path, start, end) : pathOf([...path, prop])
    },
  })
}

function getPath(path: string[], start?: number, end?: number) {
  return path.slice(start, end).join(".")
}
