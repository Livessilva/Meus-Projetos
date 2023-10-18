const cryptoTable = document.getElementById("cryptoTable");
const cryptoChart = document.getElementById("cryptoChart").getContext("2d");
let pieChart;

// Função para atualizar o gráfico
function updatePieChart() {
    if (pieChart) {
        pieChart.destroy();
    }

    const data = [];
    const labels = [];

    for (let i = 1; i < cryptoTable.rows.length; i++) {
        const cryptoName = cryptoTable.rows[i].cells[0].innerHTML;
        const cryptoValue = parseFloat(cryptoTable.rows[i].cells[2].innerHTML);
        data.push(cryptoValue);
        labels.push(cryptoName);
    }

    pieChart = new Chart(cryptoChart, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.7)",
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(255, 206, 86, 0.7)",
                    "rgba(75, 192, 192, 0.7)",
                    "rgba(153, 102, 255, 0.7)"
                ]
            }]
        }
    });
}

// Função para adicionar uma compra
function addCrypto() {
    const cryptoName = document.getElementById("cryptoName").value;
    const cryptoQuantity = parseFloat(document.getElementById("cryptoQuantity").value);
    const cryptoValue = parseFloat(document.getElementById("cryptoValue").value);
    const cryptoDate = document.getElementById("cryptoDate").value;

    if (cryptoName && cryptoQuantity && cryptoValue && cryptoDate) {
        const newRow = cryptoTable.insertRow(cryptoTable.rows.length);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.innerHTML = cryptoName;
        cell2.innerHTML = cryptoQuantity;
        cell3.innerHTML = cryptoValue;
        cell4.innerHTML = cryptoDate;

        updatePieChart();

        document.getElementById("cryptoName").value = "";
        document.getElementById("cryptoQuantity").value = "";
        document.getElementById("cryptoValue").value = "";
        document.getElementById("cryptoDate").value = "";

        // Salvar os dados no armazenamento local (localStorage)
        saveDataToLocalStorage();
    }
}

// Função para salvar os dados no localStorage
function saveDataToLocalStorage() {
    const dataToSave = [];

    for (let i = 1; i < cryptoTable.rows.length; i++) {
        const cryptoName = cryptoTable.rows[i].cells[0].innerHTML;
        const cryptoQuantity = cryptoTable.rows[i].cells[1].innerHTML;
        const cryptoValue = cryptoTable.rows[i].cells[2].innerHTML;
        const cryptoDate = cryptoTable.rows[i].cells[3].innerHTML;

        dataToSave.push({ name: cryptoName, quantity: cryptoQuantity, value: cryptoValue, date: cryptoDate });
    }

    localStorage.setItem('cryptoData', JSON.stringify(dataToSave));
}

// Função para carregar os dados do localStorage ao carregar a página
function loadDataFromLocalStorage() {
    const cryptoData = localStorage.getItem('cryptoData');
    if (cryptoData) {
        const data = JSON.parse(cryptoData);
        data.forEach(item => {
            const newRow = cryptoTable.insertRow(cryptoTable.rows.length);
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            const cell3 = newRow.insertCell(2);
            const cell4 = newRow.insertCell(3);

            cell1.innerHTML = item.name;
            cell2.innerHTML = item.quantity;
            cell3.innerHTML = item.value;
            cell4.innerHTML = item.date;
        });

        updatePieChart();
    }
}

// Chame a função para carregar os dados do localStorage ao carregar a página
window.onload = function () {
    loadDataFromLocalStorage();
    updatePieChart();
};
