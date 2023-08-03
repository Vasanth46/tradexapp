
const id=['bitcoin','dogecoin','ethereum']
const url="https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd"

const head=document.querySelectorAll(".h")
const toggle=document.querySelector(".slider")

fetch(url).then(response=>response.json()).then(data=>
    {
        head[0].innerHTML=`$${data.bitcoin.usd}`
        head[1].innerHTML=`$${data.ethereum.usd}`
        head[2].innerHTML=`$${data.dogecoin.usd}`
    }).catch((error)=>{
        throw new Error("Something went wrong")
    })


toggle.addEventListener("click",()=>{
    document.body.classList.toggle('dark-theme')
})