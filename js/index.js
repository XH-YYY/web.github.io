// 实现模糊搜索========================================================================

// 动态获取页面中所有商品的信息
function getProductData() {
    let products = [];

    // 获取商品的名称、价格、图片等数据(要设置默认值，避免获取不到报错)
    document.querySelectorAll('.product-card, .product-box-showcase, .product-main-card, .product-featured-box').forEach(item => {
        // 获取商品名称
        let name = item.querySelector('.product-card-title, .showcase-title, .card-title, .product_f-title')?.textContent.trim() || '未知商品';

        // 获取商品价格
        let price = item.querySelector('.price, .product_f-price-box .price')?.textContent.trim() || '未知价格';

        // 获取商品图片地址
        let imgSrc = item.querySelector('.product-card-img-box img, .showcase-img-box img, .card-img img')?.src || '';

        // 将商品信息存储到数组中
        products.push({
            name: name,
            price: price,
            imgSrc: imgSrc
        });
    });

    // 将商品信息存储到 localStorage
    localStorage.setItem('products', JSON.stringify(products));
}

// 在页面加载时调用函数，将商品信息存储到 localStorage
window.onload = function() {
    getProductData(); // 调用函数来获取商品数据并存储
    // 在页面加载后从 localStorage 获取数据并输出
    let products = JSON.parse(localStorage.getItem('products')) || [];
    console.log(products); // 输出从 localStorage 获取的商品数据
};




//进行模糊查询
// 获取输入框和下拉列表
let keyword = document.querySelector('.keyword'); // 获取输入框
let searchList = document.querySelector('.searchlist'); // 获取搜索框下拉列表

// 从 localStorage 获取商品数据
let products = JSON.parse(localStorage.getItem('products')) || []; // 获取存储的商品数据

// 给输入框绑定内容改变事件
keyword.addEventListener('input', function() {
    // 每次输入内容，清空下拉列表，否则会叠加
    searchList.innerHTML = '';

    // 如果输入框为空，隐藏下拉列表
    if (keyword.value === '') {
        searchList.style.display = 'none';
        return;
    }

    // 标记是否找到匹配项
    let matchFound = false;

    // 遍历商品数据，进行模糊查询
    products.forEach(function(product) {
        // 如果商品名称包含输入的关键词
        if (product.name.toLowerCase().indexOf(keyword.value.toLowerCase()) !== -1) {
            matchFound = true;

            // 创建一个新的下拉列表项，并显示商品名称
            let item = document.createElement('p');
            item.textContent = product.name;  // 使用商品名称作为列表项内容
            item.dataset.productName = product.name;  // 为每个列表项绑定商品名称

            // 将这个列表项添加到下拉列表
            searchList.appendChild(item);
        }
    });

    // 如果有匹配项，显示下拉列表，否则隐藏
    if (matchFound) {
        searchList.style.display = 'block';
    } else {
        searchList.style.display = 'none';
    }
});

// 点击其他地方隐藏下拉列表
document.addEventListener('click', function(event) {
    if (!keyword.contains(event.target) && !searchList.contains(event.target)) {
        searchList.style.display = 'none';
    }
});




//=============================================================================



// 吸顶功能实现=================================================================
// 选择元素
let search = document.querySelector('.search');
let searchM = document.querySelector('.search-m');
let form = document.querySelector('.form');
let search_logo = document.querySelector('.search_logo');
let banner = document.querySelector('.banner'); // 确保定义了banner变量

// 监听滚动事件
window.onscroll = function() {
    // 获取滚动条滚动垂直方向已经滚动的距离
    let top = document.documentElement.scrollTop || document.body.scrollTop;

    // 获取到header的高度
    let headerHeight = search.offsetHeight;
    // 获取到banner的高度
    let bannerHeight = banner.offsetHeight;

    // 当滚动条滚动到指定位置时，固定头部位置
    if (top >= headerHeight + bannerHeight) {
        search.className = 'search search-fix';
        // 固定时变化
        form.style.left = '250px';
        search_logo.style.display = 'block';
    } else {
        search.className = 'search';
        // 不固定时恢复
        form.style.left = ''; // 清空 left 属性，使其回到初始状态
        search_logo.style.display = 'none';
    }
};
// ==========================================================================================================================



