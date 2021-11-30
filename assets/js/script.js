let basket = document.querySelector(".basket");
let basketlist = document.querySelector(".basketlist");
let closee = document.querySelector(".close")
let basketbtns = document.querySelectorAll(".basketbtn")
let minicard = document.querySelector(".minicard")
let countT = document.querySelector(".count")
let priceP = document.querySelector(".price")
let info = document.querySelector(".info")

closee.style.display = "none"
basketlist.style.border = "0px"
closee.onclick = function () {
    closee.style.display = "none"
    minicard.classList.add("d-none")
    info.classList.add("d-none")
}
basket.onclick = function () {
    info.classList.remove("d-none")
    minicard.classList.remove("d-none")
    closee.style.display = "block"

}
basketbtns.forEach(basketbtn => {
    basketbtn.onclick = function (e) {
        e.preventDefault()
        if (localStorage.getItem("basket") == null) {
            localStorage.setItem("basket", JSON.stringify([]))
        }

        let basket = JSON.parse(localStorage.getItem("basket"))
        let PhoneName = this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
        let PhoneImg = this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.src
        let PhoneCost = this.previousElementSibling.previousElementSibling.innerHTML
        let dataID = this.getAttribute("data-id")
        let Phone = {
            ID: dataID,
            PhoneName,
            PhoneImg,
            PhoneCost,
            Count: 1
        }
        let exsistphone = basket.find(b => b.ID == dataID)
        if (exsistphone == undefined) {
            basket.push(Phone)
        } else {
            exsistphone.Count++
        }
        localStorage.setItem("basket", JSON.stringify(basket))
        CalcCount()
        TotalPrice()

        let clone = this.parentElement.cloneNode(true)
        clone.style.marginTop = "10px"
        clone.style.marginLeft = "20px"
        clone.children[4].remove();
        minicard.append(clone)
    }
})
CalcCount()

function CalcCount() {
    let countt = document.querySelector(".count")
    if (localStorage.getItem("basket") == null) {
        localStorage.setItem("basket", JSON.stringify([]))
    }
    let basket = JSON.parse(localStorage.getItem("basket"))
    countT.innerHTML = "Count :" + basket.length

}
TotalPrice()

function TotalPrice() {
    let price = document.querySelector(".price")
    let basket = JSON.parse(localStorage.getItem("basket"))
    let TotalPrice = basket.reduce((total, p) => {
        return total += +p.PhoneCost * p.Count
    }, 0)
    price.innerHTML = "Price :" + TotalPrice




}