export const PATH = "@@path"

interface Indexed {
  [k: string]: any
}
type BasicType = number | string | boolean | symbol | undefined | null | any[]

type PathAccessor = {
  [PATH]: string
}

type TypedPathWrapper<T> = {
  [P in keyof T]-?: T[P] extends BasicType ? TypedPathWrapper<void> : TypedPathWrapper<T[P]>
} &
  PathAccessor

export function pathOf<T extends Indexed>(path: string[] = []): TypedPathWrapper<T> {
  return new Proxy({} as TypedPathWrapper<T>, {
    get(target: TypedPathWrapper<T>, prop: string) {
      return prop === PATH ? getPath(path) : pathOf([...path, prop])
    },
  })
}

function getPath(path: string[]) {
  return path.join(".")
}
