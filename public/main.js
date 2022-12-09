let page = 0;
let take = 5;
function getData(){
    fetch(`/restaurantsJson?page=${page}&take=${take}`)
        .then(response => response.json())
        .then( results =>{
            let tableData = "";
            results.forEach(rowData => {
                tableData += "<tr>";
                for(const cellData in rowData){
                    tableData += `<td>${rowData[cellData]}</td>`;
                }
                tableData += "</tr>";
            });
            document.querySelector("tbody").innerHTML = tableData;
    })
}

function updatePageData(){
    /*fetch(`/restaurantsJson?page=${page}&take=${take}`)
        .then(response => response.json())
        .then( results =>{
    let pageData = "";
    pageData += "Displaying ";
    if(page=1){
        pageData += "1"
    }
    else{
        pageData += take+1;
    }
    pageData += " - ";
    pageData += page+1 * take;
    pageData += " of ";
    pageData += "PLACEHOLDER";
    document.querySelector(".rowsDisplay").innerHTML = pageData;
    })*/
}

getData();
updatePageData();

document.querySelector(".previous").addEventListener("click", event => {
    if(page!=0){
        page--;
    }
    getData();
    updatePageData();
});

document.querySelector(".next").addEventListener("click", event => {
    page++;
    getData();
    updatePageData();
});

document.querySelector("#perPage").addEventListener("change", event => {
    page = 0;
    let perPageValue = document.querySelector('#perPage option:checked').value;
    take = perPageValue;
    getData();
    updatePageData();
});
