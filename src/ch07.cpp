#include <iostream>

#define NoncommutativeAdditiveSemigroup typename
#define Integer typename

template<Integer N>
bool odd(N n) {
  return bool(n & 0x01);
}

template<Integer N>
N half(N n) {
  return n >> 1;
}

int mult_acc4(int r, int n, int a) {
  while(true) {
    if (odd(n)) {
      r = r + a;
      if (n == 1) return r;
    }
    n = half(n);
    a = a + a;
  }
}

template <typename A, typename N>
A multiply_accumulate(A r, N n, A a) {
  while(true) {
    if (odd(n)) {
      r = r + a;
      if (n == 1) return r;
    }
    n = half(n);
    a = a + a;
  }
}

int multiply2(int n, int a) {
  if (n == 1) return a;
  return multiply_accumulate(a, n-1, a);
}

template <NoncommutativeAdditiveSemigroup A, typename N>
A multiply_accumulate_semigroup(A r, N n, A a) {
  // assert: n >= 0
  if (n == 0)
    return r;

  while (true)
  {
    if (odd(n)) {
      r = r + a;
      if (n == 1) return r;
    }
    n = half(n);
    a = a + a;
  }
}

template <NoncommutativeAdditiveSemigroup A, Integer N>
A multiply_semigroup(N n, A a) {
  // assert: n > 0
  while (!odd(n)) {
    a = a + a;
    n = half(n);
  }

  if (n == 1)
    return a;
  return multiply_accumulate_semigroup(a, half(n - 1), a + a);
}

int main() {
  int n, a;
  std::cin>>n>>a;
  std::cout<<multiply_semigroup(n, a)<<std::endl;
}
