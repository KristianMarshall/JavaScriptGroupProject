
function getData(page=0, take=10){
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