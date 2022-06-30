#include <iostream>

int odd(int n) {
  return n & 0x01;
}

int half(int n ) {
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

\
int multiply2(int n, int a) {
  if (n == 1) return a;
  return multiply_accumulate(a, n-1, a);
}

int main() {
  int n, a;
  std::cin>>n>>a;
  std::cout<<multiply2(n, a)<<std::endl;
}
