
import menuArray from "./data.js";

const itemsList = document.querySelector('#items-list')
const main = document.querySelector('main')

let totalPrice = 0
let totalSectionRendered = false

itemsList.innerHTML = renderItems(menuArray)

function renderItems(arr) {
    return arr.map(item => {
        return `
            <div class="item">
                <p class="item-emoji">${item.emoji}</p>
                <div class="item-details">
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
                <div class="add-item" data-item-name="${item.name}" data-item-price="${item.price}">+</div>
            </div>`
    }).join('')
}

main.addEventListener('click', handleItemClick)

function handleItemClick(e) {
    const clickedItem = e.target

    if(clickedItem.classList.contains("add-item")) {
        const itemName = clickedItem.dataset.itemName
        const itemPrice = parseFloat(clickedItem.dataset.itemPrice)
        renderOrderItem(itemName, itemPrice)
        updateTotalPrice()
    }
    if (clickedItem.classList.contains('remove-order-item')) {
        const orderItemDetails = clickedItem.closest('.order-item-details');
        orderItemDetails.remove();
        updateTotalPrice();
    }
    if (clickedItem.classList.contains('complete-order-btn')) {
        renderModal()
    }
    if (clickedItem.classList.contains('modal-btn')) {
        hideModal()
        removeTotalSection()
        totalSectionRendered = false
        hideOrderTitle()
        removeOrderItem()
        displayOrderConfirmation()
    }
}

function renderOrderItem(itemName, itemPrice) {
    const orderItem = document.querySelector('.order-item')

    const orderItemHTML = `
            <div class="order-item-details">
                <h3 class="order-item-name">${itemName}</h3>
                <button class="remove-order-item">remove</button>
                <p class="item-price">$${itemPrice}</p>
            </div>`

    orderItem.insertAdjacentHTML('beforeend', orderItemHTML)
    totalPrice += itemPrice

    if(!totalSectionRendered) {
        renderTotalSection()
        totalSectionRendered = true
        showOrderTitle()
    } else {
        updateTotalPrice();
    }
}

function renderTotalSection() {
    const orderContainer = document.querySelector('.order-container')
    const totalSectionHTML = `
        <div class="order-total">
            <h2 class="total-title">Total price:</h2>
            <p class="total-price">$${totalPrice}</p>
        </div>
        <button class="complete-order-btn">Complete order</button>`
    
    orderContainer.insertAdjacentHTML('beforeend', totalSectionHTML)
}

function removeTotalSection() {
    const totalSection = document.querySelector('.order-total')
    const completeOrderBtn = document.querySelector('.complete-order-btn')
    totalSection.remove()
    completeOrderBtn.remove()
    totalSectionRendered = false
}

function hideOrderTitle() {
    const orderTitle = document.querySelector('.order-title')
    orderTitle.style.display = 'none'
}

function showOrderTitle() {
    const orderTitle = document.querySelector('.order-title')
    orderTitle.textContent = "Your order"
    orderTitle.style.display = 'block'
}

function removeOrderItem() {
    const orderItem = document.querySelector('.order-item')
    orderItem.remove()
}

function updateTotalPrice() {
    const orderItems = document.querySelectorAll('.order-item-details');

    if (orderItems.length === 0) {
        removeTotalSection()
        hideOrderTitle()
    } 
    
    // Recalculate total price
    let newTotalPrice = 0;
    orderItems.forEach(orderItem => {
        const priceElement = orderItem.querySelector('.item-price');
        const price = parseFloat(priceElement.textContent.replace('$', ''));
        newTotalPrice += price;
    });

    // Update total price in the DOM
    const totalPriceElement = document.querySelector('.total-price');
    totalPriceElement.textContent = `$${newTotalPrice}`;
}

function renderModal() {
    const modal = document.querySelector('.modal')

    const modalHTML = `
        <h3 class="modal-title">Enter card details</h3>
        <input type="text" placeholder="Enter your name" required class="modal-child">
        <input type="text" placeholder="Enter card number" required class="modal-child">
        <input type="text" placeholder="Enter CVV" required class="modal-child">
        <button class="modal-btn modal-child">Pay</button>`

    modal.innerHTML = modalHTML

    modal.style.display = 'flex'

}

function hideModal() {
    const modal = document.querySelector('.modal')
    modal.style.display = 'none'
}

function displayOrderConfirmation() {
    const orderContainer = document.querySelector('.order-container')

    const orderConfirmation = document.createElement('section')
    orderConfirmation.classList.add('order-confirmation')

    const orderConfirmationHTML = `
            <h3 class="order-confirmation-description">Thanks, James! Your order is on its way!</h3>`
    orderConfirmation.innerHTML = orderConfirmationHTML

    orderContainer.appendChild(orderConfirmation)

}

