// Menu items for each Category...
const menuItems ={
    kebaplar: [
        {name: "Adana", price: 280, img: "./image/adana-kebap.jpg"},
        {name: "Urfa", price: 280, img: "./image/krdnzurfa.jpg"},
        {name: "Beyti", price: 340, img: "./image/5ed105ce5542820f10d423b6.jpg"},
        {name: "Tavuk Şiş / Tavuk Kanat", price: 240, img: "./image/hq720.jpg"},
        {name: "Dana Şiş (Bonfile)", price: 300, img: "./image/812x467-552297337920.jpg"},
        {name: "Karışık Kebap", price: 440, img: "./image/karisik.jpg"},
        {name: "İskender (Kebap)", price: 340, img: "./image/622021-Resim-4-142334.jpg"},
        {name: "İzgara Köfte", price: 280, img: "./image/Izgara-Kofte.jpg"}
    ],

    lahmacunlar: [
        {name: "Lahmacun", price: 70, img: "./image/lahmacun.jpg"},
        {name: "Antep Lahmacun", price: 100, img: "./image/AntepL.jpg"},
        {name: "Özel Lahmacun", price: 100, img: "./image/OZELURFA_LAHMACUN.jpg"}
    ],

    pideler:[
        {name: "Kıymalı Pide", price: 220, img: "./image/kıymalyP.jpg"},
        {name: "Kuşbaşı Pide", price: 240, img: "./image/kusbasi-pide.jpg"},
        {name: "Kaşarlı Pide", price: 220, img: "./image/kaşarlıP.jpg"},
        {name: "Karışık Pide", price: 230, img: "./image/karaşıkP.jpg"},
        {name: "Süper Karışık Pide", price: 240, img: "./image/super-pide.jpg"},
        {name: "Kuşbaşılı - Karışık Pide", price: 240, img: "./image/kk2.jpg"},
        {name: "Kıymalı - Kaşarlı Pide", price:230, img: "./image/kıymalı-kaşarlıP.jpg"},
        {name: "Sucuklu - Kaşarlı Pide", price: 240, img: "./image/sucukluKP.jpg"}
    ],

    pizzalar:[
        {name: "Karışık Pizza", price: 280, img: "./image/karaşıkPizza.jpg"}
    ],

    tatlilar:[
        {name: "Künefe", price: 120, img: "./image/kunefe.jpg"},
        {name: "Baklava", price: 130, img: "./image/baklava.jpg"},
        {name: "Sufle", price: 120, img: "./image/sufle.jpg"},
        {name: "Kadayıf", price: 130, img: "./image/kadayif.jpg"},
        {name: "Havuç dilimi", price: 130, img: "./image/havuc2.jpg"}
    ],
    icecekler:[
        {name: "Kola", price: 50, img: "./image/kola.jpg"},
        {name: "Fanta", price: 50, img: "./image/fanta.jpg"},
        {name: "Sade Gazoz", price: 50, img: "./image/sadeGaz.jpg"},
        {name: "Ayran", price: 30, img: "./image/ayran.jpg"},
        {name: "Şalgam", price: 50, img: "./image/salgam.jpg"},
        {name: "Meyve Suyu", price: 50, img: "./image/meyveSu.jpg"},
        {name: "Su", price: 10, img: "./image/su.jpg"},
        {name: "Soda", price: 25, img: "./image/soda.jpg"},
        {name: "Meyveli Soda", price: 30, img: "./image/meyveliS.jpg"}
    ]
};

//Function to toggle the mobile menu...
function toggleMenu() {
    const navList = document.querySelector('.navigation ul');
    navList.classList.toggle('active');
}

// Function to close the menu...
function closeMenu(){
    const navList= document.querySelector('.navigation ul');
    navList.classList.remove('active');
}

// Event Listener to menu items...
document.querySelectorAll('.navigation ul li a').forEach(link =>{
    link.addEventListener('click', () =>{
        closeMenu(); // Close the menu...
    });
});



