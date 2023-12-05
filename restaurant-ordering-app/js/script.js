import { menuArray } from "./data.js";

let menuData = menuArray;
let orderArray = [];
let amount = 0;
const ordersContainer = document.getElementById('orders');
const modal = document.getElementById('modal');
const successMsg = document.getElementById('success-msg')

document.addEventListener('click', e => {
    if (e.target.dataset.add) {
        ordersContainer.style.display = 'block';
        successMsg.style.display = 'none';
        addOrder(e.target.dataset.add);
    } else if (e.target.dataset.removeOrder) {
        removeOrder(e.target.dataset.removeOrder);
        if (orderArray.length === 0) {
            ordersContainer.style.display = 'none';
        }
    } else if (e.target.id === 'checkout-btn') {
        modal.style.display = 'block';
    } else if (e.target.id === 'close-modal-btn' || e.target.localName === 'main' || e.target.localName === 'header' || e.target.localName === 'body') {
        modal.style.display = 'none';
    } else if (e.target.id === 'pay-btn') {
        e.preventDefault();
        handlePayClick();
    }
});

function handlePayClick() {
    const name = document.getElementById('full-name').value;

    modal.style.display = 'none';

    ordersContainer.style.display = 'none'

    successMsg.innerHTML = `
        <h2>Thanks, ${name}! Your order is on its way! 🎉</h2>
    `;

    successMsg.style.display = 'block';
    orderArray = [];

    document.getElementById('payment-form').reset();
}

function removeOrder(orderId) {
    orderArray = orderArray.filter(order => order.id !== orderId);

    renderOrders();
}

function addOrder(menuId) {
    let orderHtml = '';
    const targetMenuObj = menuData.filter(menu => menu.id === Number(menuId))[0];

    if (!orderArray.includes(targetMenuObj)) {
        orderArray.push(targetMenuObj);

        renderOrders();
    }
}

function renderOrders() {
    let orderHtml = '';
    amount = 0;
    orderArray.forEach(order => {
        orderHtml += `
            <div class="order-item">
                <h3>${order.name}</h3>
                <span data-remove-order="${order.id}">remove</span>
                <h4>$${order.price}</h4>
            </div>
        `;
        amount += order.price
    })

    document.getElementById('order-list').innerHTML = orderHtml;
    document.getElementById('total-amount').textContent = `$${amount}`;
}

function getMenuHtml() {
    let menuHtml = '';

    menuData.forEach(menu => {
        const ingredients = menu.ingredients.join(', ');
        menuHtml += `
            <div class="menu-item">
                <div class="menu-image">${menu.emoji}</div>
                <div class="menu-details">
                    <h3>${menu.name}</h3>
                    <p>${ingredients}</p>
                    <h4>$${menu.price}</h4>
                </div>
                <div class="icon-wrapper">
                    <i class="fa-regular fa-plus add-icon" id="icon-${menu.id}" data-add="${menu.id}"></i>
                </div>
            </div>
        `;
    });

    return menuHtml;
}

function render(markupFunction, elementId) {
    document.getElementById(elementId).innerHTML = markupFunction();
}

render(getMenuHtml, 'menu-list');