interface INumeral {
  symbols: string[];
  keys: Record<string, number>;
  parse(digit: number): string;
  reverse(symbol: string): number;
}

class RomanNumerals implements INumeral {

  symbols: string[] = [
    "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX",
  ];

  keys: Record<string, number> = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  }

  parse(digit: number): string {
    const digits: string[] = [...(digit + "")];
    const thousand = "M";

    let romanNum = "";
    let hundred = 3;

    while (hundred--) {
      const d = digits.pop();
      if (d) {
        const key: number = +d + hundred * 10;
        romanNum = (this.symbols[key] || "") + romanNum;
      }
    }

    return Array(+digits.join("") + 1).join(thousand) + romanNum;
  }

  reverse(symbol: string): number {
    let result = 0;

    for (let i = 0; i < symbol.length; i++) {
      const cur = this.keys[symbol[i]];
      const next = this.keys[symbol[i + 1]];

      if (cur < next) {
        result += next - cur
        i++
      } else {
        result += cur
      }
    }

    return result;
  }
}

const roman = new RomanNumerals()

console.log("roman number: ", roman.parse(22));
console.log("arabic number: ", roman.reverse('XXII')); 