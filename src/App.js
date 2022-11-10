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
   Console.readLine('', (winningNumber)=> {
    Console.print("")
    return this.enterBonusNumber(winningNumber,lottos)
   }) 
  }

  enterBonusNumber(winningNumber,lottos) {
    Console.print('보너스 번호를 입력해 주세요')
    Console.readLine('', (bonusNumber)=> {
      Console.print("")
      return this.getStatistics(winningNumber,bonusNumber,lottos)
   }) 
  }

  getStatistics(winningNumber,bonusNumber,lottos){
    winningNumber = winningNumber.split(',').map(Number)
    Console.print('당첨 통계 \n---')

  
  }
 
}

module.exports = App;

const app = new App();
app.play();