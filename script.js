const stepCircles=document.querySelectorAll(".step")
const nextStepBtns=document.querySelectorAll(".nextstep")
var counterStep=0;
const rightSides=document.querySelectorAll(".rightSide")
const backBtns=document.querySelectorAll(".backstep");
const cards=document.querySelectorAll(".card")
const switcher=document.querySelector(".switcher")
function moveForward(){
    const isValid=validerStep()
    const isStep2Valid=isStepTwoValid()
    const isStep3valid=checkStep3()
    if((counterStep==0 && isValid) || (counterStep==1 && isStep2Valid) || (isStep3valid && counterStep==2)){
    rightSides[counterStep].classList.add("hidden")
    rightSides[++counterStep].classList.remove("hidden")
    updateACtiveStep(counterStep,-1)
    if(counterStep==3){
        calcTotal()
    }
    }
}

function updateACtiveStep(index,direction){
    stepCircles[index+direction].classList.remove("active")
    stepCircles[index].classList.add("active")
}

function moveback(){
    rightSides[counterStep].classList.add("hidden")
    rightSides[--counterStep].classList.remove("hidden")
    updateACtiveStep(counterStep,1)
}

nextStepBtns.forEach(nextStepBtn=>{
    nextStepBtn.addEventListener("click",moveForward)
})

backBtns.forEach(backBtn=>{
    backBtn.addEventListener("click",moveback)
})

function validerStep(){
    var isAllValid=true;
    const inputs=rightSides[counterStep].querySelectorAll("input")
    inputs.forEach(input=>{
        if(!input.value.trim()){
            isAllValid=false;
            input.dataset.state="invalid"
        }else {
            input.dataset.state="valid"
        }
    })
    return isAllValid;
}

function isStepTwoValid(){
    return  Boolean(document.querySelectorAll(".card.active").length)
}

cards.forEach(card=>{
    card.addEventListener("click",()=>{
        card.classList.toggle("active")
    })
})


//switcher btn
switcher.addEventListener("click",()=>{
    switcher.classList.toggle("active")
})
const confirmBtn=document.querySelector(".confirm")


//checkBoxes
const checkBoxes=document.querySelectorAll(".checkbox")
checkBoxes.forEach(checkBox => {
    checkBox.addEventListener("click",()=>{
        checkBox.classList.toggle("active")
    })
})



function checkStep3(){
    return Boolean(document.querySelectorAll(".checkbox.active").length)
}

function calcTotal(){
    const total=document.querySelector(".total h2")
    const cardChoosed=document.querySelector(".card.active")
    const card_price=+cardChoosed.querySelector(".card-info p").textContent.split("$")[0]
    const addOns=document.querySelectorAll(".item-list > img.active")
    var addOns_price=0;
    for(let addOn of addOns){
        const parentElement=addOn.parentElement;
        const unit_price=+parentElement.querySelector(".item-price").textContent.split("$")[0]
        addOns_price+=unit_price
    }
    total.textContent=`${card_price+addOns_price}$`
}

const thankDiv=document.querySelector(".thankDiv")
confirmBtn.addEventListener("click",()=>{
    rightSides[counterStep].classList.add("hidden");
    thankDiv.classList.remove("hidden")
})