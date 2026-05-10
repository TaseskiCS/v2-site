declare module 'vara/src/vara.min.js' {
  type VaraTextBlock = Record<string, unknown>

  export default class Vara {
    constructor(
      selector: string,
      fontUrl: string,
      texts: string | VaraTextBlock[],
      props?: Record<string, unknown>,
    )

    ready(fn: () => void): void
  }
}
