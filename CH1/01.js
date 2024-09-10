// 공연료 청구서를 출력하는 함수
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice[0].customer})\n`;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let aPerformance of invoice[0].aPerformanceormances) {
    const play = plays[aPerformance.playID];
    let result = amountFor(aPerformance, play);

    // 포인트 적립
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트 제공
    if ("comedy" === play.type)
      volumeCredits += Math.floor(aPerformance.audience / 5);
    //청구 내역을 출력한다.
    result += `${play.name}:${format(result / 100)}(${
      aPerformance.audience
    }석\n)`;
    totalAmount += result;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  //장르에 따른 총액 중첩 함수
  function amountFor(aPerformance, play) {
    let result = 0;
    switch (play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
  }
  return result;
}
