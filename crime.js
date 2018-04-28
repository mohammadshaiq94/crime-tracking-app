let dropdown = document.getElementById('crime_category');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'select the category of crimes';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const url = ' https://data.police.uk/api/crime-categories';

fetch(url).then(function (response) {
    if (response.status !== 200) {
        console.warn('Looks like there was a problem. Status Code: ' + response.status);
        return;
    }


    response.json().then(function (data) {
        let option;

        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.value = data[i].url
            option.text = data[i].name;
            dropdown.add(option);
        }
    });
}
)
    .catch(function (err) {
        console.error('Fetch Error -', err);
    });




//forces work



let dropdown_new = document.getElementById('forces_category');
dropdown_new.length = 0;

let defaultOption1 = document.createElement('option');
defaultOption1.text = 'select the forces category';

dropdown_new.add(defaultOption1);
dropdown_new.selectedIndex = 0;

const url_new = 'https://data.police.uk/api/forces ';

fetch(url_new).then(function (response) {
    if (response.status !== 200) {
        console.warn('Looks like there was a problem. Status Code: ' + response.status);
        return;
    }


    response.json().then(function (data) {
        let option;

        for (let i = 0; i < data.length; i++) {
            option = document.createElement('option');
            option.value = data[i].id;
            option.text = data[i].name;
            dropdown_new.add(option);
        }
    });
}
)
    .catch(function (err_new) {
        console.error('Fetch Error -', err_new);
    });



let onSubmit = () => {
    let selectedName = document.getElementById("crime_category").value;
    let selectedForce = document.getElementById("forces_category").value;
    var url = "https://data.police.uk/api/crimes-no-location?category=" + selectedName + "&force=" + selectedForce;
    let getData = function () {
        return new Promise(function (resolve, reject) {
            fetch(url).then(function (res) {
                return res.json();
            }).then(function (res) {
                resolve(res)
            })
        })
    }










    //status table

    let table = document.getElementById("table");

    getData().then(function (res) {

        for (var k = 0; k < res.length; k++) {
            debugger
            var tr = document.createElement("tr")
            var td1 = document.createElement("td")
            td1.innerHTML = k + 1;
            tr.appendChild(td1);

            var th = document.createElement("th");
            th.innerHTML = res[k].category;
            tr.appendChild(th);

            var td2 = document.createElement("td");
            td2.innerHTML = res[k].month;
            tr.appendChild(td2);


            var td3 = document.createElement("td");
            if(res[k].outcome_status == null){
                td3.innerHTML = "-";       
            }else{
                td3.innerHTML = res[k].outcome_status.category;
            }
            tr.appendChild(td3);


            var td4 = document.createElement("td");
            td4.innerHTML = res[k].id;
            tr.appendChild(td4);
            table.appendChild(tr);

        }
    });

 return false;

}


