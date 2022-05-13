// Hello O_o
"use strict"
let database = [{
    "type":"Cash",
    "name":"O_o",
    "date":"2022-12-04",
    "amount":"$200"
}]
/* item template inside table
<tr>
    <td>Cash</td>
    <td>O_o</td>
    <td>04/12/2022</td>
    <td>$200</td>
    <td><input type="button" value="X"></td>
</tr>
*/
// this create item
function createItem(type, name, date, amount, indice){
    const expense = document.createElement("tr")
    expense.innerHTML = `
        <td>${type}</td>
        <td>${name}</td>
        <td>${date}</td>
        <td>${amount}</td>
        <td><input type="button" value="X" data-indice=${indice}></td>
    ` 
    document.querySelector("#tab-items").appendChild(expense)
}

function cleanWindow(){
    const items = document.querySelector("#tab-items")
    while(items.firstChild){
        items.removeChild(items.lastChild)
    }
}

function updateWindow(){
    cleanWindow()
    const title = document.createElement("tr")
    title.innerHTML = `
        <th>Type</th>
        <th>Name</th>
        <th>Date</th>
        <th>Amount</th>
    `
    document.querySelector("#tab-items").appendChild(title)
    database.forEach((item, index) => createItem(item.type, item.name, item.date, item.amount, index))
}

function addItem(event){
    const errorMessage = document.createElement("p")
    errorMessage.innerHTML = `Some information is missing!`
    
    let item = []
    let inputs = document.getElementsByClassName("data-input")
    
    if(event.target.type == "button"){
        for(let i=0; i<inputs.length; i++){
            if(inputs[i].value != ""){
                item.push(inputs[i].value)
            } else {
                document.querySelector("#error-text").appendChild(errorMessage)
                item = []
                break
            }
        }
        if(item.length != 0){
            database.push({
                "type":item[0],
                "name":item[1],
                "date":item[2],
                "amount":"$"+item[3]
            })
            updateWindow()
            for(let i=0; i<inputs.length; i++){
                inputs[i].value = ""
            }
        }
    }
}

function removeItem(event){
    const element = event.target
    if(element.type == "button"){
        const i = element.dataset.indice
        database.splice(i, 1)
        updateWindow()
    }
}

document.querySelector("#new-item").addEventListener("click", addItem)
document.querySelector("#tab-items").addEventListener("click", removeItem)
updateWindow()

