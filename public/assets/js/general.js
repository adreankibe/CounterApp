// PRODUCT TYPE

$('#product_type').change((e) => {
    const value = e.target.value;
    if (value === '') {
        $('#web_application').hide()
    }
    else if (value === 'IOT') {
        $('#web_application').hide()
    }
    else if (value === 'Web Application') {
        $('#web_application').show()
    }
})

// UPLOAD METERS
$('.mytable').DataTable({
    dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ]
});
let x = document.querySelectorAll(".mydiv"); 
for (let i = 0, len = x.length; i < len; i++) { 
    let num = Number(x[i].innerHTML) 
              .toLocaleString('en'); 
    x[i].innerHTML = num; 
    x[i].classList.add("currSign"); 
}  
$('*[data-href]').on('click', function() {
    window.location = $(this).data("href");
  });
document.getElementById('clickButton').addEventListener('click', () => {


    var csv = $("#fileUpload").val();
    $('#loader').show()
    document.getElementById('status').innerHTML = 'Processing file.'
    var product_id = $('#product_id').val();
    var customer_id = $('#customer_id').val();
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test($("#fileUpload").val().toLowerCase())) {

        $('#error_div').hide()
        document.getElementById('error_message').innerHTML = ''

        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var rows = e.target.result.split("\r\n");

                if (rows.length > 0) {
                    var firstRowCells = GetCSVCells(rows[0], ",");

                    var dataArray = new Array();
                    for (var i = 1; i < rows.length; i++) {
                        var cells = GetCSVCells(rows[i], ",");
                        var obj = {};
                        for (var j = 0; j < cells.length; j++) {
                            obj[firstRowCells[j]] = cells[j];
                        }
                        dataArray.push(obj);
                    }
                    if (dataArray.length > 0) {

                        document.getElementById('status').innerHTML = 'Uploading file to server.'
                        setTimeout(() => {
                            axios({
                                method: "post",
                                url: "/company/import_meters/" + product_id + '/' + customer_id,
                                data: dataArray,
                                headers: { "Content-Type": "application/json", "Accept": "application/json" }
                            }
                            ).then((response) => {
                                if (response.status === 200) {
                                    document.getElementById('status').innerHTML = 'Successfully uploaded file to server.'
                                    setTimeout(() => {
                                        document.getElementById('status').innerHTML = 'Refreshing Page.'

                                    }, 1500)
                                    setTimeout(() => {
                                        $('#loader').hide()
                                        location.reload()
                                    }, 2500)
                                }

                            }).catch((error) => {
                                $('#loader').hide()
                                $('#error_div').show()
                                document.getElementById('error_message').innerHTML = 'Internal Server Error. Please try again later.'
                            })

                        }, 2500)
                    }
                    else if (dataArray.length < 1) {
                        $('#loader').hide()
                        $('#error_div').show()
                        document.getElementById('error_message').innerHTML = 'CSV file is empty!'
                    }

                }
            }
            reader.readAsText($("#fileUpload")[0].files[0]);
        } else {
            $('#loader').hide()
            $('#error_div').show()
            document.getElementById('error_message').innerHTML = 'This browser does not support HTML5.'

        }
    } else {
        $('#loader').hide()
        $('#error_div').show()
        document.getElementById('error_message').innerHTML = 'Please upload a valid CSV file.'

    }


    function GetCSVCells(row, separator) {
        return row.split(separator);
    }
})