// Function to update the table with selected ctategory items...
function updateMenu (category){
    const menuList = document.getElementById("menuList");
    menuList.innerHTML = "";

    if(menuItems[category]){
        menuItems[category].forEach(item => {
            const row= document.createElement("tr");
            row.innerHTML = `<td>${item.name}</td> <td>${item.price} ₺</td>`;
            menuList.appendChild(row);
        });
    }

    //Rmeove active class from all link...
    document.querySelectorAll(".navigation ul li a").forEach(link => {
        link.classList.remove("active");
    });
    
    // Active Class...
    const activeLink = document.querySelector(`.navigation ul li a[data-category="${category}"]`);
    
    if(activeLink){
        activeLink.classList.add("active");
    }

    //Update slider images...
    updateSliderImages(category);
}



// Function to update the slider images...
function updateSliderImages(category){
    const sliderContainer = document.querySelector(".slider-images");
    sliderContainer.innerHTML= ""; // clear existing images...

    if(menuItems[category]){

        const itemCount = menuItems[category].length;

        //Center align if there are 3 or fewer images...
        if(itemCount <=3){
            sliderContainer.style.justifyContent = "center";
        }
        if(itemCount <=5){
            sliderContainer.style.justifyContent = "center";
        }
        else{
            sliderContainer.style.justifyContent ="flex-start";
        }

        menuItems[category].forEach((item, index) =>{
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("slider-image");

            // Dynamically set height...
            if (itemCount === 1) {
                imgDiv.style.height = "665px";
            } else if (itemCount === 2) {
                imgDiv.style.height = index === 0 ? "560px" : "665px";
            } else if (itemCount === 3) {
                imgDiv.style.height = (index === 0 || index ===2 ) ? "480px" : "560px";
            } else if (itemCount >= 4) {
                if (index === 0 || index === itemCount - 1) {
                    imgDiv.style.height = "480px";
                } else if (index === 1 || index === itemCount - 2) {
                    imgDiv.style.height = "560px";
                } else {
                    imgDiv.style.height = "665px";
                }
            }

            imgDiv.innerHTML = `<img src="${item.img}" alt="${item.name}"><h1>${item.name}</h1>`;

            sliderContainer.appendChild(imgDiv);
        });

        //Reinitialize clicke event for new images...
        jQuery(".slider-image").on("click", function(event){
            const clickedImage = event.target.closest(".slider-image");
            if(clickedImage){
                clickedImage.classList.toggle("active");
            }
           
        });
    }
}

// Attach event listeners to menu link...
document.querySelectorAll(".navigation ul li a").forEach(link => {
    link.addEventListener("click", function(event){
        event.preventDefault();
        const category= this.getAttribute("data-category");
        updateMenu(category);
    });
});

// Load "Kebaplar" by default when the page loads...
document.addEventListener("DOMContentLoaded", function() {
    updateMenu("kebaplar");
});


//Get the button...
const scrollTopBtn =document.getElementById("scrollTopBtn");

// Show button when scrolling...
window.addEventListener("scroll", ()=> {
    if(window.scrollY > 100){
        scrollTopBtn.classList.add("show");
    }else{
        scrollTopBtn.classList.remove("show");
    }
});

//Scroll to top when button is clicked...
scrollTopBtn.addEventListener("click", () =>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

//Moving text...
document.addEventListener("DOMContentLoaded", function () {
    const movingText = document.getElementById("movingText");
    
    let position = -200; // Start position (off-screen)
    const speed = 2; // Speed of movement...
    const screenWidth = window.innerWidth;

    function animateText() {
        if (position < screenWidth) {
            position += speed;
            movingText.style.left = position + "px";
        } else {
            position = -200; // Reset position when it exits the screen...
        }
        requestAnimationFrame(animateText);
    }

    animateText(); // Start animation...
});