// 侧边状态栏子级菜单展开和收起=================================================================================================
// 获取所有的菜单按钮
const menuButtons = document.querySelectorAll('.sidebar-accordion-menu');

// 为每个按钮添加点击事件
menuButtons.forEach(button => {
    button.addEventListener('click', function() {
        const parentMenuCategory = this.closest('.sidebar-menu-category'); // 获取父级菜单项
        parentMenuCategory.classList.toggle('open'); // 切换显示/隐藏子菜单
    });
});

// ==========================================================================================================================



//商品售出状态条==============================================================================================================
let sold = 20; // 已售出数量，使用 let 以便后续修改
let supply = 60; // 剩余可供应总量，使用 let 以便动态减少
const total = sold + supply; // 总量

// 动态计算填充宽度函数
function updateScrollbar() {
    const totalQuantity = sold + supply; // 更新总量
    const percentage = (sold / totalQuantity) * 100; // 已售出的比例

    const scrollbarFill = document.querySelector('.scrollbar-fill'); // 获取填充条

    // 设置填充条的宽度
    scrollbarFill.style.width = `${percentage}%`;
}

// 初始化时调用一次更新滚动条
updateScrollbar();
// ==========================================================================================================================



// 优惠倒计时=================================================================================================================
// 设置目标时间（2025年01月01日23:59:59）
const targetTime = new Date('2025-01-01T23:59:59').getTime();

// 更新倒计时
function updateCountdown() {
    const now = new Date().getTime(); // 当前时间
    const remainingTime = targetTime - now; // 剩余时间（毫秒）

    // 计算剩余的天、小时、分钟和秒，使用 Math.floor 向下取整
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24)); // 剩余天数
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // 剩余小时
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)); // 剩余分钟
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000); // 剩余秒数

    // 获取显示倒计时内容的元素
    document.getElementById('days').children[0].textContent = days;
    document.getElementById('hours').children[0].textContent = hours;
    document.getElementById('minutes').children[0].textContent = minutes;
    document.getElementById('seconds').children[0].textContent = seconds;

    // 如果倒计时结束，清除定时器并显示已结束
    if (remainingTime <= 0) {
        clearInterval(countdownInterval); // 清除定时器
        document.querySelector('.countdown-desc').textContent = '优惠已结束'; // 显示已结束
        // 清空计时器
        // 设置倒计时数值为00
        document.getElementById('days').children[0].textContent = '00';
        document.getElementById('hours').children[0].textContent = '00';
        document.getElementById('minutes').children[0].textContent = '00';
        document.getElementById('seconds').children[0].textContent = '00';
    }
}

// 设置定时器，每秒更新一次倒计时
const countdownInterval = setInterval(updateCountdown, 1000);

// 初始化倒计时显示
updateCountdown();
// ==========================================================================================================================


// 加入购物车功能实现=========================================================================================================

//使用浏览器的本地储存来保存购物车数据（localStorage）

document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // 阻止默认行为（跳转）
            const productName = this.closest('.product-main-card').querySelector('.card-title').textContent;
            const productPrice = this.closest('.product-main-card').querySelector('.current-price').textContent;
            

            // 在对应的card里面获取img标签中的src属性值
            const productImage = this.closest('.product-main-card').querySelector('.card-img img').src;
            
            // 默认为黑色
            const productStyle = this.closest('.product-main-card').getAttribute('data-style') || '黑色'; 
            
            // 默认为M码数
            const productSize = this.closest('.product-main-card').getAttribute('data-size') || 'M'; 
            
            const productQuantity = 1; // 默认数量为 1

            const product = {
                name: productName,
                price: productPrice,
                size: productSize,
                quantity: productQuantity,
                style: productStyle,
                image: productImage,
            };

            // 获取本地存储中的购物车数组
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // 检查商品是否已存在于购物车中
            const existingProductIndex = cart.findIndex(item => item.name === productName && item.style === productStyle && item.size === productSize);
            if (existingProductIndex > -1) {
                // 如果存在，增加数量
                cart[existingProductIndex].quantity += productQuantity;
            } else {
                // 如果不存在，添加到购物车数组中
                cart.push(product);
            }

            // 更新本地存储的购物车数据
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    });
});// ==========================================================================================================================


// ===========================================================================================================================