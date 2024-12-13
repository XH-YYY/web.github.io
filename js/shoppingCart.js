// 购物车信息获取============================================

document.addEventListener('DOMContentLoaded', () => {
    // 从 localStorage 获取购物车数据
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemListContainer = document.querySelector('.item-list');
    const totalPriceElement = document.getElementById('total-price'); 

    // 清空现有的内容
    itemListContainer.innerHTML = '';

    // 遍历购物车数据并生成商品项
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-item';

        // 生成商品项的 HTML 结构
        itemElement.innerHTML = `
            <!-- 商品表单部分 -->
            <div class="item-form">
                <!-- 复选框区域 -->
                <div class="cell p-checkbox">
                    <div class="cart-checkbox">
                        <input type="checkbox" id="checkItem${index}" data-index="${index}">
                    </div>
                </div>
                <!-- 商品详情区域 -->
                <div class="cell p-goods">
                    <div class="goods-item">
                        <div class="p-img">
                            <a href="#">
                                <img src="${item.image}" alt="${item.name}">
                            </a>
                        </div>
                        <div class="p-msg">
                            <div class="p-name">
                                <a href="#" title="${item.name}">${item.name}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 颜色款式 -->
                <div class="cell p-props">
                    <div class="props-txt">${item.style}</div>
                    <div class="props-txt">${item.size}</div>
                </div>
                <!-- 单价 -->
                <div class="cell p-price">
                    <div class="project-price">
                        <span title="￥${item.price}">${item.price}</span>
                    </div>
                </div>
                <!-- 数量 -->
                <div class="cell p-quantity">
                    <div class="cart-number quantity">
                        <button class="cart-number-dec" data-index="${index}">-</button>
                        <input type="text" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="cart-number-inc" data-index="${index}">+</button>
                    </div>
                </div>
                <!-- 操作 -->
                <div class="cell p-ops">
                    <a href="#" class="delete-btn" data-index="${index}">删除</a>
                </div>
            </div>`;
        itemListContainer.appendChild(itemElement);
    });
 
    // 实现删除功能=======================================================
    // 添加事件监听器实现删除
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.dataset.index;
            cart.splice(index, 1); // 从购物车中移除对应商品
            localStorage.setItem('cart', JSON.stringify(cart)); // 更新 localStorage
            location.reload(); // 重新加载页面
        });
    });
    //====================================================================


    // 实现订单金额计算==================================================== 
    // 获取总金额
    function getMoney() {
        let total = 0; // 总金额
        const picks = document.querySelectorAll('[id^=checkItem]'); // 获取所有单个复选框
        picks.forEach(pick => {
            if (pick.checked) {
                const index = pick.dataset.index; // 获取对应索引
                const item = cart[index];
                total += parseFloat(item.price) * parseInt(item.quantity, 10); // 计算总价
            }
        });
        totalPriceElement.textContent = `￥${total.toFixed(2)}`; // 更新总金额显示
    }
    //====================================================================
    

    // s实现复选框功能======================================================
    // 获取全选复选框
    const allpick = document.getElementById('checkAll');

    // 监听全选复选框的点击事件
    allpick.addEventListener('click', function() {
        // 获取所有单个复选框（id以checkItem开头的复选框）
        const picks = document.querySelectorAll('[id^=checkItem]'); 
        for (let i = 0; i < picks.length; i++) {
            // 更新选择状态
            picks[i].checked = allpick.checked;
        }
        // 获取总金额
        getMoney();
    });

    // 获取所有单个复选框
    const picks = document.querySelectorAll('[id^=checkItem]'); 

    // 单个复选框添加点击事件监听器
    picks.forEach(function(pick) {
        pick.addEventListener('click', function() {
            // 检查是否所有单个复选框都被选中
            const allChecked = Array.from(picks).every(p => p.checked);
            // 根据检查结果更新全选复选框的状态
            allpick.checked = allChecked;
            // 获取总金额
            getMoney();
        });
    });
    //====================================================================  


    // 实现商品数量加减=====================================================
    // 监听整个文档的点击事件：
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('cart-number-dec') || event.target.classList.contains('cart-number-inc')) {
        const index = event.target.dataset.index;
        //获取对应索引的input元素
        const quantityInput = document.querySelector(`.cart-number input[data-index="${index}"]`);
        // 获取单价金额  
        const priceElement = document.querySelector(`.project-price span[title]`);
        //转换为浮点数
        const price = parseFloat(priceElement.innerHTML);
        //获取数量转换为整数
        let count = parseInt(quantityInput.value, 10);
    
        if (event.target.classList.contains('cart-number-dec')) {
            // 最小返回1
            count = Math.max(1, count - 1);
        } else if (event.target.classList.contains('cart-number-inc')) {
            count++;
        }
        //更新数量
        quantityInput.value = count;

        // 更新购物车数据中的数量
        cart[index].quantity = count;
        localStorage.setItem('cart', JSON.stringify(cart)); // 同步更新到 localStorage

        // 重新计算总金额
        getMoney();
        }
    });
    
    //====================================================================

});






// 结算功能实现=============================================================

// 将被选中的商品数据保存到 localStorage
document.querySelector('.sumpayment-btn .btn').addEventListener('click', () => {
    // 获取购物车数据
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedItems = [];

    // 遍历选中的商品
    document.querySelectorAll('[id^=checkItem]').forEach((checkbox) => {
        if (checkbox.checked) {
            const index = checkbox.dataset.index;
            selectedItems.push(cart[index]);
        }
    });

    // 将选中的商品存储到 localStorage
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    // 计算总金额
    const totalAmount = selectedItems.reduce((sum, item) => {
        return sum + parseFloat(item.price) * parseInt(item.quantity, 10);
    }, 0);
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));

    // 跳转到支付页面
    window.location.href = './payment.html';
});





// =========================================================================