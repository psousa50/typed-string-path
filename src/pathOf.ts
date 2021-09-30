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

type TypedPathWrapper2<T> = {
  [P in keyof T]-?: T[P] extends BasicType ? TypedPathWrapper2<void> : TypedPathWrapper2<T[P]>
}

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

export function proxy<T extends Indexed>(obj: TypedPathWrapper2<T>): TypedPathWrapper2<T> {
  return new Proxy(obj, {
    get(target: TypedPathWrapper2<T>, prop: string) {
      const newObj = target[prop] as TypedPathWrapper2<T>
      return typeof newObj === "object" ? proxy(newObj) : newObj
    },
    set(target: TypedPathWrapper2<T>, prop: string, value: any) {
      const newObj = target[prop] as TypedPathWrapper2<T>
      if (typeof newObj === "object") {
        proxy(newObj)
      } else {
        target[prop] = value
      }
      return true
    },
  })
}
