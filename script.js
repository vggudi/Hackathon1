var globalData = [];
var currPage = 0;


var table = document.createElement('table');
const btnsDiv = document.createElement('div');
btnsDiv.className = 'd-flex justify-content-center';
btnsDiv.id = "buttons";
const nextBtn = document.createElement('button');
nextBtn.innerText = 'Next';
nextBtn.className = 'm-1';
const backBtn = document.createElement('button');
backBtn.innerText = 'Back';
backBtn.className = 'm-1';
backBtn.id = 'backbutton';
backBtn.style.display = 'none';
btnsDiv.append(backBtn);
btnsDiv.append(nextBtn);

function createTableHeadingRow() {
    table.classList.add("border");
    table.classList.add("border-secondary");
    table.classList.add("table");
    table.classList.add("table-bordered");
    var tHead = document.createElement('thead');
    tHead.classList.add("thead-dark");
    var tableRow = document.createElement('tr');
    tableRow.classList.add("table-primary");
    var tableHeading1 = document.createElement('th');
    var tableHeading2 = document.createElement('th');
    tableHeading1.classList.add("col-4");
    tableHeading2.classList.add("col-8");
    tableHeading1.innerText = "Product Image";
    tableHeading1.style.textAlign = "center";
    tableHeading2.innerText = "Product Details";
    tableHeading2.style.textAlign = "center";
    tableRow.appendChild(tableHeading1);
    tableRow.appendChild(tableHeading2);
    tHead.appendChild(tableRow);
    table.appendChild(tHead);
}

function createTableNextRows(brand, name, price, image_link, product_link, description, price_sign) {
    var tr = document.createElement('tr');

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    const product = document.createElement('img');
    product.id = "productImage";
    product.src = image_link;
    product.alt = "Image Not Found";
    product.style.height = "175px";
    product.style.width = "175px";
    product.style.margin = '8px';
    product.classList.add("mx-auto");
    td1.classList.add("text-center");
    td2.classList.add("m-4");

    const divEle = document.createElement('div');
    const divEle1 = document.createElement('div');
    const divEle2 = document.createElement('div');
    const divEle3 = document.createElement('div');
    const divEle4 = document.createElement('div');
    const a = document.createElement('a');
    a.href = product_link;
    a.innerHTML = "Product Link";
    a.target = "_blank"
    const divEle5 = document.createElement('div');
    divEle1.innerHTML = "<b> Brand : </b>" + brand;
    divEle2.innerHTML = "<b> Name : </b>" + name;
    divEle3.innerHTML = "<b> Price : </b>" + price + " " + price_sign;
    divEle4.appendChild(a);
    divEle5.innerHTML = "<b> Description : </b>" + description;
    divEle.appendChild(divEle1);
    divEle.appendChild(divEle2);
    divEle.appendChild(divEle3);
    divEle.appendChild(divEle5);
    divEle.appendChild(divEle4);

    td1.appendChild(product);
    td2.appendChild(divEle);
    tr.appendChild(td1);
    tr.appendChild(td2);

    table.appendChild(tr);
}

function displayLoader() {
    const divLoader = document.createElement('div');
    divLoader.className = 'd-flex align-items-center';
    divLoader.id = 'divloader';
    const strongLoader = document.createElement('strong');
    strongLoader.innerText = "Fetching Details From Make Up Api";
    const divLoader2 = document.createElement('div');
    divLoader2.className = 'spinner-border ml-auto';
    divLoader2.role = 'status';
    divLoader2.ariaHidden = 'true';
    divLoader.appendChild(strongLoader);
    divLoader.appendChild(divLoader2);
    document.body.appendChild(divLoader);
}
const once = {
    once: true
};


function hideLoader() {
    document.getElementById('divloader').style.display = 'none';
}
const fetchMakeUpApi = async() => {
    try {
        const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
        const products = await response.json();
        return products;
    } catch {
        const h1 = document.createElement('h1');
        h1.innerText = "Error inn calling Api";
        document.body.appendChild(h1);
    }
}
fetchMakeUpApi().then(products => {
    document.getElementById("pid").style.display = 'none';
    globalData = products;
    document.body.classList.add("m-4");
    createTableHeadingRow();

    products.slice(currPage, 4).forEach(({ brand, name, price, image_link, product_link, description, price_sign }) => {
        createTableNextRows(brand, name, price, image_link, product_link, description, price_sign);
    });

    document.body.appendChild(table);
    document.body.appendChild(btnsDiv);
}).catch((error) => {
    window.removeEventListener('load', displayLoader);
    const h1 = document.createElement('h1');
    h1.innerText = "Error : " + error;
    document.body.appendChild(h1);
});


const showNextSetOfData = () => {

    table.innerHTML = '';
    document.body.classList.add("m-4");
    createTableHeadingRow();
    currPage++;

    const startIndex = currPage * 4;

    const endIndex = (currPage * 4) + 4;
    globalData.slice(startIndex, endIndex).forEach(({ brand, name, price, image_link, product_link, description, price_sign }) => {
        createTableNextRows(brand, name, price, image_link, product_link, description, price_sign);
    });
    if (currPage > 0) {
        document.getElementById('backbutton').style.display = 'block';
    } else {
        document.getElementById('backbutton').style.display = 'none';
    }

}

nextBtn.addEventListener('click', showNextSetOfData);

const showPreviousSetOfData = () => {
    currPage--;
    table.innerHTML = '';
    document.body.classList.add("m-4");
    createTableHeadingRow();
    const startIndex = currPage * 4;

    const endIndex = (currPage * 4) + 4;
    globalData.slice(startIndex, endIndex).forEach(({ brand, name, price, image_link, product_link, description, price_sign }) => {
        createTableNextRows(brand, name, price, image_link, product_link, description, price_sign);
    });
    if (currPage > 0) {
        document.getElementById('backbutton').style.display = 'block';
    } else {
        document.getElementById('backbutton').style.display = 'none';
    }

}
backBtn.addEventListener('click', showPreviousSetOfData);