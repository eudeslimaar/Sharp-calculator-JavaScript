

document.addEventListener("DOMContentLoaded", function(){
    sharpCalculator = calculatorFactory("#sharp-calculator");
    sharpCalculator.init();
});
function calculatorFactory(cssId) {
    return {
 
      buttonsList: [],
      calcMemory: 0,
      calcValue: 0,
      screen: 0,
      screenElement: {},
     
      init() {
        let _this = this;

        this.buttonsList = document.querySelectorAll(`${cssId} .calc-btn`);
        this.screenElement = document.querySelector(`${cssId} output`);
      
       
        for (var button of this.buttonsList) {
          button.addEventListener('click', function() {
            _this.calcWrite(this.innerHTML, _this.screenElement);
          });
        }
      
        
      },

      calcWrite(value, affectedScreen) {
        if (value === "on/c") {
         
          affectedScreen.innerText = "0";
          calcValue = 0;
        } else if (value === "CE") {
         
          var reduceOfOne = affectedScreen.innerText.slice(0, -1);
          affectedScreen.innerText = reduceOfOne;
          if (affectedScreen.innerText === "") {
            affectedScreen.innerText = "0";
          }
        } else if (value === "=" || value === "Enter") {
         
          affectedScreen.innerText = eval(this.calcValue);
        } else if (!isNaN(value)) {
          
          if (Number(affectedScreen.innerText) === 0) {
            affectedScreen.innerText = value;
            this.calcValue = value;
          } else {
            affectedScreen.innerText += value;
            this.calcValue += value;
          }
        } else {
         
          if (value === "MC" || value === "M+" || value === "M-" || value === "MR") {
            this.useMemory(value, affectedScreen);
          } else if (Number(affectedScreen.innerText) === 0) {
            
            switch (value) {
              case "-":
                affectedScreen.innerText += value;
                this.calcValue += "-";
                break;
              case ".":
                affectedScreen.innerText = value;
                this.calcValue = ".";
                break;
            }
          } else {
            this.setOperator(value, affectedScreen);
          }
        }
      },
      
      setOperator(value, affectedScreen) {
        let regex = /(([^\.]\d{1,}\.\d{1,}$)|(^[\.]\d{1,}))/g;
        
        let lastEntry = affectedScreen.innerHTML.slice(-1);
        let canAddOperator = lastEntry === "+" ? false :
                             lastEntry === "-" ? false :
                             lastEntry === "×" || lastEntry === "*" ? false :
                             lastEntry === "÷" || lastEntry === "/" ? false :
                             lastEntry === "." || value === "." && affectedScreen.innerHTML.match(regex) ? false :
                             true;
        if (canAddOperator) {
          
          switch (value) {
            case "+":
              affectedScreen.innerText += value;
              this.calcValue += "+";
              break;
            case "-":
              affectedScreen.innerText += value;
              this.calcValue += "-";
              break;
            case "x"||"*":
              affectedScreen.innerText += value;
              this.calcValue += "*";
              break;
            case "÷"||"/":
              affectedScreen.innerText += value;
              this.calcValue += "/";
              break;
            case ".":
              affectedScreen.innerText += value;
              this.calcValue += ".";
              break;
          }
        }
      },
     
      useMemory(value, affectedScreen) {
        
        switch (value) {
          case "MC":
            this.calcMemory = 0;
            break;
          case "M+":
            if(this.isValidMemoryUsage(affectedScreen.innerText)) {
              this.calcMemory += affectedScreen.innerText * 1;
              affectedScreen.innerText = 0;
            } else {
              console.warn("You cannot memorize a calculation that has not been completed.");
            }
            break;
          case "M-":
            if(this.isValidMemoryUsage(affectedScreen.innerText)) {
              this.calcMemory -= affectedScreen.innerText * 1;
              affectedScreen.innerText = 0;
            } else {
              console.warn("You cannot memorize a calculation that has not been completed.");
            }
            break;
          case "MR":
            affectedScreen.innerText = this.calcMemory;
            break;
        }
      },
      isValidMemoryUsage(toValidate) {
        return !isNaN(toValidate);
      }
    };
  }
      
