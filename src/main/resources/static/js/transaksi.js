var tableTransaksi = {
  create: function () {
    if ($.fn.DataTable.isDataTable('#tableTransaksi')) {
      $('#tableTransaksi').DataTable().clear();
      $('#tableTransaksi').DataTable().destroy();
    }

    $.ajax({
      url: '/api/transaksi',
      method: 'get',
      contentType: 'application/json',
      success: function (res, status, xhr) {
        if (xhr.status == 200 || xhr.status == 201) {
          $('#tableTransaksi').DataTable({
            data: res,
            columns: [
              {
                title: "id user",
                data: "idUser"
              },
              {
                title: "id transaksi",
                data: "idTransaksi"
              },
              {
                title: "Alamat",
                data: "alamat"
              },
              {
                title: "Foto",
                data: null,
                render: function (data, type, row) {
                  return "<img src='/api/transaksi/getFoto/"+data.idTransaksi+"' alt='myImage' style='border-radius: 5px; width: 100px'>"
                }
              },
              {
                title: "Action",
                data: null,
                render: function (data, type, row) {
                  return "<button class='btn-success' data-toggle='tooltip' title='edit' data-placement='bottom' onclick=formTransaksi.setEditData('" + data.idTransaksi + "') style='border-radius: 20%; margin-right: 5px'><i class='fa fa-pencil-alt'></i></button>" +
                         "<button class='btn-danger' data-toggle='tooltip' title='delete' data-placement='bottom' onclick=actionDelete.deleteConfirm('" + data.idTransaksi + "') style='border-radius: 20%'><i class='fa fa-minus-circle'></i></button>"
                }
              }
            ],
            scrollX : true
          });
        } else {
        }
      },
      error: function (err) {
        console.log(err);
      }
    });

    $.ajax({
      type: 'get',
      url: '/api/user',
      contentType: 'application/json',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        let opt = '<option disabled selected hidden>-- Pilih --</option>';
        for(let i=0; i<res.length; i++) {
          opt += '<option value=' + res[i].idUser + '>' + res[i].nama + '</option>'
        }
        $('#nama').html(opt);
      }
    });
  }
};

var formTransaksi = {
  resetForm: function () {
    $('#form-transaksi')[0].reset();
    $('#idTransaksi').val("");
    $('#thumbnail').removeAttr('src')
  },

  saveForm : function (event) {
    event.preventDefault();

    // Get form
    var form = $('#form-transaksi')[0];

    // Create an FormData object
    var data = new FormData(form);

    // If you want to add an extra field for the FormData
    data.append('transaksi', new Blob([JSON.stringify({
      "idTransaksi": document.getElementById("idTransaksi").value,
      "idUser": document.getElementById("nama").value,
      "alamat": document.getElementById("alamat").value
    })], {
      type: "application/json"
    }));

    // disabled the submit button
    $("#btn-save-transaksi").prop("disabled", true);

    $.ajax({
      type: "POST",
      enctype: 'multipart/form-data',
      url: "/api/transaksi",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      timeout: 600000,
      success: function (data) {

        // $("#result").text(data);
        console.log("SUCCESS : ", data);
        $("#btn-save-transaksi").prop("disabled", false);
        tableTransaksi.create();
        $('#modal-transaksi').modal('hide')
        console.log($('#fileImage').val())

      },
      error: function (e) {

        $("#result").text(e.responseText);
        console.log("ERROR : ", e);
        $("#btn-save-transaksi").prop("disabled", false);

      }
    });
  },

  setEditData: function (idCabang) {
    formTransaksi.resetForm();
    $.ajax({
      url: '/api/transaksi/' + idCabang,
      method: 'get',
      enctype: 'multipart/form-data',
      // contentType: 'application/json',
      dataType: 'json',
      success: function (res, status, xhr) {
        if (xhr.status == 200 || xhr.status == 201) {
          $('#form-transaksi').fromJSON(JSON.stringify(res));
          $('#modal-transaksi').modal('show')
        } else {
        }
      },
      erorrr: function (err) {
        console.log(err);
      }
    });
  }
};

var actionDelete = {
  deleteConfirm: function (id) {
    $.ajax({
      url: '/api/transaksi/' + id,
      method: 'get',
      contentType: 'application/json',
      dataType: 'json',
      success: function (res, status, xhr) {
        if (xhr.status == 200 || xhr.status == 201) {
          $('#form-transaksi').fromJSON(JSON.stringify(res));
          var h4 =  '<h4>Yakin ingin menghapus data ini?</h4>'
          var p = '<p>Data ini akan hilang setelah mengklik tombol "Delete"</p>';
          $('#modal-header').html(h4)
          $('#modal-hidden-id').html(p);
          $('#modal-delete').modal('show')
        } else {

        }
      },
      erorrr: function (err) {
        console.log(err);
      }
    });
  },

  deleteRowData : function () {
    if ($('#form-transaksi').parsley().validate()) {
      var dataResult = getJsonForm($("#form-transaksi").serializeArray(), true);

      $.ajax({
        url: '/api/transaksi/' + dataResult.idTransaksi,
        method: 'delete',
        success: function () {
          tableTransaksi.create();
          $('#modal-delete').modal('hide');
        },
        erorrr: function (err) {
          console.log(err);
        }
      });
    }
  },

  deleteTable : function () {
    $.ajax({
      url: '/api/transaksi',
      method: 'delete',
      success: function () {
        tableTransaksi.create()
        $('#modal-delete').modal('hide')
      }

    })
  }
};
