export const PATH = 0

interface Indexed {
  [k: string]: any
}
type BasicType = number | string | boolean | undefined | null

type PathAcessor = { [k: number]: string }
type TypedPathWrapper<T> = {
  [P in keyof T]-?: T[P] extends BasicType ? TypedPathWrapper<void> : TypedPathWrapper<T[P]>
} &
  PathAcessor

function isNumeric(value: any) {
  return !isNaN(value)
}

function isFinalProp<T extends Indexed>(target: T, prop: string): any {
  return target[prop] !== undefined || prop.toString().startsWith("Symbol")
}

export function pathOf<T extends Indexed>(path: string[] = []): TypedPathWrapper<T> {
  return new Proxy({} as TypedPathWrapper<T>, {
    get(target: TypedPathWrapper<T>, prop: string) {
      return isNumeric(prop)
        ? getPath(path, parseInt(prop, 0))
        : !isFinalProp(target, prop)
          ? pathOf([...path, prop])
          : undefined
    },
  })
}

function getPath(path: string[], startAt: number) {
  return path.slice(startAt).join(".")
}
