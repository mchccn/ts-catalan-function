class Pair<A, B> { constructor(public fst: A, public snd: B) {} }

type Increment = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];

type Partition<
  XS extends ReadonlyArray<unknown>,
  At extends string,
  Index extends number = 0,
  Left extends ReadonlyArray<unknown> = [],
> = XS extends [infer First, ...infer Rest]
    ? `${Index}` extends At
      ? [Left, Rest]
      : Partition<Rest, At, Increment[Index], [...Left, First]>
    : never

type CatalanLoop<X, XS extends ReadonlyArray<unknown>> = {
  [K in keyof XS & `${bigint}`]:
    Partition<XS, K> extends [infer Left, infer Right]
      ? Left extends ReadonlyArray<unknown>
        ? Right extends ReadonlyArray<unknown>
          ? Catalan<X, Left> extends infer YS
            ? Catalan<XS[K], Right> extends infer ZS 
              ? Pair<YS, ZS>
              : never
            : never
          : never
        : never
      : never
}[keyof XS & `${bigint}`];

type Catalan<X, XS extends ReadonlyArray<unknown>> = 
  XS["length"] extends 0 ? X : XS["length"] extends 1 ? Pair<X, XS[0]> : CatalanLoop<X, XS>;

type Show<Pairs> = Pairs extends Pair<infer A, infer B> ? `(${Show<A>} <> ${Show<B>})` : `${Pairs & number}`;

type C0 = Catalan<1, []>; // 1

type C1 = Catalan<1, [2]>; // Pair<1, 2>

type C2 = Catalan<1, [2, 3]>; // Pair<1, Pair<2, 3>> | Pair<Pair<1, 2>, 3>

type C3 = Catalan<1, [2, 3, 4]>; /* Pair<1, Pair<2, Pair<3, 4>>> |
                                  * Pair<1, Pair<Pair<2, 3>, 4>> |
                                  * Pair<Pair<1, 2>, Pair<3, 4>> |
                                  * Pair<Pair<1, Pair<2, 3>>, 4> |
                                  * Pair<Pair<Pair<1, 2>, 3>, 4>
                                  */

type ShowC0 = Show<C0>;
//   ^?
type ShowC1 = Show<C1>;
//   ^?
type ShowC2 = Show<C2>;
//   ^?
type ShowC3 = Show<C3>;
//   ^?

type Test1 = Pair<1, Pair<2, Pair<3, 4>>> extends C3 ? true : false
type Test2 = Pair<1, Pair<Pair<2, 3>, 4>> extends C3 ? true : false
type Test3 = Pair<Pair<1, 2>, Pair<3, 4>> extends C3 ? true : false
type Test4 = Pair<Pair<1, Pair<2, 3>>, 4> extends C3 ? true : false
type Test5 = Pair<Pair<Pair<1, 2>, 3>, 4> extends C3 ? true : false
