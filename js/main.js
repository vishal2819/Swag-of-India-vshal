let contacts = new Map()
contacts.set('india', '+9188888876')
contacts.set('usa', '+1888888886')
contacts.set('canada', '+1999999876')
contacts.set('uae', '+9718888889')

// contacts.get('india')

document.getElementById("select1").addEventListener('change', () => {
    let country = document.getElementById('select1').value;
    document.getElementById('contact').innerHTML = contacts.get(country);
    document.getElementById('flag').src = `images/${country}.png`;
})
/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
// scroll to top button function
const btnScrollToTop = document.querySelector("#btnScrollToTop");

btnScrollToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"

    });
});


// get products data
//Calling JSON details
// Below JSON data is fetched in Home Page and Product Listing Page


// JSON Link
fetch('https://gist.githubusercontent.com/bhupendraparihar/fd6fc4964953bcfd9c06d591f8d2efca/raw/13607dfcb56fed860d8261333e83b14e9428d13c/products.json')

    .then(data => data.json()) // JS Object Notation
    .then(data => {

        console.log(data);
        const products = data;

        let cards = '';
        products.forEach(product => {

            stars = '';
            const ratings = Math.floor(+product.ratings);
            for (let i = 1; i <= 5; i++) {
                if (i <= ratings) {
                    stars += '<i class="fas fa-star" role="icon" aria-label = "star-rating" > </i>';
                } else {
                    stars += '<i class = "far fa-star" role = "icon" aria-label = "star-rating"></i>';
                }
            }

            let isNewDiv = '';
            if (product.isNew === "TRUE") {
                isNewDiv = '<span class="new">New</span>'
            }

            cards = cards + `<div class="col col-sm-12 col-md-6 col-lg-4">
                                <div class="product1" id="product1">
                                    <div class="card" style="width: 18rem;">
                                        <img src="images/${product.imageName}.png" class="card-img-top" alt="Product image">
                                        <div class="card-body">
                                            <div class="product-info">
                                                <p>${product.name}</p>
                                                <div>
                                                    <span class="rs">Rs ${product.priceAfterDiscount}</span> <span class="strike">Rs
                                                        (${product.price})</span><span class="off">
                                                        (60% Off)</span>
                                                </div>
                                                <div class="rating"><span>${stars}</span><span>${Math.floor(product.ratings)}/5</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-hover">
                                        <div class="container">
                                            <div class="row">
                                            <div class="col-4" onClick="Wishlist.addToWishlist('${encodeURI(JSON.stringify(product))}')"><i class="fa fa-heart"
                                            aria-hidden="true"></i></div>
                                                <div class="col-4"><a href=""><i class="fa fa-eye"
                                                            aria-hidden="true"></i></a></div>
                                                 <div class="col-4" onClick="cart.addToCart('${encodeURI(JSON.stringify(product))}')"><i class="fa fa-shopping-cart"
                                                            aria-hidden="true"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    ${isNewDiv}
                                    </div>
                       
                                </div>
                            </div>`
        });

        const productsElement1 = document.getElementById('allProductsList1');
        const productsElement2 = document.getElementById('allProductsList2');

        if (productsElement1) {
            productsElement1.innerHTML = cards;
        }

        if (productsElement2) {
            productsElement2.innerHTML = cards;
        }

    });

// adding product to wishlist
const Wishlist = {
    addToWishlist: function (product) {
        let newProduct = product;
        if (typeof product === "string") {
            newProduct = JSON.parse(decodeURI(product));
        }
        const myWishlist = this.getAllItems();
        const filteredItem = myWishlist.filter(item => item.id == newProduct.id);

        if (filteredItem.length >= 1) {
            filteredItem[0].qty += 1;
        } else {
            myWishlist.push({
                ...newProduct,
                qty: 1
            });
            localStorage.setItem('My-Wishlist', JSON.stringify(myWishlist));
        }
    },

    removeWishlist: function (id) {
        const myWishlist = this.getAllItems();
        const filteredItem = myWishlist.filter(item => item.id != id);
        localStorage.setItem('My-Wishlist', JSON.stringify(filteredItem));

    },

    getAllItems: function () {
        return JSON.parse(localStorage.getItem('My-Wishlist')) || []
    },
    removeAllItems: function () {
        localStorage.removeItem('My-wishlist');
    },
}
// displaying wishlist products 
function removeWishlist(id) {
    Wishlist.removeWishlist(id);
    renderWishlist();
}

function renderWishlist() {
    const wishlistItem = Wishlist.getAllItems();

    arr = [1, 2, 3, 4];

    const sum = arr.reduce((p, c) => {
        return p + c;
    }, 0);
    const Cards = wishlistItem.reduce((prev, curr) => {
        return prev +
            `<div class="wishlist-prod-container">
            <div class="wishlist-prod row">
                            <div class="col-lg-3">
                            <img  class="wishlist-prod-img" src="./images/${curr.imageName}.png">
                            </div>

            <div class="Wishlist-prodInfo col">
                <div class="fw-bold mt-10 mb-10">${curr.name}</div>
                <div><img class="Star-img" src="https://t3.ftcdn.net/jpg/03/35/91/90/360_F_335919003_TH0ZtHZZ5QGT34n1NcQXzRGvz4Pthg11.jpg"></div>
                
        <div class="mt-10 mb-10"><span><del>${curr.price}</del><span class="off fw-bold ">(60% off)</span></div>

                            <div>
                            <select name="" id="" class="select-wishlist mb-10">
                                <option value="" selected>Select Pack of</option>
                            </select>
                            </div>

                        <div class="wishlist-carried-button mb-10 mt-10">
                            <button class="btn add-to-cart">Add To cart</button> &nbsp;|&nbsp;
                            <button  class="remove-wishlist" onClick ="removeWishlist(${curr.id})">Remove From Wishlist</button>
                        </div>

            </div>
        </div>
    </div>`;
    }, '')
    document.getElementById('WishlistProd').innerHTML = Cards;
    
   

}
renderWishlist();