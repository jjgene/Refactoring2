function printOwing(invoice) {
  printBanner();
  //미해결 채무(outstanding) 를 계산한다.
  let outstanding = calculateOutstanding(invoice);
  //세부 사항을 출력한다.
  recordDueDate(invoice);
  printDetails(invoice, outstanding);

  function printBanner() {
    console.log("************");
    console.log("***고객채무***");
    console.log("************");
  }
}
function printDetails(invoice, outstanding) {
  console.log(`고객명 : ${invoice.customer}`);
  console.log(`채무액 : ${outstanding}`);
  console.log(`마감일 : ${invoice.dueDate.toLocaleDateString}`);
}
function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );
}
function calculateOutstanding(invoice) {
  let outstanding = 0;
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
  return outstanding;
}
