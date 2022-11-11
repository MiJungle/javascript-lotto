const MissionUtils = require("@woowacourse/mission-utils");

const { Console, Random } = MissionUtils;

class App {

  play() {
    Console.print('구입금액을 입력해 주세요.')
    Console.readLine('',  (userInput) => {
      Console.print("")
      return this.inputMoney(userInput)
    })
  }

  inputMoney(userInput) {
    //숫자가 아닌 값을 입력했을 때 
    if(Number(userInput)%1000 != 0) {
      throw "[ERROR] 1000 단위로 입력하세요."
    } 
    let countLotto = Number(userInput)/1000
    Console.print(`${countLotto}개를 구매했습니다.`)
      return this.issueLotto(countLotto)
  }

  issueLotto(countLotto){
    let lottos =[]
    for(let i =0 ; i <countLotto; i++){
    const numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
    numbers.sort((a,b)=> a-b)
    lottos.push(numbers)
      Console.print(numbers)
    }
    Console.print("")
    return this.enterWinningNumber(lottos)
  }

  enterWinningNumber(lottos) {
    //중복안됨, 숫자여야함
    Console.print('당첨 번호를 입력해 주세요')
   Console.readLine('', (winningNumbers)=> {
    Console.print("")
    return this.enterBonusNumber(winningNumbers,lottos)
   }) 
  }

  enterBonusNumber(winningNumbers,lottos) {
    Console.print('보너스 번호를 입력해 주세요')
    Console.readLine('', (bonusNumber)=> {
      Console.print("")
      return this.getStatistics(winningNumbers,bonusNumber,lottos)
   }) 
  }

  getStatistics(winningNumbers,bonusNumber,lottos){
    winningNumbers = winningNumbers.split(',').map(Number).sort((a,b)=>a-b)
    Console.print('당첨 통계 \n---')
    console.log(winningNumbers)
    let matches = [0,0,0,0,0]//3개일치, 4개일치, ....
    let awards = [5000,50000,1500000,30000000,2000000000]

    lottos.forEach((lotto)=> {
      let count = 0
      for(let i =0 ; i<lotto.length; i++){
        winningNumbers.forEach((winningNumber)=> {
          if(lotto[i]==winningNumber) count +=1
        })
      }
      if(count>=3 && count <5) matches[count%3]+=1
      if (count==5&&!lotto.includes(bonusNumber)) matches[2] +=1
      if (count==5&& lotto.includes(bonusNumber)) matches[3] +=1
      if (count ==6) matches[4] +=1
    })
    console.log(matches)
    Console.print(`3개 일치 (5,000원) - ${matches[0]}개`)
    Console.print(`4개 일치 (50,000원) - ${matches[1]}개`)
    Console.print(`5개 일치 (1,500,000원) - ${matches[2]}개`)
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${matches[3]}개`)
    Console.print(`6개 일치 (2,000,000,000원) - ${matches[4]}개`)

    let revenue = 0 
    for(let i = 0; i<awards.length; i++){
      revenue += awards[i]* matches[i]
    }
    let earning_rate =(revenue/this.play.userInput)*100
    return earning_rate
  }
 
}

module.exports = App;

const app = new App();
app.play();