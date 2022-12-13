window.addEventListener("load", event =>{
    fetch("/filtersJson")
    .then(response => response.json())
    .then(result => {
        loadFilterOneDropdown(result.resultsData);
        document.querySelector("#filterOne").addEventListener("change", event =>{

            if(event.target.value !== ""){
                let filter = document.querySelector("#filterOne").value;
                loadFilterTwoDropdown(result.resultsData[filter]);
            } else
                loadFilterTwoDropdown([]);
        })
    })
    getData();

});


function loadFilterOneDropdown(data){
    let filterOne = document.querySelector("#filterOne");
    let filterOptions = Object.keys(data);

    filterOptions.forEach(option => {
        filterOne.innerHTML += `<option>${option}</option>`;
    });

}

function loadFilterTwoDropdown(dropdownData){
    let filterTwo = document.querySelector("#filterTwo");
    //Takes all the objects in the array and turns it into an array of their values
    dropdownData = dropdownData.map(t => Object.values(t)[0]);

    //sets the default state to the first row in the dropdown
    filterTwo.innerHTML = filterTwo[0].outerHTML;

    dropdownData.forEach(option => {
        filterTwo.innerHTML += `<option>${option}</option>`;
    });
}


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

getData();

document.querySelector(".previous").addEventListener("click", event => {
    if(page!=0){
        page--;
    }
    getData();
});

document.querySelector(".next").addEventListener("click", event => {
    page++;
    getData();
});

document.querySelector("#perPage").addEventListener("change", event => {
    page = 0;
    let perPageValue = document.querySelector('#perPage option:checked').value;
    take = perPageValue;
    getData();
});
