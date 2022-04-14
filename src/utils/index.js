export function sleep(ms = 1000) {
  return new Promise((resolve) => {
    const t = setTimeout(() => {
      clearTimeout(t)
      resolve()
    }, ms)
  })
}
