let total = 0;
let page = 0;
let take = 5;
let filterType = "";
let filterValue = "";

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

    document.querySelector("#apply").addEventListener("click", event => {

        if(document.querySelector("#filterTwo").value != ""){
            document.querySelector("#Clear").disabled = false;

            filterType = document.querySelector("#filterOne").value;
            filterValue = document.querySelector("#filterTwo").value;
            page = 0;

            getData();
        } else
            alert("No Filter Option Selected");
    });

    document.querySelector("#Clear").addEventListener("click", event => {
        event.target.disabled = true; //disable the clear button
        document.querySelector("#filterOne").value = "";
        document.querySelector("#filterTwo").value = "";
        filterType = "";
        filterValue = "";
        loadFilterTwoDropdown([]);
        getData();
    });

    document.querySelector("#previous").addEventListener("click", event => {
        if(page>=0){
            page--;
            getData();
        }
    });
    
    document.querySelector("#next").addEventListener("click", event => {
        if((page+1)*take <= total){
            page++;
            getData();
        }
    });
    
    document.querySelector("#perPage").addEventListener("change", event => {
        page = 0;
        let perPageValue = document.querySelector('#perPage option:checked').value;
        take = perPageValue;
        getData();
    });

    getData(); //gets the data on initial page load

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



function getData(){

    fetch(`/restaurantsJson?page=${page}&take=${take}&filterType=${filterType}&filterValue=${filterValue}`)
        .then(response => response.json())
        .then( results =>{
            total = results[1][0].total;
            let tableData = "";
            results[0].forEach(rowData => {
                tableData += "<tr>";
                for(const cellData in rowData){
                    tableData += `<td>${rowData[cellData]}</td>`;
                }
                tableData += "</tr>";
            });

            document.querySelector("tbody").innerHTML = tableData;

            document.querySelector(".rowsDisplay").innerHTML= `Displaying ${page*take+1} - ${(page+1)*take < total ? (page+1)*take : total} of ${total}`;

            if(page > 0)
                document.querySelector("#previous").disabled = false;
            else
                document.querySelector("#previous").disabled = true;

            if((page+1)*take < total)
                document.querySelector("#next").disabled = false;
            else
                document.querySelector("#next").disabled = true;
    })
}