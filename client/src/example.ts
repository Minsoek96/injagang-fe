// 여기에 제네릭 함수 오버로딩을 정의하세요
function getLength(number: number[]): Date;
function getLength(string: string): Date;

function getLength(x? : number[], y? : string) {
  if (x) {
    return x.length;
  }
  if (y) {
    return y.length;
  }
}

// 예시:
console.log(getLength([1, 2, 3])); // 3
console.log(getLength('hello')); // 5
