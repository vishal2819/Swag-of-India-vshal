// This function removes a product from Cart List

function removeFromCart(id){
    cart.removeFromCart(id);
    renderItems();
}



function renderItems(){
    const cartItems = cart.getAllItems();

    let totalPrice = 0;
    let totalDiscount = 0;

    arr =  [1,2,3,4];

    const sum = arr.reduce((p,c) => {
        return p+c;
    },0);


    const cards = cartItems.reduce((prev,curr) => {
        totalPrice += curr.price*curr.qty;
        totalDiscount += (+curr.price - +curr.priceAfterDiscount)*curr.qty;

        return prev + `<div class="cart-left-container d-flex justify-content-space-between flex-wrap flex-diection-column">
                            <div class ="prod-details d-flex">
                                 
                                <div class="prod-img d-flex justify-content-center align-items-cneter">
                                 <img src ="./images/${curr.imageName}.png">
                                </div>
                              
                               <div class="cart-product-details d-flex flex-direction-column justify-content-space-between w-100">
                                    <div class="left-prod-details">
                                        <div class="prod-details-list">
                                            <h6 class""><b>${curr.name}</b></h6>
                                            <p class="pt-1">Color:White</p>
                                            <p> Sold By: Levice</p>
                                        </div>
                                    </div>
                                    <div class="cart-size-qty d-flex">
                                             <div class="select-size">
                                                <select name="cart-prod-size" id="prod-size">
                                                <option>Size:M</option>
                                                <option>Size:L</option>
                                                <option>Size:XL</option>
                                                <option>Size:XXL</option>
                                                </select>
                                            </div>
                                                    &nbsp
                                                    &nbsp
                                            <div class="select-qty d-flex">
                                                <button class="qty" onClick ="decreamentQty(${curr.id})">  -  </button>
                                                 <div>${curr.qty}</div>
                                                 <button onClick ="increamentQty(${curr.id})">+</button>
                                            </div>
                                    </div>  
                                   
                                </div>
                            </div>
                                            <div class="right-price-details">
                                                 <p class="fw-bold">Rs.${curr.priceAfterDiscount}</p>
                                                    <p><del>Rs.${curr.price} </del><span class="off fw-bold">(60% Off)</span></p>
                                                <p>Delivery in 4-6 days</p>
                                            </div>
                            <div>
                                    
                                            <div class="remove-cart">
                                                    <button  class="remove-cart" onClick ="removeFromCart(${curr.id})">Remove</button>
                                           
                                             </div>
                    </div>`;
    }, '')

    document.getElementById('cart-card-wrapper').innerHTML = cards;
    document.getElementById('total-price').innerHTML=Math.floor(totalPrice);
    document.getElementById('total-discount').innerHTML=Math.floor(totalDiscount);

    document.getElementById('final-price').innerHTML=Math.floor(totalPrice-totalDiscount);
}
renderItems();



function decreamentQty(id){
    cart.decreamentQty(id);
    renderItems();
}

function increamentQty(id){
    cart.increamentQty(id);
    renderItems();
}

