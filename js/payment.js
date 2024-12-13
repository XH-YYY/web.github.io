// 从 localStorage 获取商品列表和金额
document.addEventListener('DOMContentLoaded', () => {
    // 从 localStorage 获取数据
    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    const Amount=localStorage.getItem('totalAmount') || '0.00';
    const totalAmount = localStorage.getItem('totalAmount') || '0.00';

    
    const itemsBody = document.querySelector('.items-body');
    const totalPriceElement = document.querySelector('.total-price');
    const totalProductsPrice=document.querySelector('.total-products-price');

    // 清空现有内容
    itemsBody.innerHTML = '';

    // 遍历选中的商品并生成订单项
    selectedItems.forEach((item) => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';

        orderItem.innerHTML = `
            <div class="order-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="order-info">
                <div class="order-name">${item.name}</div>
                <div class="order-price">¥${item.price}</div>
                <div class="order-quantity">数量: ${item.quantity}</div>
            </div>
        `;

        itemsBody.appendChild(orderItem);
    });

    // 更新订单总金额
    totalProductsPrice.textContent=`¥${Amount}`;
    totalPriceElement.textContent = `¥${totalAmount}`;
});
